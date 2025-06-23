import Head from 'next/head';
import Map from '../components/Map';
import CountrySidePanel from '../components/CountrySidePanel';
import countryMeta from '../data/countryMeta.json';
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
      <CountrySidePanel
        country={selected || countryMeta[0]}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
