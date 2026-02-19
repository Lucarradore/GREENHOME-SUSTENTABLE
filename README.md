# GreenHome Sustentable

Sitio web corporativo para una empresa de soluciones de energía solar.

## Descripción

Este proyecto es una web estática desarrollada con **HTML, CSS y JavaScript** para mostrar servicios, proyectos, información institucional y vías de contacto de GreenHome Sustentable.

Incluye:

- Página principal con hero, beneficios, sección institucional y testimonios.
- Navbar responsive con menú hamburguesa y submenús.
- Páginas de servicios, proyectos, contacto, aviso legal y política de privacidad.
- Archivos SEO básicos (`robots.txt` y `sitemap.xml`).

## Estructura del proyecto

```text
.
├── index.html
├── aboutUs.html
├── services.html
├── projects.html
├── contact.html
├── aviso-legal.html
├── politica-privacidad.html
├── robots.txt
├── sitemap.xml
├── README.md
├── assets/
├── css/
│   ├── style.css
│   ├── common-layout.css
│   ├── about-us.css
│   ├── services.css
│   ├── projects.css
│   ├── contact.css
│   └── privacidad-legal.css
└── js/
	└── script.js
```

## Cómo ejecutar el proyecto

Como es un sitio estático, podés abrirlo directamente en el navegador:

1. Abrí `index.html`.

Opcional (recomendado para desarrollo): usar un servidor local en VS Code (por ejemplo, Live Server) para evitar problemas de rutas/caché.

## Estilos y comportamiento

- Los estilos globales de la home están en `css/style.css`.
- Los estilos compartidos de navbar/footer responsive están en `css/common-layout.css`.
- Cada página interna tiene su CSS específico en la carpeta `css/`.
- La lógica de interacciones (swiper, navbar responsive, animaciones) está en `js/script.js`.

## Responsive

El proyecto incluye diseño adaptable para desktop, tablet y mobile, con especial foco en:

- Navegación móvil con menú hamburguesa.
- Reorganización de contenidos en secciones principales.
- Ajustes visuales en cards y tipografía para pantallas pequeñas.

## SEO básico

- `robots.txt`: directivas para crawlers.
- `sitemap.xml`: mapa de URLs del sitio.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (vanilla)
- [Swiper](https://swiperjs.com/) (slider en la home)
- Font Awesome (iconografía)

## Licencia

Uso interno / proyecto académico-comercial (ajustar según corresponda).

