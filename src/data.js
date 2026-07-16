export const profile = {
  name: 'P Suraj Shenoy',
  title: 'UI/UX Designer',
  subtitle: 'Product · Dashboards · Mobile',
  email: 'surajshenoyp@gmail.com',
  phone: '+91 6363783965',
  linkedin: 'https://www.linkedin.com/in/p-suraj-shenoy/',
  github: 'https://github.com/surajshenoy15',
  summary:
    'AI & ML undergraduate with hands-on experience in UI/UX design, product design, frontend development, and dashboard-based web and mobile applications. I design user flows, responsive interfaces, admin dashboards, mobile screens, wireframes, and prototypes — then take them through to production with React, React Native, and Tailwind.',
  statement:
    'Across every role I have worked on more than the code: usability, layout structure, accessibility, visual consistency, and the experience people actually have on the screen.',
  stats: [
    { value: '5', label: 'Design + dev internships' },
    { value: '4', label: 'Shipped products' },
    { value: '9.22', label: 'CGPA' },
    { value: '250+', label: 'Community members led' },
  ],
}

export const experience = [
  {
    id: 'loraa',
    role: 'Software Development Engineer Intern',
    company: 'LoRaa Ventures',
    period: 'Jul 2026 — Present',
    start: 'Jul 2026',
    tag: 'Paid',
    accent: 'azure',
    product: 'LoRaa Connect',
    points: [
      'Designed and developed LoRaa Connect, a role-based mobile and web platform with a student app, admin dashboard, and faculty workflows.',
      'Created UI flows for event registration, activity submission, certificate access, admin approvals, student management, and real-time monitoring.',
      'Improved dashboard usability through clean layouts, clear status indicators, responsive screens, and structured information hierarchy.',
      'Built and integrated FastAPI endpoints with the React Native app and the admin and faculty dashboards.',
    ],
    stack: ['React Native', 'React', 'FastAPI', 'Figma'],
  },
  {
    id: 'salesforce',
    role: 'Project Trainee',
    company: 'Salesforce India Pvt Ltd',
    period: 'May 2026 — Present',
    start: 'May 2026',
    tag: 'Trainee',
    accent: 'sky',
    product: 'PricePilot AI',
    points: [
      'Developed PricePilot AI, a pricing and analytics platform, with focus on dashboard UX, data visualization, and business-friendly interface design.',
      'Designed responsive screens for sales metrics, price snapshots, product performance, competitor comparison, and pricing recommendations.',
      'Organized complex pricing data into readable dashboard sections and actionable insights.',
      'Integrated backend APIs with the frontend to support real-time metrics and AI-assisted recommendations.',
    ],
    stack: ['Dashboard UX', 'Data Viz', 'React', 'REST APIs'],
  },
  {
    id: 'bmc',
    role: 'Mobile App Developer Intern',
    company: 'The Bengaluru Marketing Company',
    period: 'Feb 2026 — May 2026',
    start: 'Feb 2026',
    tag: 'Paid',
    accent: 'white',
    product: 'Field Ops App',
    points: [
      'Designed and developed mobile screens in React Native with focus on clean UI, smooth navigation, and a comfortable mobile experience.',
      'Worked on UX for onboarding, verification flows, geofencing-based activity tracking, and image submission screens.',
      'Gained hands-on experience in mobile usability, responsive layouts, app flow structuring, and frontend performance.',
      'Contributed to both interface design and functional development following industry practices.',
    ],
    stack: ['React Native', 'Geofencing', 'Mobile UI'],
  },
  {
    id: 'savvywise',
    role: 'UI/UX Designer Intern',
    company: 'SavvyWise, Australia',
    period: 'Sep 2025 — Nov 2025',
    start: 'Sep 2025',
    tag: 'Paid',
    accent: 'azure',
    product: 'Tax Audit Platform',
    points: [
      'Designed user-centric UI/UX for an Australian tax audit and compliance platform using Figma, wireframes, prototypes, and responsive layouts.',
      'Created high-fidelity screens, dashboard layouts, and interaction flows focused on clarity, accessibility, and professional usability.',
      'Improved visual consistency through typography, spacing, color systems, and reusable components.',
      'Worked with developers and stakeholders to turn business requirements into practical design solutions through feedback-based iteration.',
    ],
    stack: ['Figma', 'Design System', 'Prototyping'],
  },
  {
    id: 'asha',
    role: 'Software Development Engineer Intern',
    company: 'Asha Infracore, Bangalore',
    period: 'Jun 2025 — Aug 2025',
    start: 'Jun 2025',
    tag: 'Paid',
    accent: 'sky',
    product: 'Corporate Website',
    points: [
      'Designed and built the Asha Infracore website with a modern, responsive, professional interface using React and Vite.',
      'Created layouts, product and service sections, image upload flows, category-based rendering, and a quotation request experience.',
      'Improved the experience through visual hierarchy, mobile responsiveness, intuitive navigation, and SEO-friendly structure.',
      'Built the Node.js and Supabase backend while contributing to frontend and interface decisions.',
    ],
    stack: ['React', 'Vite', 'Supabase', 'Node.js'],
  },
]

export const projects = [
  {
    id: 'tracenet',
    figma: 'https://www.figma.com/proto/zR3yKVhLMcyjPHofiw9drR/Asha-Infracore?node-id=1465-4667&viewport=-1880%2C-155%2C0.15&t=VlSKV34ArI72jOVD-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1519%3A4342&page-id=',
    name: 'TraceNet AI',
    kind: 'Cyber Investigation Dashboard',
    period: 'May 2026 — Present',
    accent: '#4D8DFF',
    blurb:
      'A UX prototype for an OSINT investigation platform that makes dense digital-footprint data readable for investigators.',
    points: [
      'User flows for case creation, evidence review, confidence scoring, relationship graph analysis, and report generation.',
      'Dashboard screens with clear hierarchy, status indicators, confidence cards, and graph-based relationships.',
      'Complex investigative workflows simplified through clean layouts and readable data sections.',
    ],
    tags: ['Dashboard UX', 'Data Viz', 'Prototype'],
  },
  {
    id: 'chatbot',
    figma: 'https://www.figma.com/proto/9G6scHSKaatxDiXBcjtACs/AI-Bot?node-id=4-2&viewport=637%2C299%2C0.21&t=KLViqyfpesuRUgXM-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=4%3A2&page-id=0%3A1',
    name: 'Conversational AI',
    kind: 'Chatbot Interface Prototype',
    period: 'May 2026 — Jul 2026',
    accent: '#8FB8FF',
    blurb:
      'A chatbot interface designed around chat flow, input experience, response readability, and calm interaction patterns.',
    points: [
      'Screens for onboarding, conversation, prompt suggestions, loading states, empty states, and error handling.',
      'Clear message hierarchy, quick actions, minimal clutter, and accessible spacing.',
      'A conversational experience that feels simple, fast, and easy to use.',
    ],
    tags: ['Conversational UI', 'States', 'Accessibility'],
  },
  {
    id: 'sih',
    figma: 'https://www.figma.com/proto/bu3FNJ2eFXo4hJ9CAvJkuU/SIH-25?node-id=1-8&page-id=0%3A1&starting-point-node-id=1%3A8&t=YESOWwHicgWm3j91-1',
    name: 'Smart India Hackathon',
    kind: 'Product UX Prototype',
    period: 'Aug 2025 — Oct 2025',
    accent: '#FFFFFF',
    blurb:
      'A high-fidelity prototype that turned a national hackathon problem statement into practical user flows and screens.',
    points: [
      'Wireframes, user journeys, dashboard screens, and responsive layouts grounded in real use cases.',
      'Focused on usability, clarity, accessibility, and simplified task completion.',
      'Converted the prototype into a presentable solution for evaluation and demo.',
    ],
    tags: ['Wireframes', 'User Journeys', 'Hi-Fi'],
  },
  {
    id: 'asha-case',
    figma: 'https://www.figma.com/proto/zR3yKVhLMcyjPHofiw9drR/Asha-Infracore?node-id=16-220&viewport=-4987%2C3865%2C0.19&t=r9Errfdb31PiaeMl-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=47%3A73&page-id=0%3A1',
    name: 'Asha Infracore',
    kind: 'Corporate Website Case Study',
    period: 'Jun 2025 — Aug 2025',
    accent: '#6FA0FF',
    blurb:
      'End-to-end design and build of a corporate site for service discovery, product browsing, and quotation requests.',
    points: [
      'Responsive layouts, content sections, navigation flow, product cards, and quote request screens.',
      'Clean spacing, deliberate CTA placement, visual hierarchy, and a mobile-friendly grid.',
      'Implemented in React and Vite, closing the gap between design and development.',
    ],
    tags: ['Web UX', 'Design to Code', 'Responsive'],
  },
]

export const skills = [
  {
    group: 'UI/UX & Product Design',
    icon: 'PenTool',
    items: ['Figma', 'Wireframing', 'Prototyping', 'User Flows', 'Dashboard UX', 'Mobile App UI', 'Design Systems', 'Responsive Design', 'Visual Hierarchy', 'Typography', 'Accessibility Basics'],
  },
  {
    group: 'Web, App & Frontend',
    icon: 'Code2',
    items: ['ReactJS', 'React Native', 'Vite', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'HTML', 'CSS', 'JavaScript', 'MERN Stack', 'Django', 'FastAPI', 'Admin Dashboards', 'Geofencing', 'Face Recognition'],
  },
  {
    group: 'Data & APIs',
    icon: 'Database',
    items: ['MySQL', 'Supabase', 'PostgreSQL', 'REST APIs', 'Google Maps API'],
  },
  {
    group: 'Creative Tools',
    icon: 'Clapperboard',
    items: ['Figma', 'Adobe XD', 'Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Photoshop', 'Lightroom'],
  },
  {
    group: 'Branding & Creative',
    icon: 'Sparkles',
    items: ['Brand Identity', 'Social Media Creatives', 'Poster Design', 'Campaign Design', 'Content Planning'],
  },
]

export const education = [
  { school: 'BNM Institute of Technology', detail: 'Bachelor of Engineering — CGPA 9.22', period: '2023 — Present', place: 'Bangalore, India' },
  { school: 'RNS Composite PU College', detail: 'PCMC — 94%', period: '2021 — 2023', place: 'Bangalore, India' },
  { school: 'Cordial High School', detail: 'State Board — 96%', period: '2021', place: 'Bangalore, India' },
]

export const leadership = [
  {
    role: 'Social Media Lead',
    org: 'SIGGRAPH BNMIT — Computer Graphics Club',
    points: [
      'Led brand development and digital presence for a 250+ member computer graphics community.',
      'Designed posters, reels, and event creatives with focus on branding, typography, layout, and visual hierarchy.',
      'Improved engagement through content planning and a consistent visual identity.',
      'Coordinated with design, technical, and event teams to produce branded assets for workshops.',
    ],
  },
  {
    role: 'Volunteer',
    org: 'Green Circuit 2026',
    points: [
      'Assisted in organizing and managing event operations.',
      'Supported technical and promotional activities.',
      'Kept coordination smooth between participants and organizers.',
    ],
  },
]

export const languages = [
  { name: 'English', level: 'Fluent', pct: 100 },
  { name: 'Kannada', level: 'Fluent', pct: 100 },
  { name: 'Konkani', level: 'Fluent', pct: 100 },
  { name: 'Tulu', level: 'Intermediate', pct: 65 },
  { name: 'Hindi', level: 'Intermediate', pct: 65 },
]

export const interests = [
  { label: 'Badminton and fitness', icon: 'Activity' },
  { label: 'UI/UX and digital content', icon: 'Layers' },
  { label: 'Video editing and cinematic storytelling', icon: 'Film' },
  { label: 'AI-driven applications', icon: 'Cpu' },
]

/* ================= SDE MODE ================= */
export const sde = {
  summary:
    'AI & ML undergraduate skilled in full-stack development, mobile app development, AWS deployment, cloud solutions, and UI/UX design. I build scalable web apps, AI-driven platforms, admin dashboards, and cross-platform mobile applications — and deploy them.',
  stack: ['MERN', 'React + Vite', 'Node.js', 'Django', 'FastAPI', 'Spring Boot', 'Supabase', 'Firebase', 'SQL', 'AWS'],
  stats: [
    { value: '5', label: 'Internships' },
    { value: '2', label: 'Apps on stores' },
    { value: '6+', label: 'Deployed products' },
    { value: '9.22', label: 'CGPA' },
  ],
  experience: [
    {
      id: 'loraa',
      role: 'SDE Intern',
      company: 'LoRaa Ventures',
      period: 'Jul 2026 — Present',
      hash: 'a3f9c2e',
      points: [
        'Developed LoRaa Connect, a role-based mobile and web platform for tracking student participation, AICTE activity points, and certificate generation.',
        'Built and integrated FastAPI backend APIs with a React Native mobile app and admin/faculty dashboards for event registration, activity submissions, approvals, and real-time monitoring.',
        'Implemented geofencing, face verification, QR-based certificates, secure photo submissions, and fraud-prevention checks for authentic activity tracking.',
        'Deployed the mobile application on both the Google Play Store and Apple App Store.',
      ],
      stack: ['React Native', 'FastAPI', 'PostgreSQL', 'Play Store', 'App Store'],
    },
    {
      id: 'salesforce',
      role: 'Project Trainee',
      company: 'Salesforce India Pvt Ltd',
      period: 'May 2026 — Present',
      hash: 'b71d04f',
      points: [
        'Developed PricePilot AI, a Spring Boot-based smart pricing platform for sales analytics, discount management, and AI-assisted price recommendations.',
        'Built REST APIs using Java, Spring Boot, JPA/Hibernate, and PostgreSQL for recommendation, pricing, analytics, discount, and competitor price modules.',
        'Integrated a React frontend with backend APIs to display real-time sales metrics, price snapshots, and product performance insights.',
        'Implemented a competitor price scraping MVP and pricing recommendation logic to support data-driven business decisions.',
      ],
      stack: ['Java', 'Spring Boot', 'JPA/Hibernate', 'PostgreSQL', 'React'],
    },
    {
      id: 'bmc',
      role: 'Mobile App Developer Intern',
      company: 'The Bengaluru Marketing Company',
      period: 'Feb 2026 — May 2026',
      hash: 'c9e2a18',
      points: [
        'Built cross-platform mobile application features for Android and iOS using React Native.',
        'Integrated FastAPI backends and consumed REST APIs.',
        'Worked with geofencing, face recognition, and image processing techniques for activity verification.',
        'Followed industry-standard development practices for scalable mobile features.',
      ],
      stack: ['React Native', 'FastAPI', 'REST', 'Geofencing'],
    },
    {
      id: 'savvywise',
      role: 'UI/UX Designer Intern',
      company: 'SavvyWise, Australia',
      period: 'Sep 2025 — Nov 2025',
      hash: 'd45b7c3',
      points: [
        'Designed user-centric UI/UX for an Australian tax audit and compliance platform, creating high-fidelity wireframes and interactive prototypes in Figma.',
        'Enhanced dashboard usability, accessibility, and responsiveness by applying modern UI standards, typography, and color systems.',
        'Collaborated with developers and stakeholders to translate business requirements into effective design solutions.',
      ],
      stack: ['Figma', 'Prototyping', 'Design Systems'],
    },
    {
      id: 'asha',
      role: 'SDE Intern',
      company: 'Asha Infracore, Bangalore',
      period: 'Jun 2025 — Aug 2025',
      hash: 'e88f210',
      points: [
        'Developed and deployed the Asha Infracore company website using React + Vite with a responsive, modern UI/UX.',
        'Built a Node.js + Supabase backend with product management features — CRUD, image uploads, category-based rendering — and secure admin access.',
        'Implemented a quotation request system and deployed with Google Search Console integration for visibility and SEO.',
      ],
      stack: ['React + Vite', 'Node.js', 'Supabase', 'SEO'],
    },
  ],
  projects: [
    {
      id: 'tracenet',
      name: 'TraceNet AI',
      kind: 'OSINT Digital Footprint Intelligence',
      period: 'May 2026 — Present',
      lang: 'Python',
      live: 'REPLACE_ME_HOSTED_LINK',
      points: [
        'OSINT-based web platform for analyzing public digital footprints using usernames, emails, phone numbers, profile URLs, images, and chat text.',
        'Modules for entity extraction, fuzzy matching, image similarity, writing-style analysis, and relationship graph generation for suspect profiling.',
        'AI-assisted report generation with confidence scoring and citation-backed insights — lawful public-data analysis with investigator-friendly dashboards.',
      ],
      stack: ['Python', 'AI/ML', 'Graph Analysis', 'React'],
    },
    {
      id: 'pricepilot',
      name: 'PricePilot AI',
      kind: 'Dynamic Pricing & Competitor Intelligence',
      period: 'May 2026 — Jul 2026',
      lang: 'Java',
      live: 'REPLACE_ME_HOSTED_LINK',
      points: [
        'AI-powered web platform for dynamic pricing, sales analytics, and competitor price intelligence for retail businesses.',
        'Modules for product management, price recommendations, sales performance tracking, discount strategy, analytics dashboards, and competitor comparison.',
        'Backend-driven recommendation logic with clean React dashboards — real-time insights and business-friendly decision support.',
      ],
      stack: ['Spring Boot', 'PostgreSQL', 'React', 'REST'],
    },
    {
      id: 'loraa-connect',
      name: 'LoRaa Connect',
      kind: 'Student Activity Platform — Android & iOS',
      period: 'Jul 2026 — Present',
      lang: 'TypeScript',
      live: 'REPLACE_ME_PLAY_STORE_LINK',
      points: [
        'Role-based mobile and web platform for student participation, AICTE activity points, and certificate generation.',
        'Geofencing, face verification, QR certificates, and fraud-prevention checks.',
        'Shipped to both the Google Play Store and the Apple App Store.',
      ],
      stack: ['React Native', 'FastAPI', 'Deployed'],
    },
    {
      id: 'vn-music',
      name: 'VN Music Academy',
      kind: 'Academy Management Platform',
      period: 'Aug 2025 — Oct 2025',
      lang: 'JavaScript',
      live: 'REPLACE_ME_HOSTED_LINK',
      points: [
        'Management platform built with React + Vite and Node.js + Supabase, designed in Figma.',
        'Secure payment gateway integration; admin panel with student attendance, course tracking, and event management.',
        'Live on Vercel (frontend) and Render (backend), indexed via Google Search Console for SEO.',
      ],
      stack: ['React + Vite', 'Node.js', 'Supabase', 'Vercel'],
    },
    {
      id: 'asha-site',
      name: 'Asha Infracore',
      kind: 'Corporate Website + Admin',
      period: 'Jun 2025 — Aug 2025',
      lang: 'JavaScript',
      live: 'REPLACE_ME_HOSTED_LINK',
      points: [
        'Company website with responsive modern UI/UX, deployed with SEO via Google Search Console.',
        'Node.js + Supabase backend: CRUD, image uploads, category-based rendering, secure admin access.',
        'Quotation request system for lead capture.',
      ],
      stack: ['React + Vite', 'Node.js', 'Supabase', 'Deployed'],
    },
  ],
  skills: [
    { group: 'Programming', items: ['Python', 'Java', 'C++', 'JavaScript', 'HTML/CSS'] },
    { group: 'Web & App', items: ['MERN Stack', 'React + Vite', 'React Native', 'Django', 'FastAPI', 'Spring Boot', 'Geofencing', 'Face Recognition', 'Attendance Systems'] },
    { group: 'Data & Infra', items: ['MySQL', 'Supabase', 'Firebase', 'SQL', 'REST APIs', 'Google Maps API', 'AWS', 'Vercel', 'Render'] },
    { group: 'AI & ML', items: ['Scikit-Learn', 'TensorFlow', 'Keras', 'Hugging Face'] },
    { group: 'UI/UX & Frontend', items: ['Figma', 'ReactJS', 'Tailwind CSS', 'Bootstrap', 'Material UI'] },
  ],
}
