# The Edit House

Web auxiliar (https://theedithouse.anoproj.com): textos legales, `versions.json` y la compilación pública de FFmpeg. **Aquí ya no se descargan los paneles**: se venden y se descargan en Lemon Squeezy (Mis pedidos), con clave de licencia.

- **`versions.json`:** lo consulta `room-update.js` en cada panel (una vez al día) para avisar de que hay versión nueva; el botón lleva a https://app.lemonsqueezy.com/my-orders.
- **`lanzador-mac/`:** ejecutable mínimo de los instaladores de Mac (`Instalar Room X.app`), compilado sin firmar por `.github/workflows/lanzador-mac.yml`. La firma y la notarización se hacen fuera de GitHub.

## Código fuente de cada panel

Vive en repositorios privados aparte, no aquí:

- https://github.com/Zurisaitobi/room-curves
- https://github.com/Zurisaitobi/room-tracker
- https://github.com/Zurisaitobi/room-markers
- https://github.com/Zurisaitobi/room-sync

## Publicar una versión nueva

1. Reconstruir y firmar con `fuentes-instalador/` (`node construir.js --firmar` y `node mac-app.js --firmar`).
2. Subir los instaladores a cada producto de Lemon Squeezy.
3. Poner las versiones nuevas en `versions.json` y hacer `git push`. Solo cuando ya estén subidos: si no, el aviso mandaría a descargar algo que aún no está.

## ESTE REPOSITORIO TIENE QUE SEGUIR SIENDO PÚBLICO

No es una preferencia: es una **obligación legal**.

Room Tracker y Room Sync distribuyen un binario de FFmpeg compilado con
`.github/workflows/ffmpeg.yml`. Ese binario es **LGPL 2.1**, y la LGPL obliga a
poner a disposición del usuario el código fuente correspondiente y los
parámetros exactos de compilación. Los avisos legales que viajan dentro de los
dos paneles (`LICENCIAS.txt`) apuntan literalmente a este repositorio:

    https://github.com/Zurisaitobi/the-edit-room/blob/main/.github/workflows/ffmpeg.yml
    https://github.com/FFmpeg/FFmpeg/tree/n7.1.1

**Si este repositorio pasa a privado, esos enlaces dejan de responder para los
clientes y se incumple la licencia.** Los cuatro repositorios del código de los
paneles sí son privados, y deben seguir siéndolo; este no.

Lo mismo vale para borrar el workflow o reescribir su historial: tiene que poder
consultarse la receta con la que se compiló el binario que se está repartiendo.

## Aviso

`versions.json` tiene que reflejar **lo que hay realmente publicado en Releases**, no lo último
que haya en la máquina de Álvaro. El 8 de agosto de 2026, por ejemplo, el Room Sync instalado
era ya v1.48.0, pero el kit publicado seguía en v1.47.0 — así que `versions.json` dice 1.47.0
a propósito, hasta que se repita el proceso de arriba con la 1.48.
