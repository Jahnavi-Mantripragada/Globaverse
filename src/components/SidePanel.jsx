import React from 'react';

export default function SidePanel({ relation }) {
  const style = {
    width: '25%',
    padding: '1rem',
    borderLeft: '1px solid #ccc',
    transform: relation ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s ease-in-out',
  };

  if (!relation) {
    return <aside style={style}>Select a relationship</aside>;
  }

  return (
    <aside style={style}>
      <h2>{relation.source} → {relation.target}</h2>
      <p>Type: {relation.type}</p>
      <p>Justification: {relation.justification}</p>
      <p>Tags: {relation.tags.join(', ')}</p>
      <div>
        {relation.sources.map((url) => (
          <div key={url}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </div>
        ))}
      </div>
    </aside>
  );
}
