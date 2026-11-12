// All the words on the site live in this file.
// To change text, edit it here; the layout and animation pick it up automatically.

export const person = {
  first: 'Hirusha',
  full: 'Hirusha Walgampaya',
  initials: 'HW',
  role: 'BSc (Hons) Chemistry · Computational Chemistry & Biochemistry',
  location: 'Kandy, Sri Lanka',
  email: 'hiruwalgampaya@gmail.com',
  linkedin: 'https://www.linkedin.com/in/hirushaw',
  github: 'https://github.com/HirushaW',
  // Put a photo in /public (for example /public/portrait.jpg) and set this to
  // './portrait.jpg'. While it is empty, the hero shows a rotating dendrimer.
  portrait: '',
};

export const hero = {
  giant: ['IN', 'SILICO'],
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
    'My interests lie in biochemistry and medicinal chemistry approached through computational methods: in particular, using computer simulation to help design drug molecules and the nanoscale carriers that deliver them.',
    'That work is grounded in laboratory training across advanced organic, inorganic, analytical and physical chemistry, and in pharmaceutical industry training in Sri Lanka and China.',
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
      lines: ['BSc Honours in Chemistry', 'Chemistry GPA 3.73 / 4.00 (end of third year)'],
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
  supervisor: 'Supervisor: Dr. Udayana Ranatunga · Department of Chemistry, University of Peradeniya',
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
  notes: [
    {
      head: 'Algorithm',
      text: 'A seven-stage cone placement algorithm using simulated annealing and center-of-mass relaxation, resolving tilt accumulation, one-sided branch clumping and basis discontinuity at high generations.',
    },
    {
      head: 'Pipeline',
      text: 'A complete parameterization and simulation pipeline with AMBER, GAFF2, CGenFF, NAMD and OpenMM on Linux compute nodes, including diagnosis of atom typing, valence and charge assignment errors in generated monomers.',
    },
    {
      head: 'Release',
      text: 'Released publicly as open source, with documentation and a project website.',
    },
  ],
};

export type Project = {
  kind: string;
  title: string;
  when: string;
  text: string[];
  tags: string[];
  supervisor?: string;
  link?: { label: string; href: string };
  wide?: boolean;
  stats?: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    kind: 'Research software',
    title: 'PolyBuilder: Polymer Structure Generation Tool',
    when: '2026',
    wide: true,
    text: [
      'Extends the UDB framework to linear, branched and sheet polymer topologies at scales up to 10,000 repeat units, using rotational isomeric state weighted dihedral sampling and incremental KD-tree clash detection.',
      'Reproduced the self-avoiding walk scaling exponent (ν = 0.585) as a validation of the generated conformations.',
    ],
    tags: ['Python', 'RIS-weighted dihedral sampling', 'KD-tree clash detection'],
    supervisor: 'Supervisor: Dr. Udayana Ranatunga',
    stats: [
      { value: '10,000', label: 'repeat units per chain' },
      { value: 'ν = 0.585', label: 'self-avoiding walk exponent, reproduced' },
      { value: '3', label: 'topologies: linear, branched, sheet' },
    ],
  },
  {
    kind: 'Instrumentation',
    title: 'Low-Cost Colorimeter: Design and Experimental Testing',
    when: 'Nov 2024 – Jan 2025',
    text: [
      'Led a student team that designed and built a low-cost colorimeter on an Arduino Uno, with servo-driven wavelength selection and an LED source array covering the visible range together with UV and IR wavelengths.',
      'Validated against industrial colorimeters using calibration curves from standard solutions, with absorbance values in close agreement with the reference instruments.',
    ],
    tags: ['Arduino Uno', 'Servo control', 'LED optical source'],
    supervisor: 'Supervisor: Dr. Manjula B. Wijesinghe',
  },
  {
    kind: 'Scientific software',
    title: 'Dendrimer Characterization Tool',
    when: '2026',
    text: [
      'Standalone application computing radius of gyration, hydrodynamic radius, intrinsic viscosity, zeta potential and related structural descriptors from minimized structures, validated against published theory.',
    ],
    tags: ['Python'],
    link: { label: 'GitHub', href: 'https://github.com/HirushaW/UDB-Characterization' },
  },
  {
    kind: 'Scientific software',
    title: 'SimQ: Simulation Queue Manager',
    when: '2026',
    text: [
      'Submits, queues and tracks molecular dynamics jobs on Linux compute nodes, allowing simulations to run in sequence without manual intervention.',
    ],
    tags: ['Python', 'Linux'],
    link: { label: 'GitHub', href: 'https://github.com/HirushaW/Simulation-Queue' },
  },
  {
    kind: 'Scientific software',
    title: 'Molecular File Format Converter',
    when: '2026',
    text: [
      'Converts generated mol2 structures into other molecular file formats for use across the simulation and analysis pipeline.',
    ],
    tags: ['Python'],
    link: { label: 'GitHub', href: 'https://github.com/HirushaW/UDB-Characterization' },
  },
];

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
      'Trained in pharmaceutical production of solid and liquid dosage forms, operating manufacturing equipment and monitoring process parameters under conditions simulating industrial practice.',
      'Carried out production exercises covering small-volume injections, tablet pressing, capsule filling and aluminium-plastic packaging, and the manufacture of Vitamin B2 capsules, granules and powders.',
      'Performed quality control testing using HPLC, gas chromatography, polarimetry and osmometry, together with microbial limit testing of oral liquids and stability and solubility testing.',
      'Studied quality assurance and pharmaceutical quality systems, and examined pharmaceutical water systems and HVAC management in a production setting.',
      'Visited the Kelun Lifesciences main plant in Chengdu and a herbal pharmaceutical business, gaining exposure to Traditional Chinese Medicine production alongside modern manufacturing.',
    ],
    tags: ['Dosage form production', 'HPLC', 'GC', 'Quality systems'],
  },
  {
    role: 'Internship Trainee',
    org: 'Kelun Lifesciences (Pvt) Ltd',
    place: 'Digana, Central Province, Sri Lanka',
    when: 'Nov 2025 – Dec 2025',
    points: [
      'Trained on the manufacture of sterile injectable products across large-volume lines (saline), small-volume lines (glucose, paracetamol) and EU-standard critical injectables in ampoules and vials (adrenaline, fluphenazine).',
      'Operated and observed analytical instrumentation for quality control, including HPLC operation and method setup, TOC analysis, gas chromatography, semi-micro analytical balances, and advanced pH and conductivity meters.',
      'Performed chemical assays including sodium chloride determination by AgNO₃ titration, glucose determination by polarimetry, and paracetamol assay procedures.',
      'Carried out in-process, finished product, stability and accelerated stability testing, and studied storage conditions and shelf-life determination.',
      'Worked with the Formulation and Development team on new drug formulation to USP and BP standards, method development and validation, and master documents (SOP, MFR, BMR, BFR and validation reports).',
      'Participated in laboratory-scale development of a new drug product, including its assay and stability evaluation.',
    ],
    tags: ['Sterile injectables', 'USP / BP', 'Method validation', 'GMP documentation'],
  },
];

export const leadership = [
  {
    role: 'President',
    org: 'Ceylon University Chemical Society (CHEMSOC)',
    when: 'Feb 2026 – Present',
    current: true,
  },
  {
    role: 'Junior Treasurer',
    org: 'Ceylon University Chemical Society (CHEMSOC)',
    when: 'Apr 2025 – Feb 2026',
  },
  {
    role: 'Batch Representative',
    org: 'Ceylon University Chemical Society (CHEMSOC)',
    when: 'Mar 2024 – Mar 2025',
  },
  {
    role: 'Industrial Relations Committee',
    org: 'Science-Industry Interaction Cell (SIIC) · Industry Day 2025',
    when: 'Jun 2025 – Aug 2025',
  },
  {
    role: 'Organizing Committee',
    org: 'Science Undergraduate Research Symposium (SURS 2025)',
    when: 'Mar 2025 – Apr 2025',
  },
  {
    role: 'Steering Committee',
    org: 'Artificial Intelligence Forum for Students (AIFS)',
    when: '2025',
  },
  {
    role: 'Chairperson',
    org: 'Batch 22 Orientation Program, CHEMSOC 2024 · ten online sessions for incoming chemistry undergraduates',
    when: 'Jul 2024 – Nov 2024',
  },
  {
    role: 'Event Organizer',
    org: 'QUIMICA 2024 · Department of Chemistry',
    when: '2023 – 2024',
  },
  {
    role: 'Organizing Committee',
    org: 'Startup Day, SIRED 2023 · Society of Industrial Relations and Entrepreneurship Development',
    when: '2023',
  },
];

export const membership = {
  title: 'Student Member, American Chemical Society (ACS)',
  when: 'Apr 2025 – Present',
};

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'research', label: 'Research' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'experience', label: 'Experience' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'contact', label: 'Contact' },
];
