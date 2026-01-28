import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

// Type definitions
type Language = 'es' | 'en'

interface Translations {
  [key: string]: string | Translations
}

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// Translations dictionary
export const translations: Record<Language, Translations> = {
  es: {
    // Navbar
    nav: {
      proposal: 'Propuesta',
      about: 'Sobre nosotros',
      contact: 'Contacto',
    },
    // Menu
    menu: {
      proposal: 'Propuesta',
      proposalDesc: 'Lo que hacemos',
      about: 'Sobre nosotros',
      aboutDesc: 'Nuestros diferenciadores',
      contact: 'Contacto',
      contactDesc: 'Hablemos',
      consulting: 'Consultoría de IA',
      ventureBuilder: 'Venture Builder',
      team: 'Equipo',
      manifesto: 'Manifiesto',
      technology: 'Tecnología',
    },
    // Hero
    hero: {
      line1: 'IA y negocio,',
      line2: 'Hablando el mismo idioma.',
      subtitle: 'Construimos y transformamos los negocios del mañana.',
      cta: 'Lo que hacemos',
      ctaSecondary: 'Hablemos',
    },
    // Manifesto section
    manifesto: {
      eyebrow: 'tauler group',
      title: 'Somos la firma boutique de Inteligencia Artificial',
      paragraph1: 'Trabajamos con CEOs, fundadores y directivos que no quieren parches, sino',
      transformation: 'transformación real',
      paragraph1End: ': procesos más eficientes, nuevas líneas de negocio y activos digitales que se adoptan desde el primer día.',
      quote: '"La IA tiene potencial enorme, pero su auténtico valor reside en la orquestación."',
    },
    // Units section
    units: {
      eyebrow: 'NUESTRA PROPUESTA',
      title: 'Dos unidades, un objetivo:',
      titleHighlight: 'multiplicar negocio',
      // Consulting
      consultingTitle: 'Consultoría de IA',
      consultingDesc: 'Transformamos tu empresa con IA de forma estratégica, rápida y sin complejidad interna.',
      consultingItem1: 'Identificamos qué merece la pena automatizar, mejorar o predecir.',
      consultingItem2: 'Definimos sistemas de IA que impactan en la P&L.',
      consultingItem3: 'Asesoría de Alto nivel para compañías',
      consultingItem4: 'Impacto medible: eficiencia, reducción de costes y crecimiento.',
      consultingFooter: 'IA de impacto para las compañías del mañana.',
      // Venture
      ventureTitle: 'Venture Builder',
      ventureDesc: 'La forma más rápida y segura de lanzar nuevos productos digitales basados en IA.',
      ventureItem1: 'Tú pones el acceso al mercado y validas la oportunidad.',
      ventureItem2: 'Nosotros construimos el software, lo iteramos con IA y lo llevamos a producto.',
      ventureItem3: 'Aprovechamos tu red de contactos para acelerar la escalabilidad.',
      ventureItem4: 'Velocidad real: MVP en semanas, no meses.',
      ventureFooter: 'De idea a activo digital rentable.',
      letsTalk: 'Hablemos',
      learnMore: 'Saber más',
      // Companies
      trustUs: 'Confían en nosotros',
      weCreated: 'Hemos creado',
      visitWeb: 'Visitar Web',
      // Company descriptions
      gestionaMoganDesc: 'Gestiona tiene como misión corporativa la gestión integral de servicios públicos y actividades económicas en el municipio de Mogán.',
      dormitorumDesc: 'Líderes en el sector del descanso, combinando retail físico y digital con gran expansión.',
      transitionCapitalDesc: 'Firma de capital privado que se asocia con equipos directivos excepcionales para construir o acelerar empresas líderes en su sector y afrontar nuevos retos societarios.',
      gesplanDesc: 'Empresa especializada en labores de planificación, gestión y ejecución de proyectos relacionados con el territorio y el medioambiente.',
    },
    // Differentiators
    differentiators: {
      team: {
        title: 'Equipo Multidisciplinar',
        desc: 'Combinamos expertos multidisciplinares en un equipo híbrido que entiende tanto de código como de cuenta de resultados.',
        cta: 'Conoce al equipo',
      },
      holistic: {
        title: 'Visión Holística',
        desc: 'No somos una comercializadora de IA. Integramos estrategia de negocio, producto digital y operaciones. La tecnología es el medio, no el fin.',
        cta: 'Conoce nuestro manifiesto',
      },
      tech: {
        title: 'Tecnología Propia',
        desc: 'Nuestros activos digitales cuentan con un stack tecnológico optimizado para escalar.',
        cta: 'Así desarrollamos nuestro software',
      },
    },
    // Contact / CTA
    contact: {
      title: 'Hablemos.',
      subtitle: 'Cuéntanos tus retos e ideas.',
      emailLabel: 'O escríbenos directamente a:',
      formTitle: 'Contacta con nosotros',
      nameLabel: 'Nombre',
      namePlaceholder: 'Tu nombre',
      emailFieldLabel: 'Email',
      emailPlaceholder: 'tu@email.com',
      companyLabel: 'Empresa',
      companyPlaceholder: 'Nombre de tu empresa',
      messageLabel: 'Mensaje',
      messagePlaceholder: '¿Cómo podemos colaborar?',
      submit: 'Enviar Mensaje',
      sending: 'Enviando...',
      successTitle: '¡Mensaje enviado!',
      successMessage: 'Gracias por contactarnos. Te responderemos lo antes posible.',
      sendAnother: 'Enviar otro mensaje',
      errorMessage: 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.',
    },
    // Footer
    footer: {
      description: 'Orquestando inteligencia para los negocios del mañana. Consultoría estratégica y Venture Building potenciados por IA.',
      explore: 'Explorar',
      proposal: 'Propuesta',
      about: 'Sobre Nosotros',
      team: 'Equipo',
      manifesto: 'Manifiesto',
      technology: 'Tecnología',
      contact: 'Contacto',
      legal: 'Legal',
      privacy: 'Privacidad',
      cookies: 'Cookies',
      legalNotice: 'Aviso Legal',
      copyright: '© {year} Tauler Group. Todos los derechos reservados.',
    },
    // Legal pages
    legal: {
      info: 'INFORMACIÓN LEGAL',
      privacyTitle: 'Política de Privacidad y Protección de Datos',
      lastUpdate: 'Última actualización: 15/09/2025',
      backHome: 'Volver al inicio',
      // Privacy
      responsibleTitle: '1. Responsable del Tratamiento',
      responsibleAddress: 'Dirección:',
      responsibleEmail: 'Email:',
      purposeTitle: '2. Finalidad del Tratamiento',
      purposeIntro: 'Sus datos serán tratados con las siguientes finalidades:',
      purpose1: 'Gestionar la relación comercial y prestación de servicios',
      purpose2: 'Envío de comunicaciones comerciales sobre nuestros servicios',
      purpose3: 'Responder a sus consultas y solicitudes',
      purpose4: 'Mejorar nuestros servicios y la experiencia del usuario',
      legitimationTitle: '3. Legitimación',
      legitimationIntro: 'El tratamiento de sus datos está basado en:',
      legitimation1: 'La ejecución de un contrato o relación comercial',
      legitimation2: 'El consentimiento del usuario',
      legitimation3: 'El interés legítimo del responsable',
      retentionTitle: '4. Conservación de los Datos',
      retentionText: 'Los datos personales se conservarán mientras se mantenga la relación comercial y no se solicite su supresión, y en su caso, durante los años necesarios para cumplir con las obligaciones legales.',
      recipientsTitle: '5. Destinatarios',
      recipientsText: 'Sus datos no serán cedidos a terceros salvo obligación legal o cuando sea necesario para la prestación de los servicios solicitados.',
      rightsTitle: '6. Derechos',
      rightsText: 'Puede ejercer sus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición escribiendo a',
      authorityTitle: '7. Autoridad de Control',
      authorityText: 'Puede presentar una reclamación ante la',
      authorityLink: 'Agencia Española de Protección de Datos (www.aepd.es)',
      authorityEnd: 'si considera que el tratamiento no se ajusta a la normativa vigente.',
      // Cookies
      cookiesTitle: 'Política de Cookies',
      cookiesWhat: '¿Qué son las cookies?',
      cookiesWhatText: 'Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestra web. Estas cookies nos permiten reconocer su navegador y, si tiene una cuenta registrada, vincularla a su cuenta registrada para proporcionarle una experiencia personalizada.',
      cookiesTypes: 'Tipos de cookies que utilizamos',
      cookiesTechnical: 'Cookies técnicas (necesarias)',
      cookiesTechnical1: 'Permiten la navegación y el uso de funcionalidades básicas',
      cookiesTechnical2: 'Son imprescindibles para el funcionamiento de la web',
      cookiesAnalytics: 'Cookies analíticas',
      cookiesAnalytics1: 'Nos permiten analizar el uso de la web para mejorar nuestros servicios',
      cookiesAnalytics2: 'Utilizamos Google Analytics y otras herramientas',
      cookiesPreferences: 'Cookies de preferencias',
      cookiesPreferences1: 'Permiten recordar información para mejorar su experiencia',
      cookiesPreferences2: 'Como el idioma preferido o la región en la que se encuentra',
      cookiesManage: '¿Cómo gestionar las cookies?',
      cookiesManageText1: 'Puede configurar su navegador para rechazar todas las cookies o para recibir un aviso cuando se envíe una cookie. Sin embargo, si rechaza las cookies, es posible que algunas partes de nuestro sitio web no funcionen correctamente.',
      cookiesManageText2: 'La mayoría de los navegadores aceptan cookies automáticamente, pero puede modificar la configuración de su navegador para rechazarlas si lo prefiere.',
      cookiesMore: 'Más información',
      cookiesMoreText: 'Para más información sobre el uso de cookies y sus derechos, puede contactar con nosotros en',
      // Legal Notice
      legalNoticeTitle: 'Aviso Legal',
      companyData: 'Datos de la Empresa',
      companyOwnership: 'Esta página web es propiedad de',
      companyContact: 'Para cualquier consulta o propuesta, contáctenos en el e-mail:',
      applicableLaw: 'Normativa Aplicable',
      applicableLawText: 'La página web se rige por la normativa exclusivamente aplicable en España y en el espacio que comprende la Unión Europea, quedando sometidos a ella tanto nacionales como extranjeros que utilicen esta web.',
      useConditions: 'Condiciones de Uso',
      useConditionsText1: 'El acceso a nuestra página web por parte del USUARIO es gratuito y está condicionado a la previa lectura y aceptación íntegra, expresa y sin reservas del presente Aviso Legal vigente en el momento del acceso, que rogamos lea detenidamente.',
      useConditionsText2: 'El USUARIO, en el momento que utiliza nuestro portal y sus contenidos o servicios, acepta y se somete expresamente a las Condiciones Generales de uso de este. Si el USUARIO no estuviere de acuerdo con las presentes Condiciones de uso, deberá abstenerse de utilizar este portal y operar por medio de este.',
      useConditionsText3: 'En cualquier momento podremos modificar la presentación y configuración de nuestra Web, ampliar o reducir servicios, e incluso suprimirla de la Red, así como los servicios y contenidos prestados, todo ello de forma unilateral y sin previo aviso.',
      intellectualProperty: 'Propiedad Intelectual',
      intellectualPropertyText1: 'El sitio web, incluyendo a título enunciativo, pero no limitativo su programación, edición, compilación y demás elementos necesarios para su funcionamiento, los diseños, logotipos, texto y/o gráficos son propiedad del prestador o en su caso dispone de licencia o autorización expresa por parte de los autores. Todos los contenidos del sitio web se encuentran debidamente protegidos por la normativa de propiedad intelectual e industrial.',
      intellectualPropertyText2: 'Independientemente de la finalidad para la que fueran destinados, la reproducción total o parcial, uso, explotación, distribución y comercialización, requiere en todo caso de la autorización escrita previa por parte del prestador. Cualquier uso no autorizado previamente por parte del prestador será considerado un incumplimiento grave de los derechos de propiedad intelectual o industrial del autor.',
      intellectualPropertyText3: 'Los diseños, logotipos, texto y/o gráficos ajenos al prestador y que pudieran aparecer en el sitio web, pertenecen a sus respectivos propietarios, siendo ellos mismos responsables de cualquier posible controversia que pudiera suscitarse respecto a los mismos. En todo caso, el prestador cuenta con la autorización expresa y previa por parte de estos.',
      intellectualPropertyText4: 'El prestador no permite, salvo autorización expresa, a terceros para que puedan redirigir directamente a los contenidos concretos del sitio web. En todo caso, y si mediare permiso, deberá redirigirla al sitio web principal del prestador.',
      intellectualPropertyText5: 'El prestador reconoce a favor de sus titulares los correspondientes derechos de propiedad industrial e intelectual, no implicando su sola mención o aparición en el sitio web la existencia de derechos o responsabilidad alguna del prestador sobre los mismos, como tampoco respaldo, patrocinio o recomendación por parte de este.',
      intellectualPropertyText6: 'Para realizar cualquier tipo de observación respecto a posibles incumplimientos de los derechos de propiedad intelectual o industrial, así como sobre cualquiera de los contenidos del sitio web, puede hacerlo a través del siguiente correo electrónico:',
      generalConditions: 'Condiciones Generales de Uso',
      generalConditionsText1: 'El acceso a nuestra página web es gratuito y no exige previa suscripción o registro. El USUARIO debe acceder a la misma conforme a la buena fe, las normas de orden público y a las presentes Condiciones Generales de uso. El acceso a nuestro sitio web se realiza bajo la propia y exclusiva responsabilidad del USUARIO, que se abstendrá de utilizar cualquiera de los servicios con fines o efectos ilícitos, prohibidos o lesivos para los derechos de terceras personas, respondiendo en todo caso de los daños y perjuicios que pueda causar a terceros o a nosotros mismos.',
      generalConditionsText2: 'Teniendo en cuenta la imposibilidad de control respecto a la información, contenidos y servicios que contengan otras páginas web a los que se pueda acceder a través de los enlaces que nuestra página web pueda poner a su disposición, le comunicamos que quedamos eximidos de cualquier responsabilidad por los daños y perjuicios de toda clase que pudiesen derivar por la utilización de esas páginas web, ajenas a nuestra empresa, por parte del USUARIO.',
      generalConditionsText3: 'Puede obtener más información sobre el uso que hacemos de sus datos de carácter personal en la',
      privacyPolicyLink: 'Política de Privacidad',
      ourWeb: 'de nuestra web.',
    },
    // Team page
    teamPage: {
      eyebrow: 'NUESTRO EQUIPO',
      title1: 'ESTRATEGAS EXPERIMENTADOS',
      title2: 'Y TECNÓLOGOS EXPERTOS',
      subtitle: 'En Tauler Group, combinamos estrategia, IA, finanzas y negocio, para construir y elevar los negocios del mañana.',
      // Álvaro
      alvaroRole: 'Co-Founder & Co-CEO',
      alvaroHighlight1Title: 'Ingeniero en Ciencia de Datos e Inteligencia Artificial',
      alvaroHighlight1Desc: 'Universidad Politécnica de Madrid.',
      alvaroHighlight2Title: 'Desarrollo y Escalado',
      alvaroHighlight2Desc: 'Maneja equipos de desarrollo y operaciones de proyectos de IA.',
      alvaroHighlight3Title: 'Tauler Group',
      alvaroHighlight3Desc: 'Lidera la visión de producto y la ejecución técnica.',
      alvaroBio1: 'Álvaro dirige la estrategia tecnológica y de operaciones en Tauler Group. Su enfoque se centra en la integración de sistemas de IA escalables que impactan directamente en la eficiencia operativa.',
      alvaroBio2: 'Combina la ingeniería de IA con una visión clara de producto y mercado, asegurando que la tecnología resuelva problemas reales de negocio.',
      // Manuel
      manuelRole: 'Co-Founder & Co-CEO',
      manuelHighlight1Title: 'Matemático',
      manuelHighlight1Desc: 'Universidad Complutense de Madrid y Universidad de La Laguna.',
      manuelHighlight2Title: 'Operaciones y Finanzas',
      manuelHighlight2Desc: 'Gestión de recursos y optimización de procesos operativos.',
      manuelHighlight3Title: 'Business Development',
      manuelHighlight3Desc: 'Liderazgo en la apertura de nuevos mercados y relaciones con clientes clave.',
      manuelBio1: 'Manuel aporta la visión estratégica y financiera a Tauler Group. Su experiencia permite traducir las capacidades técnicas de la IA en planes de negocio sólidos y sostenibles.',
      manuelBio2: 'Se encarga de asegurar que cada proyecto no solo sea técnicamente viable, sino que genere un retorno de inversión claro y medible para nuestros clientes.',
    },
    // Manifesto page
    manifestoPage: {
      eyebrow: 'NUESTRO ADN',
      title: 'El Manifiesto',
      titleHighlight: 'Tauler.',
      principle1Title: '01. La IA es una herramienta.',
      principle1Text: 'El valor no está en la tecnología por sí misma, sino en cómo se aplica para resolver problemas reales y crear nuevas oportunidades. La IA es la herramienta con mayor capacidad de impacto en los negocios.',
      principle2Title: '02. La orquestación lo es todo.',
      principle2Text: 'Los modelos son necesarios, pero insuficientes para crear valor. Lo que transforma las empresas es un sistema orquestado de datos, agentes, procesos, decisiones y personas trabajando en sincronía.',
      principle3Title: '03. El negocio marca el rumbo; la tecnología lo acelera.',
      principle3Text: 'Una estrategia de negocio bien planteada es la respuesta a una necesidad del mercado. La IA es un acelerador de la estrategia, no una sustitución. Primero entendemos la dinámica del negocio. Luego aplicamos IA para amplificarla.',
      principle4Title: '04. Los equipos híbridos son la ventaja definitiva.',
      principle4Text: 'Unimos ingenieros, matemáticos, financieros y operadores bajo un mismo método. El valor emerge cuando quien entiende el negocio puede hablar el lenguaje de la máquina (y viceversa).',
      principle5Title: '05. La velocidad es una estrategia.',
      principle5Text: 'Iteramos, construimos y ajustamos con ritmo acelerado gracias a la IA. El mercado recompensa a quien aprende más rápido.',
      principle6Title: '06. Los nuevos negocios deben nacer con distribución.',
      principle6Text: 'Nuestro Venture Builder parte de una verdad simple: un producto sin mercado carece de valor. Por eso validamos primero la oportunidad y luego la desarrollamos.',
      principle7Title: '07. La innovación vive en un conflicto natural con la rentabilidad.',
      principle7Text: 'Sin innovación no hay rentabilidad y sin rentabilidad no hay innovación. Es un conflicto natural, pero necesario. Somos especialistas en resolver este conflicto. Nuestra métrica final no es la complejidad del modelo, sino el resultado económico.',
      conclusion: 'Creemos en un futuro donde la tecnología amplifica el potencial humano.',
      cta: 'Construyamos ese futuro',
    },
    // Tech page
    techPage: {
      eyebrow: 'TECNOLOGÍA PROPIA',
      title: 'Así desarrollamos nuestro software',
      intro1: 'La inteligencia artificial ha cambiado de forma radical la manera en la que se desarrolla software. Hoy es posible construir prototipos funcionales en días, incluso en horas. El problema es que muchas de esas soluciones nacen con fecha de caducidad: funcionan, pero no escalan; impresionan en una demo, pero se rompen cuando entran usuarios reales; parecen producto, pero en realidad son pruebas de concepto mal disimuladas.',
      intro2: 'Nosotros trabajamos justo en el lado opuesto de esa tendencia.',
      section1Title: 'Velocidad, sí. Fragilidad, no.',
      section1Text: 'Utilizamos intensivamente inteligencia artificial en nuestro proceso de desarrollo. Hacemos mucho Vibe Coding: iteramos rápido, exploramos soluciones, validamos hipótesis técnicas con una velocidad que hace unos años era impensable. Sería absurdo no hacerlo.',
      section1After: 'Pero la velocidad nunca es el objetivo final. Es una herramienta.',
      focusIntro: 'Nuestro foco está en construir software que:',
      focus1: 'sea robusto desde el primer día,',
      focus2: 'pueda escalar sin reescribirse cada seis meses,',
      focus3: 'y transmita confianza a empresas, socios e inversores.',
      focusAfter: 'La IA nos ayuda a llegar antes, pero la ingeniería es la que garantiza que podamos quedarnos.',
      section2Title: 'Tecnología propia no significa tecnología improvisada',
      section2Text: 'Cuando decimos que trabajamos con tecnología propia no nos referimos a reinventar la rueda ni a construir frameworks exóticos que solo entendemos nosotros. Al contrario.',
      stackIntro: 'Nuestro stack se apoya en:',
      stack1: 'estándares de desarrollo de software ampliamente probados,',
      stack2: 'arquitecturas diseñadas para crecer (no para sobrevivir),',
      stack3: 'y decisiones técnicas pensadas a medio y largo plazo.',
      stackAfter: 'La diferencia está en cómo combinamos todo eso y en el criterio con el que lo hacemos. No elegimos herramientas porque estén de moda, sino porque encajan con el problema, el modelo de negocio y la escala esperada del activo digital.',
      section3Title: 'Consultoría y Venture Builder: el mismo nivel de exigencia',
      section3Text: 'Trabajamos en dos frentes:',
      front1: 'Asesoría y definición de proyectos de IA para empresas.',
      front2: 'Construcción de activos digitales propios y con socios industriales dentro de nuestro Venture Builder.',
      frontsAfter1: 'En los dos casos aplicamos el mismo estándar. No hay "atajos" por ser un MVP interno ni concesiones por ir rápido al mercado. Si algo entra en nuestro porfolio, tiene que estar preparado para crecer, mantenerse y evolucionar.',
      frontsAfter2: 'Eso implica, entre otras cosas:',
      implication1: 'separar bien experimentación de producto,',
      implication2: 'diseñar correctamente los flujos de datos,',
      implication3: 'tratar la IA como una parte más del sistema, no como un parche mágico,',
      implication4: 'y asumir que el mantenimiento y la evolución son parte del diseño, no un problema futuro.',
      section4Title: 'IA integrada, no como parche',
      section4Text1: 'Uno de los errores más comunes que vemos es construir productos donde la IA está "pegada" al sistema. Funciona mientras todo va bien, pero en cuanto cambian los datos, el volumen o el contexto, aparecen los problemas.',
      section4Text2: 'Nuestro enfoque es distinto:',
      approach1: 'la IA forma parte de la arquitectura,',
      approach2: 'se monitoriza,',
      approach3: 'se versiona,',
      approach4: 'se evalúa,',
      approach5: 'y se gobierna como cualquier otro componente crítico.',
      approachAfter: 'Eso es lo que permite que un sistema con IA no sea solo inteligente, sino también fiable.',
      section5Title: 'Software que permanece',
      section5Text: 'Al final, todo se reduce a una idea bastante simple: construir software que persista en el tiempo.',
      conclusion1: 'La inteligencia artificial nos permite desarrollar más rápido que nunca, pero también exige más criterio que nunca. Porque ahora es fácil hacer algo que funcione; lo difícil sigue siendo hacer algo que dure.',
      conclusion2: 'Ese es nuestro trabajo. Y esa es, probablemente, la parte menos visible y más importante de todo lo que hacemos.',
      cta: 'Hablemos de tu proyecto',
    },
    // Consulting page
    consultingPage: {
      eyebrow: 'NUESTROS SERVICIOS',
      title: 'Consultoría de IA',
      subtitle: 'Transformamos tu empresa con IA de forma estratégica, rápida y sin complejidad interna.',
      text1: 'En Tauler Group, no solo implementamos tecnología; orquestamos una transformación completa. Nuestro enfoque de consultoría "end-to-end" asegura que cada iniciativa de Inteligencia Artificial esté alineada con tus objetivos de negocio más críticos.',
      text2: 'Desde el diagnóstico inicial hasta la operación a escala, te acompañamos en cada paso del camino. Identificamos las oportunidades donde la IA puede generar el mayor impacto: automatización de procesos, mejora en la toma de decisiones, predicción de tendencias y personalización de la experiencia del cliente.',
      card1Title: 'Diagnóstico y Estrategia',
      card1Text: 'Evaluamos tu madurez digital y definimos una hoja de ruta clara y accionable.',
      card2Title: 'Desarrollo e Implementación',
      card2Text: 'Construimos soluciones robustas y escalables utilizando las últimas tecnologías de IA.',
      cta: 'Agendar Consulta',
    },
    // Venture Building page
    venturePage: {
      eyebrow: 'NUESTROS SERVICIOS',
      title: 'Venture Building Inverso',
      subtitle: 'La forma más rápida y segura de lanzar nuevos productos digitales basados en IA.',
      text1: 'El modelo de Venture Building Inverso de Tauler Group está diseñado para corporaciones y líderes de industria que desean innovar con la agilidad de una startup pero con la solidez de una empresa establecida.',
      text2: 'Tú aportas el conocimiento del mercado, el acceso a clientes y la validación de la oportunidad. Nosotros ponemos la tecnología, el equipo de desarrollo de producto y la capacidad de ejecución rápida. Juntos, co-creamos activos digitales que generan nuevas líneas de ingresos.',
      benefit1: 'Reducción drástica del time-to-market.',
      benefit2: 'Mitigación de riesgos tecnológicos y operativos.',
      benefit3: 'Enfoque en la validación continua y el ajuste producto-mercado.',
      benefit4: 'Escalabilidad garantizada desde el día uno.',
      cta: 'Iniciar Colaboración',
    },
    // Cookie banner
    cookieBanner: {
      text: 'Utilizamos cookies para mejorar nuestros servicios. Puede obtener más información en nuestra',
      cookiePolicy: 'Política de Cookies',
      and: 'y',
      privacyPolicy: 'Política de Privacidad',
      accept: 'Aceptar',
      moreInfo: 'Más información',
    },
  },
  en: {
    // Navbar
    nav: {
      proposal: 'Services',
      about: 'About us',
      contact: 'Contact',
    },
    // Menu
    menu: {
      proposal: 'Services',
      proposalDesc: 'What we do',
      about: 'About us',
      aboutDesc: 'Our differentiators',
      contact: 'Contact',
      contactDesc: "Let's talk",
      consulting: 'AI Consulting',
      ventureBuilder: 'Venture Builder',
      team: 'Team',
      manifesto: 'Manifesto',
      technology: 'Technology',
    },
    // Hero
    hero: {
      line1: 'AI and business,',
      line2: 'Speaking the same language.',
      subtitle: 'We build and transform the businesses of tomorrow.',
      cta: 'What we do',
      ctaSecondary: "Let's talk",
    },
    // Manifesto section
    manifesto: {
      eyebrow: 'tauler group',
      title: 'We are the boutique AI firm',
      paragraph1: 'We work with CEOs, founders, and executives who don\'t want patches, but',
      transformation: 'real transformation',
      paragraph1End: ': more efficient processes, new business lines, and digital assets that are adopted from day one.',
      quote: '"AI has enormous potential, but its true value lies in orchestration."',
    },
    // Units section
    units: {
      eyebrow: 'OUR SERVICES',
      title: 'Two units, one goal:',
      titleHighlight: 'multiply business',
      // Consulting
      consultingTitle: 'AI Consulting',
      consultingDesc: 'We transform your company with AI strategically, quickly, and without internal complexity.',
      consultingItem1: 'We identify what is worth automating, improving, or predicting.',
      consultingItem2: 'We define AI systems that impact the P&L.',
      consultingItem3: 'High-level advisory for companies',
      consultingItem4: 'Measurable impact: efficiency, cost reduction, and growth.',
      consultingFooter: 'Impactful AI for the companies of tomorrow.',
      // Venture
      ventureTitle: 'Venture Builder',
      ventureDesc: 'The fastest and safest way to launch new AI-based digital products.',
      ventureItem1: 'You provide market access and validate the opportunity.',
      ventureItem2: 'We build the software, iterate with AI, and bring it to product.',
      ventureItem3: 'We leverage your network to accelerate scalability.',
      ventureItem4: 'Real speed: MVP in weeks, not months.',
      ventureFooter: 'From idea to profitable digital asset.',
      letsTalk: "Let's talk",
      learnMore: 'Learn more',
      // Companies
      trustUs: 'They trust us',
      weCreated: "We've created",
      visitWeb: 'Visit Website',
      // Company descriptions
      gestionaMoganDesc: 'Gestiona has as its corporate mission the comprehensive management of public services and economic activities in the municipality of Mogán.',
      dormitorumDesc: 'Leaders in the rest sector, combining physical and digital retail with great expansion.',
      transitionCapitalDesc: 'Private equity firm that partners with exceptional management teams to build or accelerate leading companies in their sector and face new corporate challenges.',
      gesplanDesc: 'Company specialized in planning, management, and execution of projects related to territory and environment.',
    },
    // Differentiators
    differentiators: {
      team: {
        title: 'Multidisciplinary Team',
        desc: 'We combine multidisciplinary experts in a hybrid team that understands both code and the bottom line.',
        cta: 'Meet the team',
      },
      holistic: {
        title: 'Holistic Vision',
        desc: "We're not an AI reseller. We integrate business strategy, digital product, and operations. Technology is the means, not the end.",
        cta: 'Discover our manifesto',
      },
      tech: {
        title: 'Proprietary Technology',
        desc: 'Our digital assets have a technology stack optimized for scaling.',
        cta: 'How we develop our software',
      },
    },
    // Contact / CTA
    contact: {
      title: "Let's talk.",
      subtitle: 'Tell us about your challenges and ideas.',
      emailLabel: 'Or write to us directly at:',
      formTitle: 'Contact us',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailFieldLabel: 'Email',
      emailPlaceholder: 'you@email.com',
      companyLabel: 'Company',
      companyPlaceholder: 'Your company name',
      messageLabel: 'Message',
      messagePlaceholder: 'How can we collaborate?',
      submit: 'Send Message',
      sending: 'Sending...',
      successTitle: 'Message sent!',
      successMessage: 'Thank you for contacting us. We will respond as soon as possible.',
      sendAnother: 'Send another message',
      errorMessage: 'There was an error sending the message. Please try again.',
    },
    // Footer
    footer: {
      description: 'Orchestrating intelligence for the businesses of tomorrow. Strategic consulting and Venture Building powered by AI.',
      explore: 'Explore',
      proposal: 'Services',
      about: 'About Us',
      team: 'Team',
      manifesto: 'Manifesto',
      technology: 'Technology',
      contact: 'Contact',
      legal: 'Legal',
      privacy: 'Privacy',
      cookies: 'Cookies',
      legalNotice: 'Legal Notice',
      copyright: '© {year} Tauler Group. All rights reserved.',
    },
    // Legal pages
    legal: {
      info: 'LEGAL INFORMATION',
      privacyTitle: 'Privacy Policy and Data Protection',
      lastUpdate: 'Last updated: 09/15/2025',
      backHome: 'Back to home',
      // Privacy
      responsibleTitle: '1. Data Controller',
      responsibleAddress: 'Address:',
      responsibleEmail: 'Email:',
      purposeTitle: '2. Purpose of Processing',
      purposeIntro: 'Your data will be processed for the following purposes:',
      purpose1: 'Managing the commercial relationship and service provision',
      purpose2: 'Sending commercial communications about our services',
      purpose3: 'Responding to your inquiries and requests',
      purpose4: 'Improving our services and user experience',
      legitimationTitle: '3. Legal Basis',
      legitimationIntro: 'The processing of your data is based on:',
      legitimation1: 'The execution of a contract or commercial relationship',
      legitimation2: 'User consent',
      legitimation3: 'The legitimate interest of the controller',
      retentionTitle: '4. Data Retention',
      retentionText: 'Personal data will be retained as long as the commercial relationship is maintained and deletion is not requested, and where applicable, for the years necessary to comply with legal obligations.',
      recipientsTitle: '5. Recipients',
      recipientsText: 'Your data will not be transferred to third parties except by legal obligation or when necessary for the provision of requested services.',
      rightsTitle: '6. Rights',
      rightsText: 'You can exercise your rights of access, rectification, deletion, limitation, portability, and objection by writing to',
      authorityTitle: '7. Supervisory Authority',
      authorityText: 'You can file a complaint with the',
      authorityLink: 'Spanish Data Protection Agency (www.aepd.es)',
      authorityEnd: 'if you consider that the processing does not comply with current regulations.',
      // Cookies
      cookiesTitle: 'Cookie Policy',
      cookiesWhat: 'What are cookies?',
      cookiesWhatText: 'Cookies are small text files that are stored on your device when you visit our website. These cookies allow us to recognize your browser and, if you have a registered account, link it to your registered account to provide you with a personalized experience.',
      cookiesTypes: 'Types of cookies we use',
      cookiesTechnical: 'Technical cookies (necessary)',
      cookiesTechnical1: 'Allow navigation and use of basic features',
      cookiesTechnical2: 'Are essential for the website to function',
      cookiesAnalytics: 'Analytics cookies',
      cookiesAnalytics1: 'Allow us to analyze website usage to improve our services',
      cookiesAnalytics2: 'We use Google Analytics and other tools',
      cookiesPreferences: 'Preference cookies',
      cookiesPreferences1: 'Allow us to remember information to improve your experience',
      cookiesPreferences2: 'Such as preferred language or your location',
      cookiesManage: 'How to manage cookies?',
      cookiesManageText1: 'You can configure your browser to reject all cookies or to receive a notification when a cookie is sent. However, if you reject cookies, some parts of our website may not function properly.',
      cookiesManageText2: 'Most browsers accept cookies automatically, but you can modify your browser settings to reject them if you prefer.',
      cookiesMore: 'More information',
      cookiesMoreText: 'For more information about the use of cookies and your rights, you can contact us at',
      // Legal Notice
      legalNoticeTitle: 'Legal Notice',
      companyData: 'Company Information',
      companyOwnership: 'This website is owned by',
      companyContact: 'For any inquiry or proposal, contact us at the email:',
      applicableLaw: 'Applicable Regulations',
      applicableLawText: 'The website is governed by regulations exclusively applicable in Spain and within the European Union, both nationals and foreigners who use this website being subject to it.',
      useConditions: 'Terms of Use',
      useConditionsText1: 'Access to our website by the USER is free and is subject to prior reading and full, express, and unreserved acceptance of this Legal Notice in force at the time of access, which we ask you to read carefully.',
      useConditionsText2: 'The USER, when using our portal and its contents or services, expressly accepts and submits to the General Conditions of use thereof. If the USER does not agree with these Terms of Use, they must refrain from using this portal and operating through it.',
      useConditionsText3: 'At any time we may modify the presentation and configuration of our Website, expand or reduce services, and even remove it from the Internet, as well as the services and contents provided, all unilaterally and without prior notice.',
      intellectualProperty: 'Intellectual Property',
      intellectualPropertyText1: 'The website, including but not limited to its programming, editing, compilation, and other elements necessary for its operation, designs, logos, text, and/or graphics are owned by the provider or, where applicable, has a license or express authorization from the authors. All content on the website is duly protected by intellectual and industrial property regulations.',
      intellectualPropertyText2: 'Regardless of the purpose for which they were intended, total or partial reproduction, use, exploitation, distribution, and commercialization requires in any case prior written authorization from the provider. Any unauthorized use by the provider will be considered a serious breach of the intellectual or industrial property rights of the author.',
      intellectualPropertyText3: 'Designs, logos, text, and/or graphics external to the provider that may appear on the website belong to their respective owners, they being responsible for any possible controversy that may arise regarding them. In any case, the provider has express and prior authorization from them.',
      intellectualPropertyText4: 'The provider does not allow, except with express authorization, third parties to redirect directly to the specific contents of the website. In any case, and if permission is granted, it must redirect to the main website of the provider.',
      intellectualPropertyText5: 'The provider recognizes the corresponding industrial and intellectual property rights in favor of their holders, not implying their mere mention or appearance on the website the existence of rights or any responsibility of the provider over them, nor endorsement, sponsorship, or recommendation by the provider.',
      intellectualPropertyText6: 'To make any type of observation regarding possible breaches of intellectual or industrial property rights, as well as any of the contents of the website, you can do so through the following email:',
      generalConditions: 'General Conditions of Use',
      generalConditionsText1: 'Access to our website is free and does not require prior subscription or registration. The USER must access it in accordance with good faith, public order rules, and these General Conditions of use. Access to our website is made under the sole and exclusive responsibility of the USER, who will refrain from using any of the services for illegal purposes or effects, prohibited or harmful to the rights of third parties, being responsible in any case for damages that may be caused to third parties or to ourselves.',
      generalConditionsText2: 'Taking into account the impossibility of control over the information, contents, and services contained in other websites that can be accessed through the links that our website may make available to you, we inform you that we are exempt from any liability for damages of any kind that may arise from the use of those websites, external to our company, by the USER.',
      generalConditionsText3: 'You can obtain more information about how we use your personal data in the',
      privacyPolicyLink: 'Privacy Policy',
      ourWeb: 'of our website.',
    },
    // Team page
    teamPage: {
      eyebrow: 'OUR TEAM',
      title1: 'EXPERIENCED STRATEGISTS',
      title2: 'AND EXPERT TECHNOLOGISTS',
      subtitle: 'At Tauler Group, we combine strategy, AI, finance, and business to build and elevate the businesses of tomorrow.',
      // Álvaro
      alvaroRole: 'Co-Founder & Co-CEO',
      alvaroHighlight1Title: 'Data Science and AI Engineer',
      alvaroHighlight1Desc: 'Polytechnic University of Madrid.',
      alvaroHighlight2Title: 'Development and Scaling',
      alvaroHighlight2Desc: 'Manages development teams and AI project operations.',
      alvaroHighlight3Title: 'Tauler Group',
      alvaroHighlight3Desc: 'Leads product vision and technical execution.',
      alvaroBio1: 'Álvaro leads technology and operations strategy at Tauler Group. His focus is on integrating scalable AI systems that directly impact operational efficiency.',
      alvaroBio2: 'He combines AI engineering with a clear product and market vision, ensuring that technology solves real business problems.',
      // Manuel
      manuelRole: 'Co-Founder & Co-CEO',
      manuelHighlight1Title: 'Mathematician',
      manuelHighlight1Desc: 'Complutense University of Madrid and University of La Laguna.',
      manuelHighlight2Title: 'Operations and Finance',
      manuelHighlight2Desc: 'Resource management and operational process optimization.',
      manuelHighlight3Title: 'Business Development',
      manuelHighlight3Desc: 'Leadership in opening new markets and key client relationships.',
      manuelBio1: 'Manuel brings strategic and financial vision to Tauler Group. His experience allows translating AI technical capabilities into solid and sustainable business plans.',
      manuelBio2: 'He ensures that each project is not only technically viable but generates a clear and measurable return on investment for our clients.',
    },
    // Manifesto page
    manifestoPage: {
      eyebrow: 'OUR DNA',
      title: 'The Tauler',
      titleHighlight: 'Manifesto.',
      principle1Title: '01. AI is a tool.',
      principle1Text: 'Value is not in the technology itself, but in how it is applied to solve real problems and create new opportunities. AI is the tool with the greatest capacity to impact business.',
      principle2Title: '02. Orchestration is everything.',
      principle2Text: 'Models are necessary but insufficient to create value. What transforms companies is an orchestrated system of data, agents, processes, decisions, and people working in sync.',
      principle3Title: '03. Business sets the course; technology accelerates it.',
      principle3Text: 'A well-designed business strategy is the answer to a market need. AI is a strategy accelerator, not a substitute. First, we understand the business dynamics. Then we apply AI to amplify it.',
      principle4Title: '04. Hybrid teams are the ultimate advantage.',
      principle4Text: 'We unite engineers, mathematicians, financiers, and operators under one method. Value emerges when those who understand the business can speak the language of the machine (and vice versa).',
      principle5Title: '05. Speed is a strategy.',
      principle5Text: 'We iterate, build, and adjust at an accelerated pace thanks to AI. The market rewards those who learn faster.',
      principle6Title: '06. New businesses must be born with distribution.',
      principle6Text: 'Our Venture Builder starts from a simple truth: a product without a market has no value. That\'s why we validate the opportunity first and then develop it.',
      principle7Title: '07. Innovation lives in a natural conflict with profitability.',
      principle7Text: 'Without innovation there is no profitability and without profitability there is no innovation. It\'s a natural but necessary conflict. We specialize in resolving this conflict. Our final metric is not model complexity, but economic results.',
      conclusion: 'We believe in a future where technology amplifies human potential.',
      cta: "Let's build that future",
    },
    // Tech page
    techPage: {
      eyebrow: 'PROPRIETARY TECHNOLOGY',
      title: 'How we develop our software',
      intro1: 'Artificial intelligence has radically changed the way software is developed. Today it\'s possible to build functional prototypes in days, even hours. The problem is that many of these solutions are born with an expiration date: they work, but don\'t scale; they impress in a demo, but break when real users come in; they look like products, but are actually poorly disguised proof of concepts.',
      intro2: 'We work on the exact opposite side of that trend.',
      section1Title: 'Speed, yes. Fragility, no.',
      section1Text: 'We use artificial intelligence intensively in our development process. We do a lot of Vibe Coding: we iterate fast, explore solutions, validate technical hypotheses with a speed that was unthinkable a few years ago. It would be absurd not to.',
      section1After: 'But speed is never the final goal. It\'s a tool.',
      focusIntro: 'Our focus is on building software that:',
      focus1: 'is robust from day one,',
      focus2: 'can scale without being rewritten every six months,',
      focus3: 'and conveys trust to companies, partners, and investors.',
      focusAfter: 'AI helps us get there sooner, but engineering is what ensures we can stay.',
      section2Title: 'Proprietary technology doesn\'t mean improvised technology',
      section2Text: 'When we say we work with proprietary technology, we don\'t mean reinventing the wheel or building exotic frameworks that only we understand. On the contrary.',
      stackIntro: 'Our stack is based on:',
      stack1: 'widely proven software development standards,',
      stack2: 'architectures designed to grow (not to survive),',
      stack3: 'and technical decisions made for the medium and long term.',
      stackAfter: 'The difference is in how we combine all of that and the criteria with which we do it. We don\'t choose tools because they\'re trendy, but because they fit the problem, the business model, and the expected scale of the digital asset.',
      section3Title: 'Consulting and Venture Builder: the same level of demand',
      section3Text: 'We work on two fronts:',
      front1: 'Advisory and AI project definition for companies.',
      front2: 'Building our own digital assets and with industrial partners within our Venture Builder.',
      frontsAfter1: 'In both cases, we apply the same standard. There are no "shortcuts" for being an internal MVP or concessions for going fast to market. If something enters our portfolio, it has to be prepared to grow, be maintained, and evolve.',
      frontsAfter2: 'This implies, among other things:',
      implication1: 'clearly separating experimentation from product,',
      implication2: 'correctly designing data flows,',
      implication3: 'treating AI as just another part of the system, not as a magic patch,',
      implication4: 'and assuming that maintenance and evolution are part of the design, not a future problem.',
      section4Title: 'Integrated AI, not as a patch',
      section4Text1: 'One of the most common mistakes we see is building products where AI is "glued" to the system. It works as long as everything is fine, but as soon as data, volume, or context change, problems appear.',
      section4Text2: 'Our approach is different:',
      approach1: 'AI is part of the architecture,',
      approach2: 'it\'s monitored,',
      approach3: 'it\'s versioned,',
      approach4: 'it\'s evaluated,',
      approach5: 'and it\'s governed like any other critical component.',
      approachAfter: 'That\'s what allows a system with AI to be not only intelligent but also reliable.',
      section5Title: 'Software that lasts',
      section5Text: 'In the end, it all comes down to a fairly simple idea: building software that persists over time.',
      conclusion1: 'Artificial intelligence allows us to develop faster than ever, but it also demands more judgment than ever. Because now it\'s easy to make something that works; the difficult thing is still making something that lasts.',
      conclusion2: 'That\'s our job. And that\'s probably the least visible and most important part of everything we do.',
      cta: 'Let\'s talk about your project',
    },
    // Consulting page
    consultingPage: {
      eyebrow: 'OUR SERVICES',
      title: 'AI Consulting',
      subtitle: 'We transform your company with AI strategically, quickly, and without internal complexity.',
      text1: 'At Tauler Group, we don\'t just implement technology; we orchestrate a complete transformation. Our "end-to-end" consulting approach ensures that every Artificial Intelligence initiative is aligned with your most critical business objectives.',
      text2: 'From initial diagnosis to scale operation, we accompany you every step of the way. We identify the opportunities where AI can generate the greatest impact: process automation, improved decision-making, trend prediction, and customer experience personalization.',
      card1Title: 'Diagnosis and Strategy',
      card1Text: 'We evaluate your digital maturity and define a clear and actionable roadmap.',
      card2Title: 'Development and Implementation',
      card2Text: 'We build robust and scalable solutions using the latest AI technologies.',
      cta: 'Schedule Consultation',
    },
    // Venture Building page
    venturePage: {
      eyebrow: 'OUR SERVICES',
      title: 'Reverse Venture Building',
      subtitle: 'The fastest and safest way to launch new AI-based digital products.',
      text1: 'Tauler Group\'s Reverse Venture Building model is designed for corporations and industry leaders who want to innovate with the agility of a startup but with the solidity of an established company.',
      text2: 'You bring market knowledge, customer access, and opportunity validation. We provide the technology, the product development team, and the rapid execution capacity. Together, we co-create digital assets that generate new revenue streams.',
      benefit1: 'Drastic reduction of time-to-market.',
      benefit2: 'Mitigation of technological and operational risks.',
      benefit3: 'Focus on continuous validation and product-market fit.',
      benefit4: 'Guaranteed scalability from day one.',
      cta: 'Start Collaboration',
    },
    // Cookie banner
    cookieBanner: {
      text: 'We use cookies to improve our services. You can get more information in our',
      cookiePolicy: 'Cookie Policy',
      and: 'and',
      privacyPolicy: 'Privacy Policy',
      accept: 'Accept',
      moreInfo: 'More information',
    },
  },
}

// Helper function to get nested translation value
function getNestedValue(obj: Translations, path: string): string {
  const keys = path.split('.')
  let current: Translations | string = obj
  
  for (const key of keys) {
    if (typeof current === 'object' && current !== null && key in current) {
      current = current[key]
    } else {
      return path // Return the key if not found
    }
  }
  
  return typeof current === 'string' ? current : path
}

// Context
const I18nContext = createContext<I18nContextType | null>(null)

// Provider component
export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language')
      if (saved === 'en' || saved === 'es') {
        return saved
      }
      
      // Detect browser language
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('en')) {
        return 'en'
      }
    }
    return 'es' // Default to Spanish
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    // Update html lang attribute
    document.documentElement.lang = lang
  }

  // Set initial html lang attribute
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const t = (key: string): string => {
    return getNestedValue(translations[language], key)
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

// Hook
export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

// Language Switch Component
export function LanguageSwitch() {
  const { language, setLanguage } = useI18n()
  
  return (
    <button
      onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[rgb(var(--color-ink))]/10 hover:border-[rgb(var(--color-ink))]/30 transition-all duration-300 text-sm font-medium text-[rgb(var(--color-ink))]/70 hover:text-[rgb(var(--color-ink))] bg-transparent hover:bg-[rgb(var(--color-ink))]/5"
      title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
      <span className="uppercase tracking-wider">{language === 'es' ? 'EN' : 'ES'}</span>
    </button>
  )
}

// Menu Language Switch (for dark background)
export function LanguageSwitchMenu() {
  const { language, setLanguage } = useI18n()
  
  return (
    <button
      onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
      className="flex items-center gap-2 px-4 py-2 rounded-sm border border-white/20 hover:border-white/40 transition-all duration-300 text-sm font-medium text-white/70 hover:text-white bg-transparent hover:bg-white/5"
      title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
      <span className="uppercase tracking-wider">{language === 'es' ? 'EN' : 'ES'}</span>
    </button>
  )
}

