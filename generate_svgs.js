const fs = require('fs');
const path = require('path');
const items = [
  { name: 'Pad Thai Goong Sod', file: 'pad-thai-goong-sod' },
  { name: 'Tom Yum Goong', file: 'tom-yum-goong' },
  { name: 'Green Curry Chicken', file: 'green-curry-chicken' },
  { name: 'Mango Sticky Rice', file: 'mango-sticky-rice' },
  { name: 'Som Tum Thai (Papaya Salad)', file: 'som-tum-thai' },
  { name: 'Massaman Beef Curry', file: 'massaman-beef-curry' },
  { name: 'Khao Pad Pu (Crab Fried Rice)', file: 'khao-pad-pu' },
  { name: 'Moo Ping (Grilled Pork)', file: 'moo-ping' },
  { name: 'Pla Rad Prik (Crispy Fish)', file: 'pla-rad-prik' },
  { name: 'Thai Iced Tea', file: 'thai-iced-tea' },
  { name: 'Moo Krob (Crispy Pork Belly)', file: 'moo-krob' },
  { name: 'Khao Soi (Northern Curry Noodles)', file: 'khao-soi' },
  { name: 'Tod Mun Pla (Thai Fish Cakes)', file: 'tod-mun-pla' },
  { name: 'Larb Moo (Spicy Minced Pork Salad)', file: 'larb-moo' },
  { name: 'Tub Tim Grob (Red Ruby Dessert)', file: 'tub-tim-grob' }
];
const pub = path.join(process.cwd(), 'public');
if (!fs.existsSync(pub)) fs.mkdirSync(pub);
items.forEach(item => {
  const svg = `<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#111827"/>
  <text x="50%" y="50%" font-family="sans-serif" font-size="30" fill="#D4AF37" text-anchor="middle" dominant-baseline="middle">${item.name}</text>
  <text x="50%" y="56%" font-family="sans-serif" font-size="20" fill="#9CA3AF" text-anchor="middle" dominant-baseline="middle">(Replace with ${item.file}.png)</text>
</svg>`;
  fs.writeFileSync(path.join(pub, item.file + '.svg'), svg);
});
console.log('Placeholders created successfully.');
