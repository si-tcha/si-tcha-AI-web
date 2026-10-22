import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const origin = 'https://si-tcha.com';
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.equal(urls.length, 13, 'Expected homepage and six bilingual page pairs');
assert.equal(new Set(urls).size, urls.length);
const pages = new Map();
for (const url of urls) {
  const pathname = new URL(url).pathname;
  pages.set(pathname, await readFile(path.join(root, pathname.slice(1), 'index.html'), 'utf8'));
}
const titles = new Set();
const descriptions = new Set();
for (const [pathname, html] of pages) {
  assert(!html.includes('<!--app-html-->') && !html.includes('<!--seo-head-->'), `${pathname}: unresolved placeholder`);
  assert(!html.includes('noindex'), `${pathname}: noindex blocks discovery`);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${pathname}: expected one main heading`);
  assert(html.includes(`<link rel="canonical" href="${origin + pathname}"`), `${pathname}: wrong canonical`);
  assert(html.includes('<main'), `${pathname}: missing main content`);
  assert(!html.includes('/src/assets/'), `${pathname}: unbuilt asset URL`);
  const title = html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1];
  const description = html.match(/<meta name="description" content="(.*?)"/)?.[1];
  assert(title && !titles.has(title), `${pathname}: title missing or duplicated`);
  assert(description && !descriptions.has(description), `${pathname}: description missing or duplicated`);
  titles.add(title); descriptions.add(description);
  const structured = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
  assert(structured, `${pathname}: missing structured data`);
  assert(JSON.parse(structured)['@graph'].some(item => item['@type'] === 'Organization'));
  const graph = JSON.parse(structured)['@graph'];
  for (const type of ['Organization', 'WebSite']) assert.equal(graph.find(item => item['@type'] === type)?.name, 'Si-Tcha AI', `${pathname}: wrong company name`);
  if (pathname === '/') {
    assert.equal(title, 'Si-Tcha AI', 'Homepage title must contain only the company name');
    assert.equal((html.match(/class="react-interactive/g) || []).length, 4, 'Menu, dashboard, form and localized footer links must be isolated from DOM translation');
  }
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#]*)(#[^"]*)?"/g)) {
    const target = decodeURIComponent(match[1]);
    if (target.startsWith('//')) continue;
    const filename = path.join(root, target.slice(1));
    const targetStat = await stat(filename).catch(() => null);
    assert(targetStat, `${pathname}: missing local target ${target}`);
    if (targetStat.isDirectory()) assert(await stat(path.join(filename, 'index.html')), `${target}: missing index`);
    if (match[2] && pages.has(target)) assert(pages.get(target).includes(`id="${match[2].slice(1)}"`), `${pathname}: missing anchor ${target}${match[2]}`);
  }
  const alternates = [...html.matchAll(/<link rel="alternate" hreflang="(fr|en)" href="(.*?)"/g)];
  if (pathname !== '/') {
    assert.equal(alternates.length, 2, `${pathname}: missing bilingual alternate`);
    for (const [, lang, url] of alternates) {
      const alternatePath = new URL(url).pathname;
      const alternateHtml = pages.get(alternatePath);
      assert(alternateHtml?.includes(`<html lang="${lang}">`), `${pathname}: alternate language mismatch`);
      assert(alternateHtml.includes(`href="${origin + pathname}"`), `${pathname}: alternate is not reciprocal`);
    }
  }
}
const cssFile = (await readdir(path.join(root, 'assets'))).find(name => name.endsWith('.css'));
const css = await readFile(path.join(root, 'assets', cssFile), 'utf8');
for (const [, target] of css.matchAll(/url\(["']?(\/assets\/[^)'"\s]+)/g)) await stat(path.join(root, target.slice(1)));
const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
assert(robots.includes('User-agent: *\nAllow: /'));
assert(robots.includes(`${origin}/sitemap.xml`));
assert((await readFile(path.join(root, '404.html'), 'utf8')).includes('noindex'));
const htaccess = await readFile(path.join(root, '.htaccess'), 'utf8');
assert(htaccess.includes('ErrorDocument 404 /404.html'));
assert(!/RewriteRule.*\/index\.html/.test(htaccess), 'Avoid SPA catch-all soft 404s');
console.log(`SEO checks passed: ${pages.size} pages, static content, unique metadata, structured data, assets, internal links, reciprocal hreflang, sitemap and crawl rules.`);
