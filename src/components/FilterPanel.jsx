import React from 'react';

export default function FilterPanel({ filters, setFilters }) {
  const update = (changes) => setFilters({ ...filters, ...changes });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        background: '#fff',
        padding: '1rem',
        border: '1px solid #ccc',
        zIndex: 1,
      }}
    >
      <div>
        <label>
          <input
            type="checkbox"
            checked={filters.showAlliance}
            onChange={(e) => update({ showAlliance: e.target.checked })}
          />
          Show alliances
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={filters.showConflict}
            onChange={(e) => update({ showConflict: e.target.checked })}
          />
          Show conflicts
        </label>
      </div>
      <div>
        <label>
          Tag filter
          <input
            type="text"
            value={filters.tag}
            onChange={(e) => update({ tag: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Highlight country
          <input
            type="text"
            value={filters.country}
            onChange={(e) => update({ country: e.target.value })}
          />
        </label>
      </div>
    </div>
  );
}
