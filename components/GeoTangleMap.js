import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';

const width = 960;
const height = 500;

export default function GeoTangleMap() {
  const svgRef = useRef(null);
  const [relations, setRelations] = useState([]);

  useEffect(() => {
    fetch('/data/relations.json')
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
        .attr('fill', 'black');
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
        .attr('stroke', rel.type === 'alliance' ? 'green' : 'red')
        .attr('stroke-width', 2)
        .on('click', () => alert(`Justification: ${rel.justification}\nSources: ${rel.sources.join(', ')}\nTags: ${rel.tags.join(', ')}`));
    });
  };

  return (
    <svg ref={svgRef} width={width} height={height} />
  );
}
