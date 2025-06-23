import '../styles/globals.css';
import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <Component
      {...pageProps}
      selectedCountry={selectedCountry}
      setSelectedCountry={setSelectedCountry}
    />
  );
}
