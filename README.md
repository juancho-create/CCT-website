# Cali Cultural Tours Website

## 📁 Estructura del Proyecto

```
CCT-website/
├── pages/                  # � Páginas HTML del sitio
│   ├── index.html          # 🏠 Página de inicio
│   ├── tours.html          # 📋 Catálogo de tours
│   ├── safety.html         # 🛡️ Información de seguridad
│   ├── local-info.html      # 📍 Información local
│   ├── map.html            # �️ Mapa de ubicaciones
│   ├── activities.html      # 🎯 Actividades disponibles
│   ├── blog.html           # 📝 Blog del sitio
│   ├── contact.html         # 📞 Contacto
│   ├── layout/             # 🏗️ Componentes reutilizables
│   │   ├── header.html    # Navbar principal
│   │   └── footer.html    # Footer del sitio
│   └── data/              # 📊 Datos del sitio
│       └── site-data.json  # Configuración del sitio
├── assets/                 # 📁 Recursos estáticos del sitio
│   ├── css/             # 🎨 Hojas de estilos
│   ├── images/          # 🖼️ Imágenes del sitio
│   └── public/           # 🌐 Archivos públicos para build
├── scripts/               # ⚡ Scripts JavaScript optimizados
├── docs/                  # 📚 Documentación del proyecto
├── src/                   # 🔧 Código fuente (futuro desarrollo)
├── dist/                  # 📦 Build optimizado para producción
├── package.json           # 📦 Dependencias del proyecto
├── vite.config.js         # ⚙️ Configuración de Vite
└── README.md              # 📖 Este archivo
```

## 🚀 Inicio Rápido

### Desarrollo Local
```bash
npm run dev
```

### Build para Producción
```bash
npm run build
```

### Previsualizar Build
```bash
npm run preview
```

## 🎨 Tecnologías Utilizadas

- **HTML5** - Estructura semántica moderna
- **CSS3** - Diseño responsive con variables CSS
- **JavaScript ES6+** - Funcionalidad interactiva
- **Vite** - Build tool moderno y rápido
- **SASS/SCSS** - Preprocesador CSS (variables y mixins)

## 📁 Assets Organizados

### CSS (`assets/css/`)
- `variables.css` - Variables de diseño y colores
- `base.css` - Estilos base y reset
- `components.css` - Componentes reutilizables
- `pages.css` - Estilos específicos de páginas
- `critical.css` - CSS crítico para above-the-fold
- `animations.css` - Animaciones y transiciones

### Imágenes (`assets/images/`)
- Organizadas por tours en subcarpetas
- Optimizadas para web (lazy loading)
- Formatos: JPG, WebP (preparado)

### Scripts (`scripts/`)
- `modern-animations.js` - Animaciones GSAP
- `performance-optimizer.js` - Optimización de rendimiento
- `image-optimizer.js` - Optimización de imágenes
- `carousel.js` - Carruseles de imágenes
- `forms.js` - Manejo de formularios

## 🎯 Mejoras Implementadas

### ✅ Rendimiento
- Lazy loading para imágenes
- Preload de recursos críticos
- Optimización de Core Web Vitals
- Service Worker preparado

### ✅ Accesibilidad
- Navegación por teclado
- ARIA labels y roles
- Estructura semántica HTML5
- Contraste de colores mejorado

### ✅ UX/UI
- Animaciones suaves con GSAP
- Transiciones fluidas
- Diseño responsive
- Micro-interacciones

## 🌐 Páginas del Sitio

### Principales
- `index.html` - Página de inicio
- `tours.html` - Catálogo de tours

### Tours Individuales
- `salsa-tour.html` - Tour de salsa
- `market-tour.html` - Tour del mercado
- `coffee-farm.html` - Tour de finca cafetera
- `chocotour.html` - Tour de chocolate
- `street-food.html` - Tour de comida callejera
- `hummingbirds.html` - Tour de colibríes
- `cristo-rey.html` - Tour Cristo Rey
- `coffee-tasting.html` - Cata de café
- `waterfalls.html` - Tour de cascadas
- `whale-watching.html` - Avistamiento de ballenas

### Informativas
- `activities.html` - Actividades disponibles
- `safety.html` - Información de seguridad
- `local-info.html` - Información local
- `map.html` - Mapa de ubicaciones
- `blog.html` - Blog del sitio
- `contact.html` - Contacto

## 🎨 Sistema de Diseño

### Colores Principales
- `--pink: #E91E8C` - Rosa principal marca
- `--pink-dark: #a94b69` - Rosa oscuro
- `--pink-light: #fbe0e6` - Rosa claro
- `--texto-claro: #2C1820` - Texto principal
- `--texto-secundario: #5C3A46` - Texto secundario

### Tipografía
- 'Barlow Condensed' - Títulos y encabezados
- 'Inter' - Texto corporativo
- 'Playfair Display' - Títulos elegantes

## 📱 Optimizaciones

### Mobile-First
- Breakpoints: 900px, 768px, 480px
- Menú hamburguesa para móvil
- Touch-friendly interactions

### Performance
- Crítico CSS inline
- Lazy loading progresivo
- Imágenes optimizadas
- Scripts diferidos

## 🔧 Configuración

### Vite Config
- Multi-page build setup
- Optimización de assets
- Development server con HMR

### Package Scripts
- `dev` - Servidor de desarrollo
- `build` - Build de producción
- `preview` - Previsualización del build

## 📊 Estado Actual

### ✅ Completado
- [x] Navbar optimizada y centrada
- [x] Subtítulo eliminado
- [x] Efectos hover corregidos
- [x] Archivos innecesarios eliminados
- [x] Estructura de carpetas organizada
- [x] Código limpio y optimizado

### 🚀 En Progreso
- [ ] Service Worker completo
- [ ] WebP conversion activa
- [ ] SEO metadata mejorada
- [ ] Testing automatizado

---

**Desarrollado con ❤️ para Cali Cultural Tours**  
*Guía local oficial en Cali, Colombia • RNT 196165*
