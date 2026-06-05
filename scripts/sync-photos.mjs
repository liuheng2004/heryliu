import fs from 'fs';
import path from 'path';

const dir = 'public/photo';
const dirs = fs.readdirSync(dir).filter(d => fs.statSync(path.join(dir, d)).isDirectory());
const result = {};

for (const d of dirs) {
  const files = fs.readdirSync(path.join(dir, d))
    .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
    .sort();
  result[d] = files;
}

let ts = `export const CITY_ABBR_MAP: Record<string, string> = {
  'changsha': '长沙',
  'ezhou': '鄂州',
  'pingxiang': '萍乡',
  'huangshi': '黄石',
  'hangzhou': '杭州',
  'zhoushan': '舟山',
  'yichang': '宜昌',
  'wuhan': '武汉',
  'xiangxi': '湘西',
  'xaingyang': '襄阳',
  'xiaogan': '孝感',
};

export const CITY_NAME_TO_ABBR: Record<string, string> = Object.fromEntries(
  Object.entries(CITY_ABBR_MAP).map(([abbr, name]) => [name, abbr])
);

export const PHOTO_DATA: Record<string, string[]> = {
`;

for (const d of dirs) {
  ts += `  '${d}': [\n`;
  for (const f of result[d]) {
    ts += `    '${f}',\n`;
  }
  ts += `  ],\n`;
}

ts += `};

export const PHOTO_CITIES = Object.keys(PHOTO_DATA);

export function getCityPhotos(abbr: string): string[] {
  const files = PHOTO_DATA[abbr];
  if (!files) return [];
  return files.map(f => \`/photo/\${abbr}/\${encodeURIComponent(f)}\`);
}
`;

fs.writeFileSync('src/data/photo-data.ts', ts);
const total = Object.values(result).flat().length;
console.log(`photo-data.ts updated: ${total} photos across ${dirs.length} cities`);
