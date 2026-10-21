import { readFile, mkdir, writeFile } from 'node:fs/promises';

const base = process.env.SEED_API_URL || 'https://act-3-5.onrender.com';
const endpoint = `${base.replace(/\/$/, '')}/api/products`;
const catalog = JSON.parse(await readFile(new URL('./products.json', import.meta.url), 'utf8'));
const initial = await fetch(endpoint, { signal: AbortSignal.timeout(90000) });
if (!initial.ok) throw new Error(`Read failed: ${initial.status}`);
const existing = await initial.json();
const backupFolder = new URL('../output/backups/', import.meta.url);
await mkdir(backupFolder, { recursive: true });
await writeFile(new URL(`products-before-refresh-${Date.now()}.json`, backupFolder), JSON.stringify(existing, null, 2));

// Prepare all images before changing the database.
const replacements = await Promise.all(catalog.map(async ({ name, price, description, file, replaces }) => {
  const bytes = await readFile(new URL(`../client/public/product-images/${file}.png`, import.meta.url));
  if (bytes.length > 1024 * 1024) throw new Error(`${file} exceeds 1MB`);
  const current = existing.find((p) => p.name === replaces) || existing.find((p) => p.name === name);
  return { current, data: { name, price, description, image: `data:image/png;base64,${bytes.toString('base64')}` } };
}));

for (const { current, data } of replacements) {
  const response = await fetch(current ? `${endpoint}/${current._id}` : endpoint, {
    method: current ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(90000),
  });
  if (!response.ok) throw new Error(`${data.name}: ${response.status} ${await response.text()}`);
  console.log(`${response.status} ${current ? 'Updated' : 'Created'} ${data.name}`);
}

const verified = await fetch(endpoint, { signal: AbortSignal.timeout(90000) });
if (!verified.ok) throw new Error(`Verification failed: ${verified.status}`);
const saved = await verified.json();
for (const item of catalog) {
  if (!saved.some((p) => p.name === item.name && p.image?.startsWith('data:image/png;base64,'))) {
    throw new Error(`Missing saved product/image: ${item.name}`);
  }
}
console.log(`Verified six new products with images. Total database products: ${saved.length}.`);
