import './index.css'
import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { Easing } from 'framer-motion'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import { I18nProvider, useI18n, LanguageSwitch, LanguageSwitchMenu } from './i18n'

// -----------------------------------------------------------------------------
// Hooks & Utilities
// -----------------------------------------------------------------------------

function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])
}

// -----------------------------------------------------------------------------
// Framer Motion Animation Variants
// -----------------------------------------------------------------------------

const easeOutExpo: Easing = [0.16, 1, 0.3, 1]

const fadeInUp = {
  hidden: { opacity: 0, y: 15, filter: 'blur(2px)' },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: easeOutExpo
    }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: easeOutExpo
    }
  }
}

// -----------------------------------------------------------------------------
// Premium Components: Scroll Progress & Animated Background
// -----------------------------------------------------------------------------

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / scrollHeight) * 100
      setProgress(scrolled)
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div 
      className="scroll-progress"
      style={{ transform: `scaleX(${progress / 100})` }}
    />
  )
}

// Palantir-style Dynamic Background with Data Streams
function DynamicBackground() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, -200])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Animated Grid Lines */}
      <motion.div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'linear-gradient(rgba(232,21,28,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(232,21,28,0.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          y: y1
        }}
      />

      {/* Diagonal flowing lines representing data streams */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="dataStreamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(232,21,28,0.5)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {[...Array(5)].map((_, i) => (
          <g key={i}>
            <motion.line
              x1={i * 200} y1="0" x2={i * 200 + 500} y2="1000"
              stroke="url(#dataStreamGradient)"
              strokeWidth="1"
              strokeDasharray="20 40"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -600 }}
              transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
            />
            {/* Data packets moving along the lines */}
            <circle r="2" fill="rgb(232,21,28)">
              <animateMotion
                dur={`${8 + i}s`}
                repeatCount="indefinite"
                path={`M ${i * 200},0 L ${i * 200 + 500},1000`}
              />
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur={`${8 + i}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>

      {/* Floating data nodes instead of simple dots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute flex items-center justify-center"
          style={{
            left: `${(i * 15 + 10) % 90}%`,
            top: `${(i * 25 + 5) % 90}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        >
          <div className="w-1.5 h-1.5 bg-[rgb(var(--color-accent-red))] rounded-full relative">
            <div className="absolute inset-[-4px] border border-[rgb(var(--color-accent-red))]/20 rounded-full animate-ping" />
          </div>
          {/* Connecting lines suggesting network */}
          <svg className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 overflow-visible">
             <line x1="16" y1="16" x2="100" y2="50" stroke="rgb(232,21,28)" strokeWidth="0.5" strokeDasharray="2 2" />
          </svg>
        </motion.div>
      ))}

      {/* Corner tech elements removed */}
    </div>
  )
}

// -----------------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------------

function Hero() {
  const { t } = useI18n()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  
  // Smooth parallax with spring animation
  const springConfig = { stiffness: 100, damping: 30, mass: 1 }
  const mouseX = useSpring(mousePos.x, springConfig)
  const mouseY = useSpring(mousePos.y, springConfig)
  
  // Scroll-based parallax
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const scale = useTransform(scrollY, [0, 300], [1, 0.95])
  const borderRadius = useTransform(scrollY, [0, 300], [0, 24])

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20
    const y = (e.clientY / window.innerHeight - 0.5) * 20
    setMousePos({ x, y })
  }

  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40 pb-32 md:pt-60 md:pb-48 origin-top"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      style={{ y, scale, borderRadius, backgroundColor: 'rgb(var(--color-bg))' }}
    >
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="/videocorto1%20ok.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--color-bg))] via-[rgb(var(--color-bg))]/40 to-[rgb(var(--color-bg))]" />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {/* Animated Orbs */}
        <motion.div 
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] bg-[rgb(var(--color-accent))]/10"
          style={{ x: mouseX, y: mouseY }}
        />
        <motion.div 
          className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[100px] bg-[rgb(var(--color-accent-red))]/5"
          style={{ x: useSpring(useTransform(mouseX, x => x * -1), springConfig), y: useSpring(useTransform(mouseY, y => y * -1), springConfig) }}
        />
      </div>

      <div className="container-edge text-center z-10 relative px-6 md:px-12">
        
        <h1 className="heading-hero max-w-6xl mx-auto mb-12 relative">
          {/* Subtle red glare behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[150%] bg-[rgb(var(--color-accent-red))] blur-[90px] opacity-[0.15] -z-10 pointer-events-none" />

          {/* Primera línea */}
          <motion.span
            className="block will-change-[transform,opacity]"
            style={{ 
              background: 'linear-gradient(180deg, rgb(var(--color-ink)) 0%, rgba(10, 25, 47, 0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            initial={{ 
              opacity: 0, 
              y: -25,
              scale: 0.95
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: 1
            }}
            transition={{ 
              duration: 1.1, 
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {t('hero.line1')}
          </motion.span>

          {/* Segunda línea */}
          <motion.span
            className="text-[0.8em] block mt-2 relative will-change-[transform,opacity]"
            style={{ 
              background: 'linear-gradient(180deg, rgba(10, 25, 47, 0.65) 0%, rgba(10, 25, 47, 0.55) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            initial={{ 
              opacity: 0, 
              y: 15,
              scale: 0.95
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: 1
            }}
            transition={{ 
              duration: 1.0, 
              delay: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {t('hero.line2')}
          </motion.span>
        </h1>

        <motion.p 
          className="subheading-hero max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: easeOutExpo }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: easeOutExpo }}
        >
          <a href="#units" className="btn-primary group">
            <span>{t('hero.cta')}</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
          <a href="#contact" className="btn-ghost">
            {t('hero.ctaSecondary')}
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}

function Manifesto() {
  const { t } = useI18n()
  return (
    <motion.section
      className="relative py-20 md:py-32 lg:py-48 border-t border-[rgb(var(--color-ink))]/5 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
    >
      <div className="absolute left-0 top-32 w-px h-32 bg-gradient-to-b from-transparent via-[rgb(var(--color-accent-red))] to-transparent opacity-20 hidden md:block"></div>
      
      {/* Background Grid Accent - Hidden on mobile */}
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-[0.03] pointer-events-none overflow-hidden hidden lg:block">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid-manifesto" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-manifesto)" />
        </svg>
      </div>
      
      <div className="container-edge w-full">
        {/* Asymmetric 40-60 grid - Apple style */}
        <div className="grid lg:grid-cols-12 gap-12 md:gap-16 lg:gap-20 items-start lg:items-center w-full">
           <div className="lg:col-span-5 w-full">
              <div className="eyebrow">{t('manifesto.eyebrow')}</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--color-ink))] mb-6 md:mb-8" style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}>
                {t('manifesto.title')}
              </h2>
           </div>
           <div className="lg:col-span-7 space-y-6 md:space-y-10 text-lg sm:text-xl lg:text-2xl text-[rgb(var(--color-ink))]/90 font-light leading-[1.6] w-full pr-0">
              <p className="break-words">
                {t('manifesto.paragraph1')} <strong className="text-[rgb(var(--color-ink))] font-semibold">{t('manifesto.transformation')}</strong>{t('manifesto.paragraph1End')}
              </p>
              <div className="pl-6 md:pl-8 border-l-[3px] border-[rgb(var(--color-accent-red))] relative">
                 <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-[rgb(var(--color-accent-red))] animate-pulse-dot" />
                 <p className="text-xl sm:text-2xl lg:text-3xl text-[rgb(var(--color-ink))] italic font-light break-words" style={{ lineHeight: '1.4' }}>
                   {t('manifesto.quote')}
                 </p>
              </div>
           </div>
        </div>
      </div>
    </motion.section>
  )
}

// Palantir-style process flow visualization for Consulting
function _ConsultingFlowViz() {
  const stages = ['DIAG', 'ARQ', 'DEV', 'OPS', 'ESC']
  return (
    <div className="relative h-28 mb-8 overflow-hidden rounded-sm border border-[rgb(var(--color-ink))]/10 bg-[rgb(var(--color-ink))]/[0.02]">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(rgba(10,25,47,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(10,25,47,0.5) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgb(232,21,28)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path d="M 0,50 L 400,50" stroke="rgba(232,21,28,0.2)" strokeWidth="1" fill="none" />
        <path d="M 0,50 L 400,50" stroke="url(#flowGradient)" strokeWidth="2" fill="none" strokeDasharray="8 12" className="animate-dash-flow" />
      </svg>
      <div className="relative h-full flex items-center justify-between px-6">
        {stages.map((stage, i) => (
          <div key={stage} className="flex flex-col items-center gap-3 animate-fade-in-up group/stage" style={{ animationDelay: `${i * 100}ms` }}>
            <div className={`w-3 h-3 rounded-full relative flex items-center justify-center transition-all duration-500 ${
              i === stages.length - 1
                ? 'scale-125'
                : 'group-hover/stage:scale-125'
            }`}>
              <div className={`absolute inset-0 rounded-full ${
                i === stages.length - 1
                  ? 'bg-[rgb(var(--color-accent-red))] animate-pulse-dot'
                  : 'bg-[rgb(var(--color-ink))]/20 group-hover/stage:bg-[rgb(var(--color-accent-red))]/60'
              }`} />
              <div className={`absolute inset-[-4px] rounded-full border border-[rgb(var(--color-accent-red))] opacity-0 transition-opacity duration-500 ${
                i === stages.length - 1 ? 'opacity-30' : 'group-hover/stage:opacity-30'
              }`} />
            </div>
            <span className={`text-[9px] font-mono tracking-widest uppercase transition-colors duration-300 ${
              i === stages.length - 1 ? 'text-[rgb(var(--color-accent-red))] font-bold' : 'text-[rgb(var(--color-ink))]/40 group-hover/stage:text-[rgb(var(--color-ink))]/80'
            }`}>
              {stage}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Palantir-style network visualization for Venture Building
function _VentureNetworkViz() {
  return (
    <div className="relative h-28 mb-8 overflow-hidden rounded-sm border border-[rgb(var(--color-ink))]/10 bg-[rgb(var(--color-ink))]/[0.02]">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(rgba(10,25,47,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(10,25,47,0.5) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
        {[
          { x2: 40, y2: 25, delay: '0s' },
          { x2: 160, y2: 25, delay: '0.5s' },
          { x2: 40, y2: 75, delay: '1s' },
          { x2: 160, y2: 75, delay: '1.5s' }
        ].map((line, i) => (
          <g key={i}>
            <line
              x1="100" y1="50" x2={line.x2} y2={line.y2}
              stroke="rgba(232,21,28,0.2)"
              strokeWidth="1"
            />
            <circle r="1" fill="rgb(232,21,28)">
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                path={`M 100,50 L ${line.x2},${line.y2}`}
                begin={line.delay}
              />
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="3s"
                repeatCount="indefinite"
                begin={line.delay}
              />
            </circle>
          </g>
        ))}
      </svg>
      <div className="relative h-full w-full">
        {[
          { top: '20%', left: '20%' },
          { top: '20%', right: '20%' },
          { bottom: '20%', left: '20%' },
          { bottom: '20%', right: '20%' }
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[rgb(var(--color-ink))]/20 border border-[rgb(var(--color-ink))]/40 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
            style={pos}
          >
            <div className="absolute inset-[-4px] border border-[rgb(var(--color-ink))]/10 rounded-full animate-pulse-soft" style={{ animationDelay: `${i * 0.5}s` }} />
          </div>
        ))}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[rgb(var(--color-accent-red))]/10 border border-[rgb(var(--color-accent-red))]/40 flex items-center justify-center backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-[rgb(var(--color-accent-red))]"/>
            </div>
            <div className="absolute inset-[-4px] border border-[rgb(var(--color-accent-red))]/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-[-8px] border border-[rgb(var(--color-accent-red))]/10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Units() {
  const { t } = useI18n()
  const [selectedCompany, setSelectedCompany] = useState<{
    name: string;
    description: string;
    url: string;
    logo: string;
    alt: string;
    className?: string;
  } | null>(null)
  
  const companiesSectionRef = useRef<HTMLDivElement>(null)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedCompany) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedCompany])

  const companies = [
    { 
      name: "Gestiona Mogán", 
      description: t('units.gestionaMoganDesc'), 
      url: "https://www.gestmogan.com/",
      logo: "/cropped-MOGAN-GESTIONA-MARCA-Y-COMUNICACION.png", 
      alt: "Gestiona Mogán" 
    },
    { 
      name: "Dormitorum", 
      description: t('units.dormitorumDesc'), 
      url: "https://dormitorum.es", 
      logo: "/logo-dormitorum-aislado-1.png", 
      alt: "Dormitorum" 
    },
    { 
      name: "Transition Capital", 
      description: t('units.transitionCapitalDesc'), 
      url: "https://transitioncapital.es/",
      logo: "/Logo-05.png", 
      alt: "Transition Capital" 
    },
    { 
      name: "Gesplan", 
      description: t('units.gesplanDesc'), 
      url: "https://www.gesplan.es", 
      logo: "/Capa_1-2%20(1).png", 
      alt: "Gesplan",
      className: "brightness-0"
    }
  ]

  return (
    <motion.section
      className="relative py-20 md:py-32 border-t border-[rgb(var(--color-ink))]/5 bg-gradient-to-b from-white/[0.02] to-transparent"
      id="units"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
    >
      <div className="container-edge">
        <div className="mb-20 max-w-4xl">
          <div className="eyebrow">{t('units.eyebrow')}</div>
          <h2 className="text-4xl md:text-6xl font-bold text-[rgb(var(--color-ink))]" style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            {t('units.title')} <span className="text-[rgb(var(--color-ink))]/40">{t('units.titleHighlight')}</span>
          </h2>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 gap-10 lg:gap-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Unit 1 - Consulting with Flow Visualization */}
          <motion.div 
            className="tech-card p-8 md:p-10 rounded-sm group flex flex-col h-full cursor-pointer"
            variants={staggerItem}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            onClick={() => window.open('https://consulting.taulergroup.com', '_blank')}
          >
            <div className="mb-8 shrink-0">
               <h3 className="text-2xl md:text-3xl font-bold text-[rgb(var(--color-ink))] mb-4 uppercase" style={{ letterSpacing: '-0.01em' }}>{t('units.consultingTitle')}</h3>
               <p className="text-base text-[rgb(var(--color-ink))]/90 leading-[1.7] font-light">
                 {t('units.consultingDesc')}
               </p>
            </div>
            
            
            <ul className="space-y-4 mb-8 flex-1">
               {[
                 t('units.consultingItem1'),
                 t('units.consultingItem2'),
                 t('units.consultingItem3'),
                 t('units.consultingItem4')
               ].map((item) => (
                 <li key={item} className="flex items-start gap-3 text-sm text-[rgb(var(--color-ink))]/80 leading-[1.6] group/item">
                   <span className="text-[rgb(var(--color-accent-red))] text-lg font-bold mt-0.5 transition-transform group-hover/item:translate-x-1">›</span>
                   <span>{item}</span>
                 </li>
               ))}
            </ul>
            <div className="pt-6 border-t border-[rgb(var(--color-ink))]/10 flex items-center justify-between">
               <p className="text-[rgb(var(--color-ink))] font-semibold text-sm">{t('units.consultingFooter')}</p>
               <span className="text-[rgb(var(--color-accent-red))] text-sm font-bold uppercase tracking-widest border border-[rgb(var(--color-accent-red))]/20 px-4 py-2 rounded-sm hover:bg-[rgb(var(--color-accent-red))] hover:text-white transition-all duration-300">{t('units.learnMore')}</span>
            </div>
          </motion.div>

          {/* Unit 2 - Venture Building with Network Visualization */}
          <motion.div 
            className="tech-card p-8 md:p-10 rounded-sm group flex flex-col h-full cursor-pointer"
            variants={staggerItem}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            onClick={() => window.open('https://ventures.taulergroup.com', '_blank')}
          >
            <div className="mb-8 shrink-0">
               <h3 className="text-2xl md:text-3xl font-bold text-[rgb(var(--color-ink))] mb-4 uppercase" style={{ letterSpacing: '-0.01em' }}>{t('units.ventureTitle')}</h3>
               <p className="text-base text-[rgb(var(--color-ink))]/90 leading-[1.7] font-light">
                 {t('units.ventureDesc')}
               </p>
            </div>
            
            
            <ul className="space-y-4 mb-8 flex-1">
               {[
                 t('units.ventureItem1'),
                 t('units.ventureItem2'),
                 t('units.ventureItem3'),
                 t('units.ventureItem4')
               ].map((item) => (
                 <li key={item} className="flex items-start gap-3 text-sm text-[rgb(var(--color-ink))]/80 leading-[1.6] group/item">
                   <span className="text-[rgb(var(--color-accent-red))] text-lg font-bold mt-0.5 transition-transform group-hover/item:translate-x-1">›</span>
                   <span>{item}</span>
                 </li>
               ))}
            </ul>
            <div className="pt-6 border-t border-[rgb(var(--color-ink))]/10 flex items-center justify-between">
               <p className="text-[rgb(var(--color-ink))] font-semibold text-sm">{t('units.ventureFooter')}</p>
               <span className="text-[rgb(var(--color-accent-red))] text-sm font-bold uppercase tracking-widest border border-[rgb(var(--color-accent-red))]/20 px-4 py-2 rounded-sm hover:bg-[rgb(var(--color-accent-red))] hover:text-white transition-all duration-300">{t('units.learnMore')}</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
           ref={companiesSectionRef}
           id="companies-section"
           className="mt-24 pt-12 border-t border-[rgb(var(--color-ink))]/10"
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2, duration: 1 }}
        >
            <p className="text-center text-xs font-bold uppercase tracking-widest text-[rgb(var(--color-ink))]/40 mb-10">
              {t('units.trustUs')}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
              {companies.map((company, i) => (
                <img 
                  key={i} 
                  src={company.logo} 
                  alt={company.alt} 
                  onClick={() => setSelectedCompany(company)}
                  className={`h-12 md:h-16 w-auto object-contain opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer ${company.className || ''}`} 
                />
              ))}
            </div>
        </motion.div>

        <motion.div 
           className="mt-16"
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.3, duration: 1 }}
        >
            <p className="text-center text-xs font-bold uppercase tracking-widest text-[rgb(var(--color-ink))]/40 mb-10">
              {t('units.weCreated')}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
              {[
                { src: "/logo Columbus gris.png", alt: "Columbus", url: "https://columbus.taulergroup.com" },
                { src: "/logo municipia color.png", alt: "Municipia", url: "https://municipia.es" }
              ].map((logo, i) => (
                <a 
                  key={i}
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className="h-12 md:h-16 w-auto object-contain opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer" 
                  />
                </a>
              ))}
            </div>
        </motion.div>

      </div>

      {/* Modal rendered via Portal to document.body */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedCompany && (
            <>
              {/* Full-page backdrop blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCompany(null)}
                className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[9998]"
              />
              {/* Modal content centered on screen */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] bg-[rgb(var(--color-bg))] border border-[rgb(var(--color-ink))]/10 rounded-lg shadow-2xl overflow-hidden p-8 w-[90%] sm:w-[480px]"
              >
                <button 
                  onClick={() => setSelectedCompany(null)}
                  className="absolute top-4 right-4 text-[rgb(var(--color-ink))]/40 hover:text-[rgb(var(--color-ink))] transition-colors z-20"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
                
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 flex items-center justify-center mb-6">
                    <img 
                      src={selectedCompany.logo} 
                      alt={selectedCompany.alt} 
                      className={`max-h-full w-auto object-contain ${selectedCompany.className || ''}`}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{selectedCompany.name}</h3>
                  <p className="text-[rgb(var(--color-ink))]/80 mb-8 leading-relaxed font-light">
                    {selectedCompany.description}
                  </p>
                  <a 
                    href={selectedCompany.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary w-full"
                  >
                    {t('units.visitWeb')}
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.section>
  )
}

// -----------------------------------------------------------------------------
// Advanced Visualizations (Palantir/Sci-Fi Style)
// -----------------------------------------------------------------------------

function Differentiators() {
  const { t } = useI18n()
  const items = [
    {
      title: t('differentiators.team.title'),
      desc: t('differentiators.team.desc'),
      cta: t('differentiators.team.cta'),
      link: "#/team",
      visual: <img src="/equipo%20multidisciplinar%20ok.webp" alt={t('differentiators.team.title')} className="w-full h-full object-cover" />
    },
    {
      title: t('differentiators.holistic.title'),
      desc: t('differentiators.holistic.desc'),
      cta: t('differentiators.holistic.cta'),
      link: "#/manifesto",
      visual: <img src="/holistica%202%20ok.webp" alt={t('differentiators.holistic.title')} className="w-full h-full object-cover" />
    },
    {
      title: t('differentiators.tech.title'),
      desc: t('differentiators.tech.desc'),
      cta: t('differentiators.tech.cta'),
      link: "#/tech",
      visual: <img src="/tecnologia%20propia%20ok.webp" alt={t('differentiators.tech.title')} className="w-full h-full object-cover" />
    }
  ]

  return (
    <div id="differentiators" className="relative bg-[rgb(var(--color-bg))]">
      {items.map((item, i) => (
        <div 
          key={i}
          className="min-h-[80vh] sticky top-0 flex items-center border-t border-[rgb(var(--color-ink))]/5 overflow-hidden"
          style={{ backgroundColor: 'rgb(var(--color-bg))' }}
        >
          {/* Subtle background graphic */}
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-[0.02] pointer-events-none">
             <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" />
             </svg>
          </div>
          
          {/* Backdrop blur for stacking effect */}
          <div className="absolute inset-0 backdrop-blur-sm -z-10" />

          <div className="container-edge relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center px-6">
            {/* Text */}
            <div className={`space-y-6 ${i % 2 === 1 ? 'md:order-2' : ''} z-20`}>
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.7 }}
                 className="inline-flex items-center gap-3 mb-4"
               >
                 <span className="text-[rgb(var(--color-accent-red))] font-mono text-sm">0{i + 1}</span>
                 <div className="h-px w-12 bg-[rgb(var(--color-accent-red))]/50" />
               </motion.div>
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.7, delay: 0.1 }}
                 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--color-ink))] uppercase tracking-tighter"
                 style={{ wordBreak: 'normal', overflowWrap: 'break-word', hyphens: 'none' }}
               >
                 {item.title}
               </motion.h2>
               <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.7, delay: 0.2 }}
                 className="text-lg sm:text-xl md:text-2xl text-[rgb(var(--color-ink))]/90 font-light leading-relaxed max-w-lg"
               >
                 {item.desc}
               </motion.p>
               
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.7, delay: 0.3 }}
                 className="pt-6"
               >
                  <a href={item.link} className="inline-flex items-center gap-2 text-[rgb(var(--color-accent-red))] font-bold uppercase tracking-widest text-sm hover:gap-4 transition-all duration-300">
                    {item.cta} <span className="text-lg">→</span>
                  </a>
               </motion.div>
            </div>

            {/* Visual */}
            <div className={`flex justify-center ${i % 2 === 1 ? 'md:order-1' : ''} mt-8 md:mt-0`}>
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.7, delay: 0.3 }}
                 className="relative w-full max-w-[500px] aspect-[4/3] md:max-w-none"
               >
                 {/* Glass card background */}
                 <div className="absolute inset-0 bg-[rgb(var(--color-ink))]/5 blur-3xl rounded-3xl opacity-20 transform scale-105" />
                 <div className="w-full h-full rounded-2xl overflow-hidden border border-[rgb(var(--color-ink))]/10 bg-[rgb(var(--color-bg))]/20 backdrop-blur-sm shadow-2xl">
                    {item.visual}
                 </div>
               </motion.div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function CallToAction() {
  const { t } = useI18n()
  return (
    <motion.section 
      className="relative py-32 md:py-48 overflow-hidden border-t border-[rgb(var(--color-ink))]/5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      id="contact"
    >
      <div className="container-edge relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Text */}
          <div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[rgb(var(--color-ink))] mb-8 tracking-tighter">
              {t('contact.title')}
            </h2>
            <p className="text-xl md:text-2xl text-[rgb(var(--color-ink))]/90 font-light mb-8 max-w-xl">
              {t('contact.subtitle')}
            </p>
            
      

            <div className="mt-12 pt-8 border-t border-[rgb(var(--color-ink))]/10">
              <p className="text-sm text-[rgb(var(--color-ink))]/50 mb-2">{t('contact.emailLabel')}</p>
              <a href="mailto:info@taulergroup.com" className="text-lg text-[rgb(var(--color-accent-red))] font-semibold hover:underline">
                info@taulergroup.com
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <motion.div 
            className="tech-card p-8 md:p-10 rounded-sm"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-8">{t('contact.formTitle')}</h3>
            
            <form className="space-y-6" action="https://formspree.io/f/mandzjzo" method="POST">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[rgb(var(--color-ink))]/50 mb-2">{t('contact.nameLabel')}</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  className="w-full bg-transparent border-b border-[rgb(var(--color-ink))]/20 py-3 text-[rgb(var(--color-ink))] focus:outline-none focus:border-[rgb(var(--color-accent-red))] transition-colors" 
                  placeholder={t('contact.namePlaceholder')} 
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[rgb(var(--color-ink))]/50 mb-2">{t('contact.emailFieldLabel')}</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  className="w-full bg-transparent border-b border-[rgb(var(--color-ink))]/20 py-3 text-[rgb(var(--color-ink))] focus:outline-none focus:border-[rgb(var(--color-accent-red))] transition-colors" 
                  placeholder={t('contact.emailPlaceholder')} 
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[rgb(var(--color-ink))]/50 mb-2">{t('contact.companyLabel')}</label>
                <input 
                  type="text" 
                  name="company" 
                  className="w-full bg-transparent border-b border-[rgb(var(--color-ink))]/20 py-3 text-[rgb(var(--color-ink))] focus:outline-none focus:border-[rgb(var(--color-accent-red))] transition-colors" 
                  placeholder={t('contact.companyPlaceholder')} 
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[rgb(var(--color-ink))]/50 mb-2">{t('contact.messageLabel')}</label>
                <textarea 
                  name="message" 
                  rows={4} 
                  required
                  className="w-full bg-transparent border-b border-[rgb(var(--color-ink))]/20 py-3 text-[rgb(var(--color-ink))] focus:outline-none focus:border-[rgb(var(--color-accent-red))] transition-colors resize-none" 
                  placeholder={t('contact.messagePlaceholder')}
                ></textarea>
              </div>
              <button type="submit" className="w-full btn-primary py-4 mt-4">
                {t('contact.submit')}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none -z-10">
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-[rgb(var(--color-accent-red))]/5 to-transparent blur-3xl opacity-50" />
      </div>
    </motion.section>
  )
}

function Navbar() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const menuItems = [
    { 
      title: t('menu.proposal'), 
      href: "#units", 
      icon: "01", 
      desc: t('menu.proposalDesc'),
      subsections: [
        { title: t('menu.consulting'), href: "#/consulting" },
        { title: t('menu.ventureBuilder'), href: "#/venture-building" }
      ]
    },
    { 
      title: t('menu.about'), 
      href: "#differentiators", 
      icon: "02", 
      desc: t('menu.aboutDesc'),
      subsections: [
        { title: t('menu.team'), href: "#/team" },
        { title: t('menu.manifesto'), href: "#/manifesto" },
        { title: t('menu.technology'), href: "#/tech" }
      ]
    },
    { 
      title: t('menu.contact'), 
      href: "#contact", 
      icon: "03", 
      desc: t('menu.contactDesc'),
      subsections: []
    },
  ]

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-[rgb(var(--color-bg))]/80 backdrop-blur-md border-b border-[rgb(var(--color-ink))]/5' : 'py-8 bg-transparent'}`}>
        <div className="container-edge flex items-center justify-between">
           <a href="#" className="relative z-50">
             <img src="/logo tauler.png" alt="Tauler Group" className="h-8 md:h-10 w-auto" />
           </a>

           <div className="flex items-center gap-4 md:gap-8">
             <nav className="hidden md:flex items-center gap-8">
               <a href="#units" className="text-sm font-medium text-[rgb(var(--color-ink))]/70 hover:text-[rgb(var(--color-ink))] transition-colors">{t('nav.proposal')}</a>
               <a href="#differentiators" className="text-sm font-medium text-[rgb(var(--color-ink))]/70 hover:text-[rgb(var(--color-ink))] transition-colors">{t('nav.about')}</a>
               <a href="#contact" className="text-sm font-medium text-[rgb(var(--color-ink))]/70 hover:text-[rgb(var(--color-ink))] transition-colors">{t('nav.contact')}</a>
             </nav>
             
             <LanguageSwitch />
             
             <button 
               className="group flex flex-col gap-1.5 w-8 items-end z-50 relative"
               onClick={() => setMenuOpen(!menuOpen)}
             >
                <span className={`h-0.5 bg-[rgb(var(--color-ink))] transition-all duration-300 ${menuOpen ? 'w-8 rotate-45 translate-y-2 bg-white' : 'w-8 group-hover:w-6'}`} />
                <span className={`h-0.5 bg-[rgb(var(--color-ink))] transition-all duration-300 ${menuOpen ? 'opacity-0' : 'w-6 group-hover:w-8'}`} />
                <span className={`h-0.5 bg-[rgb(var(--color-ink))] transition-all duration-300 ${menuOpen ? 'w-8 -rotate-45 -translate-y-2 bg-white' : 'w-4 group-hover:w-6'}`} />
             </button>
           </div>
        </div>
      </header>

      {/* Premium Side Menu - Palantir Style */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-[rgb(8,10,76)] z-50 shadow-2xl border-l border-white/10"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[rgb(var(--color-accent-red))] to-transparent" />
              
              <div className="absolute top-8 right-8 z-50">
                <button onClick={() => setMenuOpen(false)} className="text-white/50 hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Menu Content */}
              <div className="h-full overflow-y-auto px-8 md:px-12 py-20">
                <div className="mb-16 flex items-center justify-between">
                  <div className="eyebrow justify-start flex">TAULER GROUP</div>
                  <LanguageSwitchMenu />
                </div>

                {/* Menu Items */}
                <div className="space-y-8 mb-16">
                  {menuItems.map((item) => (
                    <div key={item.title} className="space-y-3">
                      <a
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block tech-card p-6 rounded-sm group/item transition-all duration-300 hover:bg-white/5 border border-white/5 hover:border-white/10"
                      >
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 rounded-full border border-[rgb(var(--color-accent-red))]/30 flex items-center justify-center text-[rgb(var(--color-accent-red))] font-mono text-sm">
                             {item.icon}
                           </div>
                           <div>
                             <h3 className="text-xl font-bold text-white mb-1 group-hover/item:text-[rgb(var(--color-accent-red))] transition-colors">{item.title}</h3>
                             <p className="text-white/50 text-sm font-light">{item.desc}</p>
                           </div>
                           <div className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity -translate-x-4 group-hover/item:translate-x-0 duration-300">
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                           </div>
                        </div>
                      </a>
                      
                      {/* Subsections */}
                      {item.subsections && item.subsections.length > 0 && (
                        <div className="ml-20 space-y-2">
                          {item.subsections.map((sub) => (
                            <a
                              key={sub.title}
                              href={sub.href}
                              onClick={() => setMenuOpen(false)}
                              className="block text-white/60 hover:text-[rgb(var(--color-accent-red))] transition-colors text-sm py-1.5 px-3 hover:bg-white/5 rounded-sm"
                            >
                              › {sub.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function Footer() {
  const { t } = useI18n()
  return (
    <footer className="bg-[rgb(var(--color-bg))] border-t border-[rgb(var(--color-ink))]/5 py-20">
      <div className="container-edge">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <img src="/logo tauler.png" alt="Tauler Group" className="h-8 w-auto mb-8" />
            <p className="text-[rgb(var(--color-ink))]/90 max-w-sm font-light leading-relaxed">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[rgb(var(--color-ink))] mb-6">{t('footer.explore')}</h4>
            <ul className="space-y-4 text-[rgb(var(--color-ink))]/90 text-sm">
              <li><a href="#units" className="hover:text-[rgb(var(--color-accent-red))] transition-colors">{t('footer.proposal')}</a></li>
              <li><a href="#differentiators" className="hover:text-[rgb(var(--color-accent-red))] transition-colors">{t('footer.about')}</a></li>
              <li><a href="#/team" className="hover:text-[rgb(var(--color-accent-red))] transition-colors">{t('footer.team')}</a></li>
              <li><a href="#/manifesto" className="hover:text-[rgb(var(--color-accent-red))] transition-colors">{t('footer.manifesto')}</a></li>
              <li><a href="#/tech" className="hover:text-[rgb(var(--color-accent-red))] transition-colors">{t('footer.technology')}</a></li>
              <li><a href="#contact" className="hover:text-[rgb(var(--color-accent-red))] transition-colors">{t('footer.contact')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[rgb(var(--color-ink))] mb-6">{t('footer.legal')}</h4>
            <ul className="space-y-4 text-[rgb(var(--color-ink))]/90 text-sm">
              <li><a href="#/privacy" className="hover:text-[rgb(var(--color-accent-red))] transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#/cookies" className="hover:text-[rgb(var(--color-accent-red))] transition-colors">{t('footer.cookies')}</a></li>
              <li><a href="#/legal" className="hover:text-[rgb(var(--color-accent-red))] transition-colors">{t('footer.legalNotice')}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[rgb(var(--color-ink))]/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[rgb(var(--color-ink))]/80">
          <p>{t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}</p>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/company/tauler-group/" className="hover:text-[rgb(var(--color-ink))] transition-colors">LinkedIn</a>

          </div>
        </div>
      </div>
    </footer>
  )
}

function LegalPrivacy() {
  const { t } = useI18n()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div className="bg-[rgb(var(--color-bg))] min-h-screen">
      <Navbar />
      <div className="container-edge py-32 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="eyebrow mb-6">{t('legal.info')}</div>
          <h1 className="text-4xl md:text-6xl font-bold text-[rgb(var(--color-ink))] mb-8">
            {t('legal.privacyTitle')}
          </h1>
          <p className="text-sm text-[rgb(var(--color-ink))]/50 mb-12">
            {t('legal.lastUpdate')}
          </p>

          <div className="space-y-10 text-[rgb(var(--color-ink))]/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('legal.responsibleTitle')}</h2>
              <div className="pl-6 border-l-2 border-[rgb(var(--color-ink))]/10">
                <p className="mb-2"><strong>TAULER GROUP VENTURES S.L.</strong></p>
                <p className="mb-2"><strong>{t('legal.responsibleAddress')}</strong> Plaza Curtidos Hnos. Dorta, 7 - 38005, Santa Cruz de Tfe.</p>
                <p className="mb-2"><strong>{t('legal.responsibleEmail')}</strong> <a href="mailto:info@taulergroup.com" className="text-[rgb(var(--color-accent-red))] hover:underline">info@taulergroup.com</a></p>
                <p><strong>CIF:</strong> B21742259</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('legal.purposeTitle')}</h2>
              <p className="mb-3">{t('legal.purposeIntro')}</p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-[rgb(var(--color-accent-red))] mt-1">•</span>
                  <span>{t('legal.purpose1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[rgb(var(--color-accent-red))] mt-1">•</span>
                  <span>{t('legal.purpose2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[rgb(var(--color-accent-red))] mt-1">•</span>
                  <span>{t('legal.purpose3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[rgb(var(--color-accent-red))] mt-1">•</span>
                  <span>{t('legal.purpose4')}</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('legal.legitimationTitle')}</h2>
              <p className="mb-3">{t('legal.legitimationIntro')}</p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-[rgb(var(--color-accent-red))] mt-1">•</span>
                  <span>{t('legal.legitimation1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[rgb(var(--color-accent-red))] mt-1">•</span>
                  <span>{t('legal.legitimation2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[rgb(var(--color-accent-red))] mt-1">•</span>
                  <span>{t('legal.legitimation3')}</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('legal.retentionTitle')}</h2>
              <p>{t('legal.retentionText')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('legal.recipientsTitle')}</h2>
              <p>{t('legal.recipientsText')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('legal.rightsTitle')}</h2>
              <p className="mb-3">
                {t('legal.rightsText')}{' '}
                <a href="mailto:info@taulergroup.com" className="text-[rgb(var(--color-accent-red))] hover:underline font-semibold">
                  info@taulergroup.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('legal.authorityTitle')}</h2>
              <p>
                {t('legal.authorityText')}{' '}
                <a 
                  href="https://www.aepd.es" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[rgb(var(--color-accent-red))] hover:underline font-semibold"
                >
                  {t('legal.authorityLink')}
                </a>{' '}
                {t('legal.authorityEnd')}
              </p>
            </section>
          </div>

          <div className="mt-16 pt-8 border-t border-[rgb(var(--color-ink))]/10">
            <a href="/" className="btn-ghost">
              {t('legal.backHome')}
            </a>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}

function LegalCookies() {
  const { t } = useI18n()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div className="bg-[rgb(var(--color-bg))] min-h-screen">
      <Navbar />
      <div className="container-edge py-32 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="eyebrow mb-6">{t('legal.info')}</div>
          <h1 className="text-4xl md:text-6xl font-bold text-[rgb(var(--color-ink))] mb-8">
            {t('legal.cookiesTitle')}
          </h1>
          <p className="text-sm text-[rgb(var(--color-ink))]/50 mb-12">
            {t('legal.lastUpdate')}
          </p>

          <div className="space-y-10 text-[rgb(var(--color-ink))]/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('legal.cookiesWhat')}</h2>
              <p>{t('legal.cookiesWhatText')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('legal.cookiesTypes')}</h2>
              
              <div className="space-y-6">
                <div className="tech-card p-6 rounded-sm">
                  <h3 className="text-xl font-bold text-[rgb(var(--color-ink))] mb-3">{t('legal.cookiesTechnical')}</h3>
                  <ul className="list-none space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="text-[rgb(var(--color-accent-red))] mt-1">•</span>
                      <span>{t('legal.cookiesTechnical1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[rgb(var(--color-accent-red))] mt-1">•</span>
                      <span>{t('legal.cookiesTechnical2')}</span>
                    </li>
                  </ul>
                </div>

                <div className="tech-card p-6 rounded-sm">
                  <h3 className="text-xl font-bold text-[rgb(var(--color-ink))] mb-3">{t('legal.cookiesAnalytics')}</h3>
                  <ul className="list-none space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="text-[rgb(var(--color-accent-red))] mt-1">•</span>
                      <span>{t('legal.cookiesAnalytics1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[rgb(var(--color-accent-red))] mt-1">•</span>
                      <span>{t('legal.cookiesAnalytics2')}</span>
                    </li>
                  </ul>
                </div>

                <div className="tech-card p-6 rounded-sm">
                  <h3 className="text-xl font-bold text-[rgb(var(--color-ink))] mb-3">{t('legal.cookiesPreferences')}</h3>
                  <ul className="list-none space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="text-[rgb(var(--color-accent-red))] mt-1">•</span>
                      <span>{t('legal.cookiesPreferences1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[rgb(var(--color-accent-red))] mt-1">•</span>
                      <span>{t('legal.cookiesPreferences2')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('legal.cookiesManage')}</h2>
              <p className="mb-4">{t('legal.cookiesManageText1')}</p>
              <p>{t('legal.cookiesManageText2')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('legal.cookiesMore')}</h2>
              <p>
                {t('legal.cookiesMoreText')}{' '}
                <a href="mailto:info@taulergroup.com" className="text-[rgb(var(--color-accent-red))] hover:underline font-semibold">
                  info@taulergroup.com
                </a>
              </p>
            </section>
          </div>

          <div className="mt-16 pt-8 border-t border-[rgb(var(--color-ink))]/10">
            <a href="/" className="btn-ghost">
              {t('legal.backHome')}
            </a>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}

function LegalNotice() {
  const { t } = useI18n()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div className="bg-[rgb(var(--color-bg))] min-h-screen">
      <Navbar />
      <div className="container-edge py-32 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="eyebrow mb-6">{t('legal.info')}</div>
          <h1 className="text-4xl md:text-6xl font-bold text-[rgb(var(--color-ink))] mb-8">
            {t('legal.legalNoticeTitle')}
          </h1>

          <div className="space-y-10 text-[rgb(var(--color-ink))]/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('legal.companyData')}</h2>
              <div className="pl-6 border-l-2 border-[rgb(var(--color-ink))]/10">
                <p className="mb-2">{t('legal.companyOwnership')} <strong>TAULER GROUP VENTURES S.L.</strong></p>
                <p className="mb-2"><strong>CIF:</strong> B21742259</p>
                <p className="mb-4"><strong>Domicilio:</strong> Plaza Curtidos Hnos. Dorta, 7 - 38005, Santa Cruz de Tfe.</p>
                <p>
                  {t('legal.companyContact')}{' '}
                  <a href="mailto:info@taulergroup.com" className="text-[rgb(var(--color-accent-red))] hover:underline font-semibold">
                    info@taulergroup.com
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('legal.applicableLaw')}</h2>
              <p>{t('legal.applicableLawText')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('legal.useConditions')}</h2>
              <p className="mb-4">{t('legal.useConditionsText1')}</p>
              <p className="mb-4">{t('legal.useConditionsText2')}</p>
              <p>{t('legal.useConditionsText3')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('legal.intellectualProperty')}</h2>
              <p className="mb-4">{t('legal.intellectualPropertyText1')}</p>
              <p className="mb-4">{t('legal.intellectualPropertyText2')}</p>
              <p className="mb-4">{t('legal.intellectualPropertyText3')}</p>
              <p className="mb-4">{t('legal.intellectualPropertyText4')}</p>
              <p className="mb-4">{t('legal.intellectualPropertyText5')}</p>
              <p>
                {t('legal.intellectualPropertyText6')}{' '}
                <a href="mailto:info@taulergroup.com" className="text-[rgb(var(--color-accent-red))] hover:underline font-semibold">
                  info@taulergroup.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('legal.generalConditions')}</h2>
              <p className="mb-4">{t('legal.generalConditionsText1')}</p>
              <p className="mb-4">{t('legal.generalConditionsText2')}</p>
              <p>
                {t('legal.generalConditionsText3')}{' '}
                <a href="#/privacy" className="text-[rgb(var(--color-accent-red))] hover:underline font-semibold">
                  {t('legal.privacyPolicyLink')}
                </a>{' '}
                {t('legal.ourWeb')}
              </p>
            </section>
          </div>

          <div className="mt-16 pt-8 border-t border-[rgb(var(--color-ink))]/10">
            <a href="/" className="btn-ghost">
              {t('legal.backHome')}
            </a>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}

// -----------------------------------------------------------------------------
// Team Hero Visualization
// -----------------------------------------------------------------------------

function _TeamHeroViz() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Neural Network Background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.15]">
        <defs>
          <pattern id="neural-grid" width="100" height="100" patternUnits="userSpaceOnUse">
             <circle cx="2" cy="2" r="1" fill="currentColor" className="text-[rgb(var(--color-ink))]" />
          </pattern>
        </defs>
        
        {/* Connection Lines */}
        {[...Array(6)].map((_, i) => (
           <motion.path
             key={i}
             d={`M ${-100 + i * 200} 100 Q ${window.innerWidth / 2} ${window.innerHeight / 2 + (i % 2 === 0 ? 100 : -100)} ${window.innerWidth + 100} ${window.innerHeight - 100 + i * 50}`}
             stroke="rgb(var(--color-accent-red))"
             strokeWidth="1"
             fill="none"
             initial={{ pathLength: 0, opacity: 0 }}
             animate={{ pathLength: 1, opacity: 0.3 }}
             transition={{ duration: 3, delay: i * 0.2, ease: "easeInOut" }}
           />
        ))}

        {/* Floating Nodes */}
        {[...Array(15)].map((_, i) => (
          <motion.circle
            key={i}
            cx={Math.random() * 100 + "%"}
            cy={Math.random() * 100 + "%"}
            r={Math.random() * 2 + 1}
            fill="rgb(var(--color-ink))"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--color-bg))] via-transparent to-[rgb(var(--color-bg))]" />
    </div>
  )
}

function TeamPage() {
  const { t } = useI18n()
  const teamMembers = [
    {
      name: "Álvaro Toledo",
      role: t('teamPage.alvaroRole'),
      linkedin: "https://linkedin.com/in/toledotauler/",
      highlights: [
        {
          title: t('teamPage.alvaroHighlight1Title'),
          desc: t('teamPage.alvaroHighlight1Desc')
        },
        {
          title: t('teamPage.alvaroHighlight2Title'),
          desc: t('teamPage.alvaroHighlight2Desc')
        },
        {
          title: t('teamPage.alvaroHighlight3Title'),
          desc: t('teamPage.alvaroHighlight3Desc')
        }
      ],
      bio: (
        <>
          <p>{t('teamPage.alvaroBio1')}</p>
          <p>{t('teamPage.alvaroBio2')}</p>
        </>
      ),
      imagePlaceholder: (
        <div className="w-full h-full relative overflow-hidden bg-transparent">
           <img src="/alvaro.png" alt="Álvaro Tauler" className="w-full h-full object-contain object-bottom scale-110 translate-y-2" />
        </div>
      )
    },
    {
      name: "Manuel Toledo",
      role: t('teamPage.manuelRole'),
      linkedin: "https://linkedin.com/in/manueltoledotauler/",
      highlights: [
        {
          title: t('teamPage.manuelHighlight1Title'),
          desc: t('teamPage.manuelHighlight1Desc')
        },
        {
          title: t('teamPage.manuelHighlight2Title'),
          desc: t('teamPage.manuelHighlight2Desc')
        },
         {
          title: t('teamPage.manuelHighlight3Title'),
          desc: t('teamPage.manuelHighlight3Desc')
        }
      ],
      bio: (
        <>
          <p>{t('teamPage.manuelBio1')}</p>
          <p>{t('teamPage.manuelBio2')}</p>
        </>
      ),
      imagePlaceholder: (
         <div className="w-full h-full relative overflow-hidden bg-transparent">
           <img src="/manuel.png" alt="Manuel Toledo" className="w-full h-full object-contain object-bottom scale-110 translate-y-2" />
        </div>
      )
    }
  ]

  return (
    <div className="bg-[rgb(var(--color-bg))] min-h-screen">
       <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="relative pt-40 pb-32 w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
           <img src="/equipo%20page%20ok.webp" alt="Team Background" className="w-full h-full object-cover opacity-60" />
           <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--color-bg))] via-[rgb(var(--color-bg))]/40 to-[rgb(var(--color-bg))]" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
           <motion.div 
             className="eyebrow mb-6 justify-center flex"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
           >
             {t('teamPage.eyebrow')}
           </motion.div>
           
           <motion.h1 
             className="text-4xl md:text-6xl lg:text-6xl mb-4 tracking-tighter text-[rgb(var(--color-ink))] font-bold"
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
           >
             {t('teamPage.title1')} <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--color-ink))] to-[rgb(var(--color-ink))]/80">{t('teamPage.title2')}</span>
           </motion.h1>
           
           <motion.p 
             className="text-xl md:text-2xl text-[rgb(var(--color-ink))]/80 font-light max-w-3xl mx-auto leading-relaxed"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5, duration: 0.8 }}
           >
             {t('teamPage.subtitle')}
           </motion.p>
        </div>
      </motion.section>

      {/* Team Rows */}
      <div className="w-full border-t border-[rgb(var(--color-ink))]/10">
        {teamMembers.map((member, index) => (
          <motion.div 
            key={index}
            className="w-full border-b border-[rgb(var(--color-ink))]/10 bg-[rgb(var(--color-bg))]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="container-edge py-12 md:py-16"> {/* Reduced padding for compact rows */}
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                
                {/* Photo & Name Column */}
                <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
                   <div className="mb-4 relative w-48 h-48 md:w-56 md:h-56 shrink-0 overflow-hidden">
                      {member.imagePlaceholder}
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-bg))] via-transparent to-transparent opacity-10" />
                   </div>
                   
                   <div>
                     <h2 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-1">{member.name}</h2>
                     <p className="text-[rgb(var(--color-accent-red))] font-mono uppercase tracking-widest text-xs mb-3">{member.role}</p>
                     <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-8 h-8 text-[rgb(var(--color-ink))]/40 hover:text-[#0077b5] hover:bg-[rgb(var(--color-ink))]/5 rounded-full transition-all duration-300">
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                     </a>
                   </div>
                </div>

                {/* Highlights Column - Middle */}
                <div className="lg:col-span-4">
                   <ul className="space-y-3">
                     {member.highlights.map((h, i) => (
                       <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--color-accent-red))] mt-2 shrink-0" />
                          <span className="text-[rgb(var(--color-ink))]/90 text-sm">
                            <strong className="text-[rgb(var(--color-ink))] font-semibold block mb-0.5">{h.title}</strong>
                            <span className="opacity-80">{h.desc}</span>
                          </span>
                       </li>
                     ))}
                   </ul>
                </div>

                {/* Bio Column - Right */}
                <div className="lg:col-span-5 space-y-4 text-base md:text-lg text-[rgb(var(--color-ink))]/80 font-light leading-relaxed">
                     {member.bio}
                </div>

              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <Footer />
    </div>
  )
}

function ManifestoPage() {
  const { t } = useI18n()
  return (
    <div className="bg-[rgb(var(--color-bg))] min-h-screen">
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <motion.section 
        className="relative pt-32 pb-20 w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
           <img src="/holistica%202%20ok.webp" alt={t('differentiators.holistic.title')} className="w-full h-full object-cover opacity-40" />
           <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--color-bg))] via-[rgb(var(--color-bg))]/60 to-[rgb(var(--color-bg))]" />
        </div>
        
        <div className="relative z-10 container-edge">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="eyebrow mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t('manifestoPage.eyebrow')}
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-6xl lg:text-6xl font-bold text-[rgb(var(--color-ink))] mb-12 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            >
              {t('manifestoPage.title')} <span className="text-[rgb(var(--color-ink))]/40">{t('manifestoPage.titleHighlight')}</span>
            </motion.h1>
          </div>
        </div>
      </motion.section>

      <motion.div 
        className="pb-20 container-edge"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          
          <div className="space-y-16 text-lg md:text-xl text-[rgb(var(--color-ink))]/80 font-light leading-relaxed">
            <div className="pl-6 md:pl-10 border-l-2 border-[rgb(var(--color-accent-red))]">
              <h3 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('manifestoPage.principle1Title')}</h3>
              <p>{t('manifestoPage.principle1Text')}</p>
            </div>

            <div className="pl-6 md:pl-10 border-l-2 border-[rgb(var(--color-accent-red))]">
              <h3 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('manifestoPage.principle2Title')}</h3>
              <p className="mb-4">{t('manifestoPage.principle2Text')}</p>
            </div>

            <div className="pl-6 md:pl-10 border-l-2 border-[rgb(var(--color-accent-red))]">
              <h3 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('manifestoPage.principle3Title')}</h3>
              <p className="mb-4">{t('manifestoPage.principle3Text')}</p>
            </div>

            <div className="pl-6 md:pl-10 border-l-2 border-[rgb(var(--color-accent-red))]">
              <h3 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('manifestoPage.principle4Title')}</h3>
              <p className="mb-4">{t('manifestoPage.principle4Text')}</p>
            </div>

            <div className="pl-6 md:pl-10 border-l-2 border-[rgb(var(--color-accent-red))]">
              <h3 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('manifestoPage.principle5Title')}</h3>
              <p className="mb-4">{t('manifestoPage.principle5Text')}</p>
            </div>

            <div className="pl-6 md:pl-10 border-l-2 border-[rgb(var(--color-accent-red))]">
              <h3 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('manifestoPage.principle6Title')}</h3>
              <p className="mb-4">{t('manifestoPage.principle6Text')}</p>
            </div>

            <div className="pl-6 md:pl-10 border-l-2 border-[rgb(var(--color-accent-red))]">
              <h3 className="text-2xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('manifestoPage.principle7Title')}</h3>
              <p className="mb-4">{t('manifestoPage.principle7Text')}</p>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-[rgb(var(--color-ink))]/10">
            <p className="text-3xl md:text-4xl font-bold text-[rgb(var(--color-ink))] mb-8 leading-tight">
              {t('manifestoPage.conclusion')}
            </p>
            <a href="#contact" className="btn-primary">
              {t('manifestoPage.cta')}
            </a>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  )
}

function TechPage() {
  const { t } = useI18n()
  return (
    <div className="bg-[rgb(var(--color-bg))] min-h-screen">
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <motion.section 
        className="relative pt-32 pb-20 w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
           <img src="/tecnologia%20propia%20ok.webp" alt={t('differentiators.tech.title')} className="w-full h-full object-cover opacity-40" />
           <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--color-bg))] via-[rgb(var(--color-bg))]/60 to-[rgb(var(--color-bg))]" />
        </div>
        
        <div className="relative z-10 container-edge">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="eyebrow mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t('techPage.eyebrow')}
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--color-ink))] mb-8 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            >
              {t('techPage.title')}
            </motion.h1>
          </div>
        </div>
      </motion.section>

      <motion.div 
        className="pb-20 container-edge"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          
          <div className="space-y-8 text-lg md:text-xl text-[rgb(var(--color-ink))]/80 font-light leading-relaxed">
            <p>{t('techPage.intro1')}</p>
            
            <p>{t('techPage.intro2')}</p>

            <div className="pl-6 md:pl-10 border-l-2 border-[rgb(var(--color-accent-red))] my-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('techPage.section1Title')}</h2>
              <p>{t('techPage.section1Text')}</p>
            </div>

            <p>{t('techPage.section1After')}</p>

            <p>{t('techPage.focusIntro')}</p>

            <ul className="list-none space-y-3 ml-6 my-6">
              <li className="flex items-start gap-3">
                <span className="text-[rgb(var(--color-accent-red))] mt-1">→</span>
                <span>{t('techPage.focus1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[rgb(var(--color-accent-red))] mt-1">→</span>
                <span>{t('techPage.focus2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[rgb(var(--color-accent-red))] mt-1">→</span>
                <span>{t('techPage.focus3')}</span>
              </li>
            </ul>

            <p>{t('techPage.focusAfter')}</p>

            <div className="pl-6 md:pl-10 border-l-2 border-[rgb(var(--color-accent-red))] my-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('techPage.section2Title')}</h2>
              <p className="mb-4">{t('techPage.section2Text')}</p>
            </div>

            <p>{t('techPage.stackIntro')}</p>

            <ul className="list-none space-y-3 ml-6 my-6">
              <li className="flex items-start gap-3">
                <span className="text-[rgb(var(--color-accent-red))] mt-1">→</span>
                <span>{t('techPage.stack1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[rgb(var(--color-accent-red))] mt-1">→</span>
                <span>{t('techPage.stack2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[rgb(var(--color-accent-red))] mt-1">→</span>
                <span>{t('techPage.stack3')}</span>
              </li>
            </ul>

            <p>{t('techPage.stackAfter')}</p>

            <div className="pl-6 md:pl-10 border-l-2 border-[rgb(var(--color-accent-red))] my-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('techPage.section3Title')}</h2>
              <p className="mb-4">{t('techPage.section3Text')}</p>
            </div>

            <ul className="list-none space-y-3 ml-6 my-6">
              <li className="flex items-start gap-3">
                <span className="text-[rgb(var(--color-accent-red))] mt-1">→</span>
                <span>{t('techPage.front1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[rgb(var(--color-accent-red))] mt-1">→</span>
                <span>{t('techPage.front2')}</span>
              </li>
            </ul>

            <p>{t('techPage.frontsAfter1')}</p>

            <p>{t('techPage.frontsAfter2')}</p>

            <ul className="list-none space-y-3 ml-6 my-6">
              <li className="flex items-start gap-3">
                <span className="text-[rgb(var(--color-accent-red))] mt-1">→</span>
                <span>{t('techPage.implication1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[rgb(var(--color-accent-red))] mt-1">→</span>
                <span>{t('techPage.implication2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[rgb(var(--color-accent-red))] mt-1">→</span>
                <span>{t('techPage.implication3')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[rgb(var(--color-accent-red))] mt-1">→</span>
                <span>{t('techPage.implication4')}</span>
              </li>
            </ul>

            <div className="pl-6 md:pl-10 border-l-2 border-[rgb(var(--color-accent-red))] my-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('techPage.section4Title')}</h2>
              <p className="mb-4">{t('techPage.section4Text1')}</p>
              <p>{t('techPage.section4Text2')}</p>
            </div>

            <ul className="list-none space-y-3 ml-6 my-6">
              <li className="flex items-start gap-3">
                <span className="text-[rgb(var(--color-accent-red))] mt-1">→</span>
                <span>{t('techPage.approach1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[rgb(var(--color-accent-red))] mt-1">→</span>
                <span>{t('techPage.approach2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[rgb(var(--color-accent-red))] mt-1">→</span>
                <span>{t('techPage.approach3')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[rgb(var(--color-accent-red))] mt-1">→</span>
                <span>{t('techPage.approach4')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[rgb(var(--color-accent-red))] mt-1">→</span>
                <span>{t('techPage.approach5')}</span>
              </li>
            </ul>

            <p>{t('techPage.approachAfter')}</p>

            <div className="pl-6 md:pl-10 border-l-2 border-[rgb(var(--color-accent-red))] my-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[rgb(var(--color-ink))] mb-4">{t('techPage.section5Title')}</h2>
              <p className="mb-4">{t('techPage.section5Text')}</p>
            </div>

            <p>{t('techPage.conclusion1')}</p>

            <p className="text-xl md:text-2xl font-semibold text-[rgb(var(--color-ink))] mt-12">
              {t('techPage.conclusion2')}
            </p>
          </div>

          <div className="mt-16 pt-10 border-t border-[rgb(var(--color-ink))]/10">
            <a href="#contact" className="btn-primary">{t('techPage.cta')}</a>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  )
}

function ConsultingPage() {
  const { t } = useI18n()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div className="py-32 container-edge">
      <div className="max-w-4xl mx-auto">
        <div className="eyebrow">{t('consultingPage.eyebrow')}</div>
        <h1 className="heading-hero mb-8">{t('consultingPage.title')}</h1>
        <p className="text-2xl text-[rgb(var(--color-ink))]/90 font-light leading-relaxed mb-12">
          {t('consultingPage.subtitle')}
        </p>
        <div className="space-y-8 text-lg text-[rgb(var(--color-ink))]/80 leading-relaxed">
          <p>{t('consultingPage.text1')}</p>
          <p>{t('consultingPage.text2')}</p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="tech-card p-8 rounded-sm">
              <h3 className="text-xl font-bold mb-4">{t('consultingPage.card1Title')}</h3>
              <p className="text-sm opacity-70">{t('consultingPage.card1Text')}</p>
            </div>
            <div className="tech-card p-8 rounded-sm">
              <h3 className="text-xl font-bold mb-4">{t('consultingPage.card2Title')}</h3>
              <p className="text-sm opacity-70">{t('consultingPage.card2Text')}</p>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <a href="#contact" className="btn-primary">{t('consultingPage.cta')}</a>
        </div>
      </div>
    </div>
  ) 
}

function VentureBuildingPage() {
  const { t } = useI18n()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div className="py-32 container-edge">
      <div className="max-w-4xl mx-auto">
        <div className="eyebrow">{t('venturePage.eyebrow')}</div>
        <h1 className="heading-hero mb-8">{t('venturePage.title')}</h1>
        <p className="text-2xl text-[rgb(var(--color-ink))]/90 font-light leading-relaxed mb-12">
          {t('venturePage.subtitle')}
        </p>
        <div className="space-y-8 text-lg text-[rgb(var(--color-ink))]/80 leading-relaxed">
          <p>{t('venturePage.text1')}</p>
          <p>{t('venturePage.text2')}</p>
          <ul className="space-y-4 mt-8 list-disc pl-6">
            <li>{t('venturePage.benefit1')}</li>
            <li>{t('venturePage.benefit2')}</li>
            <li>{t('venturePage.benefit3')}</li>
            <li>{t('venturePage.benefit4')}</li>
          </ul>
        </div>
        <div className="mt-16">
          <a href="#contact" className="btn-primary">{t('venturePage.cta')}</a>
        </div>
      </div>
    </div>
  ) 
}

// Cookie Banner Component
// -----------------------------------------------------------------------------

function CookieBanner() {
  const { t } = useI18n()
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted')
    if (!cookiesAccepted) {
      // Show banner after a short delay for better UX
      setTimeout(() => {
        setShowBanner(true)
      }, 1000)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-[10000] bg-[rgb(8,10,76)] border-t border-white/10 shadow-2xl backdrop-blur-md"
      >
        <div className="container-edge py-3 md:py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-white/90 text-sm leading-relaxed">
                {t('cookieBanner.text')}{' '}
                <a href="#/cookies" className="text-[rgb(var(--color-accent-red))] hover:underline font-semibold">
                  {t('cookieBanner.cookiePolicy')}
                </a>
                {' '}{t('cookieBanner.and')}{' '}
                <a href="#/privacy" className="text-[rgb(var(--color-accent-red))] hover:underline font-semibold">
                  {t('cookieBanner.privacyPolicy')}
                </a>
                .
              </p>
            </div>
            <div className="flex flex-row gap-3 w-full md:w-auto">
              <button
                onClick={acceptCookies}
                className="px-6 py-2 bg-[rgb(var(--color-accent-red))] text-white text-sm font-bold rounded-sm hover:bg-[rgb(var(--color-accent-red))]/90 transition-colors whitespace-nowrap"
              >
                {t('cookieBanner.accept')}
              </button>
              <a
                href="#/cookies"
                onClick={() => setShowBanner(false)}
                className="px-6 py-2 bg-transparent border border-white/20 text-white text-sm font-semibold rounded-sm hover:bg-white/5 transition-colors text-center whitespace-nowrap"
              >
                {t('cookieBanner.moreInfo')}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

// Main App
// -----------------------------------------------------------------------------

function AppContent() {
  const [hash, setHash] = useState<string>(() => (typeof window !== 'undefined' ? window.location.hash : ''))

  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  
  // Scroll to top when navigating to different pages
  useEffect(() => {
    // Check if it's a page navigation (starts with #/) rather than an in-page anchor
    if (hash.startsWith('#/') || hash === '') {
      // Force scroll to top immediately
      window.scrollTo(0, 0)
      // Also force it after a small delay to ensure it works with Lenis
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 0)
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 10)
    }
  }, [hash])
  
  useSmoothScroll()

  return (
    <div className="bg-[rgb(var(--color-bg))] min-h-screen selection:bg-[rgb(var(--color-accent-red))]/20 selection:text-[rgb(var(--color-ink))] font-sans text-[rgb(var(--color-ink))]">
      <ScrollProgress />
      <DynamicBackground />
      <CookieBanner />
      
      <motion.main
        className="min-h-dvh relative origin-top"
      >
      {hash === '#/privacy' ? (
        <LegalPrivacy />
      ) : hash === '#/cookies' ? (
        <LegalCookies />
      ) : hash === '#/legal' ? (
        <LegalNotice />
      ) : hash === '#/manifesto' ? (
        <ManifestoPage />
      ) : hash === '#/consulting' ? (
        <ConsultingPage />
      ) : hash === '#/venture-building' ? (
        <VentureBuildingPage />
      ) : hash === '#/team' ? (
        <TeamPage />
      ) : hash === '#/tech' ? (
        <TechPage />
      ) : (
        <>
          <Navbar />
          <Hero />
          <Manifesto />
          <Units />
          <Differentiators />
          {/* InteractiveProcess removed */}
          <CallToAction />
          <Footer />
        </>
      )}
      </motion.main>
    </div>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  )
}
