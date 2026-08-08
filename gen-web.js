/* gen-web.js — convierte el index.html del kit en el index.html de la web.
 *
 * Son dos artefactos distintos para dos contextos distintos:
 *   · el del kit apunta a rutas relativas (los ZIP viajan al lado, dentro del kit)
 *   · el de la web apunta a la Release de GitHub (aquí no hay archivos, solo la página)
 *
 * Uso:  node gen-web.js <ruta-al-index.html-del-kit>
 * El tag de la Release y las versiones salen de versions.json, para que no haya
 * dos sitios donde apuntar mal.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const DEST = path.join(__dirname, 'index.html');
const datos = JSON.parse(fs.readFileSync(path.join(__dirname, 'versions.json'), 'utf8'));
const TAG = datos.kit;
const BASE = 'https://github.com/Zurisaitobi/the-edit-room/releases/download/' + TAG + '/';

const origen = process.argv[2];
if (!origen) { console.error('falta la ruta al index.html del kit'); process.exit(1); }
let html = fs.readFileSync(origen, 'utf8');

let n = 0;
html = html.replace(/href="Rooms_Individuales\/(?:Windows|Mac)\/([^"]+)"/g, (_, f) => { n++; return 'href="' + BASE + f + '"'; });
html = html.replace(/href="Instalador_Completo\/([^"]+)"/g, (_, f) => { n++; return 'href="' + BASE + f + '"'; });

fs.writeFileSync(DEST, html, 'utf8');
console.log('  ' + n + ' enlaces apuntando a la Release ' + TAG);

/* comprobación: ningún enlace puede haber quedado relativo */
const relativos = [...html.matchAll(/href="(?!https?:)([^"#][^"]*)"/g)].map(m => m[1]);
if (relativos.length) {
  console.log('  QUEDAN ENLACES RELATIVOS: ' + relativos.join(', '));
  process.exitCode = 1;
}

/* comprobación: las versiones del hub tienen que casar con versions.json */
for (const p of datos.paneles) {
  if (!html.includes('v' + p.version)) {
    console.log('  OJO: el hub no menciona la v' + p.version + ' de ' + p.nombre);
    process.exitCode = 1;
  }
}
console.log('  versiones coherentes con versions.json');
