// Checks database/portfolio.json before every build, so a typing slip in the
// data cannot reach the live site: every image it names must exist, every
// cross-reference must resolve, and no required text may be empty.
//
//   npm run check

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const db = JSON.parse(readFileSync(join(root, 'database/portfolio.json'), 'utf8'));
const problems = [];
const fail = (message) => problems.push(message);

const file = (path, where) => {
  if (typeof path !== 'string' || !path.startsWith('./')) return fail(`${where}: "${path}" should start with "./"`);
  if (!existsSync(join(root, 'public', path.slice(2)))) fail(`${where}: file not found in public/: ${path}`);
};
const text = (value, where) => {
  if (typeof value !== 'string' || value.trim() === '') fail(`${where}: missing text`);
};
const link = (value, where) => {
  if (typeof value !== 'string' || !/^(https:\/\/|mailto:)/.test(value)) fail(`${where}: "${value}" is not an https or mailto link`);
};

const tables = ['person', 'hero', 'about', 'udb', 'polybuilder', 'softwareIntro', 'software', 'colorimeter', 'skills', 'experience', 'leadership', 'membership', 'referees', 'quote', 'photos', 'backgrounds', 'sections'];
for (const name of tables) if (!(name in db)) fail(`table "${name}" is missing`);

if (problems.length === 0) {
  // person
  for (const key of ['first', 'full', 'initials', 'role', 'location', 'email']) text(db.person[key], `person.${key}`);
  link(db.person.linkedin, 'person.linkedin');
  link(db.person.github, 'person.github');
  if (db.person.portrait) file(db.person.portrait, 'person.portrait');

  // photographs and figures
  for (const [key, set] of Object.entries(db.photos)) {
    text(set.context, `photos.${key}.context`);
    set.items.forEach((item, i) => {
      const where = `photos.${key}[${i + 1}]`;
      file(item.src, where);
      file(item.thumb, where);
      for (const field of ['alt', 'title', 'details']) text(item[field], `${where}.${field}`);
    });
  }
  for (const [key, path] of Object.entries(db.backgrounds)) file(path, `backgrounds.${key}`);

  // cross-references
  db.software.forEach((s) => {
    text(s.title, 'software.title');
    text(s.summary, `software "${s.title}".summary`);
    link(s.link.href, `software "${s.title}".link`);
    if (!db.photos[s.gallery]?.items.length) fail(`software "${s.title}": gallery "${s.gallery}" has no images in photos`);
    if (!db.backgrounds[s.gallery]) fail(`software "${s.title}": no background named "${s.gallery}"`);
  });
  db.experience.forEach((e) => {
    for (const field of ['role', 'org', 'place', 'when']) text(e[field], `experience "${e.org}".${field}`);
    if (!e.points.length) fail(`experience "${e.org}": no bullet points`);
    if (!db.photos[e.photos]) fail(`experience "${e.org}": no photo set named "${e.photos}"`);
    if (!db.backgrounds[e.photos]) fail(`experience "${e.org}": no background named "${e.photos}"`);
  });
  for (const key of ['about', 'udb', 'polybuilder', 'colorimeter', 'leadership']) {
    if (!db.photos[key]) fail(`photos.${key} is missing (use an empty "items" list for no photos)`);
  }
  for (const key of ['udb', 'polybuilder', 'colorimeter']) if (!db.backgrounds[key]) fail(`backgrounds.${key} is missing`);

  // research
  db.udb.links.forEach((l) => link(l.href, `udb.links "${l.label}"`));
  if (db.udb.stages.length !== 7) fail(`udb.stages should list 7 stages, found ${db.udb.stages.length}`);
  for (const family of db.udb.viewer.families) {
    for (const g of db.udb.viewer.generations) file(`./structures/${family.key}_g${g}.json`, `udb.viewer ${family.label} G${g}`);
  }

  // lists that must not be empty
  db.skills.forEach((group) => {
    text(group.category, 'skills.category');
    if (!group.skills.length) fail(`skills "${group.category}" is empty`);
  });
  db.leadership.forEach((r) => ['role', 'org', 'place', 'when'].forEach((f) => text(r[f], `leadership "${r.role}".${f}`)));
  db.referees.forEach((r) => {
    ['name', 'title', 'place'].forEach((f) => text(r[f], `referees "${r.name}".${f}`));
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(r.email)) fail(`referees "${r.name}": "${r.email}" is not an email address`);
  });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(db.person.email)) fail(`person.email "${db.person.email}" is not an email address`);
  if (db.sections.length !== 6) fail('sections should list the six sections of the page');
}

if (problems.length) {
  console.error(`database/portfolio.json has ${problems.length} problem(s):`);
  problems.forEach((p) => console.error(`  - ${p}`));
  process.exit(1);
}
const images = Object.values(db.photos).reduce((n, set) => n + set.items.length, 0);
console.log(`database ok: ${tables.length} tables, ${images} images, ${db.udb.viewer.families.length * db.udb.viewer.generations.length} structures`);
