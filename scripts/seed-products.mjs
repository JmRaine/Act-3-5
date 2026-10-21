import { readFile } from 'node:fs/promises';

const base = process.env.SEED_API_URL || 'https://act-3-5.onrender.com';
const endpoint = `${base.replace(/\/$/, '')}/api/products`;
const products = JSON.parse(await readFile(new URL('./products.json', import.meta.url), 'utf8'));

const initial = await fetch(endpoint, { signal: AbortSignal.timeout(90000) });
if (!initial.ok) throw new Error(`Could not load products: ${initial.status}`);
const existing = await initial.json();

for (const { name, price, description, file } of products) {
  if (existing.some((p) => p.name === name)) {
    console.log(`Already exists: ${name}`);
    continue;
  }
  const bytes = await readFile(new URL(`../client/public/product-images/${file}.png`, import.meta.url));
  if (bytes.length > 1024 * 1024) throw new Error(`${file} exceeds 1MB`);
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price, description, image: `data:image/png;base64,${bytes.toString('base64')}` }),
    signal: AbortSignal.timeout(90000),
  });
  if (!response.ok) throw new Error(`${name}: ${response.status} ${await response.text()}`);
  const saved = await response.json();
  console.log(`${response.status} Created ${saved.name}: ${saved._id}`);
}

const final = await fetch(endpoint, { signal: AbortSignal.timeout(90000) });
if (!final.ok) throw new Error(`Could not verify products: ${final.status}`);
const saved = await final.json();
console.log(`Database contains ${saved.length} products; ${saved.filter((p) => p.image?.startsWith('data:image/png;base64,')).length} have embedded PNG images.`);
