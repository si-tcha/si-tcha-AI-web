import { readFile, readdir, mkdir, copyFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetDir = path.join(root, 'src/assets');
const backupDir = path.join(root, '.backups/seo-images-20261021');
async function sourceFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await sourceFiles(target));
    else if (/\.(?:tsx?|css|html|json)$/.test(entry.name)) files.push(target);
  }
  return files;
}
const files = [...await sourceFiles(path.join(root, 'src')), path.join(root, 'index.html')];
const references = (await Promise.all(files.map(file => readFile(file, 'utf8')))).join('\n');
const unused = (await readdir(assetDir)).filter(name => /\.(?:jpe?g|png|webp|svg)$/i.test(name) && !references.includes(name));
await mkdir(backupDir, { recursive: true });
for (const name of unused) {
  const source = path.resolve(assetDir, name);
  if (path.dirname(source) !== assetDir) throw new Error('Image outside source assets');
  await copyFile(source, path.join(backupDir, name));
  await unlink(source);
}
await writeFile(path.join(backupDir, 'removed-images.json'), JSON.stringify({ note: 'Removed from src after checking all source references; retained here for recovery.', files: unused }, null, 2));
console.log(`${unused.length} unused source images archived: ${unused.join(', ')}`);
