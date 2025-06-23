import React from 'react';
import styles from '../styles/SidePanel.module.css';


function SidePanel({ selectedCountry, onClose, relationships }) {
  if (!selectedCountry) return null;

  const filtered = relationships.filter(
    rel => rel.source === selectedCountry || rel.target === selectedCountry
  );

  return (
    <div className={styles['side-panel']}>
      <button onClick={onClose} className="close-btn">✖</button>
      <h2>{selectedCountry}</h2>
      {filtered.length === 0 ? (
        <p>No relationships found.</p>
      ) : (
        filtered.map((rel, i) => (
          <div key={i} className="relation-box">
            <strong>{rel.source} ↔ {rel.target}</strong><br />
            Type: {rel.type}<br />
            <em>{rel.justification}</em><br />
            Tags: {rel.tags.join(', ')}<br />
            <a href={rel.sources[0]} target="_blank" rel="noreferrer">Source</a>
          </div>
        ))
      )}
    </div>
  );
}

export default SidePanel;
