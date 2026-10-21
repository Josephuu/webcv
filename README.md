# Joseph Gavidia — CV web

Portfolio profesional bilingüe (ES/EN) orientado a administración cloud, Microsoft Azure y automatización. React + TypeScript + Vite, sin backend, CMS, analítica ni credenciales cloud.

## Desarrollo local

```bash
npm ci
npm run dev -- --host 127.0.0.1 --port 3000 --strictPort
```

Abrir `http://127.0.0.1:3000/webcv/`. Inglés: `http://127.0.0.1:3000/webcv/?lang=en`.
El idioma se conserva en la URL, sin cookies ni localStorage. La base de GitHub Pages sigue siendo `/webcv/`.

## Una fuente pública de contenido

- `src/content/cv.json`: perfil, experiencia, stack, proyectos, formación y textos ES/EN aprobados para esta versión de revisión.
- `src/components/CvSite.tsx`: página activa y comportamiento de navegación/idioma.
- `src/cv.css`: estilos de la página activa; tipografía del sistema, sin descargas externas de fuentes.
- `scripts/generate-cv.mjs`: genera HTML imprimible y TXT desde el mismo JSON.
- `public/cv/`: PDF, HTML y TXT en ambos idiomas; las descargas se distribuyen como archivos estáticos.
- Los antiguos `src/sections/`, `Navbar`, `ParticleNetwork` y componentes `ui/` siguen como código heredado, pero no se importan en la página activa. No actualizarlos como fuente de contenido.

La evidencia de entrevistas y el diagnóstico privado se mantienen fuera del repositorio. No importarlos en el frontend, aunque no se muestren visualmente.

## Actualización de contenido y PDFs

1. Revisar hechos y alcance personal antes de editar `src/content/cv.json`. Mantener equivalencia ES/EN y distinguir certificación obtenida de preparación.
2. Con el servidor de desarrollo en el puerto 3000, ejecutar en otra terminal:

```bash
npm run export:pdf
npm run verify
```

El exportador regenera HTML/TXT, usa Chrome con Playwright CLI para imprimir ambos PDFs, verifica sus bytes y escribe `pdf-manifest.json`. Requiere Chrome instalado y `@playwright/cli` disponible en la caché npm; si falta, preparar el CLI antes de exportar. No realiza descargas de red para preparar el CLI (`--offline`).

Los tests comparan la huella SHA-256 de la fuente y de los PDFs. Si se cambia el JSON sin regenerar los PDFs, la verificación falla. No editar el manifiesto a mano. El build regenera HTML/TXT; no necesita un navegador porque distribuye los PDFs previamente verificados.

## Verificación

```bash
npm run verify        # lint de la app activa + tests de contenido/descargas + TypeScript/build
npm run lint          # revisión global, incluye el scaffold heredado
npm audit
```

Pruebas de navegador reproducibles, con la web local iniciada:

```bash
npx --offline --yes --package @playwright/cli playwright-cli -s=cv-review open http://127.0.0.1:3000/webcv/ --browser=chrome
npx --offline --yes --package @playwright/cli playwright-cli -s=cv-review run-code --filename tests/browser-language.js
npx --offline --yes --package @playwright/cli playwright-cli -s=cv-review run-code --filename tests/browser-smoke.js
npx --offline --yes --package @playwright/cli playwright-cli -s=cv-review close
```

El smoke cubre ambos idiomas a 320, 390, 768 y 1440 px, desbordamiento horizontal, experiencia expandida, Escape/foco del menú, detalles por teclado y descargas reales. Las rutas de capturas de ese probe están configuradas para el workspace local `D:/Proyectos/cv-uptodate`; ajustarlas si se clona en otro directorio. Una medición DOM no sustituye una revisión visual humana.

## Deuda técnica conservada, no ocultada

En la revisión local del 21 de octubre de 2026, el lint global mantiene los mismos 8 errores preexistentes de Fast Refresh/pureza en componentes `ui/` no montados. `lint:app` revisa explícitamente la página activa, sin desactivar reglas del scaffold.

Las correcciones compatibles de dependencias dejaron 7 paquetes con avisos transitivos de Tailwind (5 high, 2 moderate). No se ejecutó `npm audit fix --force` ni se cambió de versión mayor de Tailwind. Esto no demuestra explotación en el sitio estático; sigue siendo deuda del proceso de build que debe resolverse antes de considerar cerrado el endurecimiento.

## Publicación

El workflow de Pages instala con `npm ci` y ejecuta `npm run verify` antes del deploy. Usa Node 24; la verificación local pasó con Node 25.8.1 y, de forma aislada, con Node 24.22.0. `npm ci --dry-run --ignore-scripts` confirmó la coherencia de manifiesto/lockfile, pero no sustituye una instalación limpia real. La ejecución remota del workflow no queda verificada por un build local.

**Push a `master` o ejecución manual del workflow publican el sitio.** Revisar la versión local y obtener aprobación antes de hacerlo. Un cambio de contenido o un commit local no significan que la web pública se haya actualizado.

Revisión trimestral sugerida: cargo/fechas, alcance de herramientas, proyectos en uso, credenciales, idiomas, contactos, ES/EN, descargas y checks técnicos. No hay publicación automática de cambios editoriales.
