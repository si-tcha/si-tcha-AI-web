import { build } from 'vite';
import { mkdir, readFile, writeFile, copyFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const origin = 'https://si-tcha.com';
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const json = value => JSON.stringify(value).replaceAll('<', '\\u003c');

await build({ root });
await build({ root, publicDir: false, build: { ssr: 'src/entry-server.tsx', outDir: '.seo-build', emptyOutDir: true, manifest: false, ssrEmitAssets: true } });
const { render, seoPages } = await import(pathToFileURL(path.join(root, '.seo-build/entry-server.js')).href);
const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const manifest = JSON.parse(await readFile(path.join(dist, '.vite/manifest.json'), 'utf8'));
const asset = name => Object.values(manifest).find(entry => entry.src === `src/assets/${name}`)?.file;
const logo = asset('logo.png');
const hero = asset('area.webp');
if (!logo || !hero) throw new Error('Missing logo or hero in asset manifest');
await copyFile(path.join(dist, logo), path.join(dist, 'social-logo.png'));

const organization = {
  '@type': 'Organization', '@id': `${origin}/#organization`, name: 'Si-Tcha AI', url: `${origin}/`,
  logo: `${origin}/${logo}`, email: 'contact@si-tcha.com', telephone: '+237670463484',
  address: { '@type': 'PostalAddress', addressLocality: 'Yaoundé', addressCountry: 'CM' },
  description: 'Women-led agritech in Cameroon. An offline-first platform connecting farmers, buyers and agronomic advice, currently in development.',
};
const home = { path: '/', lang: 'en', title: 'Si-Tcha AI', description: 'Si-Tcha AI: sell before you produce. A Cameroon agritech pilot with 10 women farmers, developing buyer connections, offline tools and SMS advice.' };
for (const page of [home, ...seoPages]) {
  const canonical = origin + page.path;
  const graph = [organization, { '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`, name: 'Si-Tcha AI', publisher: { '@id': organization['@id'] }, inLanguage: ['en', 'fr'] }, {
    '@type': 'WebPage', '@id': canonical + '#page', url: canonical, name: page.title, description: page.description, inLanguage: page.lang,
    isPartOf: { '@id': `${origin}/#website` }, about: { '@id': organization['@id'] },
  }];
  if (page.path !== '/') graph.push({ '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: page.lang === 'fr' ? 'Accueil' : 'Home', item: origin + '/' },
    { '@type': 'ListItem', position: 2, name: page.heading, item: canonical },
  ] });
  const alternates = page.alternate ? [
    `<link rel="alternate" hreflang="${page.lang}" href="${canonical}" />`,
    `<link rel="alternate" hreflang="${page.lang === 'fr' ? 'en' : 'fr'}" href="${origin + page.alternate}" />`,
    `<link rel="alternate" hreflang="x-default" href="${origin + (page.lang === 'en' ? page.path : page.alternate)}" />`,
  ].join('\n') : '';
  const head = `${alternates}
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Si-Tcha AI" translate="no" data-brand />
<meta property="og:title" content="${escape(page.title)}" translate="no" data-brand />
<meta property="og:description" content="${escape(page.description)}" />
<meta property="og:url" content="${canonical}" />
<meta property="og:locale" content="${page.lang === 'fr' ? 'fr_CM' : 'en_CM'}" />
<meta property="og:image" content="${origin}/social-logo.png" />
<meta property="og:image:alt" content="Si-Tcha AI logo" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="${escape(page.title)}" translate="no" data-brand />
<meta name="twitter:description" content="${escape(page.description)}" />
<meta name="twitter:image" content="${origin}/social-logo.png" />
${page.path === '/' ? `<link rel="preload" as="image" href="/${hero}" fetchpriority="high" />` : ''}
<script type="application/ld+json">${json({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
  const html = template.replace('<html lang="en">', `<html lang="${page.lang}">`)
    .replace(/<title[^>]*>.*?<\/title>/s, `<title translate="no">${escape(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(page.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace('<!--seo-head-->', head).replace('<!--app-html-->', render(page.path));
  const directory = path.join(dist, page.path.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), html);
}

await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[home, ...seoPages].map(page => `  <url><loc>${origin + page.path}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\n# Search crawlers, including Googlebot, Bingbot and OAI-SearchBot, are allowed.\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(path.join(dist, '404.html'), `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page introuvable — Si-Tcha AI</title></head><body style="font-family:system-ui;max-width:48rem;margin:15vh auto;padding:2rem;color:#103d22"><h1>Page introuvable / Page not found</h1><p>Cette adresse ne correspond à aucune page du site.</p><a href="/">Revenir à l'accueil / Back to home</a></body></html>`);
// Build-only files must not be part of the upload to LWS.
await rm(path.join(dist, '.vite'), { recursive: true, force: true });
await rm(path.join(root, '.seo-build'), { recursive: true, force: true });
console.log(`SEO: ${seoPages.length + 1} static pages, sitemap, robots and 404 generated. Build-only files removed.`);
