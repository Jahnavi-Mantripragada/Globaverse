'use client';
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import relationships from '../data/relationships.json';

mermaid.initialize({ startOnLoad: false });

export default function MermaidMap() {
  const chartRef = useRef(null);

  useEffect(() => {
  if (!chartRef.current) return;

  let mermaidText = `graph TD\n`;

  relationships.forEach((rel) => {
    const from = sanitize(rel.source);
    const to = sanitize(rel.target);
    const edge = rel.type === 'conflict' ? '-.->' : '-->';
    mermaidText += `  ${from} ${edge} ${to}\n`;
  });

  mermaidText += `
    subgraph Legend [Legend]
      ally[Alliance]:::alliance
      foe[Conflict]:::conflict
    end
    classDef alliance stroke:#2ecc71,stroke-width:2px,color:#2ecc71;
    classDef conflict stroke:#e74c3c,stroke-width:2px,color:#e74c3c;
  `;

  // ✅ 1. Create a fresh div with class 'mermaid'
  const graphEl = document.createElement('div');
  graphEl.className = 'mermaid';
  graphEl.textContent = mermaidText;

  // ✅ 2. Clear old and append new
  chartRef.current.innerHTML = '';
  chartRef.current.appendChild(graphEl);

  // ✅ 3. Render
  mermaid.init(undefined, graphEl);
}, []);


  return (
    <div>
      <h2>Alliance & Conflict Map</h2>
      <div ref={chartRef} />
    </div>
  );
}

function sanitize(label) {
  return label.replace(/\s+/g, '_').replace(/[^\w]/g, '');
}
