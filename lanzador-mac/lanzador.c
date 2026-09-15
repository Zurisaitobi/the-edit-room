/* lanzador.c — ejecutable de los instaladores de Mac de The Edit House.
 *
 * Por qué existe: Apple solo firma y notariza código dentro de una app, y el
 * ejecutable principal de una app tiene que ser un binario Mach-O, no un
 * script. Este programa no hace nada más que buscar el script que va dentro
 * de la propia app (Contents/Resources/instalar.sh) y pasárselo a /bin/bash.
 * Toda la lógica del instalador vive en ese script, que queda sellado por la
 * firma de la app.
 *
 * Se compila universal (arm64 + x86_64) con macOS 11 de mínimo, igual que el
 * ffmpeg. Aquí no hay ninguna clave: la firma se hace fuera de GitHub. */
#include <limits.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <mach-o/dyld.h>

int main(void) {
  char ruta[PATH_MAX];
  uint32_t tam = sizeof(ruta);
  if (_NSGetExecutablePath(ruta, &tam) != 0) return 1;

  char real[PATH_MAX];
  if (!realpath(ruta, real)) return 1;

  /* real = .../Instalar X.app/Contents/MacOS/<ejecutable> */
  char *barra = strrchr(real, '/');
  if (!barra) return 1;
  *barra = '\0';

  char script[PATH_MAX];
  if (snprintf(script, sizeof(script), "%s/../Resources/instalar.sh", real) >= (int)sizeof(script)) return 1;

  execl("/bin/bash", "bash", script, (char *)NULL);
  return 127;
}
