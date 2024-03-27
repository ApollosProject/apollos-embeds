import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'React App',
  description: 'Web site created with Next.js.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link id="favicon" rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      </head>

      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
