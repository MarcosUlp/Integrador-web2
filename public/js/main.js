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

  // Mostrar las opciones
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
  const botones = document.querySelectorAll('#opciones button');//desactiva botones para que no se pueda cammbiar la respuesta

  botones.forEach(btn => btn.disabled = true);

  const tiempo = Date.now() - inicioPregunta;
  partida.tiempos.push(timepo);
  partida.actuales++;

  if (elegida === correcta) {
    partida.correctas++;
    partida.puntae += puntaje;
    resultado.textContent = `✅ ¡Correcto! Ganaste ${puntaje} puntos`;
    resultado.style.color = 'green';
  } else {
    partidas.incorrectas++;
    resultado.textContent = `❌ Incorrecto. La respuesta correcta era: ${correcta}`;
    resultado.style.color = 'red';
  }

  if (partida.actuales >= partida.totalPreguntas) {
    setTimeout(mostrarResumenFinal, 1500);
  } else {
    setTimeout(obtenerPregunta, 1500);
  }
}
function mostrarResumenFinal() {
  const fin = Date.now();
  const duracionTotal = fin - partida.inicio;
  const promedio = partida.tiempos.reduce((a, b) => a + b, 0) / partida.tiempos.length;

  const juegoDiv = document.getElementById('juego');
  juegoDiv.innerHTML = `
    <h2> Fin de la partida</h2>
    <p> Respuestas correctas: ${partida.correctas}</p>
    <p> Respuestas incorrectas: ${partida.incorrectas}</p>
    <p> Puntaje total: ${partida.puntaje}</p>
    <p> Tiempo total: ${(duracionTotal / 1000).toFixed(2)} segundos</p>
    <p> Tiempo promedio por pregunta: ${(promedio / 1000).toFixed(2)} segundos</p>
    <button onclick="reiniciarPartida()">Volver a jugar</button>
  `;
}
function reiniciarPartida() {
  partida = {
    totalPreguntas: 10,
    actuales: 0,
    correctas: 0,
    incorrectas: 0,
    puntaje: 0,
    inicio: Date.now(),
    tiempos: []
  };
  obtenerPregunta();
}


//Aqui empieza el juego
obtenerPregunta();
