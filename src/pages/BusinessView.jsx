import Head from 'next/head';
import Map from '../components/Map';
import CountrySidePanel from '../components/CountrySidePanel';
import { useState } from 'react';

export default function BusinessView() {
  const [selected, setSelected] = useState(null);

  const selectedCountry = selected ? { name: selected, code: '' } : null;

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
        country={selectedCountry}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
