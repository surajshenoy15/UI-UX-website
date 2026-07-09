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
    role: 'Brand Dev Lead',
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
