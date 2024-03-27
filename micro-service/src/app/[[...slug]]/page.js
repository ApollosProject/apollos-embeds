import '../../index.css';
import { ClientOnly } from './client';
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default function Page(props) {
  const headersList = headers();
  return <ClientOnly {...props} url={headersList.get('referer')} />;
}
