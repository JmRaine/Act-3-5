import { readFile } from 'node:fs/promises';

const base = process.env.SEED_API_URL || 'https://act-3-5.onrender.com';
const endpoint = `${base.replace(/\/$/, '')}/api/products`;
const products = [
  ['Wireless Headphones', 1499, 'Bluetooth 5.3 over-ear headphones with 20 hours of battery life and soft ear cushions.', 'wireless-headphones'],
  ['Canvas Tote Bag', 350, 'Eco-friendly cotton tote bag with an inside pocket. Strong, washable, and good for school.', 'canvas-tote-bag'],
  ['Ceramic Coffee Mug', 220, '350ml ceramic mug that keeps your coffee warm. Microwave and dishwasher safe.', 'ceramic-coffee-mug'],
  ['LED Desk Lamp', 899, 'Adjustable LED lamp with 3 brightness levels and a built-in USB charging port.', 'led-desk-lamp'],
  ['Laptop Backpack', 1250, 'Water-resistant backpack that fits a 15.6-inch laptop, with padded shoulder straps.', 'laptop-backpack'],
  ['Smart Watch', 2499, 'Fitness watch with step counter, heart rate monitor, and 7-day battery life.', 'smart-watch'],
];

const initial = await fetch(endpoint, { signal: AbortSignal.timeout(90000) });
if (!initial.ok) throw new Error(`Could not load products: ${initial.status}`);
const existing = await initial.json();

for (const [name, price, description, file] of products) {
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
