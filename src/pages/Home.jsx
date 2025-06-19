import Head from 'next/head';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>GeoTangle</title>
        <meta name="description" content="Interactive world alliances and conflicts" />
      </Head>
      <main>
        <h1>GeoTangle</h1>
        <Map />
      </main>
    </div>
  );
}
