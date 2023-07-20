import React from 'react';
import { initFirebase } from '@/firebase/firebaseApp';

// Initialize Firebase on the client-side
if (typeof window !== 'undefined') {
  initFirebase();
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;