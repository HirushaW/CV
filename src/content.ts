// Everything the site says and shows comes from one file: database/portfolio.json.
// To change the site, edit that file (see "The database" in README.md).
// This module only gives the data its types.

import database from '../database/portfolio.json';

export type Photo = { src: string; thumb: string; alt: string; title: string; details: string };
export type PhotoSet = { context: string; items: Photo[] };

export type Software = {
  title: string;
  when: string;
  tags: string[];
  summary: string;
  details: string[];
  meta: string;
  /** Key of this project's set of images in `photos`. */
  gallery: string;
  link: { label: string; href: string };
};

export type Experience = {
  role: string;
  org: string;
  /** Key of this placement's photographs in `photos` and of its card background. */
  photos: string;
  place: string;
  when: string;
  points: string[];
  tags: string[];
};

export type Role = { role: string; org: string; place: string; when: string; current?: boolean };
export type SkillGroup = { category: string; skills: { title: string; items?: string[] }[] };
export type Counter = { value: number; label: string; prefix?: string };

export const person = database.person;
export const hero = database.hero;
export const about = database.about;
export const udb: Omit<typeof database.udb, 'counters'> & { counters: Counter[] } = database.udb;
export const polybuilder = database.polybuilder;
export const softwareIntro: string = database.softwareIntro;
export const software: Software[] = database.software;
export const colorimeter = database.colorimeter;
export const skills: SkillGroup[] = database.skills;
export const experience: Experience[] = database.experience;
export const leadership: Role[] = database.leadership;
export const membership = database.membership;
export const referees = database.referees;
export const quote = database.quote;
export const photos: Record<string, PhotoSet> = database.photos;
export const backgrounds: Record<string, string> = database.backgrounds;
export const sections = database.sections;
