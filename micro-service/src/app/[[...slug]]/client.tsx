import React from 'react';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../../App'), { ssr: true });

export function ClientOnly(props) {
  return <App {...props} />;
}
