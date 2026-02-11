# Ademy Landing

Landing page estatica para promocionar Ademy.

## Uso local
- Abre `index.html` en el navegador.
- Opcional: servidor local con `python -m http.server` en esta carpeta.

## Personalizacion rapida
- Cambia correos y telefono en `index.html`.
- Ajusta colores y fuentes en `styles.css`.
- Reemplaza el logo en `assets/ademy-logo.png`.
- Cambia las capturas en `assets/screens/`.
- Configura el formulario en `index.html` (atributo `data-endpoint`).

## Deploy rapido (hosting estatico)
1. Sube toda la carpeta `c:\aplicaciones2025\ademy` a tu hosting estatico.
2. Define `index.html` como pagina inicial.
3. Actualiza dominio en `sitemap.xml` si lo agregas.

## Deploy con Netlify
1. Arrastra la carpeta al panel de Netlify.
2. Publica como sitio estatico.

## Deploy con Vercel
1. Importa el proyecto como sitio estatico.
2. Configura la salida con `index.html` como raiz.