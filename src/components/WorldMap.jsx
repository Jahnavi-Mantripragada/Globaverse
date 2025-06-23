import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import countries from '../data/countries.json';
import relations from '../data/relationships.json';

function WorldMap({ onSelectCountry }) {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const width = 960;
    const height = 500;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('position', 'relative');

    svg.selectAll('*').remove();

    const projection = d3.geoNaturalEarth1()
      .scale(170)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);
    const graticule = d3.geoGraticule();

    // Globe background
    svg.append('path')
      .datum({ type: 'Sphere' })
      .attr('d', path)
      .attr('fill', '#e6f7ff');

    // Grid lines
    svg.append('path')
      .datum(graticule())
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', '#ccc');

    const countryMap = new Map(countries.map(c => [c.id, c]));

    // Draw relationship lines
    svg.append('g')
      .selectAll('line')
      .data(relations)
      .enter()
      .filter(d => {
        const source = countryMap.get(d.source);
        const target = countryMap.get(d.target);
        if (!source || !target) {
          console.warn("Skipping invalid relation:", d);
          return false;
        }
        return true;
      })
      .append('line')
      .attr('x1', d => projection([countryMap.get(d.source).lon, countryMap.get(d.source).lat])[0])
      .attr('y1', d => projection([countryMap.get(d.source).lon, countryMap.get(d.source).lat])[1])
      .attr('x2', d => projection([countryMap.get(d.target).lon, countryMap.get(d.target).lat])[0])
      .attr('y2', d => projection([countryMap.get(d.target).lon, countryMap.get(d.target).lat])[1])
      .attr('stroke', d => d.type === 'alliance' ? 'green' : 'red')
      .attr('stroke-width', 2)
      .on('mouseover', (event, d) => {
        d3.select(tooltipRef.current)
          .style('display', 'block')
          .style('left', event.pageX + 'px')
          .style('top', event.pageY + 'px')
          .html(`<strong>${d.source} ↔ ${d.target}</strong><br/>
            Type: ${d.type}<br/>
            Reason: ${d.jits}<br/>
            Tags: ${d.tags.join(', ')}<br/>
            <a href="${d.sources[0]}" target="_blank">Source</a>`);
      })
      .on('mouseout', () => {
        d3.select(tooltipRef.current).style('display', 'none');
      });

    // Country nodes
    svg.append('g')
      .selectAll('circle')
      .data(countries)
      .enter()
      .append('circle')
      .attr('cx', d => projection([d.lon, d.lat])[0])
      .attr('cy', d => projection([d.lon, d.lat])[1])
      .attr('r', 4)
      .attr('fill', 'blue')
      .on('click', (event, d) => {
        if (typeof onSelectCountry === 'function') {
          onSelectCountry(d.id);
        }
      });

  }, [onSelectCountry]);

  return (
    <div style={{ position: 'relative' }}>
      <svg ref={svgRef}></svg>
      <div ref={tooltipRef} className="tooltip" style={{ display: 'none' }}></div>
    </div>
  );
}

export default WorldMap;
