import React, { useState } from 'react';

export default function SubmitRelationshipForm({ onSubmit }) {
  const [sourceId, setSourceId] = useState('');
  const [targetId, setTargetId] = useState('');
  const [type, setType] = useState('alliance');
  const [justification, setJustification] = useState('');
  const [tags, setTags] = useState('');
  const [urls, setUrls] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      source: sourceId,
      target: targetId,
      type,
      justification,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      sources: urls
        .split(/\n|,/)
        .map((u) => u.trim())
        .filter(Boolean),
    };
    const stored = JSON.parse(
      window.localStorage.getItem('submittedRelations') || '[]'
    );
    stored.push(entry);
    window.localStorage.setItem('submittedRelations', JSON.stringify(stored));
    if (onSubmit) onSubmit(entry);
    setSourceId('');
    setTargetId('');
    setType('alliance');
    setJustification('');
    setTags('');
    setUrls('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Source Country ID
          <input
            type="text"
            required
            value={sourceId}
            onChange={(e) => setSourceId(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Target Country ID
          <input
            type="text"
            required
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="alliance">Alliance</option>
            <option value="conflict">Conflict</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Justification
          <textarea
            required
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Tags (comma-separated)
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Source URLs (comma or newline separated)
          <textarea
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
