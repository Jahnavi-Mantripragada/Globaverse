import Head from 'next/head';
import SubmitRelationshipForm from '../components/SubmitRelationshipForm';

export default function Contribute() {
  return (
    <div>
      <Head>
        <title>Contribute - GeoTangle</title>
      </Head>
      <main>
        <h1>Contribute a Relationship</h1>
        <SubmitRelationshipForm />
      </main>
    </div>
  );
}
