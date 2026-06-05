import fs from 'fs';
import path from 'path';

const dir = 'public/photo';
const dirs = fs.readdirSync(dir).filter(d => fs.statSync(path.join(dir, d)).isDirectory());

let deleted = 0;

// 1. Delete "(1)", "(2)" suffix duplicates
for (const city of dirs) {
  const files = fs.readdirSync(path.join(dir, city));
  for (const f of files) {
    if (/\(\d+\)\./i.test(f)) {
      fs.unlinkSync(path.join(dir, city, f));
      console.log(`[suffix dup] Deleted: ${city}/${f}`);
      deleted++;
    }
  }
}

// 2. Find cross-folder duplicates, keep in first alphabetical city
const allFiles = {};
for (const city of dirs.sort()) {
  const files = fs.readdirSync(path.join(dir, city))
    .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));
  for (const f of files) {
    if (!allFiles[f]) allFiles[f] = [];
    allFiles[f].push(city);
  }
}

for (const [f, cities] of Object.entries(allFiles)) {
  if (cities.length > 1) {
    const keep = cities[0];
    const remove = cities.slice(1);
    for (const city of remove) {
      fs.unlinkSync(path.join(dir, city, f));
      console.log(`[cross dup] Deleted: ${city}/${f} (kept in ${keep})`);
      deleted++;
    }
  }
}

console.log(`\nTotal deleted: ${deleted}`);
