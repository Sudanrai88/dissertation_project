import React from 'react';
import { initFirebase } from '@/firebase/firebaseApp';
import '@/styles/globals.css';


// Initialize Firebase on the client-side
if (typeof window !== 'undefined') {
  initFirebase();
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;