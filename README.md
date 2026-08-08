# The Edit Room

Página de descargas de la suite de paneles para Adobe Premiere Pro.

- **Web:** https://zurisaitobi.github.io/the-edit-room/
- **Descargas:** en la pestaña [Releases](https://github.com/Zurisaitobi/the-edit-room/releases) de este repositorio, no en el propio repo (los instaladores pesan demasiado para ir como archivos normales).
- **`versions.json`:** lo consulta cada panel para avisar de que hay una versión nueva. Lo lee `room-update.js` (pendiente de escribir).

## Código fuente de cada panel

Vive en repositorios privados aparte, no aquí:

- https://github.com/Zurisaitobi/room-curves
- https://github.com/Zurisaitobi/room-tracker
- https://github.com/Zurisaitobi/room-markers
- https://github.com/Zurisaitobi/room-sync

## Actualizar una entrega nueva

1. Reconstruir el kit con `fuentes-instalador/` (ver `Documents\The Edit Room\Entregas\Suite\suite-traspaso.md`).
2. Crear una Release nueva con un tag `kit-AAAA-MM-DD` y subir los 10 archivos (`index.html` no, ese va en `main`; los 8 ZIP individuales + el `.exe` + el `.zip` de Mac).
3. Actualizar `versions.json` con las versiones y las URLs de esa Release.
4. `git push`.

## Aviso

`versions.json` tiene que reflejar **lo que hay realmente publicado en Releases**, no lo último
que haya en la máquina de Álvaro. El 8 de agosto de 2026, por ejemplo, el Room Sync instalado
era ya v1.48.0, pero el kit publicado seguía en v1.47.0 — así que `versions.json` dice 1.47.0
a propósito, hasta que se repita el proceso de arriba con la 1.48.
