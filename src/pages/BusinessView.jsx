import Head from 'next/head';
import Map from '../components/Map';
import CountryRelationshipsPanel from '../components/CountryRelationshipsPanel';
import relationships from '../data/relationships.json';
import { useState } from 'react';

export default function BusinessView() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: 'flex' }}>
      <Head>
        <title>Business View - GeoTangle</title>
      </Head>
      <main style={{ flexGrow: 1 }}>
        <h1>Business View</h1>
        <Map onCountrySelect={setSelected} />
      </main>
      <CountryRelationshipsPanel country={selected} relationships={relationships} />
    </div>
  );
}
