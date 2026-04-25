import type { Service, Stat, ProcessStep, WorkItem, Testimonial, NavLink } from './types'

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const SERVICES: Service[] = [
  { id: 1, title: 'Performance Marketing', description: 'Meta, Google, and beyond. We build campaigns that don\'t burn budget — they compound it. Average 30% CPL reduction in 60 days.', icon: 'trending-up', size: 'large' },
  { id: 2, title: 'Personal Branding', description: 'Your face is your brand. We make sure the internet knows exactly who you are and why you matter. Clients see 400% follower growth in 6 months.', icon: 'user', size: 'tall' },
  { id: 3, title: 'Funnel Marketing & Automation', description: 'Every touchpoint engineered. From cold stranger to loyal buyer, fully automated. Clients see 3.2x lead-to-sale conversion in 90 days.', icon: 'filter', size: 'medium' },
  { id: 4, title: 'Website Development', description: 'Fast. Conversion-optimized. Built to rank, built to sell, built to last. Average 67% page speed improvement and 40% increase in time-on-site.', icon: 'code', size: 'medium' },
  { id: 5, title: 'Social Media Marketing', description: 'Content that stops the scroll. Strategy that builds the audience. Consistency that builds empires. Average 300% engagement increase in 90 days.', icon: 'share-2', size: 'wide' },
  { id: 6, title: 'Branding & Identity', description: 'Logos anyone can make. Brands only we build. Visual identity that commands attention. 100+ brand identities delivered.', icon: 'layers', size: 'standard' },
  { id: 7, title: 'SEO', description: 'Rank for what your customers are already searching. Own the SERP, own the market. Average 200% organic traffic increase in 6 months.', icon: 'search', size: 'standard' },
]

export const STATS: Stat[] = [
  { value: 120, suffix: '%', prefix: '', label: 'Average Order Value Increase' },
  { value: 30, suffix: '%', prefix: '', label: 'Higher ROAS on Ad Spend' },
  { value: 2.5, suffix: 'x', prefix: '', label: 'Customer Lifetime Value Growth' },
  { value: 10000, suffix: '+', prefix: '', label: 'Campaigns Delivered' },
]

export const STATS_EXTENDED = [
  { value: 10000, suffix: '+', label: 'Campaigns Delivered' },
  { value: 4.9, suffix: '★', label: 'Google Rating', decimals: 1 },
  { value: 97, suffix: '%', label: 'Retention Rate' },
  { value: 120, suffix: '%', label: 'Avg Order Value Increase' },
  { value: 30, suffix: '%', label: 'Higher ROAS' },
  { value: 2.5, suffix: 'x', label: 'CLV Growth', decimals: 1 },
  { value: 500, suffix: '+', label: 'Ads Launched' },
]

export const PROCESS_STEPS: ProcessStep[] = [
  { number: '01', title: 'Discovery', description: 'We audit your brand, your market, your competitors. We find the gap.' },
  { number: '02', title: 'Strategy', description: 'A custom 90-day growth blueprint. No templates. No guesswork.' },
  { number: '03', title: 'Execution', description: 'Our team deploys across every channel simultaneously. Speed is the strategy.' },
  { number: '04', title: 'Optimization', description: 'Weekly reporting. Real-time adjustments. We chase performance, not comfort.' },
  { number: '05', title: 'Escalation', description: 'When results hit, we double down. Scale what works. Kill what doesn\'t.' },
]

export const WORK_ITEMS: WorkItem[] = [
  { id: 1, name: 'Exzept', category: 'Performance Marketing', result: 'ROAS 1.8x → 5.2x | Revenue +₹8L in 90 days', gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' },
  { id: 2, name: 'Credo World', category: 'Branding & Identity', result: '400% LinkedIn growth | 15 B2B leads/month', gradient: 'linear-gradient(135deg, #1a0a00 0%, #2d1500 50%, #3d1f00 100%)' },
  { id: 3, name: 'Yellow Diaries', category: 'Social Media Marketing', result: '0 → 12,400 followers | 3x walk-ins', gradient: 'linear-gradient(135deg, #0d1a0d 0%, #162916 50%, #1f3a1f 100%)' },
  { id: 4, name: 'Flight Ticket Fare', category: 'SEO & Funnels', result: 'CPL ₹380 → ₹94 | 500+ leads/month', gradient: 'linear-gradient(135deg, #0d0d1a 0%, #16162b 50%, #1f1f3a 100%)' },
  { id: 5, name: 'Dr. Mukesh', category: 'Personal Branding', result: '0 → 8,200 LinkedIn followers | 12 consults/mo', gradient: 'linear-gradient(135deg, #1a0a1a 0%, #2b142b 50%, #3a1f3a 100%)' },
  { id: 6, name: 'Elixzor', category: 'Funnel Marketing', result: 'ROAS 2.1x → 6.8x | Repeat purchase 18% → 54%', gradient: 'linear-gradient(135deg, #1a1500 0%, #2b2200 50%, #3a2e00 100%)' },
]

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Muaaz Shaikh', role: 'Business Owner', quote: 'Growth Escalators completely transformed our Facebook Ad Management. Our ROAS went from 1.4x to 4.8x in just 45 days. The team is sharp, data-driven, and genuinely invested in your growth. Best agency decision we\'ve made.', rating: 5 },
  { id: 2, name: 'Richa Jain', role: 'Founder, Lifestyle Brand', quote: 'I\'ve worked with 3 agencies before and none came close to the results GE delivered in month one. Their funnel strategy doubled our email list and our conversion rate went from 1.2% to 3.8%. Absolutely recommend.', rating: 5 },
  { id: 3, name: 'Diwakar Kumar', role: 'E-commerce Entrepreneur', quote: 'The team at Growth Escalators doesn\'t just run ads — they understand your entire business. They identified bottlenecks we didn\'t know existed and fixed them systematically. Revenue up 140% in 3 months.', rating: 5 },
  { id: 4, name: 'Dr. Sumit Doraya', role: 'Medical Professional', quote: 'My personal brand grew beyond what I thought was possible. Growth Escalators built my LinkedIn from scratch to a point where I receive speaking invitations weekly and get 10+ inbound consultation requests per month.', rating: 5 },
  { id: 5, name: 'Priya Mehta', role: 'SaaS Founder', quote: 'ROI-focused, data-driven, and creatively brilliant. They built us a conversion funnel that works while we sleep. Our CAC dropped 52% and LTV tripled. Best investment we\'ve made in marketing.', rating: 5 },
]

export const TRUST_BAR_ITEMS = [
  'PERFORMANCE MARKETING', 'FUNNEL AUTOMATION', 'WEB DEVELOPMENT',
  'PERSONAL BRANDING', 'SOCIAL MEDIA', 'BRANDING & IDENTITY', 'SEO', 'CRO',
]

export const AGENCY_FACTS = [
  { label: 'Founded', value: '2021' },
  { label: 'Based In', value: 'Jaipur, India' },
  { label: 'Brands Served', value: '100+' },
  { label: 'Core Services', value: '7' },
]

export const SOCIAL_PROOF_TICKER = [
  'Elixzor: ROAS 6.8x ↑',
  'Yellow Diaries: 12K followers in 5 months',
  'Flight Ticket Fare: CPL dropped 75%',
  'Dr. Mukesh: 12 inbound consults/month',
  'Exzept: Revenue +₹8L in 90 days',
  'Credo World: 15 B2B leads/month from zero',
]

export const TEAM_MEMBERS = [
  {
    name: 'Jatin Agrawal',
    role: 'Founder & Growth Consultant',
    initials: 'JA',
    quote: 'We built Growth Escalators on one belief — your growth is our reputation. Every campaign we run, we run like it\'s our own money.',
    bio: 'Jatin founded Growth Escalators with a single conviction: that every brand, regardless of size, deserves world-class performance marketing.',
  },
  {
    name: 'Sakcham Raj',
    role: 'Growth Consultant',
    initials: 'SR',
    quote: 'Growth isn\'t a guessing game — it\'s a science. I don\'t just run campaigns, I engineer outcomes.',
    bio: 'Sakcham brings a systems-first approach to everything he touches.',
  },
  {
    name: 'Keshav',
    role: 'Creative Director',
    initials: 'KE',
    quote: 'A video has 3 seconds to stop a scroll. I make sure those 3 seconds are worth a thousand words.',
    bio: 'Keshav leads the creative engine at Growth Escalators.',
  },
  {
    name: 'Nimisha',
    role: 'Graphic Tailor',
    initials: 'NI',
    quote: 'Every pixel has a purpose. I don\'t just design visuals — I stitch stories that make brands impossible to ignore.',
    bio: 'Nimisha is the visual architect of the team.',
  },
]

export const ALL_TESTIMONIALS = [
  {
    id: 1,
    name: 'Muaaz Shaikh',
    role: 'Business Owner',
    category: 'Performance Marketing',
    highlight: 'ROAS 1.4x → 4.8x in 45 days',
    quote: 'Growth Escalators completely transformed our Facebook Ad Management. Our ROAS went from 1.4x to 4.8x in just 45 days. The team is sharp, data-driven, and genuinely invested in your growth. Best agency decision we\'ve made.',
    rating: 5,
    verified: true,
    platform: 'Google',
  },
  {
    id: 2,
    name: 'Richa Jain',
    role: 'Founder, Lifestyle Brand',
    category: 'Funnel Marketing',
    highlight: 'Conversion rate 1.2% → 3.8%',
    quote: 'I\'ve worked with 3 agencies before and none came close to the results GE delivered in month one. Their funnel strategy doubled our email list and our conversion rate went from 1.2% to 3.8%. Absolutely recommend.',
    rating: 5,
    verified: true,
    platform: 'Google',
  },
  {
    id: 3,
    name: 'Diwakar Kumar',
    role: 'E-commerce Entrepreneur',
    category: 'Performance Marketing',
    highlight: 'Revenue up 140% in 3 months',
    quote: 'The team at Growth Escalators doesn\'t just run ads — they understand your entire business. They identified bottlenecks we didn\'t know existed and fixed them systematically. Revenue up 140% in 3 months.',
    rating: 5,
    verified: true,
    platform: 'Google',
  },
  {
    id: 4,
    name: 'Dr. Sumit Doraya',
    role: 'Orthopaedic Surgeon & Speaker',
    category: 'Personal Branding',
    highlight: '10+ inbound consultation requests/month',
    quote: 'My personal brand grew beyond what I thought was possible. Growth Escalators built my LinkedIn from scratch to a point where I receive speaking invitations weekly and get 10+ inbound consultation requests per month. Phenomenal team.',
    rating: 5,
    verified: true,
    platform: 'Google',
  },
  {
    id: 5,
    name: 'Priya Mehta',
    role: 'SaaS Founder',
    category: 'SaaS Growth',
    highlight: 'CAC dropped 52%, LTV tripled',
    quote: 'ROI-focused, data-driven, and creatively brilliant. They built us a conversion funnel that works while we sleep. Our CAC dropped 52% and LTV tripled. Best investment we\'ve made in marketing by a long shot.',
    rating: 5,
    verified: true,
    platform: 'Google',
  },
  {
    id: 6,
    name: 'Arjun Singhania',
    role: 'Real Estate Developer, Jaipur',
    category: 'Real Estate',
    highlight: '3x qualified site visits in 60 days',
    quote: 'We launched a luxury residential project and had no digital presence. Growth Escalators built our entire funnel — Meta ads, landing page, WhatsApp follow-up. Within 60 days we had 3x more qualified site visits than our previous project. Exceptional.',
    rating: 5,
    verified: true,
    platform: 'Google',
  },
  {
    id: 7,
    name: 'Neha Agarwal',
    role: 'D2C Skincare Brand Founder',
    category: 'D2C eCommerce',
    highlight: 'AOV up 118%, repeat purchases 4x',
    quote: 'I was burning money on Meta ads with zero strategy. GE came in, restructured everything — creatives, audiences, landing pages. AOV went up 118% and repeat purchases increased 4x within 90 days. I only wish I\'d found them sooner.',
    rating: 5,
    verified: true,
    platform: 'Google',
  },
  {
    id: 8,
    name: 'Rohit Sharma',
    role: 'Healthcare Clinic Owner',
    category: 'Healthcare',
    highlight: 'Appointment bookings up 220%',
    quote: 'Running a multispecialty clinic, I had no idea how to get patients digitally. Growth Escalators set up Google Ads and a local SEO strategy. Within 4 months, online appointment bookings were up 220%. The ROI is unlike anything I\'ve seen.',
    rating: 5,
    verified: true,
    platform: 'Google',
  },
  {
    id: 9,
    name: 'Kabir Malhotra',
    role: 'EdTech Startup Founder',
    category: 'SaaS / EdTech',
    highlight: 'CPL dropped from ₹420 to ₹88',
    quote: 'Our cost per lead was killing us at ₹420. GE rebuilt our funnel from scratch — new landing page, new ad copy, new audience strategy. CPL dropped to ₹88 in 6 weeks. Our sales team went from 2 calls a day to 20. Incredible.',
    rating: 5,
    verified: true,
    platform: 'Google',
  },
  {
    id: 10,
    name: 'Sneha Kapoor',
    role: 'Fashion eCommerce Owner',
    category: 'eCommerce',
    highlight: 'ROAS 1.9x → 6.1x in 75 days',
    quote: 'My fashion store was getting traffic but no sales. GE identified it was a creative and offer problem, not an audience problem. New UGC creatives, new offer structure — ROAS went from 1.9x to 6.1x in 75 days. They genuinely care.',
    rating: 5,
    verified: true,
    platform: 'Google',
  },
  {
    id: 11,
    name: 'Dr. Meera Nair',
    role: 'Dermatologist & Clinic Owner',
    category: 'Healthcare',
    highlight: 'Fully booked 3 weeks in advance',
    quote: 'I was entirely dependent on word of mouth. GE built my Instagram presence, ran targeted local ads, and set up a booking funnel. I\'m now fully booked 3 weeks in advance and had to hire a second doctor. The results speak for themselves.',
    rating: 5,
    verified: true,
    platform: 'Google',
  },
  {
    id: 12,
    name: 'Vikram Choudhary',
    role: 'B2B Consulting Firm, Delhi',
    category: 'B2B',
    highlight: '0 → 18 qualified leads/month',
    quote: 'We were invisible digitally despite being one of the top consulting firms in our niche. GE built our LinkedIn authority, Google Ads, and content machine. We went from 0 inbound leads to 18 qualified ones per month in under 5 months.',
    rating: 5,
    verified: true,
    platform: 'Google',
  },
  {
    id: 13,
    name: 'Ananya Reddy',
    role: 'Yoga & Wellness Studio Owner',
    category: 'Wellness',
    highlight: 'Studio memberships sold out in 30 days',
    quote: 'I opened a new studio and was terrified about getting members. GE ran a hyper-local Meta campaign with the most beautiful creatives I\'ve seen. All 40 memberships sold out within 30 days of launch. They made my dream viable.',
    rating: 5,
    verified: true,
    platform: 'Google',
  },
  {
    id: 14,
    name: 'Harsh Vardhan',
    role: 'Real Estate Broker, Mumbai',
    category: 'Real Estate',
    highlight: '₹2.4Cr deal closed from a Meta lead',
    quote: 'I\'d never trusted digital marketing for high-ticket real estate. GE convinced me to try a targeted Meta campaign for luxury properties. Within 6 weeks, I closed a ₹2.4Cr deal from a single lead they generated. I\'m now a full convert.',
    rating: 5,
    verified: true,
    platform: 'Google',
  },
  {
    id: 15,
    name: 'Tanya Bose',
    role: 'Food & Beverage Brand Founder',
    category: 'F&B / D2C',
    highlight: '0 → 15,000 Instagram followers in 4 months',
    quote: 'We launched a healthy snacking brand with zero social presence. GE built our entire content system — reels, carousels, stories. In 4 months we hit 15,000 Instagram followers and our Shopify revenue went up 340%. They\'re not an agency, they\'re partners.',
    rating: 5,
    verified: true,
    platform: 'Google',
  },
]

export const SERVICES_FULL = [
  {
    number: '01', title: 'Performance Marketing', headline: 'Your Ads Should Print Money. Ours Do.',
    copy: 'We\'ve managed over ₹10Cr in ad spend across Meta, Google, and YouTube. Our campaigns don\'t just get impressions — they get results. Every rupee is tracked, optimised, and made to work overtime.',
    results: 'Average 30% reduction in CPL within 60 days. 120% AOV increase. 2.5x ROAS on cold traffic.',
    deliverables: ['Campaign architecture & full setup', 'Creative testing (A/B at scale)', 'Audience segmentation & lookalikes', 'Weekly reporting & optimisation calls', 'Landing page conversion feedback'],
    icon: 'trending-up',
  },
  {
    number: '02', title: 'Funnel Marketing & Automation', headline: 'Strangers Become Buyers While You Sleep.',
    copy: 'A funnel built right runs 24/7. We architect the entire journey — awareness to purchase to repeat — so your brand never misses a touchpoint.',
    results: 'Clients see avg 3.2x increase in lead-to-sale conversion within 90 days.',
    deliverables: ['Full funnel mapping & architecture', 'Landing page copy & design', 'Email nurture sequences', 'WhatsApp automation setup', 'CRM integration & lead tracking'],
    icon: 'filter',
  },
  {
    number: '03', title: 'Website Development', headline: 'Your Website Is Your Best Salesperson. Is It Doing Its Job?',
    copy: 'We build fast, conversion-optimised websites that rank on Google, load in under 2 seconds, and turn visitors into leads.',
    results: 'Average 67% improvement in page load speed. 40% increase in time-on-site.',
    deliverables: ['Custom design & development', 'Mobile-first optimisation', 'SEO technical structure', 'CRO implementation', 'Hosting & maintenance setup'],
    icon: 'code',
  },
  {
    number: '04', title: 'Personal Branding', headline: 'People Don\'t Buy From Businesses. They Buy From People.',
    copy: 'Whether you\'re a founder, consultant, or industry expert — your personal brand is your most valuable asset.',
    results: 'Clients average 400% follower growth in 6 months. 5–10 inbound leads per week from content alone.',
    deliverables: ['Brand positioning & messaging', 'LinkedIn profile optimisation', 'Content calendar & strategy', 'Ghostwriting & publishing', 'Personal visual identity'],
    icon: 'user',
  },
  {
    number: '05', title: 'Social Media Marketing', headline: 'Stop Posting. Start Building.',
    copy: 'Random posts don\'t build brands. Systems do. We create a content machine for your brand — platform-specific, audience-first, and algorithm-aware.',
    results: 'Average 300% engagement increase in 90 days. Communities of 10,000+ built from zero.',
    deliverables: ['Content strategy & calendar', 'Graphic design & reels', 'Reel scripting & editing', 'Community management', 'Analytics & monthly reporting'],
    icon: 'share-2',
  },
  {
    number: '06', title: 'Branding & Identity', headline: 'Your Brand Is What People Say About You When You\'re Not in the Room.',
    copy: 'We build brand identities that are impossible to ignore — logo systems, colour palettes, typography, brand guidelines.',
    results: '100+ brand identities delivered. Average brand recognition increase of 60% within 6 months.',
    deliverables: ['Logo design system', 'Brand guidelines document', 'Colour & typography system', 'Brand collateral design', 'Social media brand kit'],
    icon: 'layers',
  },
  {
    number: '07', title: 'SEO', headline: 'Rank #1 or Rank Nowhere.',
    copy: 'SEO isn\'t about gaming algorithms. It\'s about being the most relevant answer to your customer\'s question.',
    results: 'Clients average page 1 rankings within 4 months. 200% organic traffic increase in 6 months.',
    deliverables: ['Technical SEO audit & fixes', 'Keyword research & mapping', 'On-page optimisation', 'Backlink strategy & outreach', 'Monthly ranking reports'],
    icon: 'search',
  },
]

export const CASE_STUDIES = [
  {
    id: 1, slug: 'exzept', name: 'Exzept', industry: 'Fashion eCommerce',
    challenge: 'High CPM and poor ROAS on Meta ads draining budget with no clear path to profitability.',
    solution: 'Full funnel rebuild with UGC creative testing, audience segmentation overhaul, and conversion-optimised landing pages.',
    results: [
      { metric: 'ROAS', from: '1.8x', to: '5.2x', icon: '↑' },
      { metric: 'CPL Reduction', value: '44%', icon: '↓' },
      { metric: 'Monthly Revenue', value: '+₹8L in 90 days', icon: '↑' },
    ],
    tags: ['Performance Marketing', 'Creative Strategy', 'Funnel Optimisation'],
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  },
  {
    id: 2, slug: 'yellow-diaries', name: 'Yellow Diaries', industry: 'F&B / Café Brand',
    challenge: 'Zero digital presence with no social following and no local search visibility.',
    solution: 'Complete brand identity creation, social media system launch, and local SEO optimisation.',
    results: [
      { metric: 'Instagram Followers', value: '0 → 12,400 in 5 months', icon: '↑' },
      { metric: 'Walk-in Customers', value: '3x increase', icon: '↑' },
      { metric: 'Google Rank', value: '#1 for local café terms', icon: '★' },
    ],
    tags: ['Social Media Marketing', 'Branding', 'Local SEO'],
    gradient: 'linear-gradient(135deg, #0d1a0d 0%, #162916 50%, #1f3a1f 100%)',
  },
  {
    id: 3, slug: 'dr-mukesh', name: 'Dr. Mukesh Sharma', industry: 'Healthcare / Personal Brand',
    challenge: 'Needed to build specialist authority online and generate consultation requests digitally.',
    solution: 'LinkedIn personal branding system, thought leadership content strategy, and professional website.',
    results: [
      { metric: 'LinkedIn Followers', value: '0 → 8,200', icon: '↑' },
      { metric: 'Inbound Consult Requests', value: '12/month', icon: '↑' },
      { metric: 'Media Mentions', value: 'Featured in 2 publications', icon: '★' },
    ],
    tags: ['Personal Branding', 'LinkedIn Strategy', 'Web Development'],
    gradient: 'linear-gradient(135deg, #1a0a1a 0%, #2b142b 50%, #3a1f3a 100%)',
  },
  {
    id: 4, slug: 'flight-ticket-fare', name: 'Flight Ticket Fare', industry: 'Travel / Lead Generation',
    challenge: 'High cost per lead and poor funnel conversion making paid traffic unviable at scale.',
    solution: 'Funnel redesign, WhatsApp automation setup, and Google Ads campaign overhaul.',
    results: [
      { metric: 'CPL', from: '₹380', to: '₹94', icon: '↓' },
      { metric: 'Funnel Conversion', value: '4x increase', icon: '↑' },
      { metric: 'Monthly Leads', value: '500+ at scale', icon: '↑' },
    ],
    tags: ['Funnel Marketing', 'WhatsApp Automation', 'Google Ads'],
    gradient: 'linear-gradient(135deg, #0d0d1a 0%, #16162b 50%, #1f1f3a 100%)',
  },
  {
    id: 5, slug: 'elixzor', name: 'Elixzor', industry: 'Health & Wellness D2C',
    challenge: 'Poor ROAS on paid ads combined with no system to drive repeat purchases.',
    solution: 'Performance marketing overhaul plus full email and WhatsApp retention automation system.',
    results: [
      { metric: 'ROAS', from: '2.1x', to: '6.8x', icon: '↑' },
      { metric: 'Repeat Purchase Rate', from: '18%', to: '54%', icon: '↑' },
      { metric: 'Average Order Value', value: '+130%', icon: '↑' },
    ],
    tags: ['Performance Marketing', 'Retention Funnels', 'Email Automation'],
    gradient: 'linear-gradient(135deg, #1a1500 0%, #2b2200 50%, #3a2e00 100%)',
  },
  {
    id: 6, slug: 'credo-world', name: 'Credo World', industry: 'B2B / Consulting',
    challenge: 'Entire revenue pipeline relied on referrals with zero digital lead generation.',
    solution: 'LinkedIn authority strategy, long-form content system, Google Ads, and high-converting landing page.',
    results: [
      { metric: 'Qualified B2B Leads/month', value: '0 → 15', icon: '↑' },
      { metric: 'Average Deal Size', value: '₹2.5L', icon: '★' },
      { metric: 'LinkedIn Growth', value: '400% in 4 months', icon: '↑' },
    ],
    tags: ['LinkedIn Strategy', 'Google Ads', 'B2B Funnels'],
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #2d1500 50%, #3d1f00 100%)',
  },
]
