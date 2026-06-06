import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type Lang = 'es' | 'en'

const STORAGE_KEY = 'tg-lang'

const SPANISH_COUNTRIES = new Set([
  'ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU',
  'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'PR',
])

// -----------------------------------------------------------------------------
// Dictionary
// -----------------------------------------------------------------------------

type Dict = {
  nav: {
    whatWeDo: string
    peP: string
    leadership: string
    contact: string
    menu: string
    close: string
  }
  hero: {
    visit: string
  }
  subsidiaries: {
    canary: string
    columbus: string
  }
  whatWeDo: string
  peP: {
    eyebrow: string
    headlineLine1: string
    headlineLine2: string
    body: string
  }
  leadership: {
    title: string
    role: string
  }
  contact: {
    title: ReactNode
    name: string
    email: string
    message: string
    send: string
    sending: string
    sent: string
    retry: string
  }
  footer: {
    copyright: string
    legalNotice: string
    privacy: string
    cookies: string
  }
  cookies: {
    text: string
    cookiePolicyLink: string
    reject: string
    accept: string
  }
  legal: {
    aviso: { title: string; body: ReactNode }
    privacidad: { title: string; body: ReactNode }
    cookies: { title: string; body: ReactNode }
  }
}

const DICT: Record<Lang, Dict> = {
  es: {
    nav: {
      whatWeDo: 'Qué hacemos',
      peP: 'PE Practice',
      leadership: 'Equipo',
      contact: 'Contacto',
      menu: 'Menú',
      close: 'Cerrar',
    },
    hero: { visit: 'Visitar ↗' },
    subsidiaries: {
      canary:
        'Pon la IA a trabajar donde tu negocio pierde tiempo y margen. Desplegamos AI workspaces, automatizaciones de procesos y software a medida en compañías que quieren operar más rápido sin montar un equipo de IA.',
      columbus:
        'El sistema operativo con IA para firmas emergentes de capital privado. Todo lo que un GP necesita para gestionar su firma, levantar capital y cerrar deals — en un solo lugar.',
    },
    whatWeDo:
      'Construimos y operamos compañías AI-first, con foco en impacto real en industrias reales.',
    peP: {
      eyebrow: 'PE Practice',
      headlineLine1: 'Creación de valor con IA',
      headlineLine2: 'en participadas.',
      body: 'Nos asociamos con firmas de Private Equity para crear valor en sus participadas con inteligencia artificial. Diagnosticamos dónde está el valor atrapado, ejecutamos las iniciativas que lo liberan, y estructuramos la relación de forma flexible: fee por proyecto, éxito sobre métricas concretas, o carry compartido. Nos alineamos con el retorno del fondo.',
    },
    leadership: {
      title: 'Equipo',
      role: 'Co-Founder & Managing Partner',
    },
    contact: {
      title: (
        <>
          Hablemos.
        </>
      ),
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      send: 'Enviar →',
      sending: 'Enviando…',
      sent: 'Mensaje enviado',
      retry: 'Inténtalo de nuevo',
    },
    footer: {
      copyright: '© 2025 Tauler Group',
      legalNotice: 'Aviso legal',
      privacy: 'Privacidad',
      cookies: 'Cookies',
    },
    cookies: {
      text: 'Usamos cookies técnicas necesarias para el funcionamiento del sitio. No usamos cookies analíticas ni publicitarias sin tu consentimiento. Más información en nuestra',
      cookiePolicyLink: 'Política de Cookies',
      reject: 'Rechazar',
      accept: 'Aceptar',
    },
    legal: {
      aviso: {
        title: 'Aviso Legal',
        body: (
          <>
            <h3>Datos de la Empresa</h3>
            <p>Esta página web es propiedad de TAULER GROUP VENTURES S.L.</p>
            <p>CIF: B21742259</p>
            <p>
              Domicilio social: Plaza Curtidos Hnos. Dorta, 7 - 38005, Santa
              Cruz de Tfe.
            </p>
            <p>Para cualquier consulta o propuesta: info@taulergroup.com</p>

            <h3>Normativa Aplicable</h3>
            <p>
              La página web se rige por la normativa exclusivamente aplicable
              en España y en el espacio que comprende la Unión Europea,
              quedando sometidos a ella tanto nacionales como extranjeros que
              utilicen esta web.
            </p>

            <h3>Condiciones de Uso</h3>
            <p>
              El acceso a nuestra página web por parte del USUARIO es gratuito
              y está condicionado a la previa lectura y aceptación íntegra,
              expresa y sin reservas del presente Aviso Legal vigente en el
              momento del acceso, que rogamos lea detenidamente.
            </p>
            <p>
              El USUARIO, en el momento que utiliza nuestro portal y sus
              contenidos o servicios, acepta y se somete expresamente a las
              Condiciones Generales de uso de este. Si no estuviera de
              acuerdo, deberá abstenerse de utilizar este portal.
            </p>
            <p>
              En cualquier momento podremos modificar la presentación y
              configuración de nuestra Web, ampliar o reducir servicios, e
              incluso suprimirla de la red, de forma unilateral y sin previo
              aviso.
            </p>

            <h3>Propiedad Intelectual</h3>
            <p>
              El sitio web, incluyendo su programación, edición, compilación
              y demás elementos necesarios para su funcionamiento, los
              diseños, logotipos, texto y/o gráficos son propiedad del
              prestador o disponen de licencia o autorización expresa por
              parte de los autores. Todos los contenidos están debidamente
              protegidos por la normativa de propiedad intelectual e
              industrial.
            </p>
            <p>
              La reproducción total o parcial, uso, explotación, distribución
              y comercialización requiere en todo caso de la autorización
              escrita previa por parte del prestador.
            </p>
            <p>
              Para cualquier observación sobre posibles incumplimientos de
              derechos de propiedad intelectual o industrial:
              info@taulergroup.com
            </p>

            <h3>Condiciones Generales de Uso</h3>
            <p>
              El acceso a nuestra página web es gratuito y no exige previa
              suscripción o registro. El USUARIO debe acceder conforme a la
              buena fe y a las presentes Condiciones Generales de uso, bajo
              su propia y exclusiva responsabilidad.
            </p>
            <p>
              Dada la imposibilidad de control respecto a la información,
              contenidos y servicios de otras páginas web a las que se pueda
              acceder a través de los enlaces que nuestra web pueda poner a
              disposición, quedamos eximidos de cualquier responsabilidad por
              los daños que pudiesen derivar de su uso.
            </p>
            <p>
              Más información sobre el uso de sus datos personales en la
              Política de Privacidad de nuestra web.
            </p>
          </>
        ),
      },
      privacidad: {
        title: 'Política de Privacidad y Protección de Datos',
        body: (
          <>
            <p className="legal-meta">Última actualización: 15/09/2025</p>

            <h3>1. Responsable del Tratamiento</h3>
            <p>TAULER GROUP VENTURES S.L.</p>
            <p>
              Dirección: Plaza Curtidos Hnos. Dorta, 7 - 38005, Santa Cruz
              de Tfe.
            </p>
            <p>Email: info@taulergroup.com</p>
            <p>CIF: B21742259</p>

            <h3>2. Finalidad del Tratamiento</h3>
            <p>Sus datos serán tratados con las siguientes finalidades:</p>
            <ul>
              <li>
                Gestionar la relación comercial y prestación de servicios
              </li>
              <li>
                Envío de comunicaciones comerciales sobre nuestros servicios
              </li>
              <li>Responder a sus consultas y solicitudes</li>
              <li>Mejorar nuestros servicios y la experiencia del usuario</li>
            </ul>

            <h3>3. Legitimación</h3>
            <p>El tratamiento de sus datos está basado en:</p>
            <ul>
              <li>La ejecución de un contrato o relación comercial</li>
              <li>El consentimiento del usuario</li>
              <li>El interés legítimo del responsable</li>
            </ul>

            <h3>4. Conservación de los Datos</h3>
            <p>
              Los datos personales se conservarán mientras se mantenga la
              relación comercial y no se solicite su supresión, y en su caso,
              durante los años necesarios para cumplir con las obligaciones
              legales.
            </p>

            <h3>5. Destinatarios</h3>
            <p>
              Sus datos no serán cedidos a terceros salvo obligación legal o
              cuando sea necesario para la prestación de los servicios
              solicitados.
            </p>

            <h3>6. Derechos</h3>
            <p>
              Puede ejercer sus derechos de acceso, rectificación, supresión,
              limitación, portabilidad y oposición escribiendo a
              info@taulergroup.com
            </p>

            <h3>7. Autoridad de Control</h3>
            <p>
              Puede presentar una reclamación ante la Agencia Española de
              Protección de Datos (www.aepd.es) si considera que el
              tratamiento no se ajusta a la normativa vigente.
            </p>
          </>
        ),
      },
      cookies: {
        title: 'Política de Cookies',
        body: (
          <>
            <p className="legal-meta">Última actualización: 15/09/2025</p>

            <h3>¿Qué son las cookies?</h3>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en
              su dispositivo cuando visita nuestra web. Nos permiten
              reconocer su navegador y, si tiene una cuenta registrada,
              vincularla a esa cuenta para proporcionarle una experiencia
              personalizada.
            </p>

            <h3>Tipos de cookies que utilizamos</h3>

            <h4>Cookies técnicas (necesarias)</h4>
            <ul>
              <li>
                Permiten la navegación y el uso de funcionalidades básicas
              </li>
              <li>Son imprescindibles para el funcionamiento de la web</li>
            </ul>

            <h4>Cookies analíticas</h4>
            <ul>
              <li>
                Nos permiten analizar el uso de la web para mejorar nuestros
                servicios
              </li>
              <li>Utilizamos Google Analytics y otras herramientas</li>
            </ul>

            <h4>Cookies de preferencias</h4>
            <ul>
              <li>
                Permiten recordar información para mejorar su experiencia
              </li>
              <li>Como el idioma preferido o la región</li>
            </ul>

            <h3>¿Cómo gestionar las cookies?</h3>
            <p>
              Puede configurar su navegador para rechazar todas las cookies o
              para recibir un aviso cuando se envíe una cookie. Si las
              rechaza, es posible que algunas partes de nuestro sitio web no
              funcionen correctamente.
            </p>
            <p>
              La mayoría de navegadores aceptan cookies automáticamente, pero
              puede modificar la configuración para rechazarlas si lo
              prefiere.
            </p>

            <h3>Más información</h3>
            <p>
              Para más información sobre el uso de cookies y sus derechos,
              contáctenos en info@taulergroup.com
            </p>
          </>
        ),
      },
    },
  },
  en: {
    nav: {
      whatWeDo: 'What we do',
      peP: 'PE Practice',
      leadership: 'Leadership',
      contact: 'Contact',
      menu: 'Menu',
      close: 'Close',
    },
    hero: { visit: 'Visit ↗' },
    subsidiaries: {
      canary:
        'Put AI to work where your business loses time and margin. We deploy AI workspaces, process automations, and custom software in companies that want to operate faster without building an AI team.',
      columbus:
        'The AI-powered operating system for emerging private capital firms. Everything a GP needs to run their firm, raise capital, and close deals — in one place.',
    },
    whatWeDo:
      'We build and operate AI-first companies, focusing on real impact in real industries.',
    peP: {
      eyebrow: 'PE Practice',
      headlineLine1: 'AI-driven value creation',
      headlineLine2: 'in portfolio companies.',
      body: 'We partner with Private Equity firms to create value in their portfolio companies with artificial intelligence. We diagnose where value is trapped, execute the initiatives that release it, and structure the engagement flexibly: project fees, success on specific metrics, or shared carry. We align with the fund return.',
    },
    leadership: {
      title: 'Leadership',
      role: 'Co-Founder & Managing Partner',
    },
    contact: {
      title: (
        <>
          Let's
          <br />
          talk.
        </>
      ),
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send →',
      sending: 'Sending…',
      sent: 'Message sent',
      retry: 'Try again',
    },
    footer: {
      copyright: '© 2025 Tauler Group',
      legalNotice: 'Legal Notice',
      privacy: 'Privacy',
      cookies: 'Cookies',
    },
    cookies: {
      text: 'We use technical cookies necessary for the site to function. We do not use analytical or advertising cookies without your consent. Read more in our',
      cookiePolicyLink: 'Cookie Policy',
      reject: 'Reject',
      accept: 'Accept',
    },
    legal: {
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
              from the network, all unilaterally and without prior notice.
            </p>

            <h3>Intellectual Property</h3>
            <p>
              The website, including its programming, editing, compilation
              and other elements necessary for its operation, the designs,
              logos, text and/or graphics are the property of the provider
              or, where applicable, the provider holds a licence or express
              authorisation from the authors. All content on the website is
              duly protected by intellectual and industrial property
              regulations.
            </p>
            <p>
              Total or partial reproduction, use, exploitation, distribution
              and commercialisation in all cases require prior written
              authorisation from the provider.
            </p>
            <p>
              For any observation regarding possible infringements of
              intellectual or industrial property rights, contact:
              info@taulergroup.com
            </p>

            <h3>General Conditions of Use</h3>
            <p>
              Access to our website is free and does not require prior
              subscription or registration. The USER must access it in good
              faith and in accordance with these General Conditions of Use,
              under their sole and exclusive responsibility.
            </p>
            <p>
              Given the impossibility of controlling the information,
              content and services contained in other websites accessible
              through links, we are released from any liability for damages
              that may arise from their use.
            </p>
            <p>
              You can find more information about how we use your personal
              data in the Privacy Policy on our website.
            </p>
          </>
        ),
      },
      privacidad: {
        title: 'Privacy and Data Protection Policy',
        body: (
          <>
            <p className="legal-meta">Last updated: 15/09/2025</p>

            <h3>1. Data Controller</h3>
            <p>TAULER GROUP VENTURES S.L.</p>
            <p>
              Address: Plaza Curtidos Hnos. Dorta, 7 - 38005, Santa Cruz de
              Tfe.
            </p>
            <p>Email: info@taulergroup.com</p>
            <p>Tax ID (CIF): B21742259</p>

            <h3>2. Purpose of Processing</h3>
            <p>Your data will be processed for the following purposes:</p>
            <ul>
              <li>
                Managing the commercial relationship and provision of services
              </li>
              <li>
                Sending commercial communications about our services
              </li>
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
              You may file a complaint with the Spanish Data Protection
              Agency (www.aepd.es) if you consider that the processing does
              not comply with applicable law.
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
              Cookies are small text files stored on your device when you
              visit our website. They allow us to recognise your browser and,
              if you have a registered account, link it to that account to
              provide a personalised experience.
            </p>

            <h3>Types of cookies we use</h3>

            <h4>Technical cookies (necessary)</h4>
            <ul>
              <li>Enable browsing and the use of basic functionalities</li>
              <li>Are essential for the website to operate</li>
            </ul>

            <h4>Analytical cookies</h4>
            <ul>
              <li>
                Allow us to analyse the use of the website to improve our
                services
              </li>
              <li>We use Google Analytics and other tools</li>
            </ul>

            <h4>Preference cookies</h4>
            <ul>
              <li>
                Allow us to remember information to improve your experience
              </li>
              <li>Such as your preferred language or your region</li>
            </ul>

            <h3>How to manage cookies</h3>
            <p>
              You can configure your browser to reject all cookies or to
              receive a notice when a cookie is sent. However, if you reject
              cookies, some parts of our website may not function correctly.
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
    },
  },
}

// -----------------------------------------------------------------------------
// Geolocation-based detection
// -----------------------------------------------------------------------------

async function detectLangFromGeo(): Promise<Lang> {
  try {
    const res = await fetch('https://ipapi.co/country/', {
      headers: { Accept: 'text/plain' },
    })
    if (!res.ok) throw new Error('geo')
    const code = (await res.text()).trim().toUpperCase()
    return SPANISH_COUNTRIES.has(code) ? 'es' : 'en'
  } catch {
    const browser = typeof navigator !== 'undefined' ? navigator.language : ''
    return browser.toLowerCase().startsWith('es') ? 'es' : 'en'
  }
}

// -----------------------------------------------------------------------------
// Context
// -----------------------------------------------------------------------------

type I18nValue = {
  lang: Lang
  setLang: (l: Lang) => void
  d: Dict
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    let cancelled = false

    const stored =
      typeof window !== 'undefined'
        ? (localStorage.getItem(STORAGE_KEY) as Lang | null)
        : null

    if (stored === 'es' || stored === 'en') {
      setLangState(stored)
      document.documentElement.lang = stored
      return
    }

    detectLangFromGeo().then((detected) => {
      if (cancelled) return
      setLangState(detected)
      document.documentElement.lang = detected
    })

    return () => {
      cancelled = true
    }
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = l
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, d: DICT[lang] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

// -----------------------------------------------------------------------------
// Language Switch
// -----------------------------------------------------------------------------

export function LanguageSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang } = useI18n()
  const next: Lang = lang === 'es' ? 'en' : 'es'
  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
      className={`font-mono text-[11px] uppercase tracking-[0.28em] text-white/70 hover:text-white transition-colors duration-300 ${className}`}
    >
      {lang === 'es' ? 'EN' : 'ES'}
    </button>
  )
}
