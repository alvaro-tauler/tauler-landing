import './index.css'
import {
  useEffect,
  useState,
  type FormEvent,
  type ChangeEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { useI18n, LanguageSwitch } from './i18n'

// -----------------------------------------------------------------------------
// Types & Data
// -----------------------------------------------------------------------------

type SubsidiaryKey = 'canary' | 'columbus'

type Subsidiary = {
  key: SubsidiaryKey
  name: string
  url: string
  logo: 'image' | 'wordmark'
  src?: string
  glow: string
}

type TeamMember = {
  name: string
  photo: string
  linkedin: string
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const SUBSIDIARIES: Subsidiary[] = [
  {
    key: 'canary',
    name: 'Canary AI',
    url: 'https://canaryai.pro',
    logo: 'image',
    src: '/logo%20canary%20(2).svg',
    glow: 'rgba(250, 191, 38, 0.95)',
  },
  {
    key: 'columbus',
    name: 'Columbus',
    url: 'https://withcolumbus.com',
    logo: 'image',
    src: '/logo%20Columbus%20gris.png',
    glow: 'rgba(38, 99, 235, 0.85)',
  },
]

const TEAM: TeamMember[] = [
  {
    name: 'Álvaro Toledo',
    photo: '/alvaro.png',
    linkedin: 'https://linkedin.com/in/toledotauler/',
  },
  {
    name: 'Manuel Toledo',
    photo: '/manuel.png',
    linkedin: 'https://linkedin.com/in/manueltoledotauler/',
  },
]

// -----------------------------------------------------------------------------
// Brand glare — soft pulsing color layers in Tauler blue + red
// -----------------------------------------------------------------------------

type GlareSpot = {
  color: 'white' | 'red'
  pos: { left?: string; right?: string; top?: string; bottom?: string }
  delay?: string
}

const PAGE_GLARES: GlareSpot[] = [
  { color: 'white', pos: { left: '15%', top: '8%' }, delay: '0s' },
  { color: 'red', pos: { right: '8%', top: '22%' }, delay: '-2s' },
  { color: 'white', pos: { right: '-5%', top: '48%' }, delay: '-4s' },
  { color: 'red', pos: { left: '5%', top: '62%' }, delay: '-6s' },
  { color: 'white', pos: { left: '35%', bottom: '8%' }, delay: '-1.5s' },
  { color: 'red', pos: { right: '15%', bottom: '20%' }, delay: '-3.5s' },
]

function PageGlares() {
  return (
    <div className="page-glare-layer" aria-hidden>
      {PAGE_GLARES.map((g, i) => (
        <div
          key={i}
          className={`glare glare-${g.color}`}
          style={{ ...g.pos, animationDelay: g.delay }}
        />
      ))}
    </div>
  )
}

// -----------------------------------------------------------------------------
// Navbar — fixed, color-aware over the dark section
// -----------------------------------------------------------------------------

function Navbar() {
  const { d } = useI18n()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const links = [
    { href: '#what-we-do', label: d.nav.whatWeDo },
    { href: '#pe-practice', label: d.nav.peP },
    { href: '#team', label: d.nav.leadership },
    { href: '#contact', label: d.nav.contact },
  ]

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 md:px-10 py-4 sm:py-5 flex items-center justify-between gap-3 backdrop-blur-md bg-[#080A4C]/40">
        <a
          href="#top"
          className="flex items-center shrink-0"
          aria-label="Tauler Group"
        >
          <img
            src="/loto%20tauler%20white.png"
            alt="Tauler Group"
            className="h-6 sm:h-7 md:h-8 w-auto"
          />
        </a>

        <ul className="hidden md:flex items-center gap-6 md:gap-10 text-[13px] md:text-[14px] font-normal tracking-[-0.005em] text-white">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="hover:opacity-50 transition-opacity duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <LanguageSwitch />
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
          aria-label={d.nav.menu}
        >
          <span className="block w-6 h-px bg-white" />
          <span className="block w-6 h-px bg-white" />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-[80] md:hidden bg-[#080A4C] transition-opacity duration-300 ${
          open
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <img
            src="/loto%20tauler%20white.png"
            alt="Tauler Group"
            className="h-6 w-auto"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-white text-2xl leading-none p-2 -mr-2"
            aria-label={d.nav.close}
          >
            ×
          </button>
        </div>
        <ul className="flex flex-col items-center justify-center gap-10 mt-20 text-white">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-sans text-3xl tracking-[-0.02em]"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="mt-6">
            <LanguageSwitch />
          </li>
        </ul>
      </div>
    </>
  )
}

// -----------------------------------------------------------------------------
// Hero / Portfolio
// -----------------------------------------------------------------------------

function SubsidiaryLogo({ subsidiary }: { subsidiary: Subsidiary }) {
  const { d } = useI18n()
  const [open, setOpen] = useState(false)
  const description = d.subsidiaries[subsidiary.key]

  return (
    <div
      className="relative w-[280px] sm:w-[300px] md:w-auto flex flex-col items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
    >
      <div
        className={`logo-glow ${open ? 'is-on' : ''}`}
        style={{ ['--glow-color' as string]: subsidiary.glow }}
        aria-hidden
      />

      <div className="beam-hit hidden md:block" aria-hidden />

      <button
        type="button"
        className={`relative z-10 block focus:outline-none cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'scale-110' : 'scale-100'
        }`}
        aria-label={subsidiary.name}
      >
        {subsidiary.logo === 'image' ? (
          <img
            src={subsidiary.src}
            alt={subsidiary.name}
            className={`w-[150px] md:w-[180px] h-auto opacity-85 hover:opacity-100 transition-opacity duration-500 ${
              subsidiary.name === 'Columbus'
                ? '[filter:brightness(0)_invert(1)]'
                : 'grayscale invert'
            }`}
          />
        ) : (
          <span
            className="block w-[150px] md:w-[180px] text-center font-sans text-white text-[24px] md:text-[28px] font-medium leading-none tracking-[-0.04em] opacity-90 hover:opacity-100 transition-opacity duration-500"
          >
            {subsidiary.name}
          </span>
        )}
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative mt-4 w-full max-w-[280px] sm:max-w-[300px] md:absolute md:left-1/2 md:top-full md:mt-8 md:-translate-x-1/2 md:w-[340px] md:max-w-none z-20 text-center overflow-hidden md:overflow-visible transition-all duration-500 md:duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto max-h-[400px] md:max-h-none'
            : 'opacity-0 -translate-y-1 pointer-events-none max-h-0 md:max-h-none'
        }`}
      >
        <p className="font-sans text-white/85 text-[14px] leading-[1.55] mb-5 tracking-[-0.005em]">
          {description}
        </p>
        <a
          href={subsidiary.url}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto inline-block font-sans text-[13px] text-white border-b border-white/60 pb-0.5 hover:opacity-50 transition-opacity duration-300"
        >
          {d.hero.visit}
        </a>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6"
    >
      <div className="relative z-10 reveal reveal-d2">
        <img
          src="/loto%20tauler%20white.png"
          alt="Tauler Group"
          className="w-[360px] sm:w-[460px] md:w-[560px] lg:w-[680px] h-auto"
        />
      </div>

      <div className="relative z-10 mt-16 md:mt-24 flex flex-col md:flex-row items-center gap-14 md:gap-24 reveal reveal-d3">
        {SUBSIDIARIES.map((s) => (
          <SubsidiaryLogo key={s.name} subsidiary={s} />
        ))}
      </div>

    </section>
  )
}

// -----------------------------------------------------------------------------
// What We Do
// -----------------------------------------------------------------------------

function WhatWeDo() {
  const { d } = useI18n()
  return (
    <section
      id="what-we-do"
      className="relative text-white px-6 py-32 md:py-40 lg:py-[160px]"
    >
      <div className="max-w-[1100px] mx-auto">
        <p className="display-tight text-white text-center text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] leading-[1.15]">
          {d.whatWeDo}
        </p>
      </div>

    </section>
  )
}

// -----------------------------------------------------------------------------
// PE Practice
// -----------------------------------------------------------------------------

function PEPractice() {
  const { d } = useI18n()
  return (
    <section
      id="pe-practice"
      className="relative text-white px-6 py-28 md:py-36"
    >
      <div className="relative z-10 max-w-[1100px] mx-auto text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60 mb-8">
          {d.peP.eyebrow}
        </p>
        <h2 className="display-tight text-white text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-10 md:mb-12">
          {d.peP.headlineLine1}
          <br />
          {d.peP.headlineLine2}
        </h2>
        <p className="font-sans text-white/80 text-[16px] md:text-[18px] leading-[1.6] tracking-[-0.005em] max-w-[760px] mx-auto">
          {d.peP.body}
        </p>
      </div>
    </section>
  )
}

// -----------------------------------------------------------------------------
// Team
// -----------------------------------------------------------------------------

function LinkedInIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  )
}

function Team() {
  const { d } = useI18n()
  return (
    <section id="team" className="relative px-6 py-28 md:py-36">
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="display-tight text-white text-6xl md:text-7xl lg:text-8xl leading-[0.9]">
            {d.leadership.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-3xl mx-auto">
          {TEAM.map((m) => (
            <article
              key={m.name}
              className="flex flex-col items-center text-center"
            >
              <div className="relative w-52 h-52 md:w-60 md:h-60 rounded-full overflow-hidden bg-white/5 border border-white/15">
                <img
                  src={m.photo}
                  alt={m.name}
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <h3 className="mt-8 font-sans font-medium text-2xl md:text-[28px] text-white leading-none tracking-[-0.03em]">
                {m.name}
              </h3>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
                {d.leadership.role}
              </p>
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${m.name} on LinkedIn`}
                className="mt-5 text-white/60 hover:text-white transition-colors duration-300"
              >
                <LinkedInIcon />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// -----------------------------------------------------------------------------
// Contact
// -----------------------------------------------------------------------------

function Field({
  id,
  label,
  type = 'text',
  required,
  value,
  onChange,
  multiline,
}: {
  id: string
  label: string
  type?: string
  required?: boolean
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  multiline?: boolean
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/60 mb-3"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          required={required}
          rows={3}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent border-0 border-b border-white/25 focus:border-white outline-none py-2 text-white resize-none transition-colors duration-300 font-sans text-base placeholder:text-white/40"
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent border-0 border-b border-white/25 focus:border-white outline-none py-2 text-white transition-colors duration-300 font-sans text-base placeholder:text-white/40"
        />
      )}
    </div>
  )
}

function Contact() {
  const { d } = useI18n()
  const [data, setData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const portalId = '146295013'
    const formId = 'e3c23dc7-21b0-48b2-99b1-e574824b6d49'

    const payload = {
      fields: [
        {
          objectTypeId: '0-1',
          name: 'firstname',
          value: data.name.split(' ')[0] || data.name,
        },
        {
          objectTypeId: '0-1',
          name: 'lastname',
          value: data.name.split(' ').slice(1).join(' ') || '',
        },
        { objectTypeId: '0-1', name: 'email', value: data.email },
        {
          objectTypeId: '0-1',
          name: 'en_que_podemos_ayudarte',
          value: data.message,
        },
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    }

    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      )
      if (!res.ok) throw new Error('Form submission failed')
      setStatus('success')
      setData({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      className="relative px-6 py-28 md:py-36"
    >
      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-24 items-start">
        <div>
          <h2 className="display-tight text-white text-6xl md:text-7xl lg:text-8xl leading-[0.9]">
            {d.contact.title}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10 pt-2">
          <Field
            id="name"
            label={d.contact.name}
            required
            value={data.name}
            onChange={handleChange}
          />
          <Field
            id="email"
            label={d.contact.email}
            type="email"
            required
            value={data.email}
            onChange={handleChange}
          />
          <Field
            id="message"
            label={d.contact.message}
            required
            multiline
            value={data.message}
            onChange={handleChange}
          />

          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="font-mono text-[11px] uppercase tracking-[0.32em] text-white border border-white px-9 py-4 hover:bg-white hover:text-[#080A4C] transition-colors duration-300 disabled:opacity-40"
            >
              {status === 'loading' ? d.contact.sending : d.contact.send}
            </button>
            {status === 'success' && (
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/60">
                {d.contact.sent}
              </span>
            )}
            {status === 'error' && (
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/60">
                {d.contact.retry}
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

// -----------------------------------------------------------------------------
// Legal — Aviso legal, Privacidad, Cookies (LSSI-CE / RGPD)
// -----------------------------------------------------------------------------

type LegalDoc = 'aviso' | 'privacidad' | 'cookies'


function LegalModal({
  doc,
  onClose,
}: {
  doc: LegalDoc | null
  onClose: () => void
}) {
  const { d } = useI18n()

  useEffect(() => {
    if (!doc) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [doc, onClose])

  if (!doc) return null
  const { title, body } = d.legal[doc]

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center px-4 py-6 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-title"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white max-w-2xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8 md:p-12 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#666666] hover:text-[#0A0A0A] transition-colors text-xl"
        >
          ×
        </button>
        <h2
          id="legal-title"
          className="display-tight text-2xl sm:text-3xl md:text-4xl text-[#0A0A0A] mb-6"
        >
          {title}
        </h2>
        <div className="legal-body text-[#333333] text-[14px] leading-[1.65] space-y-3">
          {body}
        </div>
      </div>
    </div>,
    document.body,
  )
}

function CookieBanner({
  onOpenLegal,
}: {
  onOpenLegal: (d: LegalDoc) => void
}) {
  const { d } = useI18n()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem('tg-cookie-decision')) setShown(true)
    } catch {
      setShown(true)
    }
  }, [])

  const decide = (val: 'accepted' | 'rejected') => {
    try {
      localStorage.setItem('tg-cookie-decision', val)
    } catch {
      /* ignore */
    }
    setShown(false)
  }

  if (!shown) return null

  return (
    <div className="fixed left-3 right-3 bottom-3 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-[90] bg-white border border-black/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] p-5">
      <p className="text-[13px] leading-[1.55] text-[#0A0A0A] mb-4">
        {d.cookies.text}{' '}
        <button
          type="button"
          onClick={() => onOpenLegal('cookies')}
          className="underline hover:opacity-60 transition-opacity"
        >
          {d.cookies.cookiePolicyLink}
        </button>
        .
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => decide('rejected')}
          className="flex-1 text-[11px] uppercase tracking-[0.2em] border border-[#0A0A0A] px-3 py-2.5 hover:bg-[#0A0A0A] hover:text-white transition-colors"
        >
          {d.cookies.reject}
        </button>
        <button
          type="button"
          onClick={() => decide('accepted')}
          className="flex-1 text-[11px] uppercase tracking-[0.2em] bg-[#0A0A0A] text-white px-3 py-2.5 hover:opacity-80 transition-opacity"
        >
          {d.cookies.accept}
        </button>
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------------
// Footer
// -----------------------------------------------------------------------------

function Footer({
  onOpenLegal,
}: {
  onOpenLegal: (doc: LegalDoc) => void
}) {
  const { d } = useI18n()
  return (
    <footer className="relative z-10 px-5 sm:px-6 md:px-10 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
      <span>{d.footer.copyright}</span>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        <button
          type="button"
          onClick={() => onOpenLegal('aviso')}
          className="hover:text-white transition-colors"
        >
          {d.footer.legalNotice}
        </button>
        <button
          type="button"
          onClick={() => onOpenLegal('privacidad')}
          className="hover:text-white transition-colors"
        >
          {d.footer.privacy}
        </button>
        <button
          type="button"
          onClick={() => onOpenLegal('cookies')}
          className="hover:text-white transition-colors"
        >
          {d.footer.cookies}
        </button>
      </div>
    </footer>
  )
}

// -----------------------------------------------------------------------------
// App
// -----------------------------------------------------------------------------

export default function App() {
  const [legalDoc, setLegalDoc] = useState<LegalDoc | null>(null)
  return (
    <main className="relative bg-[#080A4C] text-white font-sans overflow-hidden">
      <PageGlares />
      <Navbar />
      <Hero />
      <WhatWeDo />
      <PEPractice />
      <Team />
      <Contact />
      <Footer onOpenLegal={setLegalDoc} />
      <CookieBanner onOpenLegal={setLegalDoc} />
      <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />
    </main>
  )
}
