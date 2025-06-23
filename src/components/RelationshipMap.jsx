import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import relationships from '../data/relationships.json';
import countries from '../data/countries.json';
import { relationColor } from '../utils/colorUtils';
import SidePanel from './SidePanel';
import FilterPanel from './FilterPanel';
import styles from '../styles/RelationshipMap.module.css';

const countryNames = countries.reduce((acc, c) => {
  acc[c.code] = c.name;
  return acc;
}, {});

const width = 600;
const height = 400;

export default function RelationshipMap() {
  const svgRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [filters, setFilters] = useState({
    showAlliance: true,
    showConflict: true,
    tag: '',
    country: '',
  });

  useEffect(() => {
    const filtered = relationships.filter((rel) => {
      if (!filters.showAlliance && rel.type === 'alliance') return false;
      if (!filters.showConflict && rel.type === 'conflict') return false;
      if (filters.tag && !rel.tags.includes(filters.tag)) return false;
      return true;
    });

    const nodes = Array.from(
      new Set(filtered.flatMap((r) => [r.source, r.target])),
      (id) => ({ id })
    );
    const links = filtered.map((rel) => ({ ...rel }));

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg
      .attr('viewBox', [0, 0, width, height])
      .style('font', '12px sans-serif');

    const zoomGroup = svg.append('g');

    svg.call(
      d3
        .zoom()
        .scaleExtent([0.5, 5])
        .on('zoom', (event) => {
          zoomGroup.attr('transform', event.transform);
        })
    );

    const defs = svg.append('defs');
    ['alliance', 'conflict'].forEach(type => {
      defs
        .append('marker')
        .attr('id', `arrow-${type}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 10)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', relationColor(type));
    });

    const link = zoomGroup
      .append('g')
      .attr('stroke-width', 1.5)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', (d) => relationColor(d.type))
      .attr('marker-end', (d) => `url(#arrow-${d.type})`)
      .attr('stroke-dasharray', d => d.type === 'conflict' ? '4 2' : null)
      .attr('stroke-width', (d) => {
        const h = filters.country;
        const involves =
          h &&
          (d.source === h ||
            d.target === h ||
            (d.source.id && d.source.id === h) ||
            (d.target.id && d.target.id === h));
        return involves ? 3 : 1.5;
      })
      .attr('opacity', (d) => {
        const h = filters.country;
        if (!h) return 1;
        const involves =
          d.source === h ||
          d.target === h ||
          (d.source.id && d.source.id === h) ||
          (d.target.id && d.target.id === h);
        return involves ? 1 : 0.3;
      })
      .on('click', (event, d) => setSelected(d))
      .on('mousemove', (event, d) => {
        const rect = svgRef.current.getBoundingClientRect();
        setTooltip({
          type: 'edge',
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          data: d,
        });
      })
      .on('mouseout', () => setTooltip(null));

    const node = zoomGroup
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 5)
      .attr('fill', 'steelblue')
      .attr('cursor', 'pointer')
      .call(
        d3
          .drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      )
      .on('click', (event, d) => {
        const rel = relationships.find(r => r.source === d.id || r.target === d.id);
        setSelected(rel);
      })
      .on('mousemove', (event, d) => {
        const rect = svgRef.current.getBoundingClientRect();
        const rels = relationships.filter(r => r.source === d.id || r.target === d.id);
        const region = rels.find(r => r.source === d.id)?.source_region ||
          rels.find(r => r.target === d.id)?.target_region || '';
        setTooltip({
          type: 'node',
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          data: {
            name: countryNames[d.id] || d.id,
            region,
            count: rels.length,
          },
        });
      })
      .on('mouseout', () => setTooltip(null));

    const label = zoomGroup
      .append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text(d => d.id)
      .attr('x', 8)
      .attr('y', 4);

    const linkLabel = zoomGroup
      .append('g')
      .selectAll('text')
      .data(links)
      .join('text')
      .attr('text-anchor', 'middle')
      .attr('dy', -4)
      .text(d => (d.justification?.length > 30 ? d.justification.slice(0, 30) + '...' : d.justification));

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id(d => d.id)
          .distance(150)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('cx', d => d.x).attr('cy', d => d.y);
      label.attr('transform', d => `translate(${d.x},${d.y})`);
      linkLabel
        .attr('x', d => (d.source.x + d.target.x) / 2)
        .attr('y', d => (d.source.y + d.target.y) / 2);
    });

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
    return () => simulation.stop();
  }, [filters]);

  return (
    <div className={styles.container}>
      <svg ref={svgRef} className={styles.graph} />
      {tooltip && (
        <div
          className={styles.tooltip}
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.type === 'node' ? (
            <>
              <strong>{tooltip.data.name}</strong>
              <div>Region: {tooltip.data.region || 'N/A'}</div>
              <div>Relationships: {tooltip.data.count}</div>
            </>
          ) : (
            <>
              <div>{tooltip.data.justification}</div>
              <div>Tags: {tooltip.data.tags.join(', ')}</div>
            </>
          )}
        </div>
      )}
      <SidePanel relation={selected} />
      <FilterPanel filters={filters} setFilters={setFilters} />
    </div>
  );
}
