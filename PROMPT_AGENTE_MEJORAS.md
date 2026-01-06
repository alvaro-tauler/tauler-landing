# Prompt para Agente: Mejoras de Diseño Inspiradas en Palantir × Apple

## 📋 Contexto del Proyecto

Eres un experto frontend developer especializado en React/TypeScript y diseño de interfaces premium. Trabajarás en mejorar la landing page de **Tauler Group**, una firma boutique de IA que ya tiene un diseño de nivel profesional implementado con:

- React + TypeScript + Vite
- Tailwind CSS con variables CSS personalizadas
- Diseño oscuro (navy profundo #030625)
- Glassmorphism y animaciones sofisticadas
- Tipografía grande estilo Apple
- Espaciado generoso (py-48, 192px entre secciones)
- Sistema de reveal animations con Intersection Observer
- Orbs animados y efectos visuales premium

**Situación actual:** El diseño ya implementa el 85% de los elementos de Palantir y Apple. Tu objetivo es llevar ese 85% al 95-100% implementando mejoras específicas sin romper lo existente.

---

## 🎯 Objetivo Principal

Implementar mejoras incrementales inspiradas en Palantir y Apple para elevar la experiencia visual y de usuario, manteniendo la identidad única del proyecto.

**NO debes:**
- ❌ Reescribir todo desde cero
- ❌ Cambiar la paleta de colores
- ❌ Modificar la estructura de componentes que funciona
- ❌ Agregar librerías pesadas innecesarias
- ❌ Hacer el texto más pequeño

**SÍ debes:**
- ✅ Implementar cambios de forma iterativa
- ✅ Mantener el estilo existente
- ✅ Agregar solo lo que mejora la UX
- ✅ Optimizar para rendimiento
- ✅ Testear exhaustivamente cada cambio

---

## 📊 Análisis de Referencia

### Elementos de PALANTIR a implementar:
1. **Navegación lateral full-screen** con contenido rico
2. **Data flow visualizations** (animaciones de partículas SVG)
3. **Timeline/process visualization** interactiva
4. **Secciones con video de fondo** (sutiles, opacity 15-20%)

### Elementos de APPLE a implementar:
1. **Parallax scroll sutil** en Hero (movimiento del mouse)
2. **Sticky scroll stories** para narrativa secuencial
3. **Hover states ultra-refinados** (múltiples propiedades simultáneas)
4. **Typography scale fluido** con clamp()

---

## 🚀 Plan de Implementación

### FASE 1: Navegación Premium (Prioridad ALTA)

**Tarea:** Mejorar el componente `Navbar` con menú lateral estilo Palantir.

**Especificaciones técnicas:**
```typescript
// Requerimientos:
- Menú que se desliza desde la derecha (no izquierda como Palantir, adaptamos)
- Ancho: w-full md:w-[600px]
- Backdrop: bg-black/95 backdrop-blur-2xl
- Transición: duration-700 ease-out
- Contenido: Cards con iconos, títulos y descripciones
- Estado: Mantener scroll del body bloqueado cuando está abierto
```

**Código base a seguir:**
- Archivo: `src/App.tsx`, función `Navbar()` (líneas 680-733)
- Mantener: Logo, estructura básica, estados de scroll
- Agregar: Menú lateral completo con animación slide-in

**Elementos visuales:**
- Cards con hover effect (bg-white/[0.02] → bg-white/[0.05])
- Iconos en círculos con border accent-red
- Footer con status indicator "System Operational"
- Botón close con transición suave

**Testing:**
- [ ] Funciona en mobile y desktop
- [ ] Se cierra al hacer click fuera
- [ ] Se cierra al navegar a una sección
- [ ] No hay scroll del body mientras está abierto
- [ ] Animaciones son fluidas (60fps)

---

### FASE 2: Timeline Interactiva (Prioridad ALTA)

**Tarea:** Crear una nueva sección `InteractiveProcess` después de `Differentiators`.

**Especificaciones técnicas:**
```typescript
// Requerimientos:
- 5 pasos del proceso: Diagnóstico → Arquitectura → Desarrollo → Operación → Escalado
- Timeline horizontal con línea de progreso animada
- Nodos clickeables con números 01-05
- Contenido del paso activo se muestra abajo
- Animaciones: fade-in con stagger de 200ms
```

**Estructura visual:**
```
[Eyebrow: "Nuestro Método"]
[Heading: "De la idea al impacto en tiempo récord"]
[Timeline horizontal con 5 nodos]
[Card con detalles del paso activo]
```

**Estados interactivos:**
- Default: Paso 0 activo
- Hover en nodo: Scale 1.05, cursor pointer
- Click: Actualiza activeStep, anima línea de progreso
- Nodo activo: Pulse animation, border accent-red
- Nodos completados (≤ activeStep): Color accent-red

**Testing:**
- [ ] Click en cualquier paso funciona
- [ ] Animación de progreso es suave
- [ ] Contenido del paso aparece con fade-in
- [ ] Responsive en mobile (nodos más pequeños)
- [ ] Accesible con teclado (tab + enter)

---

### FASE 3: Casos de Éxito con Slider (Prioridad MEDIA)

**Tarea:** Crear sección `CaseStudies` entre `Benefits` y `Differentiators`.

**Especificaciones técnicas:**
```typescript
// Requerimientos:
- 3 casos de éxito con datos reales/placeholder
- Slider con indicadores de progreso (líneas)
- Navegación: Flechas + Auto-play opcional (cada 5s)
- Grid de 2 columnas: Info del cliente | Métricas visuales
```

**Datos por caso:**
```typescript
{
  client: string,        // "Empresa Logística"
  industry: string,      // "Supply Chain"
  challenge: string,     // Problema a resolver
  solution: string,      // Solución implementada
  impact: string,        // Resultado principal
  metrics: Array<{       // 3 métricas con barra de progreso
    label: string,
    value: string
  }>
}
```

**Animaciones:**
- Transición entre casos: duration-700, opacity + translate
- Métricas: Barras se llenan con stagger (delay j * 200ms)
- Hover en métrica: Scale 1.1 en el valor
- Indicadores: Ancho w-8 → w-12 cuando activo

**Testing:**
- [ ] Slider funciona con flechas
- [ ] Indicadores reflejan el caso activo
- [ ] Barras de métricas se animan correctamente
- [ ] Responsive: Stack columnas en mobile
- [ ] Accesible: ARIA labels y keyboard nav

---

### FASE 4: Hero con Parallax Mouse (Prioridad MEDIA)

**Tarea:** Mejorar el componente `Hero` existente con efecto parallax al mover el mouse.

**Especificaciones técnicas:**
```typescript
// Requerimientos:
- Tracking de posición del mouse
- Orbs se mueven con parallax (diferentes velocidades)
- Grid background también tiene parallax sutil
- Solo en desktop (hidden md:block)
```

**Implementación:**
```typescript
const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

const handleMouseMove = (e: React.MouseEvent) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20  // -10 a +10
  const y = (e.clientY / window.innerHeight - 0.5) * 20
  setMousePos({ x, y })
}

// Aplicar a diferentes capas:
// Grid: translate(mousePos.x * 0.5, mousePos.y * 0.5)
// Orb 1: translate(mousePos.x * 1, mousePos.y * 1)
// Orb 2: translate(mousePos.x * 0.7, mousePos.y * 0.7)
```

**Optimización:**
- Usar transform (no left/top) para performance
- Transición suave: transition: 'transform 0.3s ease-out'
- No afecta contenido principal (solo background)

**Testing:**
- [ ] Funciona solo en desktop
- [ ] Movimiento es suave y no brusco
- [ ] No causa layout shift
- [ ] Performance: Mantiene 60fps
- [ ] MouseLeave resetea posición

---

### FASE 5: Typography Fluido (Prioridad BAJA)

**Tarea:** Mejorar escalado responsive de tipografía usando `clamp()`.

**Archivo:** `src/index.css`

**Cambios en clases existentes:**
```css
/* ANTES */
.heading-hero {
  @apply text-6xl md:text-8xl lg:text-9xl;
}

/* DESPUÉS */
.heading-hero {
  font-size: clamp(3rem, 8vw + 1rem, 10rem); /* 48px mín, 160px máx */
  line-height: 1.05;
  letter-spacing: -0.03em;
}

/* ANTES */
.heading-section {
  @apply text-4xl md:text-6xl;
}

/* DESPUÉS */
.heading-section {
  font-size: clamp(2rem, 5vw + 0.5rem, 6rem); /* 32px mín, 96px máx */
  line-height: 1.1;
  letter-spacing: -0.02em;
}
```

**Testing:**
- [ ] Se ve bien en 320px (mobile pequeño)
- [ ] Se ve bien en 1920px (desktop grande)
- [ ] Escala suavemente al resize
- [ ] No rompe layout en ningún breakpoint

---

### FASE 6: Hover States Mejorados (Prioridad BAJA)

**Tarea:** Mejorar `.btn-primary` con transiciones multi-propiedad.

**Archivo:** `src/index.css`

**Mejoras:**
```css
.btn-primary {
  /* Agregar will-change */
  will-change: transform, box-shadow, letter-spacing;
}

.btn-primary:hover {
  /* Agregar escala sutil */
  transform: translateY(-4px) scale(1.02) translateZ(0);
  
  /* Expandir letter-spacing */
  letter-spacing: 0.35em; /* Era 0.3em */
  
  /* Intensificar glow */
  box-shadow: 
    0 0 50px rgba(232, 21, 28, 0.6),  /* Era 0.4 */
    0 8px 30px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}
```

**Testing:**
- [ ] Hover se siente premium y fluido
- [ ] No hay saltos ni glitches
- [ ] Funciona en todos los navegadores
- [ ] Active state también funciona bien

---

## 🎨 Guía de Estilo a Seguir

### Variables CSS existentes (NO CAMBIAR):
```css
--color-bg: 3 6 37;                    /* Navy profundo */
--color-bg-elevated: 10 13 45;         /* Navy más claro */
--color-ink: 232 235 244;              /* Off-white */
--color-brand: 8 10 76;                /* Navy acento */
--color-accent-red: 232 21 28;         /* Rojo brand */
```

### Sistema de espaciado (MANTENER):
- Entre secciones: `py-32 md:py-48` (128px → 192px)
- Padding de cards: `p-10 md:p-14` (40px → 56px)
- Gaps: `gap-10 lg:gap-14` (40px → 56px)
- Base: Múltiplos de 4px

### Animaciones (SEGUIR ESTOS TIEMPOS):
- Micro interactions: 300ms
- Standard: 500-700ms
- Reveal scroll: 900ms
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (easeOutExpo)

### Glassmorphism (MANTENER ESTE PATRÓN):
```css
background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
backdrop-filter: blur(20px);
border: 1px solid rgba(255,255,255,0.08);
```

---

## 📐 Estructura de Componentes

### Orden actual de secciones (NO CAMBIAR):
```tsx
<Navbar />
<Hero />
<Manifesto />
<Units />
<Benefits />
// [AQUÍ AGREGAR: CaseStudies]
<Differentiators />
// [AQUÍ AGREGAR: InteractiveProcess]
<CallToAction />
<Footer />
```

### Patrón de reveal animation (USAR EN NUEVAS SECCIONES):
```tsx
function NuevaSeccion() {
  const ref = useReveal()  // Hook existente
  
  return (
    <section ref={ref} className="relative py-32 md:py-48 reveal border-t border-white/5">
      {/* Contenido */}
    </section>
  )
}
```

---

## ✅ Checklist de Calidad

Antes de considerar completada cada fase, verificar:

### Funcionalidad:
- [ ] Funciona en Chrome, Firefox, Safari
- [ ] Funciona en mobile (iOS + Android)
- [ ] No hay errores en consola
- [ ] No hay warnings de React
- [ ] TypeScript compila sin errores

### Performance:
- [ ] Animaciones a 60fps
- [ ] No hay layout shift (CLS)
- [ ] Imágenes/videos optimizados
- [ ] Usa transform/opacity (no left/top/width)
- [ ] will-change usado apropiadamente

### Accesibilidad:
- [ ] Navegable con teclado
- [ ] Focus states visibles
- [ ] ARIA labels donde sea necesario
- [ ] Contraste de texto adecuado (WCAG AA)
- [ ] prefers-reduced-motion respetado

### Diseño:
- [ ] Espaciado consistente con el sistema
- [ ] Colores de la paleta existente
- [ ] Tipografía según escala definida
- [ ] Animaciones con el easing correcto
- [ ] Mobile-first y responsive

---

## 🚨 Advertencias Críticas

### NO HACER NUNCA:
1. ❌ Cambiar `--color-bg` o `--color-accent-red`
2. ❌ Reducir el espaciado entre secciones
3. ❌ Agregar jQuery o librerías pesadas
4. ❌ Hacer text más pequeño que lo actual
5. ❌ Romper el sistema de glassmorphism
6. ❌ Agregar animaciones bruscas o rápidas
7. ❌ Usar `!important` en CSS (excepto si es absolutamente necesario)
8. ❌ Modificar archivos que no sean necesarios

### SIEMPRE HACER:
1. ✅ Testear en mobile antes de considerar terminado
2. ✅ Usar los hooks existentes (useReveal, useStaggerReveal)
3. ✅ Seguir la nomenclatura de clases existente
4. ✅ Documentar cualquier cambio complejo
5. ✅ Optimizar para performance desde el inicio
6. ✅ Mantener accesibilidad en cada feature
7. ✅ Hacer commits incrementales

---

## 📝 Notas Adicionales

### Si encuentras problemas:
1. **Revisa el código existente primero** - Probablemente ya hay un patrón que puedes seguir
2. **Consulta DESIGN_SYSTEM.md** - Tiene todas las especificaciones visuales
3. **Prueba en incrementos pequeños** - No implementes todo a la vez
4. **Usa console.log para debug** - Pero elimínalos antes del commit final

### Recursos disponibles:
- `/DESIGN_SYSTEM.md` - Sistema de diseño completo
- `/ANALISIS_PALANTIR_APPLE.md` - Este documento con ejemplos de código
- `/src/App.tsx` - Componente principal con todos los componentes
- `/src/index.css` - Variables CSS y utilidades

### Priorización:
Si tienes tiempo limitado, implementa en este orden:
1. **Navegación Premium** (mayor impacto visual)
2. **Timeline Interactiva** (valor educativo alto)
3. **Hero Parallax** (efecto wow inmediato)
4. **Casos de Éxito** (credibilidad)
5. **Typography fluido** (refinamiento)
6. **Hover states** (pulido final)

---

## 🎯 Criterio de Éxito

Este proyecto será considerado exitoso cuando:

1. ✅ La navegación lateral funciona fluidamente y luce premium
2. ✅ La timeline interactiva es intuitiva y educativa
3. ✅ Los efectos parallax son sutiles y no mareantes
4. ✅ Todo funciona perfecto en mobile
5. ✅ Las animaciones son fluidas (60fps constante)
6. ✅ El código está limpio y sin console.logs
7. ✅ No hay regresiones en funcionalidad existente
8. ✅ El diseño se siente cohesivo y profesional

**Métrica objetivo:** Pasar del 85% al 95% de similitud con Palantir × Apple, manteniendo la identidad única de Tauler Group.

---

## 📞 Contacto y Soporte

Si necesitas aclaraciones sobre:
- **Decisiones de diseño:** Consulta DESIGN_SYSTEM.md
- **Referencias visuales:** Revisa capturas de Palantir y Apple
- **Código existente:** Los comentarios en App.tsx son exhaustivos

**Filosofía del proyecto:**
> "Premium, elegante, rápido. En ese orden."

---

**Prompt creado:** Diciembre 6, 2025  
**Versión:** 1.0  
**Para:** Agente de implementación de mejoras de diseño  
**Proyecto:** Tauler Group Landing Page

---

## 🚀 Comando para Empezar

```bash
# 1. Asegúrate de estar en la rama correcta
git checkout -b feature/design-improvements

# 2. Instala dependencias (si no lo has hecho)
npm install

# 3. Inicia el servidor de desarrollo
npm run dev

# 4. Abre el navegador
# http://localhost:5173

# 5. Empieza con la Fase 1 (Navegación Premium)
# Archivo: src/App.tsx
# Busca la función Navbar() y empieza a mejorarla
```

**¡Manos a la obra!** 🎨✨


