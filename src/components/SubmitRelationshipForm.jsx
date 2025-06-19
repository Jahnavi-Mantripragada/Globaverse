import React, { useState } from 'react';
import countryMeta from '../data/countryMeta.json';

export default function SubmitRelationshipForm({ onSubmit }) {
  const [sourceId, setSourceId] = useState('');
  const [targetId, setTargetId] = useState('');
  const [type, setType] = useState('alliance');
  const [justification, setJustification] = useState('');
  const [tags, setTags] = useState('');
  const [urls, setUrls] = useState('');
  const [errors, setErrors] = useState({});

  const codes = new Set(countryMeta.map((c) => c.code));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const sCode = sourceId.trim().toUpperCase();
    const tCode = targetId.trim().toUpperCase();

    if (!sCode) newErrors.sourceId = 'Source country is required';
    else if (!codes.has(sCode)) newErrors.sourceId = 'Invalid country code';

    if (!tCode) newErrors.targetId = 'Target country is required';
    else if (!codes.has(tCode)) newErrors.targetId = 'Invalid country code';

    if (!justification.trim()) {
      newErrors.justification = 'Justification is required';
    }

    const tagList = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    if (tagList.length === 0) {
      newErrors.tags = 'At least one tag is required';
    }

    const urlList = urls
      .split(/\n|,/)
      .map((u) => u.trim())
      .filter(Boolean);
    if (urlList.length === 0) {
      newErrors.urls = 'At least one source URL is required';
    } else if (urlList.some((u) => !/^https?:\/\//i.test(u))) {
      newErrors.urls = 'URLs must start with http or https';
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const entry = {
      source: sCode,
      target: tCode,
      type,
      justification: justification.trim(),
      tags: tagList,
      sources: urlList,
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
          {errors.sourceId && (
            <div style={{ color: 'red' }}>{errors.sourceId}</div>
          )}
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
          {errors.targetId && (
            <div style={{ color: 'red' }}>{errors.targetId}</div>
          )}
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
          {errors.justification && (
            <div style={{ color: 'red' }}>{errors.justification}</div>
          )}
        </label>
      </div>
      <div>
        <label>
          Tags (comma-separated)
          <input
            type="text"
            required
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          {errors.tags && <div style={{ color: 'red' }}>{errors.tags}</div>}
        </label>
      </div>
      <div>
        <label>
          Source URLs (comma or newline separated)
          <textarea
            required
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
          />
          {errors.urls && <div style={{ color: 'red' }}>{errors.urls}</div>}
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
