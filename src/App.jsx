import { useEffect, useState } from 'react'
import {
  LINKS, VIDEO, BEFORE, PAYMENT, PAYMENT_RULES,
  STEPS, TOKENS, PROMPTS, REQUIREMENTS, IDEAS, REWARDS, BONUS_APPS, QUEST,
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
  chevron: 'M9 6l6 6-6 6',
  image: 'M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M15.5 9.5h.01',
  copy: 'M9 9h11v11H9zM5 15H4V4h11v1',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3',
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
        <a className="brand" href="#top"><span className="logo"><Icon name="zap" size={14} /></span>BenchChat study</a>
        <div className="links">
          <a href="#quest">How it works</a>
          <a href="#payment">Rewards</a>
          <a href="#guide">Guide</a>
        </div>
        <Button href={LINKS.form} primary>Submit task</Button>
      </div>
    </nav>
  )
}

// Per-viewer progress only (which levels and apps they ticked). Never the source of truth for pay.
function useStored(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial } catch { return initial }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage blocked */ }
  }, [key, value])
  return [value, setValue]
}

const DEMO_APPS = ['Gmail', 'Sheets', 'Docs', 'Notion']
const DEMO_LEN = 7000 // ms per loop

// Looping mock of a BenchChat session: tokens climb, apps light up, payout grows.
function Demo() {
  const [t, setT] = useState(0)
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setT(DEMO_LEN); return }
    const start = performance.now()
    let raf
    const tick = (now) => { setT((now - start) % (DEMO_LEN + 1500)); raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  const p = Math.min(t / DEMO_LEN, 1)
  const tokens = Math.round(25400 * (1 - (1 - p) ** 2))
  const lit = Math.min(DEMO_APPS.length, Math.floor(p * (DEMO_APPS.length + 1)))
  const earned = (tokens >= 25000 ? REWARDS.base : 0) + Math.min(lit * REWARDS.perApp, REWARDS.appCap)
  const approved = p >= 1
  return (
    <div className="demo" aria-hidden="true">
      <div className="demo-bar">
        <span className="dots"><i /><i /><i /></span>
        <span className="demo-title">BenchChat</span>
        <span className={tokens >= 25000 ? 'demo-tokens hit' : 'demo-tokens'}>
          <Icon name="zap" size={12} />{tokens.toLocaleString('en-IN')} action tokens
        </span>
      </div>
      <div className="demo-body">
        <div className="msg you">Find 25 remote analyst jobs, rank them in a Sheet and draft cover letters in Docs.</div>
        <div className={p > .15 ? 'msg ai show' : 'msg ai'}>
          <span className="typing"><i /><i /><i /></span> Researching 3 sources, building your sheet…
        </div>
        <div className={p > .55 ? 'msg you show' : 'msg you'}>Add 10 more and write a second draft for #2.</div>
        <div className="demo-meter"><span style={{ width: `${Math.min(tokens / 250, 100)}%` }} /><em>25k</em></div>
        <div className="demo-apps">
          {DEMO_APPS.map((a, i) => (
            <span key={a} className={i < lit ? 'dapp on' : 'dapp'}>{a}{i < lit && <b>+₹{REWARDS.perApp}</b>}</span>
          ))}
        </div>
      </div>
      <div className="demo-foot">
        <span>Your payout</span>
        <b>₹{earned}</b>
        {approved && <span className="stamp">Approved ✓</span>}
      </div>
    </div>
  )
}

const MARQUEE = ['Gmail', 'Google Sheets', 'Google Docs', 'Notion', 'Slack', 'Google Calendar', 'Google Drive', 'Web search', 'Firecrawl', 'Exa', 'People Data Labs', 'ElevenLabs']

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="pill"><span className="live" />Paid study · open now</span>
          <h1>Earn up to <mark>₹{REWARDS.maxPerTask}</mark> for one real task with AI</h1>
          <p className="lede">Use apps you already have. Finish the task. Get paid.</p>
          <div className="cta">
            <a className="btn primary" href="#quest">Get started <Icon name="arrow" size={16} /></a>
            <a className="btn hide-phone" href="#video">Watch 1-min video</a>
          </div>
          <div className="trust">
            <span>Free to join</span>
            <span>Never asks for money</span>
            <span>Paid in 2–3 days</span>
          </div>
        </div>
        <Demo />
      </div>
      <div className="wrap">
        <div className="ladder" aria-label="Rewards">
          <div className="rung"><small>Small wins</small><b>+₹{REWARDS.perApp}</b><span>each app you use</span></div>
          <div className="rung big"><small>Main reward</small><b>₹{REWARDS.base}</b><span>task done, 25k+ tokens</span></div>
          <div className="rung"><small>Big bonus</small><b>+₹{REWARDS.streak}</b><span>at {REWARDS.streakAt} approved tasks</span></div>
        </div>
      </div>
      <div className="marquee" aria-label="Works with">
        <div className="track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => <span key={i}>{m}</span>)}
        </div>
      </div>
    </header>
  )
}

function Quest({ onOpen }) {
  const [done, setDone] = useStored('quest-done', [])
  const [apps, setApps] = useStored('quest-apps', [])
  const toggle = (set, id) => set((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]))
  const appBonus = Math.min(apps.length * REWARDS.perApp, REWARDS.appCap)
  const total = REWARDS.base + appBonus
  const progress = Math.round((done.length / QUEST.length) * 100)
  return (
    <section id="quest">
      <div className="wrap">
        <SectionHead label="How it works" title="5 steps to get paid">
          Tick each step as you go.
        </SectionHead>
        <div className="meter" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
          <span style={{ width: `${progress}%` }} />
        </div>
        <span className="label block meter-label">{done.length} of {QUEST.length} done</span>
        <ol className="quest">
          {QUEST.map((q, i) => {
            const isDone = done.includes(q.id)
            return (
              <li key={q.id} className={isDone ? 'level done' : 'level'}>
                <button type="button" className="tick" onClick={() => toggle(setDone, q.id)}
                  aria-pressed={isDone} aria-label={`Mark level ${i + 1} done`}>
                  {isDone ? <Icon name="check" size={16} /> : pad(i + 1)}
                </button>
                <div className="level-body">
                  <h3>{q.title}</h3>
                  <p>{q.hint}</p>
                  {q.img && (
                    <button type="button" className="thumb" onClick={() => onOpen({ src: q.img, alt: q.title, caption: q.title })}
                      aria-label={`Enlarge screenshot: ${q.title}`}>
                      <img src={q.img} alt="" loading="lazy" width="1800" height="1130" />
                    </button>
                  )}
                  {q.id === 'connect' && (
                    <div className="apps">
                      {BONUS_APPS.map((a) => (
                        <button type="button" key={a.id} className={apps.includes(a.id) ? 'app on' : 'app'}
                          onClick={() => toggle(setApps, a.id)} aria-pressed={apps.includes(a.id)} title={a.use}>
                          {a.name} <em>+₹{REWARDS.perApp}</em>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="level-side">
                  {q.reward && <span className="reward">{q.reward}</span>}
                  {q.href && (q.external === false
                    ? <a className="btn ghost" href={q.href}>{q.cta}</a>
                    : <Button href={q.href}>{q.cta}</Button>)}
                </div>
              </li>
            )
          })}
        </ol>
        <div className="total">
          <div>
            <span className="label">Your payout if approved</span>
            <b>₹{total}</b>
            <span className="sub">₹{REWARDS.base} base + ₹{appBonus} app bonus{apps.length * REWARDS.perApp > REWARDS.appCap ? ` (capped at ₹${REWARDS.appCap})` : ''}</span>
          </div>
          <p className="note">App bonus counts only for apps the AI <Strong>actually used</Strong> in your approved chat. Connecting alone earns nothing. Under 25,000 action tokens, nothing is paid.</p>
        </div>
      </div>
    </section>
  )
}

function Fold({ id, icon, title, children }) {
  return (
    <details className="fold" id={id}>
      <summary><Icon name="chevron" size={16} /><Icon name={icon} size={16} />{title}</summary>
      <div className="fold-body">{children}</div>
    </details>
  )
}

function Guide({ onOpen }) {
  return (
    <section id="guide">
      <div className="wrap">
        <SectionHead label="Guide" title="Need help?">Open only what you need.</SectionHead>
        <Fold id="steps" icon="image" title="Step-by-step with screenshots"><Steps onOpen={onOpen} /></Fold>
        <Fold id="tokens" icon="zap" title="How to reach 25,000 action tokens"><Tokens /></Fold>
        <Fold id="prompts" icon="copy" title="Ready prompts to copy"><Prompts /></Fold>
        <Fold id="requirements" icon="check" title="Full approval rules"><Requirements /></Fold>
        <Fold id="ideas" icon="bulb" title="More task ideas"><Ideas /></Fold>
      </div>
    </section>
  )
}

function Before() {
  return (
    <section id="start">
      <div className="wrap">
        <SectionHead label="Rules" title="Three things we check" />
        <div className="grid g3">
          {BEFORE.map((b) => (
            <div className="panel rule" key={b.title}>
              <span className="rule-icon"><Icon name={b.icon} size={20} /></span>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Payment() {
  return (
    <section id="payment">
      <div className="wrap">
        <SectionHead label="Rewards" title="How you get paid" />
        <div className="grid g4">
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

// Phones skip the video entirely (not rendered, so nothing downloads).
const PHONE = '(max-width: 640px)'
function useIsPhone() {
  const [phone, setPhone] = useState(() => window.matchMedia?.(PHONE).matches ?? false)
  useEffect(() => {
    const mq = window.matchMedia?.(PHONE)
    if (!mq) return
    const on = (e) => setPhone(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return phone
}

function Video() {
  const phone = useIsPhone()
  if (phone) return null
  return (
    <section id="video">
      <div className="wrap">
        <SectionHead label="Video" title="See it in one minute">
          Sign up, connect an app, and watch the token count grow.
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
    <>
        <p className="sub">The numbered boxes in each screenshot show exactly where to click.</p>
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
    </>
  )
}

function Tokens() {
  return (
    <>
        <p className="sub">Action tokens measure how much real work the AI does for you. Your chat must go above 25,000.</p>
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
    </>
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
    <>
        <p className="sub">Replace everything in [brackets] with your own real details. Each one writes a lot into Google Sheets, Google Docs
          or Notion, which is what grows the action-token count. Instant Tools are optional but make these richer.</p>
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
    </>
  )
}

function Requirements() {
  return (
    <>
        <p className="sub">Your task is approved and paid only if all of these are true.</p>
        <ol className="rows">
          {REQUIREMENTS.map((r, i) => (
            <li key={i}><span className="label">{pad(i + 1)}</span><div><Rich value={r} /></div></li>
          ))}
        </ol>
    </>
  )
}

function Ideas() {
  return (
    <>
                <div className="cards three">
          {IDEAS.map((idea) => (
            <div className="card static" key={idea.tag}>
              <span>{idea.text}</span>
              <span className="card-foot"><span className="label">{idea.tag}</span></span>
            </div>
          ))}
        </div>
        <p className="sub spaced">Or anything else from your own daily work. <a href={LINKS.moreIdeas} {...ext}>More ideas</a></p>
    </>
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
              You'll be asked for your name, email, phone number, UPI ID, conversation URL, token count and a short summary.
              We review every task manually. Approved tasks are paid ₹500 plus any app bonus to your bank in about 2–3 days. In the summary, list the apps the AI used.
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
      <Quest onOpen={setOpen} />
      <Video />
      <Before />
      <Payment />
      <Guide onOpen={setOpen} />
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
