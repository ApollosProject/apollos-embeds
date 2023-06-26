import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Apollos Micro Service',
  description: 'A micro service design to utilize Apollos Embeds',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/@apollosproject/apollos-embeds@0.1.0/widget/index.css"
          rel="stylesheet"
        />
        <Script src="https://cdn.jsdelivr.net/npm/@apollosproject/apollos-embeds@0.1.0/widget/index.js"></Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
