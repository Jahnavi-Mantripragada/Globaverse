import Head from 'next/head';
import dynamic from 'next/dynamic';
import SidePanel from '../components/SidePanel';
import relationships from '../data/relationships.json';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
});

export default function Home({ selectedCountry, setSelectedCountry }) {
  return (
    <div style={{ display: 'flex' }}>
      <Head>
        <title>GeoTangle</title>
        <meta name="description" content="Interactive world alliances and conflicts" />
      </Head>
      <main style={{ flexGrow: 1 }}>
        <h1>GeoTangle</h1>
        <Map onSelectCountry={setSelectedCountry} />
      </main>
      <SidePanel
        selectedCountry={selectedCountry}
        relations={relationships}
        onClose={() => setSelectedCountry(null)}
      />
    </div>
  );
}
