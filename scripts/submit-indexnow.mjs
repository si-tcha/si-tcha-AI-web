import { readFile } from 'node:fs/promises';

// Explicit command after deployment only. No automatic submission at build time.
const origin = 'https://si-tcha.com';
const key = (await readFile(new URL('../public/indexnow-key.txt', import.meta.url), 'utf8')).trim();
const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
if (!urlList.length || urlList.some(url => new URL(url).origin !== origin)) throw new Error('Invalid sitemap URLs');
const keyLocation = `${origin}/indexnow-key.txt`;
const deployedKey = await fetch(keyLocation, { signal: AbortSignal.timeout(15000) });
if (!deployedKey.ok || (await deployedKey.text()).trim() !== key) throw new Error('Deploy the matching IndexNow key file before submitting URLs');
// Ensure we do not notify engines about pages that are still unpublished.
for (const url of urlList) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  const html = await response.text();
  if (!response.ok || !html.includes(`<link rel="canonical" href="${url}"`)) throw new Error(`Page is not deployed correctly: ${url}`);
}
const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: 'si-tcha.com', key, keyLocation, urlList }), signal: AbortSignal.timeout(15000),
});
if (![200, 202].includes(response.status)) throw new Error(`IndexNow rejected submission: HTTP ${response.status}`);
console.log(`IndexNow received ${urlList.length} URLs (HTTP ${response.status}). Receipt does not guarantee indexing or ranking.`);
