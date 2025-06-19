import React, { useState } from 'react';

export default function ArticleForm({ onSubmit }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(url);
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="articleUrl">Article URL:</label>
      <input
        id="articleUrl"
        type="url"
        required
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
