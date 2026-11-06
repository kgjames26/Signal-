import './globals.css';

export const metadata = {
  title: 'Signal — Mes sites Vercel',
  description: 'Regroupe et décrit tous mes projets déployés sur Vercel.',
  manifest: '/manifest.json',
  themeColor: '#10b981',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" />
      </head>
      <body>{children}</body>
    </html>
  );
}