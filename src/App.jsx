import { useEffect, useState } from 'react'
import {
  LINKS, VIDEO, OFFER, STRIP, HERO_CARDS, BEFORE, PAYMENT, PAYMENT_RULES, APPS, INSTANT_APPS,
  STEPS, TOKENS, PROMPTS, REQUIREMENTS, IDEAS,
} from './content'

const ext = { target: '_blank', rel: 'noopener noreferrer' }
const pad = (n) => String(n).padStart(2, '0')
const Strong = ({ children }) => <strong className="strong">{children}</strong>

// 24px stroke icons in the same line style as the BenchChat UI.
const ICONS = {
  zap: 'M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z',
  globe: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10',
  check: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3',
  wallet: 'M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4',
  arrow: 'M5 12h14M12 5l7 7-7 7',
}

function Icon({ name, size = 14 }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  )
}

function Rich({ value }) {
  if (typeof value === 'string') return value
  return value.map((part, i) => {
    if (typeof part === 'string') return <span key={i}>{part}</span>
    if (part.strong) return <Strong key={i}>{part.strong}</Strong>
    return <a key={i} href={part.href} {...ext}>{part.text}</a>
  })
}

function Button({ href, primary, children, external = true }) {
  return (
    <a className={primary ? 'btn primary' : 'btn'} href={href} {...(external ? ext : {})}>{children}</a>
  )
}

function SectionHead({ label, title, children }) {
  return (
    <div className="sec-head">
      <span className="label">{label}</span>
      <h2>{title}</h2>
      {children && <p className="sub">{children}</p>}
    </div>
  )
}

function Badge({ kind, children }) {
  return <span className={`badge ${kind}`}>{children}</span>
}

function Nav() {
  return (
    <nav>
      <div className="bar">
        <a className="brand" href="#top">BenchChat <Badge kind="green">Study</Badge></a>
        <div className="links">
          {OFFER && <a href="#payment">Payment</a>}
          <a href="#video">Video</a>
          <a href="#steps">Steps</a>
          <a href="#tokens">Tokens</a>
          <a href="#prompts">Prompts</a>
          <a href="#requirements">Rules</a>
        </div>
        <Button href={LINKS.form} primary>Submit</Button>
      </div>
      <div className="strip">
        {STRIP.map((s) => (
          <span className="stat" key={s.label}>
            <Icon name={s.icon} />
            <span className="k">{s.label}</span>
            <span className="v">{s.value}</span>
          </span>
        ))}
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wash" aria-hidden="true" />
      <div className="wrap hero-inner">
        <h1>Do one real task with an AI assistant, start to finish</h1>
        <p className="lede">
          Give BenchChat a real, multi-step task from your work or daily life, in English. Work with it over many messages
          until it's done and the chat is <Strong>above 25,000 action tokens</Strong>.{OFFER && ` Every approved task pays ${OFFER.amount}.`}
        </p>
        <div className="cta">
          <Button href={LINKS.bench} primary>Open BenchChat</Button>
          <a className="btn" href="#steps">Read the steps</a>
        </div>
        <div className="cards">
          {HERO_CARDS.map((c) => (
            <a className="card" href={c.href} key={c.label}>
              <span>{c.title}</span>
              <span className="card-foot"><span className="label">{c.label}</span><Icon name="arrow" size={16} /></span>
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}

function Before() {
  return (
    <section id="start">
      <div className="wrap">
        <SectionHead label="Before you start" title="Three rules for every task" />
        <div className="grid g3">
          {BEFORE.map((b) => (
            <div className="panel" key={b.title}>
              <Badge kind="amber">{b.tag}</Badge>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section>
      <div className="wrap about">
        <div>
          <SectionHead label="About" title="What this study is about" />
          <p>
            <a href={LINKS.bench} {...ext}>BenchChat</a> is an AI assistant that does real work inside your apps: it writes
            documents, fills spreadsheets, drafts emails, checks your calendar and researches the web.
          </p>
          <p>
            <Strong>Your job:</Strong> give it a realistic, complex task from your work or daily life, and work with it
            over many messages until the task is fully done.
          </p>
        </div>
        <div>
          <span className="label block">Apps to connect — use these the most</span>
          <div className="chips">{APPS.map((a) => <span className="chip" key={a}>{a}</span>)}</div>
          <span className="label block spaced">Instant Tools — optional, 80+ apps, no account needed</span>
          <div className="chips">{INSTANT_APPS.map((a) => <span className="chip" key={a}>{a}</span>)}</div>
        </div>
      </div>
    </section>
  )
}

function Payment() {
  return (
    <section id="payment">
      <div className="wrap">
        <SectionHead label="Payment" title="How you get paid" />
        <div className="grid g3">
          {PAYMENT.map((p) => (
            <div className="panel" key={p.title}>
              <b className="figure">{p.value}</b>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
        <ul className="list">{PAYMENT_RULES.map((r) => <li key={r}>{r}</li>)}</ul>
      </div>
    </section>
  )
}

function Video() {
  return (
    <section id="video">
      <div className="wrap">
        <SectionHead label="Video" title="Watch the whole flow in one minute">
          Sign up, connect an app, turn on Instant Tools and watch the action-token count grow. The steps below show each screen.
        </SectionHead>
        <div className="frame">
          <video src={VIDEO.src} poster={VIDEO.poster} controls muted playsInline preload="metadata" />
        </div>
      </div>
    </section>
  )
}

function Figure({ media, onOpen }) {
  return (
    <figure>
      <button type="button" className="shot" onClick={() => onOpen(media)} aria-label={`Enlarge: ${media.alt}`}>
        <img src={media.src} alt={media.alt} loading="lazy" width="1800" height="1130" />
        <span className="zoom">Click to enlarge</span>
      </button>
      <figcaption>{media.caption}</figcaption>
    </figure>
  )
}

function Steps({ onOpen }) {
  return (
    <section id="steps">
      <div className="wrap">
        <SectionHead label="Steps" title="How to do it, step by step">
          The numbered boxes in each screenshot show exactly where to click.
        </SectionHead>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li className="step" key={s.title}>
              <div className="step-head">
                <span className="label">Step {pad(i + 1)}</span>
                {s.must && <Badge kind="amber">Required</Badge>}
                {s.optional && <Badge kind="green">Optional · recommended</Badge>}
              </div>
              <h3>{s.title}</h3>
              <ul className="list">{s.bullets.map((b, j) => <li key={j}><Rich value={b} /></li>)}</ul>
              {s.tip && <p className="note">{s.tip}</p>}
              {s.media && (
                <div className={s.media.length > 1 ? 'shots two' : 'shots'}>
                  {s.media.map((m) => <Figure key={m.src} media={m} onOpen={onOpen} />)}
                </div>
              )}
              {s.formButton && <div className="step-cta"><Button href={LINKS.form} primary>Open the submission form</Button></div>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Tokens() {
  return (
    <section id="tokens">
      <div className="wrap">
        <SectionHead label="Action tokens" title="How action tokens work">
          Action tokens measure how much real work the AI does for you. Your chat must go above 25,000.
        </SectionHead>
        <div className="grid g2">
          <div className="panel">
            <span className="label green">Counted</span>
            <ul className="list">{TOKENS.counted.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div className="panel">
            <span className="label">Not counted</span>
            <ul className="list">{TOKENS.notCounted.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </div>
        <p className="note">{TOKENS.example}</p>
        <h3 className="spaced">How to reach 25,000 with real work</h3>
        <ul className="list">{TOKENS.tips.map((t, i) => <li key={i}><Rich value={t} /></li>)}</ul>
        <p className="note amber">{TOKENS.warning}</p>
      </div>
    </section>
  )
}

function CopyButton({ text }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setDone(true)
      setTimeout(() => setDone(false), 1500)
    } catch {
      setDone(false)
    }
  }
  return <button type="button" className="btn ghost" onClick={copy}>{done ? 'Copied' : 'Copy'}</button>
}

function Prompts() {
  return (
    <section id="prompts">
      <div className="wrap">
        <SectionHead label="Prompts" title="Example prompts">
          Replace everything in [brackets] with your own real details. Each one writes a lot into Google Sheets, Google Docs
          or Notion, which is what grows the action-token count. Instant Tools are optional but make these richer.
        </SectionHead>
        <div className="prompts">
          {PROMPTS.map((p) => (
            <article className="prompt" key={p.tag}>
              <div className="prompt-head">
                <h3>{p.tag}</h3>
                <CopyButton text={p.prompt} />
              </div>
              <div className="chips small">{p.tools.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
              <p className="bubble">{p.prompt}</p>
              <span className="label block">Then follow up with</span>
              <ul className="list">{p.followUps.map((f) => <li key={f}>{f}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Requirements() {
  return (
    <section id="requirements">
      <div className="wrap">
        <SectionHead label="Approval" title={OFFER ? 'Requirements for approval and payment' : 'Requirements for approval'}>
          Your task is {OFFER ? 'approved and paid' : 'accepted'} only if all of these are true.
        </SectionHead>
        <ol className="rows">
          {REQUIREMENTS.map((r, i) => (
            <li key={i}><span className="label">{pad(i + 1)}</span><div><Rich value={r} /></div></li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Ideas() {
  return (
    <section id="ideas">
      <div className="wrap">
        <SectionHead label="Ideas" title="More task ideas" />
        <div className="cards three">
          {IDEAS.map((idea) => (
            <div className="card static" key={idea.tag}>
              <span>{idea.text}</span>
              <span className="card-foot"><span className="label">{idea.tag}</span></span>
            </div>
          ))}
        </div>
        <p className="sub spaced">Or anything else from your own daily work. <a href={LINKS.moreIdeas} {...ext}>More ideas</a></p>
      </div>
    </section>
  )
}

function SubmitBand() {
  const checks = [
    'Your task is complete and successful.',
    'The action-token count is above 25,000.',
    'Everything is in English.',
    "You've copied your BenchChat conversation URL.",
  ]
  return (
    <section id="submit">
      <div className="wrap">
        <div className="submit">
          <div>
            <span className="label">Finished?</span>
            <h2>Submit your conversation</h2>
            <ol className="rows compact">
              {checks.map((c, i) => <li key={i}><span className="label">{pad(i + 1)}</span><div>{c}</div></li>)}
            </ol>
          </div>
          <div>
            <Button href={LINKS.form} primary>Open the submission form</Button>
            <p className="sub spaced">
              You'll be asked for your {OFFER ? OFFER.formFields : 'name and email'}, conversation URL, token count and a short summary.
              We review every task manually.{OFFER && ` Approved tasks are paid ${OFFER.amount} ${OFFER.payout}.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Lightbox({ media, onClose }) {
  useEffect(() => {
    if (!media) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [media, onClose])
  if (!media) return null
  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-label={media.alt}>
      <img src={media.src} alt={media.alt} />
      <p>{media.caption}<span className="label block">Click anywhere or press Esc to close</span></p>
    </div>
  )
}

export default function App() {
  const [open, setOpen] = useState(null)
  return (
    <>
      <Nav />
      <Hero />
      <Before />
      <About />
      {OFFER && <Payment />}
      <Video />
      <Steps onOpen={setOpen} />
      <Tokens />
      <Prompts />
      <Requirements />
      <Ideas />
      <SubmitBand />
      <footer>
        <div className="wrap">
          <span className="label">BenchChat study</span>
          <span className="label">Every task is reviewed manually</span>
        </div>
      </footer>
      <Lightbox media={open} onClose={() => setOpen(null)} />
    </>
  )
}
