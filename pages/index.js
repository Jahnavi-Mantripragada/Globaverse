import Head from 'next/head';
import dynamic from 'next/dynamic';

const GeoTangleMap = dynamic(() => import('../components/GeoTangleMap'), {
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
        <GeoTangleMap />
      </main>
    </div>
  );
}
