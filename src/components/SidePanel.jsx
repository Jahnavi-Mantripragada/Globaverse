import React from 'react';

export default function SidePanel({ country }) {
  if (!country) return <aside style={{ width: '20%', padding: '1rem' }}>Select a country</aside>;
  return (
    <aside style={{ width: '20%', padding: '1rem', borderLeft: '1px solid #ccc' }}>
      <h2>{country.name}</h2>
      <p>Code: {country.code}</p>
    </aside>
  );
}
