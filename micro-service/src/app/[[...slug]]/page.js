import '../../index.css';
import { ClientOnly } from './client';
import { headers } from 'next/headers';
import { getChurchSlug } from '../../utils/index';
import parseSlugToIdAndType from '@apollosproject/web-shared/utils/parseSlugToIdAndType';
import Head from 'next/head';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params, searchParams, ...other }, parent) {
  const id = searchParams?.id;

  if (!id) return parent;

  const route = headers().get('referer');

  const churchSlug = getChurchSlug(route);

  const { type, randomId } = parseSlugToIdAndType(id) ?? [];

  // fetch data
  const response = await fetch('https://cdn.apollos.app/', {
    headers: {
      'content-type': 'application/json',
      'x-church': churchSlug,
    },
    body: JSON.stringify({
      query:
        'query getItemMetadata($itemId:ID!){\n  node(id:$itemId){\n    ... on ContentItem  {\n      coverImage {\n        sources {uri(refresh:true) }\n      }\n      title\n      summary\n    }\n  }\n}',
      variables: { itemId: `${type}:${randomId}` },
      operationName: 'getItemMetadata',
    }),
    method: 'POST',
  }).then((res) => res.json());

  const title = response?.data?.node?.title;
  const description = response?.data?.node?.summary;
  const image = response?.data?.node?.coverImage?.sources[0]?.uri;

  return {
    title: title,
    openGraph: {
      title: title,
      description: description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description,
      images: [image], // Must be an absolute URL
    },
  };
}

export default function Page(props) {
  const headersList = headers();
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="../../file.svg" />
      </Head>
      <ClientOnly {...props} url={headersList.get('referer')} />
    </>
  );
}
