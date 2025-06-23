import React from 'react';

export default function CountrySidePanel({ country, onClose }) {
  if (!country)
    return <aside style={{ width: '20%', padding: '1rem' }}>Select a country</aside>;

  return (
    <aside style={{ width: '20%', padding: '1rem', borderLeft: '1px solid #ccc' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ margin: 0 }}>{country.name}</h2>
        {onClose && (
          <button onClick={onClose} aria-label="Close panel">
            ×
          </button>
        )}
      </header>
      <p>Code: {country.code}</p>
    </aside>
  );
}
