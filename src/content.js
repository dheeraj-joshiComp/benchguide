// All page copy and links live here — edit this file to update the site.

export const LINKS = {
  bench: 'https://composio.dev/bench/composio-bench',
  // Separate submission forms: both ask for bank details, only the ₹500 version asks for a UPI ID.
  form:
    import.meta.env.VITE_OFFER === 'usd'
      ? 'https://docs.google.com/forms/d/e/1FAIpQLScjNt8yeXhNLeInbLetT77tc8PjoqPcw1ko9-NEPEU_AL8rNQ/viewform'
      : 'https://docs.google.com/forms/d/e/1FAIpQLScH6yLB-XJXYHYUHUV5mJC9vNhhX_9VR5wAyo6hiz9buoq3fQ/viewform',
  moreIdeas: 'https://drive.google.com/file/d/1lWXdUNAMxp7NNP-wuiBtq956RXDLt6n4/view?usp=sharing',
}

export const VIDEO = {
  src: '/media/bench-howto.mp4',
  poster: '/media/bench-howto-poster.jpg',
}

const img = (name) => `/media/steps/${name}.webp`

// Which version this build is, from VITE_OFFER at build time: 'inr' (default), 'usd', or 'none' for no payment.
// Compared inline so the build drops the versions it doesn't use.
const payRules = () => [
  'Every task is reviewed manually by our team.',
  'We pay only after we verify that the conversation is above 25,000 action tokens and the prompts are real and genuine.',
  'Chats that are not in English, not finished, or padded to raise the token count are not paid.',
]
export const OFFER =
  import.meta.env.VITE_OFFER === 'none'
    ? null
    : import.meta.env.VITE_OFFER === 'usd'
      ? {
          amount: '$10',
          bonus: null,
          payout: 'in about 2–3 days',
          payoutCard: { value: '2–3 days', title: 'Paid soon after review', text: 'After approval, the payment is sent in about 2–3 days.' },
          formFields: 'name, email, phone number and bank details',
          rules: payRules(),
        }
      : {
          amount: '₹500',
          bonus: '₹500',
          payout: 'to your bank in about 2–3 days',
          payoutCard: { value: '2–3 days', title: 'Straight to your bank', text: 'After approval, the payment reaches your bank account in about 2–3 days.' },
          formFields: 'name, email, phone number and bank details',
          rules: payRules(),
        }
// The submission form only exists on the paid versions. The free version has no form at all.
export const SHOW_FORM = OFFER !== null
const notPaid = OFFER ? ' and not paid' : ''

// Shown in the sticky strip under the nav, styled like BenchChat's own stats strip.
export const STRIP = [
  { icon: 'zap', label: 'Action tokens', value: 'over 25,000' },
  { icon: 'globe', label: 'Language', value: 'English only' },
  { icon: 'check', label: 'Task', value: 'real and complete' },
  ...(OFFER ? [{ icon: 'wallet', label: 'Pay', value: `${OFFER.amount} per approved task` }] : []),
]

// Cards under the hero, styled like BenchChat's suggested tasks. Each jumps to a section.
export const HERO_CARDS = [
  OFFER
    ? { title: `${OFFER.amount} for every approved task${OFFER.bonus ? `, plus a ${OFFER.bonus} bonus at 10` : ''}`, label: 'Payment', href: '#payment' }
    : { title: 'Every step explained, with screenshots', label: 'Steps', href: '#steps' },
  { title: 'Your chat must go above 25,000 action tokens', label: 'Action tokens', href: '#tokens' },
  { title: 'Watch the whole flow in one minute', label: 'Video', href: '#video' },
  { title: 'Copy a ready prompt and make it your own', label: 'Prompts', href: '#prompts' },
]

export const BEFORE = [
  { tag: 'Required', title: 'Over 25,000 action tokens', text: `Your conversation must go above 25,000 action tokens. Under 25,000 is not approved${notPaid}, even if the task is good.` },
  { tag: 'Required', title: 'Everything in English', text: 'Your task, every message you send and the final result must all be in English. Non-English chats are not approved.' },
  { tag: 'Required', title: 'A real, genuine task', text: 'Use a real task from your work or daily life and stay with it until it is complete. Fake, repeated or filler prompts are rejected.' },
]

export const PAYMENT = OFFER
  ? [
      { value: OFFER.amount, title: 'For every approved task', text: `Each successful task you submit earns ${OFFER.amount} once we approve it.` },
      ...(OFFER.bonus ? [{ value: `+${OFFER.bonus}`, title: 'Bonus at 10 approved tasks', text: `When 10 of your tasks are approved, you get an extra ${OFFER.bonus} on top, after we verify all 10.` }] : []),
      OFFER.payoutCard,
    ]
  : []

export const PAYMENT_RULES = OFFER ? OFFER.rules : []

export const APPS = ['Google Sheets', 'Google Docs', 'Notion', 'Gmail', 'Google Drive', 'Google Calendar', 'Slack']

export const INSTANT_APPS = ['SerpApi', 'Firecrawl', 'Tavily', 'Exa', 'ElevenLabs', 'People Data Labs', '+ many more']

// Each bullet is either a string or an array of parts: strings, { strong } and { text, href } links.
// Each step can show screenshots: { src, alt, caption }.
export const STEPS = [
  {
    title: 'Open BenchChat',
    bullets: [
      ['Open ', { text: 'BenchChat', href: LINKS.bench }, ' on a laptop or desktop.'],
      'Click TRY BENCH at the top right, or type your task in the message box at the bottom.',
    ],
    media: [
      { src: img('open-bench'), alt: 'BenchChat home page', caption: '1 — Try Bench at the top right. 2 — the message box where you type your task.' },
    ],
  },
  {
    title: 'Create your account',
    bullets: [
      ['Click ', { strong: 'Continue with Google' }, ' (easiest). New users are signed up automatically.'],
      'Or click Sign up at the bottom to use any email address.',
      'Pick your Google account and allow access. You land back in BenchChat, signed in.',
    ],
    media: [
      { src: img('sign-up'), alt: 'Sign-in page', caption: '1 — Continue with Google. 2 — or Sign up with an email address.' },
      { src: img('google-account'), alt: 'Google account chooser', caption: 'Choose the Google account you want to use.' },
    ],
  },
  {
    title: 'Open your dashboard',
    bullets: [
      ['In BenchChat, click ', { strong: 'Switch' }, ' at the top left, then choose ', { strong: 'FOR YOU' }, '.'],
      'This is where you connect your apps and, if you want, turn on Instant Tools.',
    ],
    media: [
      { src: img('switch-for-you'), alt: 'Switch menu with For You option', caption: '1 — Switch. 2 — For You (opens the dashboard).' },
    ],
  },
  {
    title: 'Connect your apps',
    bullets: [
      ['Click ', { strong: 'Connect' }, ' next to each app you use, sign in to it and click Allow.'],
      ['Use ', { strong: 'Google Sheets, Google Docs and Notion' }, ' as much as you can. Gmail, Drive, Calendar and Slack help too.'],
      'If your task needs an app you have not connected yet, BenchChat also shows a Connect button inside the chat.',
      'Only connect accounts that are yours and that you are allowed to use.',
    ],
    media: [
      { src: img('dashboard-apps-instant'), alt: 'Dashboard with apps and Instant Tools', caption: '1 — Connect your apps. 2 and 3 — Instant Tools and its apps. 4 — Settings (to turn Instant on, next step).' },
    ],
  },
  {
    title: 'Turn on Instant Tools',
    optional: true,
    bullets: [
      ['Click ', { strong: 'Settings' }, ' at the bottom left, open ', { strong: 'General' }, ', and switch ', { strong: 'Instant' }, ' ON.'],
      ['When you sign up you get ', { strong: '$2 of free credit' }, ' for Instant Tools, so you can use them straight away.'],
      ['Instant gives you ', { strong: '80+ ready-to-use apps' }, ' with no account or API key: web search, scraping, job search, people and company enrichment, voice, image and video generation, and more.'],
      'Instant Tools are optional, but we recommend them: research with Instant, then write the results into your connected apps. This makes the task richer and grows the action-token count with real work.',
    ],
    media: [
      { src: img('instant-on'), alt: 'Settings page with Instant switched on', caption: 'Settings → General → Configuration: Instant switched ON.' },
    ],
  },
  {
    title: 'Go back to Bench and give it a real task — in English',
    bullets: [
      'Click Switch → BENCH, then NEW CHAT.',
      'Describe a real task in English: what you want done, the background, and what a good final result looks like.',
      'It must have several steps and use several apps more than once. See the example prompts below.',
      'Pick a model from the dropdown and click the arrow to send.',
      'Coding, software development and website-building tasks are NOT allowed.',
    ],
    media: [
      { src: img('type-task'), alt: 'Typing a task in the BenchChat message box', caption: 'Type your task in English.' },
      { src: img('send-task'), alt: 'Model picker and send button', caption: '1 — choose the model. 2 — send.' },
    ],
  },
  {
    title: 'Keep working with it over many turns',
    bullets: [
      'Stay in the same conversation. Answer its questions, check what it did, and ask for fixes and next steps.',
      'This must be a real back-and-forth with many messages, not one quick request.',
      'Watch the stats at the top right: model time, tool calls, total tokens and Action tokens.',
    ],
    tip: 'Tip: tell BenchChat to ask you before it sends any email or changes any record. Actions in your apps are real.',
    media: [
      { src: img('bench-running'), alt: 'BenchChat working on a task', caption: '1 — live stats, including Action tokens. 2 — your first message (turn 1).' },
    ],
  },
  {
    title: 'Check: over 25,000 action tokens and the task is done',
    must: true,
    bullets: [
      ['The ', { strong: 'Action tokens' }, ' number at the top right must be ', { strong: 'above 25,000' }, '. It updates after each reply finishes.'],
      'Make sure the task is complete and the result actually does what you asked.',
      'Then mark the task Success under the last reply.',
    ],
    media: [
      { src: img('multi-turn-tokens'), alt: 'Finished BenchChat task with action tokens', caption: '1 — Action tokens (must be above 25,000). 2 — your follow-up reply (turn 2). 3 — send more follow-ups here. 4 — mark Success.' },
    ],
  },
  ...(SHOW_FORM
    ? [
        {
          title: 'Submit the form — only after the task is complete',
          bullets: [
            "Copy the URL of your conversation from your browser's address bar.",
            `Fill in the form with your conversation URL, your final action-token count, and 2–3 sentences about the result and how you checked it. Without the URL we cannot approve${OFFER ? ' or pay' : ' your task'}.`,
          ],
          formButton: true,
        },
      ]
    : []),
]

export const TOKENS = {
  counted: [
    'The AI’s replies to you',
    'The AI’s reasoning (its thinking steps)',
    'Everything the AI writes into your apps: Google Doc and Notion text, Google Sheet rows, email drafts, task descriptions',
  ],
  notCounted: [
    'What you type',
    'What the AI only reads: emails, search results, web pages, files',
  ],
  tips: [
    ['Ask for a ', { strong: 'detailed written result' }, ' in Google Docs, Notion or Google Sheets. Long, real documents and full tables add the most.'],
    'Ask it to explain its plan before it starts, and to summarise what it did and why at the end.',
    'Review the result and ask for real improvements: more rows, a better section, a second draft, a check of every link.',
    'Use several tools in one task: research with Instant Tools, then write into your apps.',
    'Stay in one long chat. The count adds up across the whole conversation.',
  ],
  example: 'Reading 200 emails and replying "done" adds almost nothing. Reading 20 emails and writing 20 real reply drafts adds a lot.',
  warning: `Do not pad. Asking it to repeat text, write filler, or do unrelated requests just to raise the count is rejected${notPaid}.`,
}

// Example prompts. Participants replace the [brackets] with their own real details.
export const PROMPTS = [
  {
    tag: 'Job search',
    tools: ['Instant: job search', 'Google Sheets', 'Google Docs'],
    prompt: 'I am a [your role] with [X] years of experience in [skills]. Use the job search tool to find 25 current [role] openings in [cities or remote], posted in the last 2 weeks. Put them in a new Google Sheet with company, title, location, salary if listed, experience required, posting date, link, and a 1–10 fit score with one sentence explaining each score. Then write a Google Doc with my top 5 matches, a tailored cover-letter paragraph for each, and the skills I should highlight. Explain your plan before you start.',
    followUps: ['Add 10 more remote roles and re-rank the sheet.', 'Rewrite the cover letter for match #2 to be shorter and more specific.', 'Check every link and mark the closed postings.'],
  },
  {
    tag: 'Lead enrichment',
    tools: ['Instant: People Data Labs', 'Instant: web search', 'Google Sheets', 'Gmail drafts'],
    prompt: 'I sell [your product or service] to [type of customer]. My leads are in the Google Sheet "[sheet name]" (or: here are 15 names and companies: [list]). Enrich every lead with job title, LinkedIn URL, company size, industry and recent company news. Add the results as new columns, score each lead from 1–10 for fit with a short reason, and write a personalised first email for the top 10 as Gmail drafts. Do not send anything.',
    followUps: ['Find 10 more similar companies and add them as new leads.', 'Make the emails for the top 3 more specific to their recent news.', 'Add a column with the best next step for each lead.'],
  },
  {
    tag: 'Company enrichment',
    tools: ['Instant: company enrichment', 'Instant: Exa / Tavily', 'Google Sheets', 'Notion'],
    prompt: 'I work at [your company], which does [what it does]. Research these competitors: [8 company names]. For each, find headcount, funding, pricing, main features, target customers and launches in the last 6 months. Build a comparison table in a Google Sheet, then write a 2-page competitor brief in Notion with where we are stronger, where we are weaker, and 5 concrete recommendations.',
    followUps: ['Add 3 competitors I missed.', 'Turn the recommendations into a 4-week action plan in the Notion page.', 'Double-check the pricing numbers against each company’s pricing page.'],
  },
  {
    tag: 'People enrichment',
    tools: ['Instant: People Data Labs', 'Google Calendar', 'Notion'],
    prompt: 'Look at my Google Calendar for next week and list every meeting with people outside my company. For each person, use the people enrichment and web search tools to find their role, background, company and recent news or posts. Write a one-page prep brief per meeting in Notion with who they are, what they likely care about, 3 talking points and 2 questions I should ask.',
    followUps: ['Add a short summary page that links all the briefs.', 'Make the talking points for [meeting] more specific to [topic].'],
  },
  {
    tag: 'Image and video generation',
    tools: ['Instant: web search', 'Instant: image and video generation', 'Google Sheets', 'Google Docs'],
    prompt: 'I run [your business or page] for [audience]. Research 5 trending content ideas in [your niche] this month. Build a 2-week content calendar in Google Sheets with date, platform, idea, caption and hashtags. Then generate 3 images for the first three posts and a short video for one of them, and put the captions, image prompts and the video script in a Google Doc.',
    followUps: ['Make the second image match my brand colours [colours].', 'Write 3 alternative captions for each post and add them to the sheet.'],
  },
  {
    tag: 'Research report',
    tools: ['Instant: SerpApi / Exa / Firecrawl', 'Google Docs', 'Google Sheets'],
    prompt: 'I need to decide [a real decision, for example which CRM to buy for a 10-person team]. Research at least 6 options from several sources, scrape their pricing and feature pages, and put a comparison in a Google Sheet. Then write a detailed recommendation in a Google Doc with the trade-offs, total cost for my case, and a final pick with reasons.',
    followUps: ['Add a section on migration risks.', 'Check every source link and cite it in the doc.'],
  },
]

export const REQUIREMENTS = [
  [{ strong: 'Everything is in English' }, ' — your task, every message and the final result.'],
  [{ strong: 'The conversation is above 25,000 action tokens' }, ', shown at the top right of BenchChat. Real work — researching several sources, building a detailed result, then checking and refining it — gets you there. Repeating actions or adding unrelated requests just to raise the count does not qualify.'],
  [{ strong: 'The task is real and genuine' }, ': a realistic, complex knowledge-work task from your work or daily life. No coding or website-building.'],
  'It is done over multiple turns, using multiple apps, each more than once. Instant Tools are optional but recommended.',
  'The task ends complete and successful.',
  ...(SHOW_FORM ? ['You submitted your BenchChat conversation URL through the form after completing the task.'] : []),
]

export const IDEAS = [
  { tag: 'Email → Doc', text: 'Go through recent emails about a delayed project and create a recovery plan in a doc.' },
  { tag: 'Email + Calendar', text: 'Prepare a client handover: collect open commitments from emails and calendar, then write next steps.' },
  { tag: 'Sheets + Email', text: 'Reconcile a spreadsheet against emails or documents and fix the differences.' },
  { tag: 'Drive → Doc', text: 'Compare proposals and budgets from your files and write a recommendation.' },
  { tag: 'Web → Sheet → Email', text: 'Research potential business partners online, build a contact list in a sheet, and draft personalised outreach emails.' },
  { tag: 'Calendar + Web', text: 'Plan an event: check your calendar, research venues, and draft the invitations.' },
]
