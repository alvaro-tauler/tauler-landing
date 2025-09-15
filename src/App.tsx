import './index.css'
import { useEffect, useRef, useState, createContext, useContext } from 'react'
import { createPortal } from 'react-dom'
// Simple global language context
type Language = 'en' | 'es'
const LanguageContext = createContext<{ language: Language; setLanguage: (l: Language) => void } | null>(null)
function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) return { language: 'en' as Language, setLanguage: () => {} }
  return ctx
}

function Hero() {
  const { language } = useLanguage()
  const t = language === 'en'
    ? { eyebrow: 'Tauler Group', titleA: "Building tomorrow's businesses ", titleB: 'today', sub: 'Tauler Group, the multidisciplinary AI company that builds the businesses that will define the future.', cta1: 'Explore capabilities', cta2: 'Partner with us' }
    : { eyebrow: 'Tauler Group', titleA: 'Construyendo los negocios del mañana ', titleB: 'hoy', sub: 'Tauler Group, la compañía multidisciplinar de IA que construye los negocios que definirán el futuro.', cta1: 'Explorar capacidades', cta2: 'Colabora con nosotros' }
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,76,0.25),transparent_35%)]" />
      <div className="container-edge py-28 md:py-36">
        <div className="eyebrow">{t.eyebrow}</div>
        <h1 className="heading-hero">
          {t.titleA}<TrueUnderline>{t.titleB}</TrueUnderline>
        </h1>
        <p className="subheading-hero max-w-3xl">{t.sub}</p>
        <div className="mt-10 flex gap-4">
          <a href="#capabilities" className="btn-primary">{t.cta1}</a>
          <a href="#contact" className="btn-ghost">{t.cta2}</a>
        </div>
      </div>
    </section>
  )
}

function Thesis() {
  const ref = useReveal()
  const { language } = useLanguage()
  const t = language === 'en'
    ? {
        eyebrow: 'The Future is Now',
        title: 'A New Business Paradigm',
        intro: 'Traditional business creation is linear and sequential: identify problem, build solution, find market. AI changes this process, allowing for innovation in all markets.',
        ourThesis: 'Our Thesis',
        thesisP1: "In an AI-redefined world, maximum value doesn't reside in a single company, but in a platform for creating and developing businesses and innovation. We identify waves, not niches.",
        chips: ['Wave Detection', 'Platform Thinking', 'Exponential Growth'],
        method: 'Our Method',
        step1: 'Identify Emerging Waves',
        step1d: 'Spot market disruptions before they become mainstream',
        step2: 'Build Modular Ecosystems',
        step2d: 'Create adaptable platforms that evolve with market changes',
        step3: 'Scale Exponentially',
        step3d: 'Leverage AI and network effects for rapid growth',
        stat1: 'Faster Innovation',
        stat2: 'Business Resilience',
        stat3: 'Market Possibilities',
      }
    : {
        eyebrow: 'El futuro es ahora',
        title: 'Un nuevo paradigma de negocio',
        intro: 'La creación tradicional de negocios es lineal y secuencial: identificar el problema, crear la solución y encontrar el mercado. La IA cambia este proceso, permitiendo la innovación en todos los mercados.',
        ourThesis: 'Nuestra tesis',
        thesisP1: 'En un mundo redefinido por la IA, el valor máximo no reside en una sola empresa, sino en una plataforma para crear y desarrollar negocios e innovación. Identificamos olas, no nichos.',
        chips: ['Detección de olas', 'Pensamiento de plataforma', 'Crecimiento exponencial'],
        method: 'Nuestro método',
        step1: 'Identificar olas emergentes',
        step1d: 'Detectar disrupciones antes de que sean masivas',
        step2: 'Construir ecosistemas modulares',
        step2d: 'Crear plataformas adaptables que evolucionen con el mercado',
        step3: 'Escalar exponencialmente',
        step3d: 'Aprovechar IA y efectos de red para crecer rápido',
        stat1: 'Innovación más rápida',
        stat2: 'Resiliencia empresarial',
        stat3: 'Posibilidades de mercado',
      }
  return (
    <section ref={ref} className="relative py-20 md:py-32 reveal" id="thesis">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(8,10,76,0.15)_25%,rgba(8,10,76,0.08)_75%,transparent_100%)]" />
      <div className="container-edge">
        <div className="text-center mb-16">
          <div className="eyebrow mb-4">{t.eyebrow}</div>
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">{t.title}</h2>
          <p className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto">{t.intro}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Our Thesis */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-[rgb(var(--color-accent))] rounded-full opacity-20"></div>
              <h3 className="text-2xl md:text-3xl font-semibold">{t.ourThesis}</h3>
            </div>
            <p className="text-lg text-white/80 leading-relaxed">{t.thesisP1}</p>
            {/* <div className="bg-gradient-to-r from-[rgb(var(--color-accent))]/10 to-transparent border-l-4 border-[rgb(var(--color-accent))] p-6 rounded-r-2xl">
              <p className="text-white/90 font-medium italic">
                "AI creates markets as fast as it destroys them."
              </p>
            </div> */}
            <div className="flex flex-wrap gap-3">
              {t.chips.map((c) => (
                <span key={c} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70">{c}</span>
              ))}
            </div>
          </div>

          {/* Right side - Our Method */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-[rgb(var(--color-accent-red))] rounded-full opacity-20"></div>
              <h3 className="text-2xl md:text-3xl font-semibold">{t.method}</h3>
            </div>
            <p className="text-lg text-white/80 leading-relaxed">
              {language === 'en'
                ? 'We build ecosystems. Tauler Group is a constant innovation laboratory—a network of capital, talent, and technology that enables businesses to be born and scale at exponential speed.'
                : 'Construimos ecosistemas. Tauler Group es un laboratorio de innovación constante: una red de capital, talento y tecnología que permite que los negocios nazcan y escalen a velocidad exponencial.'}
            </p>
            
            {/* Process steps */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[rgb(var(--color-accent))] rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-white">{t.step1}</h4>
                  <p className="text-white/70 text-sm">{t.step1d}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[rgb(var(--color-accent))] rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-white">{t.step2}</h4>
                  <p className="text-white/70 text-sm">{t.step2d}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[rgb(var(--color-accent))] rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-white">{t.step3}</h4>
                  <p className="text-white/70 text-sm">{t.step3d}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
            <div className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-accent))] mb-2">10x</div>
            <div className="text-sm text-white/60 uppercase tracking-widest">{t.stat1}</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
            <div className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-accent-red))] mb-2">85%</div>
            <div className="text-sm text-white/60 uppercase tracking-widest">{t.stat2}</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
            <div className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-accent))] mb-2">∞</div>
            <div className="text-sm text-white/60 uppercase tracking-widest">{t.stat3}</div>
          </div>
        </div>
      </div>

      {/* Decorative elements removed for a more sober look */}
    </section>
  )
}

type Slide = {
  title: string
  intro: string
  bullets: string[]
  cta: string
}

const slidesEn: Slide[] = [
  {
    title: 'Business Incubation',
    intro:
      'We create and incubate AI-native businesses before market demand fully emerges, positioning them for explosive, exponential growth in uncharted territories.',
    bullets: [
      'Prototype modular ventures using agentic AI to simulate and validate ideas at lightning speed.',
      'Turn volatility into velocity: Launch in waves of innovation, not rigid niches.',
      'Proven ROI: Early-stage scaling that delivers 3-5x returns in AI-disrupted markets.',
    ],
    cta: 'Learn More',
  },
  {
    title: 'Strategic AI Consulting',
    intro:
      "Our deep expertise guides enterprises through AI transformations, uncovering hidden opportunities and crafting roadmaps that redefine competitive edges.",
    bullets: [
      'Multimodal AI analysis to integrate data from diverse sources for holistic strategy.',
      'Identify untapped markets in high-stakes sectors.',
      'Bottom-line impact: Drive 20-30% efficiency gains, per 2025 benchmarks.',
    ],
    cta: 'Schedule Consultation',
  },
  {
    title: 'Capital & Growth',
    intro:
      "We deploy fiduciary capital, elite resources, and hands-on operational know-how to supercharge businesses at the blistering pace of AI evolution.",
    bullets: [
      'Seed to Series A funding with built-in antifragile safeguards against market shocks.',
      'Access global networks for talent and partnerships that accelerate hyper-growth.',
      'Scale sustainably: From MVP to market leader, with exits engineered for maximum value.',
    ],
    cta: 'Explore Funding',
  },
  {
    title: 'Agentic AI Orchestration',
    intro:
      'Harness agentic AI to orchestrate complex ecosystems, where intelligent agents autonomously construct, adapt, and optimize operations in real-time.',
    bullets: [
      'Deploy small language models (SLMs) for sector-specific automation, reducing coordination costs by up to 40%.',
      'Multimodal AI systems for real-time decision-making, problem solving, and optimization.',
      'Empower teams: Boost productivity by 92% through AI-driven innovation, without the tech overhead.',
    ],
    cta: 'Demo Orchestration',
  },
  {
    title: 'Antifragile Risk Management',
    intro:
      'Transform uncertainty into your greatest asset with antifragile architectures that not only withstand shocks but grow stronger from them.',
    bullets: [
      'Simulate black-swan scenarios using advanced AI to fortify supply chains and compliance in regulated industries.',
      'Proactive pivots: Dismantle and rebuild modular units faster than competitors, ensuring 85% business model resilience.',
      'Investor appeal: Minimize downside while maximizing upside in a $4.4T AI productivity boom.',
    ],
    cta: 'Assess Your Risks',
  },
  {
    title: 'Sector-Specific Innovation Labs',
    intro:
      'Dive into breakthrough innovations for mission-critical sectors like nuclear, aviation, and maritime, where we construct bespoke AI solutions that redefine standards.',
    bullets: [
      'Custom digital twins and federated learning for privacy-secure advancements in energy and defense.',
      'Tangible results: Cut emissions by 50% in aviation or downtime by 30% in nuclear ops via predictive ecosystems.',
      'Visionary edge: Partner with us to pioneer markets AI creates overnight.',
    ],
    cta: 'Join the Lab',
  },
]

const slidesEs: Slide[] = [
  {
    title: 'Incubación de negocios',
    intro:
      'Creamos e incubamos negocios nativos de IA antes de que exista la demanda, posicionándolos para un crecimiento exponencial en territorios inexplorados.',
    bullets: [
      'Prototipa negocios modulares con IA agentica para simular y validar ideas a gran velocidad.',
      'Convierte la volatilidad en velocidad: lanza en olas de innovación, no en nichos rígidos.',
      'ROI probado: escalado temprano que entrega retornos de 3–5x en mercados impactados por IA.',
    ],
    cta: 'Saber más',
  },
  {
    title: 'Consultoría estratégica en IA',
    intro:
      'Nuestra experiencia guía transformaciones en IA, descubriendo oportunidades ocultas y diseñando roadmaps que redefinen la ventaja competitiva.',
    bullets: [
      'Análisis de IA multimodal para integrar datos diversos en una estrategia holística.',
      'Identifica mercados inexplorados en sectores de alta exigencia.',
      'Impacto real: impulsa eficiencias del 20–30% según benchmarks 2025.',
    ],
    cta: 'Agendar consulta',
  },
  {
    title: 'Capital y crecimiento',
    intro:
      'Desplegamos capital fiduciario, recursos élite y know-how operativo para acelerar negocios al ritmo de la evolución de la IA.',
    bullets: [
      'Financiación desde semilla a Serie A con protecciones antifrágiles ante shocks.',
      'Acceso a redes globales de talento y partnerships para hipercrecimiento.',
      'Escala sostenible: del MVP al líder del mercado, con exits de máximo valor.',
    ],
    cta: 'Explorar financiación',
  },
  {
    title: 'Orquestación con IA agentica',
    intro:
      'Orquesta ecosistemas complejos con IA agentica, donde agentes inteligentes construyen, se adaptan y optimizan en tiempo real.',
    bullets: [
      'Despliega SLMs para automatización sectorial y reduce costes de coordinación hasta un 40%.',
      'Sistemas de IA multimodal para decisiones en tiempo real, resolución de problemas y optimización.',
      'Potencia equipos: +92% de productividad sin sobrecarga técnica.',
    ],
    cta: 'Ver demostración',
  },
  {
    title: 'Gestión de riesgo antifrágil',
    intro:
      'Convierte la incertidumbre en tu mayor activo con arquitecturas antifrágiles que resisten y se fortalecen ante shocks.',
    bullets: [
      'Simula cisnes negros con IA avanzada para reforzar cadenas de suministro y cumplimiento.',
      'Giros proactivos: desmantela y recompone unidades modulares más rápido que la competencia (85% de resiliencia).',
      'Atractivo para inversores: minimiza riesgo y maximiza upside en el boom de productividad de la IA (4,4T$).',
    ],
    cta: 'Evaluar riesgos',
  },
  {
    title: 'Labs de innovación sectorial',
    intro:
      'Impulsa innovaciones para sectores críticos como nuclear, aviación y marítimo, con soluciones a medida que redefinen estándares.',
    bullets: [
      'Gemelos digitales y aprendizaje federado para avances con privacidad en energía y defensa.',
      'Resultados tangibles: -50% emisiones en aviación o -30% downtime en nuclear con ecosistemas predictivos.',
      'Ventaja visionaria: anticípate a mercados que la IA crea de la noche a la mañana.',
    ],
    cta: 'Unirte al Lab',
  },
]

function Capabilities() {
  const ref = useReveal()
  const { language } = useLanguage()
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollStart, setScrollStart] = useState(0)

  // Create infinite scroll by duplicating slides of the current language
  const slides = language === 'en' ? slidesEn : slidesEs
  const infiniteSlides = [...slides, ...slides, ...slides]
  const realActiveIndex = active % slides.length

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2
      const wrapper = el.firstElementChild as HTMLElement | null
      const items = wrapper ? (Array.from(wrapper.children) as HTMLElement[]) : []
      let bestIdx = 0
      let bestDist = Infinity
      items.forEach((node, i) => {
        const boxCenter = node.offsetLeft + node.offsetWidth / 2
        const d = Math.abs(boxCenter - center)
        if (d < bestDist) {
          bestDist = d
          bestIdx = i
        }
      })
      setActive(bestIdx)
    }
    onScroll()
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  // Handle infinite scroll reset
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    
    const wrapper = el.firstElementChild as HTMLElement | null
    if (!wrapper) return

    const handleScrollEnd = () => {
      const slideWidth = wrapper.children[0]?.clientWidth || 0
      const gap = 24 // gap-6 = 1.5rem = 24px
      const totalSlideWidth = slideWidth + gap
      
      // If we're in the first set of slides, jump to the middle set
      if (active < slides.length) {
        el.scrollTo({ 
          left: el.scrollLeft + (slides.length * totalSlideWidth), 
          behavior: 'instant' 
        })
      }
      // If we're in the last set of slides, jump to the middle set
      else if (active >= slides.length * 2) {
        el.scrollTo({ 
          left: el.scrollLeft - (slides.length * totalSlideWidth), 
          behavior: 'instant' 
        })
      }
    }

    const timeoutId = setTimeout(handleScrollEnd, 100)
    return () => clearTimeout(timeoutId)
  }, [active])

  // autoplay every 4s (only when not dragging)
  useEffect(() => {
    if (isDragging) return
    
    const el = trackRef.current
    if (!el) return
    
    const timer = setInterval(() => {
      const nextIndex = (active + 1) % infiniteSlides.length
      const wrapper = el.firstElementChild as HTMLElement | null
      const child = wrapper?.children[nextIndex] as HTMLElement | undefined
      if (child) {
        el.scrollTo({ left: child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2, behavior: 'smooth' })
      }
    }, 6000)
    return () => clearInterval(timer)
  }, [active, isDragging])

  const scrollToIndex = (i: number) => {
    const el = trackRef.current
    if (!el) return
    const wrapper = el.firstElementChild as HTMLElement | null
    const child = wrapper?.children[i] as HTMLElement | undefined
    if (child) el.scrollTo({ left: child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2, behavior: 'smooth' })
  }

  // Initialize scroll position to middle set and reset on language change
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const wrapper = el.firstElementChild as HTMLElement | null
    const middleStart = wrapper?.children[slides.length] as HTMLElement | undefined
    if (middleStart) {
      el.scrollTo({ left: middleStart.offsetLeft - (el.clientWidth - middleStart.offsetWidth) / 2 })
      setActive(slides.length)
    }
  }, [language])

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX)
    setScrollStart(trackRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX
    const walk = (x - startX) * 2
    trackRef.current.scrollLeft = scrollStart - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX)
    setScrollStart(trackRef.current?.scrollLeft || 0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !trackRef.current) return
    const x = e.touches[0].pageX
    const walk = (x - startX) * 2
    trackRef.current.scrollLeft = scrollStart - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <section ref={ref} className="relative py-20 md:py-28 reveal" id="capabilities">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(8,10,76,0.12)_30%,rgba(8,10,76,0.08)_70%,transparent_100%)]" />
      <div className="container-edge">
        <h2 className="text-2xl md:text-4xl font-semibold">{language === 'en' ? 'Our Capabilities' : 'Nuestras capacidades'}</h2>
        <p className="mt-4 text-white/70 max-w-3xl">
          {language === 'en'
            ? 'We are advisors, investors, and builders. Our strategic business and tech experience allows us to not only invest, but also develop and operate companies from conception, and help others grow.'
            : 'Somos asesores, inversores y constructores. Nuestra experiencia estratégica en negocio y tecnología nos permite no solo invertir, sino también desarrollar y operar compañías desde su concepción y ayudar a otras a crecer.'}
        </p>
        <div className="relative mt-10">
          <button 
            aria-label="Previous" 
            onClick={() => scrollToIndex((active - 1 + infiniteSlides.length) % infiniteSlides.length)} 
            className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10 btn-ghost px-3 py-2"
          >
            ‹
          </button>
          <div 
            ref={trackRef} 
            className="overflow-x-auto overflow-y-visible scroll-smooth snap-x snap-mandatory px-8 md:px-12 py-4 cursor-grab active:cursor-grabbing" 
            style={{scrollbarWidth:'none'} as any}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex gap-6 min-w-max">
              {infiniteSlides.map((s, i) => (
                <div key={`${s.title}-${i}`} className="w-[320px] md:w-[420px] shrink-0 snap-center">
                  <article
                    aria-current={i === active ? 'true' : undefined}
                    className={`rounded-2xl border p-6 backdrop-blur transition
                      duration-300 ease-out will-change-transform h-full flex flex-col
                      ${i === active ? 'scale-[1.04] border-white/30 bg-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)]' : 'scale-100 border-white/10 bg-white/5'}`}
                  >
                    <div className="text-sm uppercase tracking-widest text-white/60">Capability</div>
                    <h3 className="mt-2 text-xl md:text-2xl font-semibold">{s.title}</h3>
                    <p className="mt-3 text-white/70 flex-grow">{s.intro}</p>
                    <ul className="mt-4 list-disc pl-5 space-y-2 text-white/70">
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <a className="mt-5 edge-button" href="#contact">{s.cta}</a>
                  </article>
                </div>
              ))}
            </div>
          </div>
          <button 
            aria-label="Next" 
            onClick={() => scrollToIndex((active + 1) % infiniteSlides.length)} 
            className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10 btn-primary px-3 py-2"
          >
            ›
          </button>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button 
              key={i} 
              aria-label={`Go to slide ${i+1}`} 
              onClick={() => scrollToIndex(i + slides.length)} 
              className={`h-1.5 w-4 rounded-full transition ${i===realActiveIndex?'bg-white':'bg-white/30 hover:bg-white/50'}`} 
            />
          ))}
        </div>
        <div className="mt-4 text-xs text-white/50">{language === 'en' ? 'Swipe or drag to explore how we turn AI potential into profitable realities.' : 'Desliza o arrastra para explorar cómo convertimos el potencial de la IA en realidades rentables.'}</div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}

function Partnerships() {
  const ref = useReveal()
  const { language } = useLanguage()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const partnershipModels = [
    {
      id: 1,
      title: "Strategic Advisory",
      subtitle: "AI Transformation",
      description: "For established businesses seeking AI transformation",
      icon: "",
      features: [
        "AI strategy development",
        "Market opportunity analysis", 
        "Transformation roadmap",
        "Risk assessment & mitigation"
      ],
      color: "from-[rgb(var(--color-accent))]/20 to-[rgb(var(--color-accent))]/5",
      borderColor: "border-[rgb(var(--color-accent))]/30",
      bgColor: "bg-[rgb(var(--color-accent))]/10"
    },
    {
      id: 2,
      title: "Venture Partnership",
      subtitle: "Co-Creation",
      description: "Co-create and scale new AI-native businesses",
      icon: "",
      features: [
        "Business concept development",
        "Capital investment",
        "Operational expertise",
        "Network access",
        "Go-to-market strategy"
      ],
      color: "from-[rgb(var(--color-accent-red))]/20 to-[rgb(var(--color-accent-red))]/5",
      borderColor: "border-[rgb(var(--color-accent-red))]/30",
      bgColor: "bg-[rgb(var(--color-accent-red))]/10"
    },
    {
      id: 3,
      title: "Development Lab",
      subtitle: "End-to-End",
      description: "For visionaries with breakthrough ideas",
      icon: "",
      features: [
        "End-to-end business creation",
        "Technology development",
        "Market validation",
        "Scale-up support",
        "Exit strategy planning"
      ],
      color: "from-white/20 to-white/5",
      borderColor: "border-white/30",
      bgColor: "bg-white/10"
    }
  ]

  return (
    <section ref={ref} className="relative py-20 md:py-32 reveal" id="partnerships">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(8,10,76,0.12)_20%,rgba(8,10,76,0.14)_80%,transparent_100%)]" />
      <div className="container-edge">
        <div className="text-center mb-16">
          <div className="eyebrow mb-4">{language === 'en' ? 'Choose Your Path' : 'Elige tu camino'}</div>
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">
            {language === 'en' ? (
              <>Partnership <TrueUnderline>Models</TrueUnderline></>
            ) : (
              <>Modelos de <TrueUnderline>colaboración</TrueUnderline></>
            )}
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto">
            {language === 'en'
              ? 'Choose how you want to engage with the future of business creation. Each partnership model is designed for different stages of your journey.'
              : 'Elige cómo quieres participar en la creación del negocio del futuro. Cada modelo está diseñado para distintas etapas de tu recorrido.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {partnershipModels.map((model) => (
            <div
              key={model.id}
              className={`group relative rounded-3xl border backdrop-blur transition-all duration-500 hover:scale-105 cursor-pointer
                ${hoveredCard === model.id ? 'scale-105 shadow-2xl' : 'scale-100'}
                ${model.borderColor} ${model.color} bg-gradient-to-br`}
              onMouseEnter={() => setHoveredCard(model.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Header */}
              <div className="p-8 pb-6">
                <div className="flex items-center gap-4 mb-4">
                  {model.icon && (
                    <div className={`w-12 h-12 rounded-2xl ${model.bgColor} flex items-center justify-center text-2xl`}>
                      {model.icon}
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">{language === 'en' ? model.title : (
                      model.id === 1 ? 'Asesoría estratégica' : model.id === 2 ? 'Colaboración de riesgo' : 'Laboratorio de desarrollo'
                    )}</h3>
                    <p className="text-sm text-white/60 uppercase tracking-widest">{language === 'en' ? model.subtitle : (
                      model.id === 1 ? 'Transformación con IA' : model.id === 2 ? 'Cocreación' : 'Extremo a extremo'
                    )}</p>
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed">{language === 'en' ? model.description : (
                  model.id === 1 ? 'Para empresas establecidas que buscan una transformación con IA' :
                  model.id === 2 ? 'Cocrear y escalar nuevos negocios nativos de IA' :
                  'Para visionarios con ideas rompedoras'
                )}</p>
              </div>

              {/* Features List */}
              <div className="px-8 pb-6">
                <ul className="space-y-3">
                  {model.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-white/70">
                      <div className={`w-1.5 h-1.5 rounded-full ${model.bgColor} flex-shrink-0`}></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="px-8 pb-8">
                <a 
                  href="#contact" 
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 group-hover:scale-105 btn-ghost`}
                >
                  {language === 'en' ? (model.id === 2 ? 'Start Partnership' : 'Learn More') : (model.id === 2 ? 'Iniciar colaboración' : 'Saber más')}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                ${model.bgColor}`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        {/* <div className="text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">
              Ready to build the future of business?
            </h3>
            <p className="text-lg text-white/70 mb-8">
              Join our network of innovators, entrepreneurs, and visionaries who are shaping tomorrow's markets today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:hello@taulergroup.com" 
                className="btn-primary text-lg px-8 py-4 hover:scale-105 transition-transform duration-200"
              >
                Start Your Partnership
              </a>
              <a 
                href="#thesis" 
                className="btn-ghost text-lg px-8 py-4 hover:scale-105 transition-transform duration-200"
              >
                Learn Our Approach
              </a>
            </div>
          </div>
        </div> */}
      </div>

      {/* Decorative elements removed for a more sober look */}
    </section>
  )
}

function CallToAction() {
  const ref = useReveal()
  const { language } = useLanguage()
  const formEndpoint = 'https://formspree.io/f/mandzjzo'
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const t = language === 'en'
    ? {
        start: 'Start Your Journey',
        explore: 'Explore Our Capabilities',
        name: 'Name',
        email: 'Email',
        company: 'Company (optional)',
        message: 'Message',
        send: 'Send message',
        success: 'Thanks! We will get back to you shortly.',
        fail: 'Something went wrong. Please try again or email us directly.',
      }
    : {
        start: 'Comienza tu viaje',
        explore: 'Explora nuestras capacidades',
        name: 'Nombre',
        email: 'Correo',
        company: 'Empresa (opcional)',
        message: 'Mensaje',
        send: 'Enviar mensaje',
        success: '¡Gracias! Te contactaremos en breve.',
        fail: 'Ha ocurrido un error. Inténtalo de nuevo o escríbenos por correo.',
      }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    setError(null)
    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      // Help Formspree map reply-to and subject
      const email = String(formData.get('email') || '')
      const name = String(formData.get('name') || '')
      const company = String(formData.get('company') || '')
      if (email) formData.set('_replyto', email)
      const subject = name ? `${name}${company ? ' · ' + company : ''}` : 'Website contact'
      formData.set('_subject', subject)

      const res = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setSent(true)
        form.reset()
      } else {
        const msg = Array.isArray(data?.errors) ? data.errors.map((e: any) => e.message).join(' · ') : (data?.error || 'Request failed')
        setError(msg)
      }
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSending(false)
    }
  }
  return (
    <section ref={ref} className="relative py-20 md:py-32 reveal" id="contact">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(8,10,76,0.18)_30%,rgba(8,10,76,0.24)_100%)]" />
      <div className="container-edge text-center">
        <div className="max-w-4xl mx-auto">
          <div className="eyebrow mb-4">{language === 'en' ? 'Ready to Transform?' : '¿Listo para transformarte?'}</div>
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">
            {language === 'en' ? (
              <>Build the future of business <TrueUnderline>with us</TrueUnderline></>
            ) : (
              <>Construye el futuro del negocio <TrueUnderline>con nosotros</TrueUnderline></>
            )}
          </h2>
          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            {language === 'en'
              ? 'Join the AI revolution. From concept to market leader, we turn your vision into reality with exponential growth and antifragile strategies.'
              : 'Únete a la revolución de la IA. Del concepto al líder del mercado, convertimos tu visión en realidad con crecimiento exponencial y estrategias antifrágiles.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              type="button"
              onClick={() => setShowForm(true)}
              className="btn-primary text-lg px-8 py-4 hover:scale-105 transition-transform duration-200"
            >
              {t.start}
            </button>
            <a 
              href="#capabilities" 
              className="btn-ghost text-lg px-8 py-4 hover:scale-105 transition-transform duration-200"
            >
              {t.explore}
            </a>
          </div>

          {/* Contact form modal */}
          {showForm && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
              <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-white/10 backdrop-blur p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl md:text-2xl font-semibold">{language === 'en' ? 'Contact Tauler Group' : 'Contactar con Tauler Group'}</h3>
                  <button onClick={() => setShowForm(false)} className="edge-button px-3 py-1">✕</button>
                </div>
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="language" value={language} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">{t.name}</label>
                      <input name="name" required className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">{t.email}</label>
                      <input type="email" name="email" required className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">{t.company}</label>
                    <input name="company" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30" placeholder="Example Company" />
                  </div>
                  <div className="mt-4">
                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">{t.message}</label>
                    <textarea name="message" required rows={5} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30" placeholder="..." />
                  </div>
                  <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
                  <div className="mt-6 flex items-center gap-3">
                    <button disabled={sending} type="submit" className={`btn-primary ${sending ? 'opacity-70 cursor-not-allowed' : ''}`}>
                      {sending ? 'Sending…' : t.send}
                    </button>
                    {sent && <span className="text-sm text-green-300">{t.success}</span>}
                    {error && <span className="text-sm text-red-300">{t.fail}{error ? ` (${error})` : ''}</span>}
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[rgb(var(--color-accent))] mb-2">3-5x</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">{language === 'en' ? 'ROI in AI Markets' : 'ROI en mercados de IA'}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[rgb(var(--color-accent))] mb-2">92%</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">{language === 'en' ? 'Productivity Boost' : 'Impulso de productividad'}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[rgb(var(--color-accent))] mb-2">$4.4T</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">{language === 'en' ? 'AI Market Opportunity' : 'Oportunidad del mercado de IA'}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements removed for a more sober look */}
    </section>
  )
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en'
    const stored = window.localStorage.getItem('tg_lang')
    return stored === 'es' ? 'es' : 'en'
  })
  useEffect(() => {
    try { window.localStorage.setItem('tg_lang', language) } catch {}
  }, [language])

  const [hash, setHash] = useState<string>(() => (typeof window !== 'undefined' ? window.location.hash : ''))
  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
    <main className="min-h-dvh relative">
      {/* Ambient background: subtle blurred brand orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-[0.10] bg-[rgb(var(--color-accent))] animate-orb-slow animate-pulse-soft" />
        <div className="absolute -bottom-28 -right-20 w-[40rem] h-[40rem] rounded-full blur-[90px] opacity-[0.08] bg-[rgb(var(--color-accent-red))] animate-orb-slower animate-pulse-soft-alt" />
        <div className="absolute top-1/3 right-1/4 w-[28rem] h-[28rem] rounded-full blur-[100px] opacity-[0.06] bg-[rgb(var(--color-brand))] animate-orb-slow animate-pulse-soft" style={{animationDelay:'-6s'}} />
      </div>
      
      <header className="brand-blur sticky top-0 z-50">
        <div className="container-edge flex h-14 items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img src="/loto%20tauler%20white.png" alt="Tauler" className="h-6 md:h-7 w-auto" />
          </a>
          <Navbar />
        </div>
      </header>
      {hash === '#/privacy' ? (
        <LegalPrivacy />
      ) : hash === '#/cookies' ? (
        <LegalCookies />
      ) : hash === '#/legal' ? (
        <LegalNotice />
      ) : (
        <>
          <Hero />
          <Thesis />
          <Capabilities />
          <Partnerships />
          <CallToAction />
        </>
      )}
      <Footer />
    </main>
    </LanguageContext.Provider>
  )
}

// simple IntersectionObserver hook for reveal-on-scroll
function useReveal() {
  const ref = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref as React.RefObject<HTMLElement>
}

// Hand-drawn marker underline with draw animation
function TrueUnderline({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <svg
        className="absolute left-0 right-0 -bottom-2 select-none pointer-events-none true-underline"
        width="100%"
        height="22"
        viewBox="0 0 100 22"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* More granular roughness for realistic marker texture */}
          <filter id="hu-rough" x="-100%" y="-400%" width="300%" height="900%">
            <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="2.5" />
          </filter>
          {/* Red brand */}
          <linearGradient id="hu-red" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#ff3338" />
            <stop offset="100%" stopColor="#e8151c" />
          </linearGradient>
        </defs>
        {/* Main brush stroke (red marker) with gentle bow */}
        <path
          className="hu-main"
          d="M2 14 C 22 12.4, 48 15.1, 72 13.3 S 94 13.9, 98 14"
          fill="none"
          stroke="url(#hu-red)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#hu-rough)"
          pathLength={100}
        />
        {/* End flick for hand-finished look */}
        <path
          className="hu-flick"
          d="M93 14 C 96 14.6, 98.5 15, 100 15.6"
          fill="none"
          stroke="url(#hu-red)"
          strokeWidth="6.5"
          strokeLinecap="round"
          filter="url(#hu-rough)"
          pathLength={25}
        />
      </svg>
    </span>
  )
}

function Navbar() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const [entered, setEntered] = useState(false)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    try {
      if (open) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    } catch {}
    return () => { try { document.body.style.overflow = '' } catch {} }
  }, [open])

  // Slide-in animation and accessibility (focus + ESC)
  useEffect(() => {
    if (!open) return
    const id = requestAnimationFrame(() => setEntered(true))
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    // Focus the close button when opened
    setTimeout(() => closeRef.current?.focus(), 50)
    return () => { cancelAnimationFrame(id); window.removeEventListener('keydown', onKey); setEntered(false) }
  }, [open])

  const t = language === 'en'
    ? {
        thesis: 'Thesis',
        capabilities: 'Capabilities',
        partnerships: 'Partnerships',
        cta: 'Partner with us',
        toggleLabel: 'Switch language to Spanish',
      }
    : {
        thesis: 'Tesis',
        capabilities: 'Capacidades',
        partnerships: 'Colaboraciones',
        cta: 'Colabora con nosotros',
        toggleLabel: 'Cambiar idioma a inglés',
      }

  const toggle = () => setLanguage(language === 'en' ? 'es' : 'en')

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-4 md:gap-6 text-sm text-white/80">
        <a className="hover:text-white" href="#thesis">{t.thesis}</a>
        <a className="hover:text-white" href="#capabilities">{t.capabilities}</a>
        <a className="hover:text-white" href="#partnerships">{t.partnerships}</a>
        <a className="btn-ghost" href="#contact">{t.cta}</a>
        <button
          type="button"
          aria-label={t.toggleLabel}
          onClick={toggle}
          className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs border border-white/15 text-white/80 hover:bg-white/5 transition"
        >
          <span className="font-medium">{language.toUpperCase()}</span>
          <span className="opacity-60">/</span>
          <span className="opacity-80">{language === 'en' ? 'ES' : 'EN'}</span>
        </button>
      </nav>

      {/* Mobile: menu button */}
      <button
        type="button"
        className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 text-white/90 hover:bg-white/5"
        aria-label={language === 'en' ? 'Open menu' : 'Abrir menú'}
        onClick={() => setOpen(true)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile drawer */}
      {open && createPortal(
        <div className="fixed inset-0 z-[100] md:hidden" aria-hidden={!open}>
          {/* Full-screen panel (portal to body to avoid stacking issues) */}
          <aside
            role="dialog"
            aria-modal="true"
            aria-label={language === 'en' ? 'Navigation' : 'Navegación'}
            className={`absolute inset-0 h-full w-full bg-[rgba(8,10,76,1)] shadow-[0_10px_50px_rgba(0,0,0,0.6)] transform transition-transform duration-300 will-change-transform ${entered ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="relative border-b border-white/10">
              <button ref={closeRef} className="absolute right-3 top-3 edge-button px-3 py-1" onClick={() => setOpen(false)} aria-label={language === 'en' ? 'Close menu' : 'Cerrar menú'}>✕</button>
              <div className="py-5 flex items-center justify-center">
                <img src="/loto%20tauler%20white.png" alt="Tauler" className="h-7 w-auto" />
              </div>
            </div>
            <nav className="px-6 pt-4 text-white">
              <ul className="divide-y divide-white/10">
                <li>
                  <a className="block py-4 text-center text-lg hover:text-white/90" href="#thesis" onClick={() => setOpen(false)}>{t.thesis}</a>
                </li>
                <li>
                  <a className="block py-4 text-center text-lg hover:text-white/90" href="#capabilities" onClick={() => setOpen(false)}>{t.capabilities}</a>
                </li>
                <li>
                  <a className="block py-4 text-center text-lg hover:text-white/90" href="#partnerships" onClick={() => setOpen(false)}>{t.partnerships}</a>
                </li>
                <li>
                  <a className="block py-4 text-center text-lg hover:text-white/90" href="#contact" onClick={() => setOpen(false)}>{t.cta}</a>
                </li>
              </ul>
              <div className="mt-6 flex items-center justify-center">
                <button
                  type="button"
                  aria-label={t.toggleLabel}
                  onClick={() => { toggle(); setOpen(false) }}
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs border border-white/15 text-white/80 hover:bg-white/5 transition"
                >
                  <span className="font-medium">{language.toUpperCase()}</span>
                  <span className="opacity-60">/</span>
                  <span className="opacity-80">{language === 'en' ? 'ES' : 'EN'}</span>
                </button>
              </div>
            </nav>
          </aside>
        </div>, document.body)
      }
    </>
  )
}

function Footer() {
  const { language } = useLanguage()
  const t = language === 'en'
    ? {
        quick: 'Quick links',
        legal: 'Legal',
        thesis: 'Thesis',
        capabilities: 'Capabilities',
        partnerships: 'Partnerships',
        contact: 'Contact',
        privacy: 'Privacy Policy',
        cookies: 'Cookies Policy',
        legalNotice: 'Legal Notice',
        emailLabel: 'Email',
      }
    : {
        quick: 'Enlaces rápidos',
        legal: 'Legal',
        thesis: 'Tesis',
        capabilities: 'Capacidades',
        partnerships: 'Colaboraciones',
        contact: 'Contacto',
        privacy: 'Política de privacidad',
        cookies: 'Política de cookies',
        legalNotice: 'Aviso legal',
        emailLabel: 'Correo',
      }

  return (
    <footer className="relative border-t border-white/10 mt-20">
      <div className="container-edge py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          <div className="space-y-4">
            <a href="#" className="inline-flex items-center gap-3">
              <img src="/loto%20tauler%20white.png" alt="Tauler" className="h-7 w-auto" />
            </a>
            <div className="text-white/70 text-sm">
              <span className="uppercase tracking-widest text-white/50 text-xs mr-2">{t.emailLabel}</span>
              <a href="mailto:info@taulergroup.com" className="hover:text-white">info@taulergroup.com</a>
            </div>
          </div>

          <div>
            <div className="uppercase tracking-widest text-xs text-white/50 mb-3">{t.quick}</div>
            <ul className="space-y-2 text-white/80 text-sm">
              <li><a className="hover:text-white" href="#thesis">{t.thesis}</a></li>
              <li><a className="hover:text-white" href="#capabilities">{t.capabilities}</a></li>
              <li><a className="hover:text-white" href="#partnerships">{t.partnerships}</a></li>
              <li><a className="hover:text-white" href="#contact">{t.contact}</a></li>
            </ul>
          </div>

          <div>
            <div className="uppercase tracking-widest text-xs text-white/50 mb-3">{t.legal}</div>
            <ul className="space-y-2 text-white/80 text-sm">
              <li><a className="hover:text-white" href="#/privacy">{t.privacy}</a></li>
              <li><a className="hover:text-white" href="#/cookies">{t.cookies}</a></li>
              <li><a className="hover:text-white" href="#/legal">{t.legalNotice}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-white/40 text-xs">© {new Date().getFullYear()} Tauler Group</div>
      </div>
    </footer>
  )
}

function LegalShell({ titleEn, titleEs, children }: { titleEn: string; titleEs: string; children: React.ReactNode }) {
  const { language } = useLanguage()
  return (
    <section className="relative py-14 md:py-20">
      <div className="container-edge max-w-4xl">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-10">
          <h1 className="text-2xl md:text-4xl font-semibold mb-4">{language === 'en' ? titleEn : titleEs}</h1>
          <div className="legal-content">
            {children}
          </div>
          <div className="mt-8">
            <a href="#" className="edge-button">← {language === 'en' ? 'Back' : 'Volver'}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function LegalPrivacy() {
  return (
    <LegalShell titleEn="Privacy Policy and Data Protection" titleEs="Política de Privacidad y Protección de Datos">
      <p className="legal-note"><strong>{'Última actualización / Last updated'}:</strong> 15/9/2025</p>
      {/* Spanish */}
      <RenderByLang es>
        <h3>1. Responsable del Tratamiento</h3>
        <p>
          TAULER GROUP VENTURES S.L.<br/>
          Dirección: Plaza Curtidos Hnos. Dorta, 7 - 38005, Santa Cruz de Tfe.<br/>
          Email: info@taulergroup.com<br/>
          CIF: B21742259
        </p>
        <h3>2. Finalidad del Tratamiento</h3>
        <p>Sus datos serán tratados con las siguientes finalidades:</p>
        <ul>
          <li>Gestionar la relación comercial y prestación de servicios</li>
          <li>Envío de comunicaciones comerciales sobre nuestros servicios</li>
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
        <p>Los datos personales se conservarán mientras se mantenga la relación comercial y no se solicite su supresión, y en su caso, durante los años necesarios para cumplir con las obligaciones legales.</p>
        <h3>5. Destinatarios</h3>
        <p>Sus datos no serán cedidos a terceros salvo obligación legal o cuando sea necesario para la prestación de los servicios solicitados.</p>
        <h3>6. Derechos</h3>
        <p>Puede ejercer sus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición escribiendo a info@taulergroup.com.</p>
        <h3>7. Autoridad de Control</h3>
        <p>Puede presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si considera que el tratamiento no se ajusta a la normativa vigente.</p>
      </RenderByLang>
      {/* English */}
      <RenderByLang en>
        <h3>1. Data Controller</h3>
        <p>
          TAULER GROUP VENTURES S.L.<br/>
          Address: Plaza Curtidos Hnos. Dorta, 7 - 38005, Santa Cruz de Tfe.<br/>
          Email: info@taulergroup.com<br/>
          VAT ID: B21742259
        </p>
        <h3>2. Purpose of Processing</h3>
        <p>Your data will be processed for the following purposes:</p>
        <ul>
          <li>Manage the commercial relationship and service delivery</li>
          <li>Send marketing communications about our services</li>
          <li>Respond to your enquiries and requests</li>
          <li>Improve our services and user experience</li>
        </ul>
        <h3>3. Legal Basis</h3>
        <p>Processing is based on:</p>
        <ul>
          <li>Performance of a contract or commercial relationship</li>
          <li>User consent</li>
          <li>Legitimate interest of the controller</li>
        </ul>
        <h3>4. Data Retention</h3>
        <p>Personal data will be kept while the commercial relationship remains and no erasure is requested, and, where applicable, for the years required to comply with legal obligations.</p>
        <h3>5. Recipients</h3>
        <p>Your data will not be shared with third parties except where required by law or when necessary for the provision of the requested services.</p>
        <h3>6. Rights</h3>
        <p>You may exercise your rights of access, rectification, erasure, restriction, portability and objection by writing to info@taulergroup.com.</p>
        <h3>7. Supervisory Authority</h3>
        <p>You may lodge a complaint with the Spanish Data Protection Agency (www.aepd.es) if you consider that the processing does not comply with current regulations.</p>
      </RenderByLang>
    </LegalShell>
  )
}

function LegalCookies() {
  return (
    <LegalShell titleEn="Cookies Policy" titleEs="Política de Cookies">
      <p className="legal-note"><strong>{'Última actualización / Last updated'}:</strong> 15/9/2025</p>
      <RenderByLang es>
        <h3>¿Qué son las cookies?</h3>
        <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestra web.</p>
        <h3>Tipos de cookies que utilizamos</h3>
        <h4>Cookies técnicas (necesarias)</h4>
        <ul>
          <li>Permiten la navegación y el uso de funcionalidades básicas</li>
          <li>Son imprescindibles para el funcionamiento de la web</li>
        </ul>
        <h4>Cookies analíticas</h4>
        <ul>
          <li>Nos permiten analizar el uso de la web para mejorar nuestros servicios</li>
          <li>Utilizamos Google Analytics [y otras herramientas]</li>
        </ul>
        <h4>Cookies de preferencias</h4>
        <ul>
          <li>Permiten recordar información para mejorar su experiencia</li>
        </ul>
        <h3>¿Cómo gestionar las cookies?</h3>
        <p>Puede configurar su navegador para rechazar todas las cookies o para recibir un aviso cuando se envíe una cookie. Sin embargo, si rechaza las cookies, es posible que algunas partes de nuestro sitio web no funcionen correctamente.</p>
        <h3>Más información</h3>
        <p>Para más información sobre el uso de cookies y sus derechos, puede contactar con nosotros en info@taulergroup.com.</p>
      </RenderByLang>
      <RenderByLang en>
        <h3>What are cookies?</h3>
        <p>Cookies are small text files that are stored on your device when you visit our website.</p>
        <h3>Types of cookies we use</h3>
        <h4>Technical (necessary) cookies</h4>
        <ul>
          <li>Enable navigation and the use of basic functionality</li>
          <li>They are essential for the operation of the website</li>
        </ul>
        <h4>Analytics cookies</h4>
        <ul>
          <li>Allow us to analyze website usage to improve our services</li>
          <li>We use Google Analytics [and other tools]</li>
        </ul>
        <h4>Preference cookies</h4>
        <ul>
          <li>Allow remembering information to enhance your experience</li>
        </ul>
        <h3>How to manage cookies?</h3>
        <p>You can configure your browser to refuse all cookies or to alert you when a cookie is being sent. However, if you refuse cookies, some parts of our website may not function properly.</p>
        <h3>More information</h3>
        <p>For more information about the use of cookies and your rights, you can contact us at info@taulergroup.com.</p>
      </RenderByLang>
    </LegalShell>
  )
}

function LegalNotice() {
  return (
    <LegalShell titleEn="Legal Notice" titleEs="Aviso legal">
      <RenderByLang es>
        <p>Esta página web es propiedad de TAULER GROUP VENTURES S.L., con CIF B21742259 y domicilio en Plaza Curtidos Hnos. Dorta, 7 - 38005, Santa Cruz de Tfe.</p>
        <p>Para cualquier consulta o propuesta, contáctenos en el e-mail: info@taulergroup.com.</p>
        <p>La página web se rige por la normativa exclusivamente aplicable en España y en el espacio que comprende la Unión Europea, quedando sometidos a ella tanto nacionales como extranjeros que utilicen esta web.</p>
        <p>El acceso a nuestra página web por parte del USUARIO es gratuito y está condicionado a la previa lectura y aceptación íntegra, expresa y sin reservas del presente Aviso Legal vigente en el momento del acceso, que rogamos lea detenidamente. El USUARIO, en el momento que utiliza nuestro portal y sus contenidos o servicios, acepta y se somete expresamente a las Condiciones Generales de uso de este. Si el USUARIO no estuviere de acuerdo con las presentes Condiciones de uso, deberá abstenerse de utilizar este portal y operar por medio de este.</p>
        <p>En cualquier momento podremos modificar la presentación y configuración de nuestra Web, ampliar o reducir servicios, e incluso suprimirla de la Red, así como los servicios y contenidos prestados, todo ello de forma unilateral y sin previo aviso.</p>
        <h3>Propiedad intelectual</h3>
        <p>El sitio web, incluyendo a título enunciativo, pero no limitativo su programación, edición, compilación y demás elementos necesarios para su funcionamiento, los diseños, logotipos, texto y/o gráficos son propiedad del prestador o en su caso dispone de licencia o autorización expresa por parte de los autores. Todos los contenidos del sitio web se encuentran debidamente protegidos por la normativa de propiedad intelectual e industrial.</p>
        <p>Independientemente de la finalidad para la que fueran destinados, la reproducción total o parcial, uso, explotación, distribución y comercialización, requiere en todo caso de la autorización escrita previa por parte del prestador. Cualquier uso no autorizado previamente por parte del prestador será considerado un incumplimiento grave de los derechos de propiedad intelectual o industrial del autor.</p>
        <p>Los diseños, logotipos, texto y/o gráficos ajenos al prestador y que pudieran aparecer en el sitio web, pertenecen a sus respectivos propietarios, siendo ellos mismos responsables de cualquier posible controversia que pudiera suscitarse respecto a los mismos. En todo caso, el prestador cuenta con la autorización expresa y previa por parte de estos.</p>
        <p>El prestador no permite, salvo autorización expresa, a terceros para que puedan redirigir directamente a los contenidos concretos del sitio web. En todo caso, y si mediare permiso, deberá redirigirla al sitio web principal del prestador.</p>
        <p>El prestador reconoce a favor de sus titulares los correspondientes derechos de propiedad industrial e intelectual, no implicando su sola mención o aparición en el sitio web la existencia de derechos o responsabilidad alguna del prestador sobre los mismos, como tampoco respaldo, patrocinio o recomendación por parte de este.</p>
        <p>Para realizar cualquier tipo de observación respecto a posibles incumplimientos de los derechos de propiedad intelectual o industrial, así como sobre cualquiera de los contenidos del sitio web, puede hacerlo a través del siguiente correo electrónico: info@taulergroup.com.</p>
        <h3>Condiciones Generales de uso</h3>
        <p>El acceso a nuestra página web es gratuito y no exige previa suscripción o registro. El USUARIO debe acceder a la misma conforme a la buena fe, las normas de orden público y a las presentes Condiciones Generales de uso. El acceso a nuestro sitio web se realiza bajo la propia y exclusiva responsabilidad del USUARIO, que se abstendrá de utilizar cualquiera de los servicios con fines o efectos ilícitos, prohibidos o lesivos para los derechos de terceras personas, respondiendo en todo caso de los daños y perjuicios que pueda causar a terceros o a nosotros mismos.</p>
        <p>Teniendo en cuenta la imposibilidad de control respecto a la información, contenidos y servicios que contengan otras páginas web a los que se pueda acceder a través de los enlaces que nuestra página web pueda poner a su disposición, le comunicamos que quedamos eximidos de cualquier responsabilidad por los daños y perjuicios de toda clase que pudiesen derivar por la utilización de esas páginas web, ajenas a nuestra empresa, por parte del USUARIO.</p>
        <p>Puede obtener más información sobre el uso que hacemos de sus datos de carácter personal en la Política de Privacidad de nuestra web.</p>
      </RenderByLang>
      <RenderByLang en>
        <p>This website is owned by TAULER GROUP VENTURES S.L., VAT ID B21742259, with registered address at Plaza Curtidos Hnos. Dorta, 7 - 38005, Santa Cruz de Tfe.</p>
        <p>For any enquiry or proposal, please contact us at: info@taulergroup.com.</p>
        <p>This website is governed by the regulations applicable in Spain and within the European Union. Both nationals and foreign users who use this website are subject to said regulations.</p>
        <p>Access to our website by the USER is free and conditioned upon prior complete, express and unreserved reading and acceptance of this Legal Notice in force at the time of access, which we ask you to read carefully. By using our portal and its contents or services, the USER expressly accepts and agrees to the General Conditions of Use. If the USER does not agree with these Conditions of Use, they must refrain from using this site and operating through it.</p>
        <p>We may modify the presentation and configuration of our Website at any time, expand or reduce services, or even remove it from the network, as well as the services and content provided, unilaterally and without prior notice.</p>
        <h3>Intellectual Property</h3>
        <p>The website, including but not limited to its programming, editing, compilation and other elements necessary for its operation, designs, logos, text and/or graphics are owned by the provider or, where appropriate, licensed or expressly authorised by the authors. All the content of the website is duly protected by intellectual and industrial property regulations.</p>
        <p>Regardless of the purpose for which they were intended, total or partial reproduction, use, exploitation, distribution and marketing requires, in all cases, the prior written authorisation of the provider. Any unauthorised use by the provider will be considered a serious breach of the author's intellectual or industrial property rights.</p>
        <p>Designs, logos, text and/or graphics not belonging to the provider that may appear on the site belong to their respective owners, who are responsible for any possible dispute regarding them. In any case, the provider has the express prior authorisation of these owners.</p>
        <p>The provider does not allow, unless expressly authorised, third parties to link directly to specific content of the website. If permission is granted, links must point to the provider’s main website.</p>
        <p>The provider recognises in favour of their owners the corresponding industrial and intellectual property rights. The mere mention or appearance of such contents on the website does not imply the existence of rights or any responsibility of the provider over them, nor endorsement, sponsorship or recommendation by the provider.</p>
        <p>To make any observation regarding possible breaches of intellectual or industrial property rights, as well as any of the contents of the website, you can do so via the following email: info@taulergroup.com.</p>
        <h3>General Conditions of Use</h3>
        <p>Access to our website is free and does not require prior subscription or registration. The USER must access it in accordance with good faith, public order rules and these General Conditions of Use. Access to our site is under the USER's sole responsibility. The USER shall refrain from using any services for purposes or effects that are unlawful, prohibited or harmful to the rights of third parties, and will be liable for any damages that may be caused to third parties or to us.</p>
        <p>Given the impossibility of controlling the information, content and services contained on other web pages that can be accessed through the links that our website may provide, we inform you that we are exempt from any liability for damages of any kind that may arise from the use of those web pages, which are external to our company, by the USER.</p>
        <p>You can obtain more information about our use of your personal data in the Privacy Policy on our website.</p>
      </RenderByLang>
    </LegalShell>
  )
}

// Helper to render by selected language
function RenderByLang({ en, es, children }: { en?: boolean; es?: boolean; children: React.ReactNode }) {
  const { language } = useLanguage()
  const show = (language === 'en' && en) || (language === 'es' && es)
  return show ? <>{children}</> : null
}
