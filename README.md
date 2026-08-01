# Industrias Céspedes — Sitio web (Fase 1)

Sitio web estático (HTML/CSS/JS, sin framework ni build) para **Industrias Céspedes**,
fabricante peruano de equipamiento gastronómico en acero inoxidable. Orientado a convertir
visitas en **cotizaciones por WhatsApp**, adaptado al mercado peruano.

> Estado: **catálogo de muestra + datos de ejemplo (placeholders)**. Antes de publicar,
> reemplaza los datos reales (ver más abajo).

## Vista previa local

No requiere instalación. Abre `index.html` en el navegador, o levanta un servidor local
(recomendado, para que funcionen los enlaces relativos):

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## ✅ Qué reemplazar antes de publicar

### 1. Datos del negocio — `js/config.js` (archivo ÚNICO y principal)
Todos los datos de contacto y empresa están centralizados aquí. Reemplaza los valores
marcados como `PLACEHOLDER`:

- `whatsapp` — número real en formato internacional sin `+` (Perú: `51` + 9 dígitos).
- `telefono`, `correoVentas`, `correoCotizaciones`.
- `razonSocial`, `ruc`, `direccion`, `distrito`, `horario`, `mapsUrl`.
- `aniosExperiencia`, `proyectosEntregados` (o quítalos si no aplican).
- `pagos.yape`, `pagos.plin`, `pagos.bancos`.
- `redes.facebook`, `redes.instagram`, `redes.tiktok` (deja `''` para ocultar un ícono).

### 2. Productos reales — `js/products.js`
El catálogo actual es de **muestra**. Edita/duplica los objetos de `PRODUCTS`:
- Cambia `img` por la ruta de tu foto real (ej. `images/productos/mi-mesa.jpg`).
- Ajusta `nombre`, `descripcion`, `specs`, `precio` (número en S/ o `null` para "Cotizar"),
  `disponibilidad` (`stock` | `pedido` | `personalizado`) y `dias`.
- Marca `destacado: true` en los que quieras mostrar en "Más solicitados" del inicio.
- Categorías y rubros se definen en `CATEGORIES` y `RUBROS` del mismo archivo.

### 3. Imágenes — carpeta `images/`
Son placeholders con estilo de plano técnico. Reemplaza por **fotos reales**:
- `images/cat/*.svg` — una por categoría.
- `images/proyectos/*.svg` — galería de proyectos (usa el distrito/ciudad en el nombre para SEO local).
- `images/taller.svg` y `images/hero-plano.svg` — foto del taller y del hero.
- Optimiza el peso de las imágenes para conexiones móviles (la mayoría de visitas es celular).

### 4. Contenido de ejemplo a revisar
- **Testimonios** (en `index.html`): reemplaza por reseñas reales.
- **Textos legales** (`privacidad.html`, `terminos.html`, `cookies.html`): son modelos;
  revísalos con tu asesor legal y completa fechas.
- **Dominio**: actualiza `robots.txt`, `sitemap.xml` y las etiquetas `canonical`/`og:` con
  tu dominio definitivo (sugerido: `industriascespedes.pe`).

## Estructura

```
index.html              Inicio
productos.html          Catálogo (filtros por categoría y rubro)
producto.html           Ficha de producto (?id=CODIGO)
a-medida.html           Formulario de fabricación personalizada
proyectos.html          Galería de proyectos
envios.html             Envíos y entregas (Lima / provincias)
nosotros.html           Empresa y propuesta de valor
faq.html                Preguntas frecuentes
contacto.html           Contacto + formulario + medios de pago
libro-reclamaciones.html  Libro de Reclamaciones virtual
privacidad.html · terminos.html · cookies.html   Legales (Perú)
css/styles.css          Sistema de diseño
js/config.js            >>> DATOS DEL NEGOCIO (editar aquí) <<<
js/products.js          Datos del catálogo
js/render.js            Constructores de tarjetas
js/site.js              Header, footer y botón flotante de WhatsApp
js/catalog.js           Grid + filtros del catálogo
js/product.js           Ficha de producto
js/home.js              Render del inicio
js/forms.js             Formularios -> WhatsApp / correo (sin backend)
images/                 Imágenes (placeholders a reemplazar)
favicon.svg · robots.txt · sitemap.xml
```

## Cómo funcionan los formularios (sin backend)

En esta fase no hay servidor: al enviar, los formularios de **cotización** y **a medida**
abren WhatsApp con el mensaje ya redactado; el **Libro de Reclamaciones** abre el correo de
la empresa con la hoja lista para remitir. Cuando quieras recibir los envíos en un correo o
CRM, conecta los `<form>` a un servicio como Formspree/Getform o a WhatsApp Business API.

## Próximas fases (del brief)

- **Fase 2:** buscador, más filtros, galería de proyectos ampliada, reseñas de Google
  integradas y guías SEO (blog): "Cómo equipar una pollería", "AISI 304 vs 430", etc.
- **Fase 3:** carrito y pagos online (Culqi / Niubiz / Izipay / Mercado Pago), cálculo de
  envío y facturación electrónica integrada.
- **Fase 4:** CRM y automatización de seguimiento de leads, remarketing y analítica avanzada.

## Notas de diseño

- Paleta: negro / azul marino / blanco. El botón de WhatsApp conserva su verde reconocible.
- Motivo visual: líneas de cota de plano técnico y tipografía monoespaciada para specs y
  códigos, en línea con la fabricación de precisión en acero.
- Mobile-first, accesible (foco visible, contraste, `prefers-reduced-motion`).
