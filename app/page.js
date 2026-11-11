'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setProjects(data.projects || []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>S</div>
          <h1 style={styles.title}>Signal</h1>
        </div>
        <p style={styles.subtitle}>
          Tous mes sites déployés sur Vercel — mis à jour automatiquement.
        </p>
      </header>

      <main style={styles.main}>
        {loading && <div style={styles.center}>Chargement des projets…</div>}

        {error && (
          <div style={styles.error}>
            <strong>Erreur :</strong> {error}
            <p style={{ marginTop: 8, fontSize: 14 }}>
              Assure-toi d’avoir défini <code>VERCEL_TOKEN</code> dans les variables d’environnement du projet sur Vercel.
            </p>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div style={styles.center}>Aucun projet trouvé (ou token invalide).</div>
        )}

        <div style={styles.grid}>
          {projects.map((p) => {
            const Card = p.url ? 'a' : 'div';
            return (
              <Card
                key={p.id}
                href={p.url || undefined}
                target={p.url ? '_blank' : undefined}
                rel={p.url ? 'noopener noreferrer' : undefined}
                style={p.url ? styles.card : { ...styles.card, opacity: 0.55, cursor: 'default' }}
              >
                <div style={styles.cardHeader}>
                  <h2 style={styles.cardTitle}>{p.name}</h2>
                  <span style={styles.framework}>{p.framework}</span>
                </div>
                <p style={styles.description}>{p.description}</p>
                <div style={styles.cardFooter}>
                  <span style={styles.visit}>{p.url ? 'Visiter →' : 'Aucun déploiement prêt'}</span>
                  <span style={styles.url}>{p.url ? p.url.replace(/^https?:\\/\\//, '') : 'Indisponible'}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </main>

      <footer style={styles.footer}>
        Signal · Mis à jour automatiquement via l’API Vercel
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0a0a0a',
    color: '#f5f5f5',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    borderBottom: '1px solid #262626',
    padding: '2rem 1.5rem',
  },
  headerInner: {
    maxWidth: '64rem',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: '#10b981',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    fontWeight: 700,
    fontSize: 20,
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: 700,
    margin: 0,
    letterSpacing: '-0.025em',
  },
  subtitle: {
    maxWidth: '64rem',
    margin: '0.5rem auto 0',
    color: '#a3a3a3',
    fontSize: '1.125rem',
  },
  main: {
    maxWidth: '64rem',
    margin: '0 auto',
    padding: '2.5rem 1.5rem',
  },
  center: {
    textAlign: 'center',
    padding: '5rem 0',
    color: '#737373',
  },
  error: {
    background: 'rgba(127, 29, 29, 0.5)',
    border: '1px solid #7f1d1d',
    color: '#fecaca',
    borderRadius: 12,
    padding: '1.5rem',
  },
  grid: {
    display: 'grid',
    gap: '1.5rem',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  },
  card: {
    display: 'block',
    borderRadius: 16,
    border: '1px solid #262626',
    background: 'rgba(23, 23, 23, 0.5)',
    padding: '1.5rem',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.2s',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    margin: 0,
  },
  framework: {
    fontSize: 12,
    color: '#737373',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  description: {
    margin: '0.75rem 0 0',
    fontSize: 14,
    color: '#a3a3a3',
    lineHeight: 1.6,
  },
  cardFooter: {
    marginTop: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 14,
  },
  visit: {
    color: '#34d399',
    fontWeight: 500,
  },
  url: {
    color: '#737373',
  },
  footer: {
    borderTop: '1px solid #262626',
    padding: '1.5rem',
    textAlign: 'center',
    fontSize: 14,
    color: '#737373',
  },
};