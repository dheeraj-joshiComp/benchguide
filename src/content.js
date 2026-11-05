// All page copy and links live here — edit this file to update the site.

export const LINKS = {
  bench: 'https://composio.dev/bench/composio-bench',
  instantTools: 'https://docs.composio.dev/docs/instant-tools',
  form: 'https://docs.google.com/forms/d/1m3sAg94_yVS2lOZ4hNV8uCD2DiGdap1rs9z9QFa9pMA/viewform',
  moreIdeas: 'https://drive.google.com/file/d/1lWXdUNAMxp7NNP-wuiBtq956RXDLt6n4/view?usp=sharing',
}

export const STATS = [
  { label: 'Time', value: '~20 min' },
  { label: 'Minimum', value: '25,000 tokens' },
  { label: 'Language', value: 'English only' },
  { label: 'Payment', value: '2–3 days' },
]

export const BEFORE = [
  { tag: 'Not a survey', title: 'Hands-on work', text: 'You will work hands-on with an AI assistant for about 20 minutes.' },
  { tag: 'Commit to it', title: "Stay until it's done", text: 'Do NOT start unless you are confident you can give it a real task and stay with it until the task is complete and successful.' },
  { tag: 'Language', title: 'Everything in English', text: 'Your task, your messages and the final result must all be in English.' },
]

export const APPS = ['Gmail', 'Google Drive', 'Google Docs', 'Google Sheets', 'Google Calendar', 'Notion', 'Slack', '+ Instant Tools']

// Each bullet is either a string or an array of parts: strings and { text, href } links.
export const STEPS = [
  {
    title: 'Create your BenchChat account',
    bullets: [
      ['Open BenchChat and sign up: ', { text: 'BenchChat sign-up', href: LINKS.bench }],
      'You can use any email address to sign up.',
    ],
  },
  {
    title: 'Connect your apps — as many as you can',
    bullets: [
      'Inside BenchChat, connect the apps you want the assistant to use, for example Gmail, Google Drive, Google Docs, Google Sheets, Google Calendar, Notion or Slack.',
      'Connecting is simple: pick the app, sign in to it, and click "Allow". That lets BenchChat work in that app for you.',
      'The more apps you connect and use, the better.',
      'Only connect accounts that are yours and that you are allowed to use.',
    ],
  },
  {
    title: 'Use Instant Tools',
    optional: true,
    bullets: [
      'BenchChat also has Instant Tools: ready-to-use tools (for example for web research and finding information) that work without connecting any account.',
      'New accounts get some free credits for Instant Tools when you sign up, so you can use them straight away.',
      'Use Instant Tools together with your connected apps in your task.',
      ['You will have to enable Instant Tools first — ', { text: 'how to enable them', href: LINKS.instantTools }, '.'],
    ],
  },
  {
    title: 'Give it a realistic, complex, multi-step task',
    bullets: [
      'Choose a realistic, complex and substantial knowledge-work task that needs investigation, reasoning and a useful final result.',
      'Describe your task clearly in English: what you want done, the background, and what a good final result looks like.',
      'The task must have several steps and use as many apps as possible, each more than once. For example: search your emails, pull the details into a spreadsheet, research something online with Instant Tools, then draft a document or reply.',
      'Coding, software development and website-building tasks are NOT allowed.',
    ],
  },
  {
    title: 'Keep working with it over multiple turns',
    bullets: [
      'Stay in the same conversation. Answer its questions, check what it did, and ask for fixes or next steps.',
      'This should be a back-and-forth with many messages, not one quick request.',
    ],
    tip: 'Tip: tell BenchChat to ask you before it sends any email or changes any record.',
  },
  {
    title: 'Check the action-token count and the final result',
    bullets: [
      ['Your conversation must exceed ', { strong: '25,000 action tokens' }, '. You can see the count at the top right of the BenchChat page.'],
      'Make sure the task is complete and successful: the end result actually does what you asked.',
    ],
  },
  {
    title: 'Submit the form — only after the task is complete',
    bullets: [
      "Once the task is finished and the action-token count is above 25,000, copy the URL of your conversation from your browser's address bar.",
      'Fill in the submission form with your conversation URL, your final action-token count, and 2–3 sentences about the final result and how you checked it. Without this URL we cannot approve your submission.',
    ],
    formButton: true,
  },
]

export const REQUIREMENTS = [
  'Everything is in English.',
  'It is a realistic, complex and substantial knowledge-work task, done over multiple turns, using multiple apps (your connected apps plus Instant Tools), as many as possible, each more than once. No coding or website-building.',
  'The task ends complete and successful.',
  'The conversation exceeds 25,000 action tokens. Real work — researching several sources, building a detailed result, then checking and refining it — gets you there naturally. Repeating actions or adding unrelated requests just to raise the count does not qualify.',
  'You submitted your BenchChat conversation URL through the form after completing the task.',
]

export const IDEAS = [
  { tag: 'Email → Doc', text: 'Go through recent emails about a delayed project and create a recovery plan in a doc.' },
  { tag: 'Email + Calendar', text: 'Prepare a client handover: collect open commitments from emails and calendar, then write next steps.' },
  { tag: 'Sheets + Email', text: 'Reconcile a spreadsheet against emails or documents and fix the differences.' },
  { tag: 'Drive → Doc', text: 'Compare proposals and budgets from your files and write a recommendation.' },
  { tag: 'Web → Sheet → Email', text: 'Research potential business partners online, build a contact list in a sheet, and draft personalised outreach emails.' },
  { tag: 'Calendar + Web', text: 'Plan an event: check your calendar, research venues, and draft the invitations.' },
]
