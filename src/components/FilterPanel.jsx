import React from 'react';
import styles from '../styles/RelationshipMap.module.css';

export default function FilterPanel({ filters, setFilters }) {
  const update = (changes) => setFilters({ ...filters, ...changes });

  return (
    <div className={styles['control-panel']}>
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
