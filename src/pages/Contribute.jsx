import Head from 'next/head';
import ArticleForm from '../components/ArticleForm';

export default function Contribute() {
  const handleSubmit = (url) => {
    alert(`Submitted: ${url}`);
  };

  return (
    <div>
      <Head>
        <title>Contribute - GeoTangle</title>
      </Head>
      <main>
        <h1>Contribute an Article</h1>
        <ArticleForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
