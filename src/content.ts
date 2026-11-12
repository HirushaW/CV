// All the words on the site live in this file.
// To change text, edit it here; the layout and animation pick it up automatically.

export const person = {
  first: 'Hirusha',
  full: 'Hirusha Walgampaya',
  initials: 'HW',
  role: 'BSc (Hons) Chemistry · Computational Chemistry & Biochemistry',
  location: 'Kandy, Central Province, Sri Lanka',
  email: 'hiruwalgampaya@gmail.com',
  linkedin: 'https://www.linkedin.com/in/hirushaw',
  github: 'https://github.com/HirushaW',
  // A cut-out photo with a transparent background, shown on the red hero panel.
  // Leave empty to show a rotating dendrimer instead.
  portrait: './portrait.webp',
};

export const hero = {
  // Shown as one word on wide screens and as two stacked lines on phones.
  giant: ['PORT', 'FOLIO'],
  kicker: 'Computational chemistry · Drug design · Nanocarriers',
  tagline:
    'I use computer simulation to help design drug molecules and the nanoscale carriers that deliver them.',
  stats: [
    { value: 9, decimals: 0, label: 'dendrimer families' },
    { value: 10000, decimals: 0, label: 'repeat units per polymer' },
    { value: 0.585, decimals: 3, prefix: 'ν = ', label: 'self-avoiding walk exponent reproduced' },
    { value: 3.73, decimals: 2, label: 'chemistry GPA / 4.00' },
  ],
  now: [
    {
      tag: 'Research',
      title: 'Universal Dendrimer Builder',
      meta: 'University of Peradeniya · Feb 2026 – Present',
    },
    {
      tag: 'Leadership',
      title: 'President, CHEMSOC',
      meta: 'Ceylon University Chemical Society · Feb 2026 – Present',
    },
    {
      tag: 'Membership',
      title: 'Student Member, ACS',
      meta: 'American Chemical Society · Apr 2025 – Present',
    },
  ],
};

export const about = {
  paragraphs: [
    'I am a Chemistry Special undergraduate at the University of Peradeniya, with a focus on computational chemistry and drug design.',
    'My interests lie in biochemistry and medicinal chemistry approached through computational methods - in particular, using computer simulation to help design drug molecules and the nanoscale carriers that deliver them, grounded in laboratory training across advanced organic, inorganic, analytical and physical chemistry.',
  ],
  quote:
    'Using computer simulation to help design drug molecules and the nanoscale carriers that deliver them.',
  focus: [
    'Computational chemistry',
    'Drug design',
    'Biochemistry & medicinal chemistry',
    'Nanoscale drug carriers',
  ],
  education: [
    {
      place: 'University of Peradeniya, Sri Lanka',
      years: '2021 – 2026',
      lines: ['BSc Honours in Chemistry', 'Chemistry GPA 3.73 / 4.00 (at the end of the third year)'],
    },
    {
      place: 'The Open University of Sri Lanka',
      years: 'Mar – Dec 2021',
      lines: ['Certificate in English Communication', 'Certificate in Information Technology'],
    },
    {
      place: 'Kingswood College, Kandy',
      years: '2007 – 2020',
      lines: ['G.C.E. Advanced Level, 2020', 'G.C.E. Ordinary Level, 2017'],
    },
  ],
};

export const udb = {
  tag: 'Undergraduate research project · Feb 2026 – Present',
  title: 'Universal Dendrimer Builder (UDB)',
  description:
    'A Python package that generates all-atom dendrimer structures across nine chemical families, built for the study of tumor-targeted drug delivery through the enhanced permeability and retention effect.',
  supervisor: 'Department of Chemistry, University of Peradeniya · Supervisor: Dr. Udayana Ranatunga',
  release: 'Version 1.0.1 · MIT License · Python desktop application · Linux',
  stack: ['Python', 'AMBER', 'GAFF2', 'CGenFF', 'NAMD', 'OpenMM'],
  links: [
    { label: 'GitHub', href: 'https://github.com/HirushaW/universal-dendrimer-builder' },
    { label: 'Project website', href: 'https://universal-dendrimer-builder-showcas.vercel.app/' },
  ],
  counters: [
    { value: 9, label: 'chemical families' },
    { value: 7, label: 'placement stages' },
    { value: 10, prefix: 'G1–G', label: 'generations' },
    { value: 5, label: 'output formats' },
  ],
  families: [
    'PAMAM',
    'PPI',
    'PLL',
    'Triazine',
    'Carbosilane',
    'Phosphorus',
    'Polyester',
    'Polyglycerol',
    'Custom',
  ],
  stages: [
    {
      name: 'Cone subdivision',
      text: 'Each branch point gets an outward-pointing cone, and the space around it is divided among its child branches, so every monomer has its own direction to grow in.',
    },
    {
      name: 'Fibonacci-sphere sampling',
      text: 'Branch directions are spread with a golden-ratio (Fibonacci) distribution, which avoids the repeating patterns that make branches line up.',
    },
    {
      name: 'Labile-H grafting',
      text: 'The labile hydrogen, or another chosen leaving atom, is removed at each attachment site and the incoming monomer is bonded on in its place.',
    },
    {
      name: 'Simulated annealing over SO(3)',
      text: 'The orientation of each placed monomer is optimised by simulated annealing over 3D rotations to find a clash-free pose, with van der Waals clash checks accelerated by a KD-tree.',
    },
    {
      name: 'Collective minimisation',
      text: 'Once a generation has been placed, the new shell is relaxed together instead of one monomer at a time.',
    },
    {
      name: 'Intergenerational minimisation',
      text: 'The structure is energy-minimised between generations, so each new generation grows from relaxed coordinates.',
    },
    {
      name: 'Fragment-level AM1-BCC charges',
      text: 'Partial charges are computed per fragment with AM1-BCC and transferred to the full dendrimer, which avoids whole-molecule size limits.',
    },
  ],
  // The four bullet points from the CV, word for word.
  highlights: [
    'Designed and built a Python package generating all-atom dendrimer structures across nine chemical families, including PAMAM, PPI, PLL, triazine, carbosilane, phosphorus, polyester and polyglycerol, for the study of tumor-targeted drug delivery through the enhanced permeability and retention effect.',
    'Developed a seven-stage cone placement algorithm using simulated annealing and center-of-mass relaxation, resolving tilt accumulation, one-sided branch clumping and basis discontinuity at high generations.',
    'Established a complete parameterization and simulation pipeline with AMBER, GAFF2, CGenFF, NAMD and OpenMM on Linux compute nodes, and diagnosed atom typing, valence and charge assignment errors in generated monomers.',
    'Released the package publicly with documentation and a project website.',
  ],
  // From the UDB README.
  capabilities: [
    {
      head: 'Force fields',
      text: 'GAFF2 by default (antechamber → parmchk2 → tleap), CGenFF routing for heteroatom-rich fragments, and Gasteiger charges as a fallback.',
    },
    {
      head: 'Simulation setup',
      text: 'AMBER .prmtop/.inpcrd, CHARMM/PSF export and complete NAMD 3.x pipelines: solvation, ions, minimisation, heating, equilibration and production.',
    },
    {
      head: 'Structural characterisation',
      text: 'Radius of gyration, Rg tensor and shape descriptors, SASA, van der Waals volume, hydrodynamic radius and density.',
    },
    {
      head: 'Output formats',
      text: 'MOL2, PDB, XYZ, GRO and PSF.',
    },
  ],
  // Real, energy-minimised structures built with UDB, converted from the example
  // set in the UDB repository (examples/Structures.tar.gz) with scripts/mol2json.py.
  viewer: {
    families: [
      { key: 'pamam', label: 'PAMAM' },
      { key: 'ppi', label: 'PPI' },
      { key: 'pll', label: 'PLL' },
      { key: 'triazine', label: 'Triazine' },
      { key: 'carbosilane', label: 'Carbosilane' },
      { key: 'phosphorus', label: 'Phosphorus' },
      { key: 'polyester', label: 'Polyester' },
      { key: 'polyglycerol', label: 'Polyglycerol' },
    ],
    generations: [1, 2, 3, 4],
    caption:
      'Energy-minimised structures built with UDB, from the example set in the UDB repository. Heavy atoms are shown; Rg is the radius of gyration of the heavy atoms. Drag to rotate.',
  },
};

export const polybuilder = {
  kind: 'Research software',
  title: 'PolyBuilder: Polymer Structure Generation Tool',
  when: '2026',
  supervisor: 'Department of Chemistry, University of Peradeniya · Supervisor: Dr. Udayana Ranatunga',
  tags: ['Python', 'RIS-Weighted Dihedral Sampling', 'KD-Tree Clash Detection'],
  points: [
    'Extended the UDB framework to linear, branched and sheet polymer topologies at scales up to 10,000 repeat units, using rotational isomeric state weighted dihedral sampling and incremental KD-tree clash detection.',
    'Reproduced the self-avoiding walk scaling exponent (ν = 0.585) as a validation of the generated conformations.',
  ],
  stats: [
    { value: '10,000', label: 'repeat units per chain' },
    { value: 'ν = 0.585', label: 'self-avoiding walk exponent, reproduced' },
    { value: '3', label: 'topologies: linear, branched, sheet' },
  ],
};

export const softwareIntro =
  'Developed within the Universal Dendrimer Builder framework, University of Peradeniya · Supervisor: Dr. Udayana Ranatunga';

export type Software = {
  title: string;
  when: string;
  tags: string[];
  summary: string;
  details: string[];
  meta: string;
  image: { src: string; alt: string; caption: string };
  link: { label: string; href: string };
};

// `summary` follows the CV; `details` come from each project's GitHub README.
export const software: Software[] = [
  {
    title: 'Dendrimer Characterization Tool',
    when: '2026',
    tags: ['Python'],
    summary:
      'Standalone application computing radius of gyration, hydrodynamic radius, intrinsic viscosity, charge descriptors and related structural descriptors from minimized structures, validated against published theory.',
    details: [
      'Reports 117 structural and physicochemical properties, with quality control and a plain-language interpretation of the results.',
      'Size and shape: radius of gyration, asphericity, acylindricity, inertia tensor and principal axes.',
      'Surface and volume: Shrake–Rupley SASA, van der Waals volume, void fraction and density.',
      'Hydrodynamics: Kirkwood–Riseman hydrodynamic radius, diffusion coefficient, sedimentation and intrinsic viscosity.',
      'Also covers back-folding of terminal groups, net charge, dipole moment, surface charge density, topology and bond and clash audits.',
      'Runs as a GUI or from the command line, on one structure or a whole folder, reading MOL2, AMBER and PDB files.',
    ],
    meta: 'UDB Characteriser · Version 1.0.0 · MIT License · Python 3.10+ · Linux',
    image: {
      src: './projects/udb-characteriser.png',
      alt: 'Screenshot of the UDB Characteriser showing a 3D view and summary values for a PAMAM G2 dendrimer',
      caption: 'UDB Characteriser with results for a PAMAM G2 dendrimer.',
    },
    link: { label: 'GitHub', href: 'https://github.com/HirushaW/UDB-Characterization' },
  },
  {
    title: 'SimQ: Simulation Queue Manager',
    when: '2026',
    tags: ['Python', 'Linux'],
    summary:
      'Submits, queues and tracks molecular dynamics jobs on Linux compute nodes, allowing simulations to run in sequence without manual intervention.',
    details: [
      'A desktop app with five pages: Queue, Dashboard, Software, History and Settings.',
      'Checks each job before it starts, then runs jobs one after another, or several at once when CPUs are free, using CPU- and GPU-aware scheduling with EASY backfilling.',
      'Shows progress and a predicted finish time for every job and for the whole queue.',
      'Restarts crashed jobs from their last restart files and sends desktop or email notifications.',
      'Works with any program started from a terminal, and knows NAMD, AMBER and UDB packages in detail.',
      'Can also be driven from the command line.',
    ],
    meta: 'Version 0.1.0 · MIT License · Python 3.10+ · Linux',
    image: {
      src: './projects/simq-queue.png',
      alt: 'Screenshot of the SimQ queue page listing six jobs with their status, progress and expected finish times',
      caption: 'The SimQ queue page, captured in demo mode.',
    },
    link: { label: 'GitHub', href: 'https://github.com/HirushaW/Simulation-Queue' },
  },
  {
    title: 'Molecular File Format Converter',
    when: '2026',
    tags: ['Python'],
    summary:
      'Converts generated mol2 structures into other molecular file formats for use across the simulation and analysis pipeline.',
    details: [
      'Part of the Universal Dendrimer Parameterization GUI in the UDB Characterization Tools repository.',
      'Sybyl to GAFF2: types cores and monomers (including Si, P and S), runs parmchk2 and tleap, and writes AMBER .prmtop/.inpcrd, NAMD/CHARMM .psf/.pdb and GROMACS .top/.gro files.',
      'Validation: atom and bond counts, unassigned types, charge sum, bond lengths and frcmod penalty scores.',
      'GAFF2 to Sybyl: converts a finished UDB dendrimer back to a Sybyl MOL2 (and PDB) for Avogadro, PyMOL, VMD or CGenFF.',
    ],
    meta: 'Universal Dendrimer Parameterization · Version 2.0 · MIT License · Linux',
    image: {
      src: './projects/mol2-converter.png',
      alt: 'Screenshot of the Extract mol2 tab converting a PAMAM G2 dendrimer from GAFF2 to Sybyl atom types',
      caption: 'Extract mol2 tab converting a PAMAM G2 dendrimer (516 atoms) from GAFF2 to Sybyl types.',
    },
    link: { label: 'GitHub', href: 'https://github.com/HirushaW/UDB-Characterization' },
  },
];

export const colorimeter = {
  kind: 'Instrumentation',
  title: 'Structure Development and Experimental Testing of a Colorimeter',
  when: 'Nov 2024 – Jan 2025',
  supervisor: 'Department of Chemistry, University of Peradeniya · Supervisor: Dr. Manjula B. Wijesinghe',
  tags: ['Arduino Uno', 'Servo Control', 'LED Optical Source'],
  points: [
    'Led a student team in designing and building a low-cost colorimeter as an alternative to commercial instruments, developing the light source, monochromator and sample holder.',
    'Built the instrument on an Arduino Uno with servo-driven wavelength selection and an LED source array covering the visible range together with UV and IR wavelengths.',
    'Validated the device against industrial colorimeters, constructing calibration curves from standard solutions and obtaining absorbance values in close agreement with the reference instruments at low error.',
  ],
};

export const skillGroups = [
  'Simulation & Modelling',
  'Programming',
  'Analysis & Visualization',
  'Laboratory',
  'Instrumentation',
  'Pharmaceutical Practice',
] as const;

export type SkillGroup = (typeof skillGroups)[number];

export const skills: { group: SkillGroup; title: string; items?: string[] }[] = [
  { group: 'Simulation & Modelling', title: 'Molecular dynamics', items: ['AMBER', 'NAMD', 'OpenMM'] },
  {
    group: 'Simulation & Modelling',
    title: 'Force field parameterization',
    items: ['GAFF2', 'CGenFF', 'antechamber', 'sqm'],
  },
  { group: 'Simulation & Modelling', title: 'Energy minimization' },
  {
    group: 'Simulation & Modelling',
    title: 'Macromolecule characterization',
    items: ['Structural', 'Hydrodynamic'],
  },
  {
    group: 'Programming',
    title: 'Python',
    items: ['NumPy', 'SciPy', 'PyQt5', 'KD-tree spatial methods'],
  },
  { group: 'Programming', title: 'Object-oriented design' },
  { group: 'Programming', title: 'R and RStudio' },
  { group: 'Programming', title: 'Arduino' },
  {
    group: 'Programming',
    title: 'Linux and shell',
    items: ['Remote work on multi-core compute nodes'],
  },
  {
    group: 'Analysis & Visualization',
    title: 'Data analysis',
    items: ['Origin Pro', 'R', 'RStudio', 'Python'],
  },
  {
    group: 'Analysis & Visualization',
    title: 'Molecular visualization',
    items: ['VMD', 'NAMD', 'Materials Studio', 'Chimera'],
  },
  { group: 'Laboratory', title: 'Advanced organic synthesis' },
  { group: 'Laboratory', title: 'Inorganic synthesis' },
  { group: 'Laboratory', title: 'Analytical chemistry' },
  { group: 'Laboratory', title: 'Physical chemistry' },
  { group: 'Instrumentation', title: 'Chromatography', items: ['HPLC', 'Gas chromatography'] },
  { group: 'Instrumentation', title: 'TOC analyzer' },
  { group: 'Instrumentation', title: 'Optical instruments', items: ['Polarimeter', 'Colorimeter'] },
  {
    group: 'Instrumentation',
    title: 'Bench instruments',
    items: ['Semi-micro analytical balance', 'pH meter', 'Conductivity meter'],
  },
  { group: 'Pharmaceutical Practice', title: 'Pharmacopoeial methods', items: ['USP', 'BP'] },
  { group: 'Pharmaceutical Practice', title: 'Analytical method validation' },
  {
    group: 'Pharmaceutical Practice',
    title: 'Stability testing',
    items: ['Stability', 'Accelerated stability'],
  },
  {
    group: 'Pharmaceutical Practice',
    title: 'GMP documentation',
    items: ['SOP', 'MFR', 'BMR', 'BFR'],
  },
  { group: 'Pharmaceutical Practice', title: 'Cleanroom classification' },
];

export const experience = [
  {
    role: 'Winter Intern',
    org: 'Shandong Drug and Food Vocational College',
    place: 'Weihai, Shandong Province, China',
    when: 'Dec 2025 – Jan 2026',
    points: [
      'Trained in pharmaceutical production of both solid and liquid dosage forms, operating manufacturing equipment and monitoring process parameters under conditions simulating industrial practice.',
      'Carried out production exercises covering small-volume injections, tablet pressing, capsule filling and aluminium-plastic packaging, solid preparations, and the manufacture of Vitamin B2 capsules, granules and powders.',
      'Performed quality control testing using HPLC, gas chromatography, polarimetry and osmometry, together with microbial limit testing of oral liquids, tablet stability and solubility testing, and stability evaluation of liquid formulations.',
      'Studied quality assurance and pharmaceutical quality systems through structured lectures, and examined pharmaceutical water systems and HVAC management in a production setting.',
      'Visited the Pharmaceutical Engineering Department, the Kelun Lifesciences main plant in Chengdu, and a herbal pharmaceutical business, gaining exposure to Traditional Chinese Medicine production alongside modern manufacturing.',
    ],
    tags: ['Dosage form production', 'HPLC', 'Gas chromatography', 'Quality systems'],
  },
  {
    role: 'Internship Trainee',
    org: 'Kelun Lifesciences (Pvt) Ltd',
    place: 'Digana, Central Province, Sri Lanka',
    when: 'Nov 2025 – Dec 2025',
    points: [
      'Trained on the manufacture of sterile injectable products across large-volume lines (saline), small-volume lines (glucose, paracetamol) and EU-standard critical injectables in ampoules and vials (adrenaline, fluphenazine).',
      'Operated and observed analytical instrumentation for quality control, including HPLC operation and method setup, TOC analysis, gas chromatography, semi-micro analytical balances, and advanced pH and conductivity meters.',
      'Performed chemical assays including sodium chloride determination by AgNO₃ titration with potassium dichromate indicator, glucose determination by polarimetry, and paracetamol assay procedures.',
      'Carried out in-process, finished product, stability and accelerated stability testing, and studied storage conditions and shelf-life determination.',
      'Worked with the Formulation and Development team on new drug formulation to USP and BP standards, analytical and formulation method development and validation, and preparation of master documents (SOP, MFR, BMR, BFR and validation reports).',
      'Participated in laboratory-scale development of a new drug product, including its assay and stability evaluation.',
    ],
    tags: ['Sterile injectables', 'USP / BP', 'Method validation', 'GMP documentation'],
  },
];

export const leadership = [
  {
    role: 'President',
    org: 'Ceylon University Chemical Society (CHEMSOC)',
    place: 'Faculty of Science, University of Peradeniya',
    when: 'Feb 2026 – Present',
    current: true,
  },
  {
    role: 'Junior Treasurer',
    org: 'Ceylon University Chemical Society (CHEMSOC)',
    place: 'Faculty of Science, University of Peradeniya',
    when: 'Apr 2025 – Feb 2026',
  },
  {
    role: 'Batch Representative',
    org: 'Ceylon University Chemical Society (CHEMSOC)',
    place: 'Faculty of Science, University of Peradeniya',
    when: 'Mar 2024 – Mar 2025',
  },
  {
    role: 'Industrial Relations Committee',
    org: 'Science-Industry Interaction Cell (SIIC)',
    place: 'Industry Day 2025, Faculty of Science, University of Peradeniya',
    when: 'Jun 2025 – Aug 2025',
  },
  {
    role: 'Organizing Committee',
    org: 'Science Undergraduate Research Symposium (SURS 2025)',
    place: 'Faculty of Science, University of Peradeniya',
    when: 'Mar 2025 – Apr 2025',
  },
  {
    role: 'Steering Committee',
    org: 'Artificial Intelligence Forum for Students (AIFS)',
    place: 'Faculty of Science, University of Peradeniya',
    when: '2025',
  },
  {
    role: 'Chairperson',
    org: 'Batch 22 Orientation Program, CHEMSOC 2024',
    place:
      'Organized and led ten online sessions for incoming chemistry undergraduates · Faculty of Science, University of Peradeniya',
    when: 'Jul 2024 – Nov 2024',
  },
  {
    role: 'Event Organizer',
    org: 'QUIMICA 2024',
    place: 'Department of Chemistry, Faculty of Science, University of Peradeniya',
    when: '2023 – 2024',
  },
  {
    role: 'Organizing Committee',
    org: 'Startup Day, SIRED 2023',
    place:
      'Society of Industrial Relations and Entrepreneurship Development, Faculty of Science, University of Peradeniya',
    when: '2023',
  },
];

export const membership = {
  title: 'Student Member, American Chemical Society (ACS)',
  when: 'Apr 2025 – Present',
};

// Names and positions only; contact details are given on request.
export const referees = [
  {
    name: 'Dr. Udayana Ranatunga',
    title: 'Senior Lecturer',
    place: 'Department of Chemistry, University of Peradeniya, Sri Lanka',
  },
  {
    name: 'Dr. Sampath B. Alahakoon',
    title: 'Senior Lecturer',
    place: 'Department of Chemistry, University of Peradeniya, Sri Lanka',
  },
];

// `symbol` is the two-letter label on each section's periodic-table style tile.
export const sections = [
  { id: 'about', label: 'About', symbol: 'Ab' },
  { id: 'research', label: 'Research', symbol: 'Re' },
  { id: 'skills', label: 'Skills', symbol: 'Sk' },
  { id: 'experience', label: 'Experience', symbol: 'Ex' },
  { id: 'leadership', label: 'Leadership', symbol: 'Le' },
  { id: 'contact', label: 'Contact', symbol: 'Co' },
];
