import './index.css'
import {
  useEffect,
  useState,
  type FormEvent,
  type ChangeEvent,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'

// -----------------------------------------------------------------------------
// Types & Data
// -----------------------------------------------------------------------------

type Subsidiary = {
  name: string
  description: string
  url: string
  logo: 'image' | 'wordmark'
  src?: string
  glow: string
}

type TeamMember = {
  name: string
  role: string
  photo: string
  linkedin: string
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const SUBSIDIARIES: Subsidiary[] = [
  {
    name: 'Canary AI',
    description:
      'Applied AI firm for Private Equity-backed companies. We deploy AI workspaces, process automations, and software into portfolio companies to improve operations, margins and EV.',
    url: 'https://canaryai.pro',
    logo: 'image',
    src: '/logo%20canary%20(2).svg',
    glow: 'rgba(250, 191, 38, 0.95)',
  },
  {
    name: 'Columbus',
    description:
      'The AI-powered operating system for emerging private capital firms. Everything a GP needs to run their firm, raise capital, and close deals — in one place.',
    url: 'https://withcolumbus.com',
    logo: 'image',
    src: '/logo%20Columbus%20gris.png',
    glow: 'rgba(38, 99, 235, 0.85)',
  },
]

const TEAM: TeamMember[] = [
  {
    name: 'Álvaro Toledo',
    role: 'Co-Founder & Managing Partner',
    photo: '/alvaro.png',
    linkedin: 'https://linkedin.com/in/toledotauler/',
  },
  {
    name: 'Manuel Toledo',
    role: 'Co-Founder & Managing Partner',
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
  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 md:px-10 py-4 sm:py-5 flex items-center justify-between gap-3 backdrop-blur-md bg-[#080A4C]/40"
    >
      <a href="#top" className="flex items-center shrink-0" aria-label="Tauler Group">
        <img
          src="/loto%20tauler%20white.png"
          alt="Tauler Group"
          className="h-6 sm:h-7 md:h-8 w-auto"
        />
      </a>
      <ul
        className="flex items-center gap-4 sm:gap-6 md:gap-10 text-[12px] sm:text-[13px] md:text-[14px] font-normal tracking-[-0.005em] text-white"
      >
        <li>
          <a
            href="#what-we-do"
            className="hover:opacity-50 transition-opacity duration-300"
          >
            What we do
          </a>
        </li>
        <li>
          <a
            href="#team"
            className="hover:opacity-50 transition-opacity duration-300"
          >
            Leadership
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="hover:opacity-50 transition-opacity duration-300"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  )
}

// -----------------------------------------------------------------------------
// Hero / Portfolio
// -----------------------------------------------------------------------------

function SubsidiaryLogo({ subsidiary }: { subsidiary: Subsidiary }) {
  const [open, setOpen] = useState(false)

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
          {subsidiary.description}
        </p>
        <a
          href={subsidiary.url}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto inline-block font-sans text-[13px] text-white border-b border-white/60 pb-0.5 hover:opacity-50 transition-opacity duration-300"
        >
          Visit ↗
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
  return (
    <section
      id="what-we-do"
      className="relative text-white px-6 py-32 md:py-40 lg:py-[160px]"
    >
      <div className="max-w-[1100px] mx-auto">
        <p className="display-tight text-white text-center text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] leading-[1.15]">
          We build and operate AI-first companies, focusing on real impact in
          real industries.
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
  return (
    <section id="team" className="relative px-6 py-28 md:py-36">
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="display-tight text-white text-6xl md:text-7xl lg:text-8xl leading-[0.9]">
            Leadership
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
                {m.role}
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
            Let's
            <br />
            talk.
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10 pt-2">
          <Field
            id="name"
            label="Name"
            required
            value={data.name}
            onChange={handleChange}
          />
          <Field
            id="email"
            label="Email"
            type="email"
            required
            value={data.email}
            onChange={handleChange}
          />
          <Field
            id="message"
            label="Message"
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
              {status === 'loading' ? 'Sending…' : 'Send →'}
            </button>
            {status === 'success' && (
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/60">
                Message sent
              </span>
            )}
            {status === 'error' && (
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/60">
                Try again
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

const LEGAL: Record<LegalDoc, { title: string; body: ReactNode }> = {
  privacidad: {
    title: 'Privacy and Data Protection Policy',
    body: (
      <>
        <p className="legal-meta">Last updated: 15/09/2025</p>

        <h3>1. Data Controller</h3>
        <p>TAULER GROUP VENTURES S.L.</p>
        <p>Address: Plaza Curtidos Hnos. Dorta, 7 - 38005, Santa Cruz de Tfe.</p>
        <p>Email: info@taulergroup.com</p>
        <p>Tax ID (CIF): B21742259</p>

        <h3>2. Purpose of Processing</h3>
        <p>Your data will be processed for the following purposes:</p>
        <ul>
          <li>Managing the commercial relationship and provision of services</li>
          <li>Sending commercial communications about our services</li>
          <li>Responding to your enquiries and requests</li>
          <li>Improving our services and the user experience</li>
        </ul>

        <h3>3. Legal Basis</h3>
        <p>The processing of your data is based on:</p>
        <ul>
          <li>The performance of a contract or commercial relationship</li>
          <li>The user's consent</li>
          <li>The legitimate interest of the controller</li>
        </ul>

        <h3>4. Data Retention</h3>
        <p>
          Personal data will be retained for as long as the commercial
          relationship continues and erasure is not requested, and where
          applicable, for the years necessary to comply with legal
          obligations.
        </p>

        <h3>5. Recipients</h3>
        <p>
          Your data will not be shared with third parties except where
          required by law or where necessary for the provision of the
          requested services.
        </p>

        <h3>6. Rights</h3>
        <p>
          You may exercise your rights of access, rectification, erasure,
          restriction, portability and objection by writing to
          info@taulergroup.com
        </p>

        <h3>7. Supervisory Authority</h3>
        <p>
          You may file a complaint with the Spanish Data Protection Agency
          (www.aepd.es) if you consider that the processing does not comply
          with applicable law.
        </p>
      </>
    ),
  },
  cookies: {
    title: 'Cookie Policy',
    body: (
      <>
        <p className="legal-meta">Last updated: 15/09/2025</p>

        <h3>What are cookies?</h3>
        <p>
          Cookies are small text files stored on your device when you visit
          our website. They allow us to recognise your browser and, if you
          have a registered account, link it to that account to provide a
          personalised experience.
        </p>

        <h3>Types of cookies we use</h3>

        <h4>Technical cookies (necessary)</h4>
        <ul>
          <li>Enable browsing and the use of basic functionalities</li>
          <li>Are essential for the website to operate</li>
        </ul>

        <h4>Analytical cookies</h4>
        <ul>
          <li>Allow us to analyse the use of the website to improve our services</li>
          <li>We use Google Analytics and other tools</li>
        </ul>

        <h4>Preference cookies</h4>
        <ul>
          <li>Allow us to remember information to improve your experience</li>
          <li>Such as your preferred language or your region</li>
        </ul>

        <h3>How to manage cookies</h3>
        <p>
          You can configure your browser to reject all cookies or to receive
          a notice when a cookie is sent. However, if you reject cookies,
          some parts of our website may not function correctly.
        </p>
        <p>
          Most browsers accept cookies automatically, but you can change
          your browser settings to reject them if you prefer.
        </p>

        <h3>Further information</h3>
        <p>
          For more information about our use of cookies and your rights,
          please contact us at info@taulergroup.com
        </p>
      </>
    ),
  },
  aviso: {
    title: 'Legal Notice',
    body: (
      <>
        <h3>Company Information</h3>
        <p>This website is owned by TAULER GROUP VENTURES S.L.</p>
        <p>Tax ID (CIF): B21742259</p>
        <p>
          Registered address: Plaza Curtidos Hnos. Dorta, 7 - 38005, Santa
          Cruz de Tfe.
        </p>
        <p>
          For any enquiries or proposals, contact us at:
          info@taulergroup.com
        </p>

        <h3>Applicable Law</h3>
        <p>
          The website is governed exclusively by the laws applicable in
          Spain and within the European Union, and is binding on both
          nationals and foreign visitors who use this website.
        </p>

        <h3>Terms of Use</h3>
        <p>
          Access to our website by the USER is free of charge and is
          conditional on the prior reading and full, express and
          unreserved acceptance of this Legal Notice in force at the time
          of access, which we kindly ask you to read carefully.
        </p>
        <p>
          By using our portal and its contents or services, the USER
          expressly accepts and submits to its General Terms of Use. If
          the USER does not agree with these Terms of Use, they must
          refrain from using this portal and operating through it.
        </p>
        <p>
          We may at any time modify the presentation and configuration of
          our website, expand or reduce services, and even withdraw it
          from the network, as well as the services and content provided,
          all unilaterally and without prior notice.
        </p>

        <h3>Intellectual Property</h3>
        <p>
          The website, including by way of example but not limited to its
          programming, editing, compilation and other elements necessary
          for its operation, the designs, logos, text and/or graphics are
          the property of the provider or, where applicable, the provider
          holds a licence or express authorisation from the authors. All
          content on the website is duly protected by intellectual and
          industrial property regulations.
        </p>
        <p>
          Regardless of the purpose for which they were intended, total or
          partial reproduction, use, exploitation, distribution and
          commercialisation in all cases require prior written
          authorisation from the provider. Any use not previously
          authorised by the provider shall be considered a serious
          infringement of the author's intellectual or industrial property
          rights.
        </p>
        <p>
          Any designs, logos, text and/or graphics not belonging to the
          provider that may appear on the website belong to their
          respective owners, who are themselves responsible for any
          dispute that may arise in relation to them. In any case, the
          provider has the express prior authorisation of these owners.
        </p>
        <p>
          The provider does not permit third parties to redirect directly
          to specific content of the website without express
          authorisation. In any case, where permission is granted, the
          link must redirect to the provider's main website.
        </p>
        <p>
          The provider acknowledges the corresponding industrial and
          intellectual property rights in favour of their respective
          holders, and the mere mention or appearance of such rights on
          the website does not imply the existence of any rights or
          liability on the part of the provider, nor any endorsement,
          sponsorship or recommendation by the provider.
        </p>
        <p>
          For any observation regarding possible infringements of
          intellectual or industrial property rights, or regarding any of
          the content of the website, you can do so via the following
          email address: info@taulergroup.com
        </p>

        <h3>General Conditions of Use</h3>
        <p>
          Access to our website is free and does not require prior
          subscription or registration. The USER must access it in good
          faith, in accordance with public order rules and these General
          Conditions of Use. Access to our website is undertaken at the
          USER's sole and exclusive responsibility, who shall refrain from
          using any of the services for unlawful, prohibited purposes or
          purposes detrimental to third-party rights, being liable in any
          case for any damages they may cause to third parties or to us.
        </p>
        <p>
          Given the impossibility of controlling the information, content
          and services contained in other websites accessible through
          links that our website may make available, we inform you that
          we are released from any liability for damages of any kind that
          may arise from the USER's use of those websites belonging to
          others.
        </p>
        <p>
          You can find more information about how we use your personal
          data in the Privacy Policy on our website.
        </p>
      </>
    ),
  },
}

function LegalModal({
  doc,
  onClose,
}: {
  doc: LegalDoc | null
  onClose: () => void
}) {
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
  const { title, body } = LEGAL[doc]

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
        We use technical cookies necessary for the site to function. We do
        not use analytical or advertising cookies without your consent.
        Read more in our{' '}
        <button
          type="button"
          onClick={() => onOpenLegal('cookies')}
          className="underline hover:opacity-60 transition-opacity"
        >
          Cookie Policy
        </button>
        .
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => decide('rejected')}
          className="flex-1 text-[11px] uppercase tracking-[0.2em] border border-[#0A0A0A] px-3 py-2.5 hover:bg-[#0A0A0A] hover:text-white transition-colors"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={() => decide('accepted')}
          className="flex-1 text-[11px] uppercase tracking-[0.2em] bg-[#0A0A0A] text-white px-3 py-2.5 hover:opacity-80 transition-opacity"
        >
          Accept
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
  onOpenLegal: (d: LegalDoc) => void
}) {
  return (
    <footer className="relative z-10 px-5 sm:px-6 md:px-10 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
      <span>© 2025 Tauler Group</span>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        <button
          type="button"
          onClick={() => onOpenLegal('aviso')}
          className="hover:text-white transition-colors"
        >
          Legal Notice
        </button>
        <button
          type="button"
          onClick={() => onOpenLegal('privacidad')}
          className="hover:text-white transition-colors"
        >
          Privacy
        </button>
        <button
          type="button"
          onClick={() => onOpenLegal('cookies')}
          className="hover:text-white transition-colors"
        >
          Cookies
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
      <Team />
      <Contact />
      <Footer onOpenLegal={setLegalDoc} />
      <CookieBanner onOpenLegal={setLegalDoc} />
      <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />
    </main>
  )
}
