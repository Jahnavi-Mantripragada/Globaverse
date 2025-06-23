import React from 'react';

export default function NodeTooltip({ relation }) {
  if (!relation) return null;
  return (
    <div style={{ position: 'absolute', bottom: 10, left: 10, background: '#fff', padding: '0.5rem', border: '1px solid #ccc' }}>
      <strong>{relation.source} - {relation.target}</strong>
      <div>Type: {relation.type}</div>
      <div>{relation.justification}</div>
      <div>
        Sources:{' '}
        {Array.isArray(relation.sources)
          ? relation.sources.map((src, idx) => (
              <span key={idx}>
                {src}
                {idx < relation.sources.length - 1 ? ', ' : ''}
              </span>
            ))
          : 'No sources'}
      </div>
      <div>
        Tags: {relation.tags.join(', ')}
      </div>
    </div>
  );
}
