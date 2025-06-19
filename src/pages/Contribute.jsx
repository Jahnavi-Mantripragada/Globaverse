import Head from 'next/head';
import { useState } from 'react';
import relationships from '../data/relationships.json';

export default function Contribute() {
  const existingTags = Array.from(
    new Set(relationships.flatMap((r) => r.tags))
  );

  const [country1, setCountry1] = useState('');
  const [country2, setCountry2] = useState('');
  const [type, setType] = useState('alliance');
  const [justification, setJustification] = useState('');
  const [source, setSource] = useState('');
  const [tags, setTags] = useState([]);

  const handleTagChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setTags(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      source: country1,
      target: country2,
      type,
      justification,
      sources: [source],
      tags,
    };
    const stored = JSON.parse(
      window.localStorage.getItem('submittedRelations') || '[]'
    );
    stored.push(entry);
    window.localStorage.setItem(
      'submittedRelations',
      JSON.stringify(stored)
    );
    alert('Relationship submitted');
    setCountry1('');
    setCountry2('');
    setType('alliance');
    setJustification('');
    setSource('');
    setTags([]);
  };

  return (
    <div>
      <Head>
        <title>Contribute - GeoTangle</title>
      </Head>
      <main>
        <h1>Contribute a Relationship</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Country 1
              <input
                type="text"
                required
                value={country1}
                onChange={(e) => setCountry1(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Country 2
              <input
                type="text"
                required
                value={country2}
                onChange={(e) => setCountry2(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Alliance or Conflict
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
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
              Source URL
              <input
                type="url"
                required
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Tags
              <select multiple value={tags} onChange={handleTagChange}>
                {existingTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}
