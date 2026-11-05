import { LINKS, STATS, BEFORE, APPS, STEPS, REQUIREMENTS, IDEAS } from './content'

const ext = { target: '_blank', rel: 'noopener noreferrer' }
const pad = (n) => String(n).padStart(2, '0')
const Strong = ({ children }) => <strong style={{ color: 'var(--fg)', fontWeight: 500 }}>{children}</strong>

function Rich({ value }) {
  if (typeof value === 'string') return value
  return value.map((part, i) => {
    if (typeof part === 'string') return <span key={i}>{part}</span>
    if (part.strong) return <Strong key={i}>{part.strong}</Strong>
    return <a key={i} href={part.href} {...ext}>{part.text}</a>
  })
}

function Button({ href, primary, small, children, external = true }) {
  const cls = ['btn', primary && 'primary', small && 'sm'].filter(Boolean).join(' ')
  return (
    <a className={cls} href={href} {...(external ? ext : {})}>
      {children} <span className="arrow">→</span>
    </a>
  )
}

function SectionHead({ n, children }) {
  return (
    <div className="sec-head">
      <span className="mono">{pad(n)}</span>
      <h2>{children}</h2>
    </div>
  )
}

function Nav() {
  return (
    <nav>
      <div className="wrap">
        <a className="logo" href="#top"><i />BENCHCHAT STUDY</a>
        <div className="links">
          <a href="#start">Before you start</a>
          <a href="#steps">Steps</a>
          <a href="#requirements">Requirements</a>
          <a href="#ideas">Ideas</a>
        </div>
        <Button href={LINKS.form} primary small>Submit</Button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap">
        <span className="eyebrow mono"><span className="dot" />Study instructions</span>
        <h1>Do one real task with an AI assistant — <mark>start to finish.</mark></h1>
        <p className="lede">
          Give BenchChat a realistic, multi-step knowledge-work task from your work or daily life, work with it over many
          messages until it's fully done, then send us your conversation.
        </p>
        <div className="cta">
          <Button href={LINKS.bench} primary>Open BenchChat</Button>
          <a className="btn" href="#steps">Read the steps</a>
        </div>
        <div className="stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label}><span className="mono">{s.label}</span><b>{s.value}</b></div>
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
        <SectionHead n={1}>Before you start — please read</SectionHead>
        <div className="grid g3">
          {BEFORE.map((b) => (
            <div className="cell warn" key={b.title}>
              <span className="mono">{b.tag}</span>
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
          <SectionHead n={2}>What this study is about</SectionHead>
          <p>
            <a href={LINKS.bench} {...ext}>BenchChat</a> is an AI assistant that can actually do work for you inside your
            apps — read and write emails, create documents, update spreadsheets, check your calendar, research the web and more.
          </p>
          <p>
            <Strong>Your job:</Strong> give it a realistic, complex and substantial knowledge-work task from your work or
            daily life, and work with it over many messages until the task is fully done.
          </p>
        </div>
        <div>
          <span className="mono" style={{ color: 'var(--fg-3)', display: 'block', margin: '6px 0 14px' }}>Apps you can connect</span>
          <div className="chips">{APPS.map((a) => <span className="chip" key={a}>{a}</span>)}</div>
        </div>
      </div>
    </section>
  )
}

function Steps() {
  return (
    <section id="steps">
      <div className="wrap">
        <SectionHead n={3}>Step-by-step: how to do it</SectionHead>
        <div className="steps">
          {STEPS.map((s, i) => (
            <div className="step" key={s.title}>
              <div className="num">{pad(i + 1)}</div>
              <div className="body">
                <h3>{s.title}{s.optional && <span className="tag mono">Optional</span>}</h3>
                <ul>{s.bullets.map((b, j) => <li key={j}><Rich value={b} /></li>)}</ul>
                {s.tip && <div className="tip">{s.tip}</div>}
                {s.formButton && (
                  <div className="step-cta"><Button href={LINKS.form} small>Open the submission form</Button></div>
                )}
              </div>
            </div>
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
        <SectionHead n={4}>Requirements for approval</SectionHead>
        <p style={{ marginBottom: 24 }}>Your submission is approved only if <Strong>all</Strong> of these are true:</p>
        <div className="grid g2 req">
          {REQUIREMENTS.map((r, i) => (
            <div className="cell" key={i}><span className="check">{i + 1}</span><div>{r}</div></div>
          ))}
          <div className="cell">
            <span className="check" style={{ borderColor: 'var(--line-2)', color: 'var(--fg-3)' }}>i</span>
            <div>We review every conversation manually. Payments might take 2–3 days to complete.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Ideas() {
  return (
    <section id="ideas">
      <div className="wrap">
        <SectionHead n={5}>Task ideas</SectionHead>
        <div className="ideas">
          {IDEAS.map((idea) => (
            <div className="idea" key={idea.tag}><span className="mono">{idea.tag}</span>{idea.text}</div>
          ))}
        </div>
        <p className="more">Or anything else from your own daily work. <a href={LINKS.moreIdeas} {...ext}>More ideas →</a></p>
      </div>
    </section>
  )
}

function SubmitBand() {
  const checks = ['Your task is complete and successful.', 'The action-token count is above 25,000.', "You've copied your BenchChat conversation URL."]
  return (
    <section className="band" id="submit">
      <div className="wrap">
        <div className="box">
          <div>
            <span className="mono" style={{ color: 'var(--fg-3)' }}>Finished?</span>
            <h2 style={{ margin: '12px 0 16px' }}>Submit your conversation</h2>
            <ul>{checks.map((c, i) => <li key={i}><span className="mono">{pad(i + 1)}</span>{c}</li>)}</ul>
          </div>
          <div>
            <Button href={LINKS.form} primary>Open the submission form</Button>
            <p className="note">
              You'll be asked for your name, email, phone number, UPI ID, conversation URL, token count and a short summary.
              Payments might take 2–3 days to complete.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Before />
      <About />
      <Steps />
      <Requirements />
      <Ideas />
      <SubmitBand />
      <footer>
        <div className="wrap mono">
          <span>BenchChat study</span>
          <span>Every conversation is reviewed manually</span>
        </div>
      </footer>
    </>
  )
}
