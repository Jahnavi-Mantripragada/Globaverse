import React from 'react';

export default function CountryRelationshipsPanel({ country, relationships }) {
  const style = {
    width: '25%',
    padding: '1rem',
    borderLeft: '1px solid #ccc',
    transform: country ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s ease-in-out',
  };

  if (!country) {
    return <aside style={style}>Select a country</aside>;
  }

  const rels = relationships.filter(
    (r) => r.source === country || r.target === country
  );

  return (
    <aside style={style}>
      <h2>{country}</h2>
      {rels.length === 0 ? (
        <p>No relationships found</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {rels.map((rel, idx) => {
            const partner = rel.source === country ? rel.target : rel.source;
            return (
              <li key={idx} style={{ marginBottom: '1rem' }}>
                <strong>{partner}</strong>
                <div>Type: {rel.type}</div>
                <div>Justification: {rel.justification}</div>
                <div>Tags: {rel.tags.join(', ')}</div>
              </li>
            );
          })
        </ul>
      )}
    </aside>
  );
}
