# Sublinovena Visual Showcase

Prompt para Lovable — MVP visual Sublinovena

Copia y pega todo el bloque de abajo directamente en Lovable. Sube también el archivo sublinovena_logo.pngcomo referencia de marca cuando Lovable te lo permita adjuntar.

Quiero que construyas un MVP visual (demo de diseño) del sitio web de Sublinovena, una empresa chilena de merchandising corporativo personalizado (B2B). Este sitio es para mostrárselo a la dueña del negocio como maqueta de cómo se vería su página — prioriza que el resultado se vea profesional, moderno y dinámico, nunca estático o genérico. No necesitas conectar backend real ni pasarela de pago: todo puede funcionar con datos de ejemplo (mock data) y formularios que simulan el envío.

1. Identidad de marca

Logo: círculo navy oscuro con una cinta en degradé (amarillo → verde → celeste → azul-violeta → magenta) formando una "S" estilizada, texto "SUBLINOVENA" en blanco y "MERCHANDISING" en lavanda debajo. Úsalo como referencia de paleta y de personalidad visual (moderna, colorida, creativa — no un B2B aburrido).

Paleta de colores (usar estos hex exactos):

Fondo oscuro de marca: #0F0D26

Acento amarillo-lima: #F0EE52

Acento verde: #4CAA5E

Acento celeste/cian: #4DACE8

Acento azul-violeta (transición): #6973C0

Acento magenta/rosado: #C74195

Texto sobre fondo oscuro: #FFFFFF

Lavanda secundario (subtítulos, detalles): #C28DF4

Fondo claro para secciones de contenido: blanco / gris muy claro #F7F8FA

Uso sugerido: navbar, hero y footer en fondo oscuro #0F0D26 con el degradé de marca como acento (botones, bordes, glow en hover, iconos). Las secciones de catálogo y contenido en fondo claro para que los productos se vean nítidos, con toques del degradé en CTAs, líneas divisorias y estados hover.

Tipografía: un sans-serif moderno y limpio (tipo Poppins, Inter o Sora) para el cuerpo; para títulos grandes puedes usar mayúsculas con letter-spacing amplio, evocando el estilo del logo, sin copiarlo literalmente.

2. Tono y sensación general (muy importante)

A la dueña no le gustan las páginas estáticas: quiere algo con movimiento y personalidad, pero que se siga viendo profesional y confiable para clientes corporativos que compran 1.000-1.500 unidades por pedido. Es decir: dinamismo con criterio, no un sitio recargado.

Implementa explícitamente:

Fondo del hero con un degradé animado sutil (blobs o gradiente en movimiento lento) usando los colores de marca sobre el navy oscuro.

Micro-interacciones: botones con hover que muestran el degradé o un glow suave, tarjetas de producto que se elevan/escalan levemente al pasar el mouse.

Animaciones de scroll-reveal (fade + slide up) al entrar cada sección en el viewport.

Navbar con transición suave (cambia de transparente a sólido al hacer scroll).

Transiciones suaves entre estados (abrir/cerrar modal de cotización, filtros del catálogo).

Nada de parpadeos agresivos ni animaciones que distraigan de la lectura — sutileza y pulido, no exceso.

3. Estructura de páginas / secciones

Navbar

Logo a la izquierda, links (Catálogo, Cómo cotizar, Nosotros, Contacto), botón CTA "Cotizar ahora" con el degradé de marca, y un ícono de WhatsApp.

Hero

Titular fuerte orientado a B2B: algo como "Merchandising corporativo que representa tu marca" (puedes proponer variantes).

Bajada breve mencionando personalización, calidad y pedidos por volumen (1.000+ unidades).

Dos CTAs: "Ver catálogo" (ancla al catálogo) y "Cotizar ahora" (abre el flujo de cotización).

Fondo oscuro con el degradé animado de marca de fondo.

Vitrina de productos (catálogo)

Grid de tarjetas de producto con: imagen (placeholder), nombre, categoría, badge de "cantidad mínima" (ej. "Mín. 1.000 uds").

Buscador + filtros por categoría (ej. Tazas, Poleras, Mochilas, Libretas, Botellas, Accesorios tech) — usa 8-12 productos de ejemplo con nombres e imágenes placeholder representativas de merchandising corporativo.

Botón "Cotizar" en cada tarjeta.

Estado hover con leve zoom en la imagen y sombra con tinte de color de marca.

Flujo de cotización

Al hacer clic en "Cotizar" (desde una tarjeta o el CTA del hero) se abre un modal/drawer minimalista.

Formulario simple: RUT empresa, nombre de contacto, email o WhatsApp, cantidad estimada.

Al enviar, mostrar una animación de confirmación breve ("¡Listo! Te contactaremos a la brevedad con tu cotización") — sin necesidad de backend real, solo el estado visual.

Incluye también un botón flotante de WhatsApp visible en todo el sitio.

Vista previa conceptual: personalización de producto (opcional, aspiracional)

Sección ilustrativa (no funcional, solo visual/demo) que muestre la idea de "sube tu logo y previsualízalo sobre el producto": una mockup estática con un producto (ej. una taza o polera) y el logo de un cliente ficticio superpuesto, con el texto "Próximamente: previsualiza tu logo en el producto antes de cotizar". Esto es para transmitir la idea sin tener que construir la función real.

Por qué elegirnos / value props

3-4 tarjetas cortas: personalización real, pedidos de gran volumen, atención directa por WhatsApp, catálogo siempre actualizado. Usa iconografía simple y los colores de acento.

Footer

Fondo oscuro #0F0D26, logo, links rápidos, datos de contacto, WhatsApp, redes sociales (Instagram), y una línea con el degradé de marca como detalle decorativo.

4. Responsive

El sitio debe verse igual de cuidado en mobile: navbar colapsa a menú hamburguesa, catálogo pasa a 1-2 columnas, modal de cotización ocupa pantalla completa en mobile.

5. Alcance de este MVP

Esto es una demo de diseño para mostrarle a la dueña cómo se vería el sitio — no necesita:

Pasarela de pago ni checkout real.

Backend real ni base de datos (usa datos mock/estado local).

Integración real de IA para la previsualización de logo (esa sección es solo ilustrativa).

Sí necesita verse terminado, pulido y con movimiento, para transmitir profesionalismo y que el sitio se sienta vivo, no una plantilla estática.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sublinovena-sparkle-demo.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e78c0fcd-c8cb-45df-963d-970a3cc8cb31).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
