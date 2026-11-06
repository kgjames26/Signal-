import { NextResponse } from 'next/server';

// Descriptions personnalisées pour tes projets connus
const DESCRIPTIONS = {
  'nba-pulse-app': 'PWA NBA multilingue (FR/EN/ES/TR/AR/ZH). Scores, box scores, résumés IA, mode spoiler. Optimisée pour Android.',
  'nba-pulse': 'PWA NBA multilingue avec scores en direct, classements et résumés tactiques générés par IA.',
  'cross-travel': 'PWA pour préparer des itinéraires VTT, vélo familial et motocross sur OpenStreetMap. Navigation GPS, profils BRouter/Valhalla.',
  'numa': 'Mon budget en clair — PWA de gestion budgétaire mensuelle simple et claire.',
  'homemmanual': 'Manuel de la maison — documentation et guides pour la maison.',
  'gpstesla': 'Outil GPS / tracking lié à Tesla.',
  'dirt-travel': 'Itinéraires et exploration hors des sentiers battus.',
  'cabine': 'Photobooth interactif et whimsical avec webcam, branding personnalisé.',
  'rempart': 'Jeu tower defense Rempart avec assets et palettes de couleurs.',
};

function getDescription(name) {
  const key = name.toLowerCase().replace(/-/g, '');
  for (const [k, desc] of Object.entries(DESCRIPTIONS)) {
    if (name.toLowerCase().includes(k.toLowerCase()) || key.includes(k.replace(/-/g, ''))) {
      return desc;
    }
  }
  return `Projet ${name} déployé sur Vercel.`;
}

export async function GET() {
  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: 'VERCEL_TOKEN manquant. Ajoute-le dans les variables d\'environnement Vercel.' },
      { status: 500 }
    );
  }

  try {
    const res = await fetch('https://api.vercel.com/v9/projects?limit=100', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 }, // cache 60s
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: 'Erreur API Vercel', details: err }, { status: res.status });
    }

    const data = await res.json();
    const projects = (data.projects || [])
      .filter((p) => p.name !== 'signal') // exclure ce site lui-même
      .map((p) => ({
        id: p.id,
        name: p.name,
        description: getDescription(p.name),
        url: `https://${p.name}.vercel.app`,
        framework: p.framework || 'unknown',
        updatedAt: p.updatedAt,
      }))
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}