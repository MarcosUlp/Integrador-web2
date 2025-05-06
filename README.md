# 🕹️ Proyecto Integrador - Web 2

Proyecto: **Trabajo Practico Integrador** de la materia **Web 2**. Se trata de una aplicacion desarrollada en Node.js que permite registrar partidas con nombre de jugador y puntaje, y visualizar un ranking con las 20 mejores.

────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

##  Tecnologías utilizadas

- Node.js
- Express.js
- Nodemon (para desarrollo)
- HTML + CSS
- JSON para almacenamiento

────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

##  ¿Qué hace la app?

- Permite ingresar partidas (nombre + puntaje).
- Guarda la información localmente en un archivo `partidas.json`.
- Muestra en pantalla un ranking con las **20 mejores partidas** ordenadas por puntaje.
- Sin base de datos, ideal para entornos locales o educativos.

────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

##  Estructura del proyecto

📁 Proyecto/
├─>📁public/
   ├─> index.html            # Interfaz principal
   ├─>📁css/
      ├─> style.css              # Estilos de la interfaz
   ├─>📁img/                     
   ├─>📁js/
      ├─> main.js                # Logica del juego y HTML dinamico
├─>📁src/
   ├─>📁controllers
      ├─>GameController.js       # Genera preguntas aleatoreas + 3 opciones
      ├─>PartidaController.js    # Guarda partidas en archivo Json 
   ├─>📁routes
      ├─> index.js               # Define rutas API y Ranking
├─> partidas.json         # Archivo de almacenamiento persistente
├─> package.json          # Dependencias y scripts del proyecto
├─> app.js                # Servidor principal (Express) 

────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

##  Cómo ejecutar el proyecto

1. Clonar el repositorio o descargar los archivos.
2. Instalar dependencias:

   npm install

3. Ejecutar el servidor en modo desarrollo:

   npm run dev

4. Abrir el navegador en:

   http://localhost:3000

────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

##  Funcionalidad técnica

- El servidor lee y escribe el archivo `partidas.json`.
- Las partidas se ordenan en el backend al mostrar el ranking.
- Se responde a rutas como `/` (interfaz principal) y `/partidas` (historial en formato JSON).
- Se utilizan metodos /GEt

────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

## Requisitos

- Crear un juego educativo de preguntas y respuestas consumiendo la api "https://restcountries.com/v3.1/all"

- 3 tipos de preguntas generadas al azar

   - Cuantos paises limitrofes tiene " "?
   - A qué país pertenece la siguiente bandera:
   - La capital "  " a que pais corresponde?

- Una respuesta entre 4 opciones 

- Respuesta correcta: Se suma el puntaje sugerido por pregunta y se continua a la siguiente

- Respuesta incorrecta: se muestra rla respuesta correcta y prosigue a la siguiente pregunta

- Al responder 10 preguntas se mostrara el resumen final de los datos recolectados de la partida
Se debera ingresar el nombre y se guarda la partida en el servidor de la aplicacion

- Durante todo el flujo del programa se va poder acceder a un ranking de las 20 mejores partidas

────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

## Flujo del programa

🟢1 El usuario entra al sitio "https://world-trivia.onrender.com"
   - El navegador solicita la pagina index.html que a su vez lo hace con style y main.js
   - Express (app.js) sirve los archivos estaticos de la pagina public/

🟢2 Vistaso inicial:
   - main.js (Mediante metodo /GET /api/pregunta haciendo referencia a gameControllers.js)
   - se muestra una pregunta aleatoria y 4 opciones para adivinar

🟢3 Interaccion usuario
   - Usuario elige una opcion:
      - Respuesta correcta: suma puntaje
      - Respuesta incorrecta: no suma, se muestra respuesta correcta
   - Se repite 10 veces hasta completar partida

🟢4 Final de la partida
   - se calcula y muestra un resumen final de la partida y un form para que el usuario ingrese su nombre:
      - respuestas correctas: 
      - respuestas incorrectas:
      - sumatoria del puntaje obtenido:
      - tiempo total jugado:
      - tiempo promedio por pregunta:

🟢5 Envio de datos
   - Usuario ingresa nombre y guarda la partida y se ejecuta metodo POST y se manda el puntaje al backend (ruta /partidas)

🟢6 Servidor guarda la partida
   - El back situado en partidaController recibe y guarda en partidas.json

🟢7 Mostrar historial:
   - Se hace un fetch('/partidas') (metodo GET)
   - el servidor responde con las 20 mejores partidas



────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

##  Almacenamiento

El archivo `partidas.json` guarda todas las partidas en formato:

```json
[
  {
    "nombre": "Marcos",
    "correctas": 5,
    "incorrectas": 5,
    "puntaje": 17,
    "tiempoTotal": 139520,
    "fecha": "2025-05-03T04:42:50.994Z"
  }
]
```
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

##  Posibles mejoras futuras
- hacerlo visiblemente mas armonioso
- Agregar validaciones de formulario más robustas.
- Subir a base de datos remota para usarlo desde distintos dispositivos.

────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

##  Autor

**Giraudi Marcos** — Trabajo final de Web 2.
