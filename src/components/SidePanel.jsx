import React from 'react';

export default function SidePanel({ selectedCountry, relations = [], onClose }) {
  const style = {
    width: '25%',
    padding: '1rem',
    borderLeft: '1px solid #ccc',
    transform: selectedCountry ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s ease-in-out',
  };

  if (!selectedCountry) {
    return <aside style={style}>Select a country</aside>;
  }

  const matches = relations.filter(
    (r) => r.source === selectedCountry || r.target === selectedCountry
  );

  return (
    <aside style={style}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ margin: 0 }}>{selectedCountry}</h2>
        {onClose && (
          <button onClick={onClose} aria-label="Close panel">
            ×
          </button>
        )}
      </header>
      {matches.length === 0 ? (
        <p>No relationships found</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {matches.map((rel, idx) => (
            <li key={idx} style={{ marginBottom: '1rem' }}>
              <strong>
                {rel.source === selectedCountry ? rel.target : rel.source}
              </strong>{' '}
              - {rel.type}
              <div>Justification: {rel.justification}</div>
              <div>Tags: {rel.tags.join(', ')}</div>
              <div>
                {rel.sources.map((url) => (
                  <div key={url}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url}
                    </a>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
