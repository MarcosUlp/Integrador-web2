fetch('/api/ping')
  .then(response => response.json())
  .then(data => {
    document.getElementById('mensaje').textContent = 'Servidor responde: ' + data.message;
  })
  .catch(error => {
    document.getElementById('mensaje').textContent = 'Error al conectar con el servidor';
    console.error(error);
  });

let partida = {
  totalPreguntas: 10,
  actuales: 0,
  correctas: 0,
  incorrectas: 0,
  puntaje: 0,
  inicio: Date.now(),
  tiempos: []
};
let inicioPregunta = null;

async function obtenerPregunta() {
  inicioPregunta = Date.now();
  const res = await fetch('/api/pregunta');
  const data = await res.json();

  document.getElementById('pregunta').textContent = data.texto;

  // Mostrar bandera si es pregunta de tipo "bandera"
  const img = document.getElementById('bandera');
  if (data.tipo === 'bandera') {
    img.src = data.imagen;
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
  }

  // Mostrar opciones
  const contenedorOpciones = document.getElementById('opciones');
  contenedorOpciones.innerHTML = '';
  data.opciones.forEach(opcion => {
    const btn = document.createElement('button');
    btn.textContent = opcion;
    btn.onclick = () => verificarRespuesta(opcion, data.respuesta, data.puntaje);
    contenedorOpciones.appendChild(btn);
  });

  // Limpiar resultado anterior
  document.getElementById('resultado').textContent = '';
}

function verificarRespuesta(elegida, correcta, puntaje) {
  const resultado = document.getElementById('resultado');
  const botones = document.querySelectorAll('#opciones button');
  botones.forEach(btn => btn.disabled = true);

  const tiempo = Date.now() - inicioPregunta;
  partida.tiempos.push(tiempo);
  partida.actuales++;

  if (elegida === correcta) {
    partida.correctas++;
    partida.puntaje += puntaje;
    resultado.textContent = `✅ ¡Correcto! Ganaste ${puntaje} puntos`;
    resultado.style.color = 'green';
  } else {
    partida.incorrectas++;
    resultado.textContent = `❌ Incorrecto. La respuesta correcta era: ${correcta}`;
    resultado.style.color = 'red';
  }

  if (partida.actuales >= partida.totalPreguntas) {
    setTimeout(mostrarResumenFinal, 1000);
  } else {
    setTimeout(obtenerPregunta, 1000);
  }
}

function mostrarResumenFinal() {
  const fin = Date.now();
  const duracionTotal = fin - partida.inicio;
  const promedio = partida.tiempos.reduce((a, b) => a + b, 0) / partida.tiempos.length;

  const juegoDiv = document.getElementById('juego');
  juegoDiv.innerHTML = `
    <h2>Fin de la partida</h2>
    <p>Respuestas correctas: ${partida.correctas}</p>
    <p>Respuestas incorrectas: ${partida.incorrectas}</p>
    <p>Puntaje total: ${partida.puntaje}</p>
    <p>Tiempo total: ${(duracionTotal / 1000).toFixed(2)} segundos</p>
    <p>Tiempo promedio por pregunta: ${(promedio / 1000).toFixed(2)} segundos</p>

    <form id="formGuardar">
      <label for="nombre">Tu nombre:</label>
      <input type="text" id="nombre" name="nombre" required>
      <button type="submit">Guardar partida</button>
    </form>

    <div id="mensajeGuardado" style="margin-top: 10px;"></div>

    <button id="btnReiniciar" disabled>Volver a jugar</button>
  `;

  // aca se envia el formulario con los datos de la partida
  document.getElementById('formGuardar').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();

    if (!nombre) return;

    const datosPartida = {
      nombre,
      correctas: partida.correctas,
      incorrectas: partida.incorrectas,
      puntaje: partida.puntaje,
      tiempoTotal: duracionTotal,
      fecha: new Date().toISOString()
    };

    const res = await fetch('/api/partida', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosPartida)
    });

    if (res.ok) {
      document.getElementById('mensajeGuardado').textContent = '✅ Partida guardada con éxito.';
      document.getElementById('btnReiniciar').disabled = false;

    } else {
      document.getElementById('mensajeGuardado').textContent = '❌ Error al guardar la partida.';
    }
  });

  // boton reinciar para actualizar dinamicamente htmly volver a jugar
  document.getElementById('btnReiniciar').addEventListener('click', () => {
    partida = {
      totalPreguntas: 10,
      actuales: 0,
      correctas: 0,
      incorrectas: 0,
      puntaje: 0,
      inicio: Date.now(),
      tiempos: []
    };

    const juegoDiv = document.getElementById('juego');
    juegoDiv.innerHTML = `
      <h1>Juego de Países</h1>
      <p id="pregunta">Cargando pregunta...</p>
      <img id="bandera" src="" alt="Bandera" style="display:none; width: 200px;">
      <div id="opciones"></div>
      <p id="resultado"></p>
    `;

    obtenerPregunta(); // ← Se llama a obtener pregunta
  });
}

async function cargarHistorial() {
  const res = await fetch('/api/partidas');
  const partidas = await res.json();

  const historialDiv = document.getElementById('historial');
  historialDiv.innerHTML = '<h2>Ranking de partidas</h2>';

  partidas.forEach(partida => {
    const duracionTotal = partida.tiempoTotal;
    const promedio = partida.correctas > 0
      ? partida.tiempoTotal / partida.correctas
      : 0;

    const div = document.createElement('div');
    div.innerHTML = `
      <hr>
      <p><strong>Jugador:</strong> ${partida.nombre}</p>
      <p>Respuestas correctas: ${partida.correctas}</p>
      <p>Respuestas incorrectas: ${partida.incorrectas}</p>
      <p>Puntaje total: ${partida.puntaje}</p>
      <p>Tiempo total: ${(duracionTotal / 1000).toFixed(2)} segundos</p>
      <p>Promedio por pregunta: ${(promedio / 1000).toFixed(2)} segundos</p>
    `;
    historialDiv.appendChild(div);
  });
}

//Aqui empieza el juego
obtenerPregunta();

document.getElementById('btnHistorial').addEventListener('click', () => {
  const historialDiv = document.getElementById('historial');
  const visible = historialDiv.getAttribute('data-visible') === 'true';

  if (visible) {
    historialDiv.style.display = 'none';
    historialDiv.setAttribute('data-visible', 'false');
    document.getElementById('btnHistorial').textContent = 'Ver Ranking';
  } else {
    historialDiv.style.display = 'block';
    historialDiv.setAttribute('data-visible', 'true');
    document.getElementById('btnHistorial').textContent = 'Ocultar Ranking';
    cargarHistorial();
  }
});
