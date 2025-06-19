import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import NodeTooltip from './NodeTooltip';
import { relationColor } from '../utils/colorUtils';

const width = 960;
const height = 500;

export default function Map({ onCountrySelect }) {
  const svgRef = useRef(null);
  const [relations, setRelations] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('/api/relationships')
      .then((res) => res.json())
      .then(setRelations)
      .catch((err) => console.error('Failed to load relations', err));

    fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
      .then((res) => res.json())
      .then((worldData) => {
        const countries = feature(worldData, worldData.objects.countries).features;
        drawMap(countries);
      })
      .catch((err) => console.error('Failed to load map', err));
  }, []);

  const drawMap = (countries) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const projection = d3.geoNaturalEarth1().scale(160).translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);

    svg
      .selectAll('path')
      .data(countries)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', '#eee')
      .attr('stroke', '#999');

    const countryCentroids = {};
    countries.forEach((country) => {
      const [x, y] = path.centroid(country);
      countryCentroids[country.properties.name] = { x, y };

      svg
        .append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 2)
        .attr('fill', 'black')
        .on('click', () => {
          if (onCountrySelect) onCountrySelect(country.properties.name);
        });
    });

    const lineGenerator = d3.linkHorizontal()
      .x(d => d.x)
      .y(d => d.y);

    relations.forEach((rel) => {
      const source = countryCentroids[rel.source];
      const target = countryCentroids[rel.target];
      if (!source || !target) return;

      svg
        .append('path')
        .datum({ source, target })
        .attr('d', lineGenerator)
        .attr('fill', 'none')
        .attr('stroke', relationColor(rel.type))
        .attr('stroke-width', 2)
        .on('click', () => setSelected(rel));
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      <svg ref={svgRef} width={width} height={height} />
      <NodeTooltip relation={selected} />
    </div>
  );
}
