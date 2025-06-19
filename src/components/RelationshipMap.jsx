import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import relationships from '../data/relationships.json';
import { relationColor } from '../utils/colorUtils';
import RelationshipSidePanel from './RelationshipSidePanel';

const width = 600;
const height = 400;

export default function RelationshipMap() {
  const svgRef = useRef(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const nodes = Array.from(
      new Set(relationships.flatMap(r => [r.source, r.target])),
      id => ({ id })
    );
    const links = relationships.map(rel => ({ ...rel }));

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg
      .attr('viewBox', [0, 0, width, height])
      .style('font', '12px sans-serif');

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

    const link = svg
      .append('g')
      .attr('stroke-width', 1.5)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', d => relationColor(d.type))
      .attr('marker-end', d => `url(#arrow-${d.type})`)
      .on('click', (event, d) => setSelected(d));

    const node = svg
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 5)
      .attr('fill', 'steelblue')
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
      });

    const label = svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text(d => d.id)
      .attr('x', 8)
      .attr('y', 4);

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
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <svg ref={svgRef} width={width} height={height} />
      <RelationshipSidePanel relation={selected} />
    </div>
  );
}
