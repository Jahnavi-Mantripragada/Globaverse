import React from 'react';

export default function RelationshipSidePanel({ relation }) {
  if (!relation) {
    return (
      <aside style={{ width: '25%', padding: '1rem' }}>
        Select a relationship
      </aside>
    );
  }

  return (
    <aside style={{ width: '25%', padding: '1rem', borderLeft: '1px solid #ccc' }}>
      <h2>
        {relation.source} → {relation.target}
      </h2>
      <p>Type: {relation.type}</p>
      <p>{relation.justification}</p>
      <p>Sources: {relation.sources.join(', ')}</p>
      <p>Timeline: {relation.timeline || 'N/A'}</p>
    </aside>
  );
}
