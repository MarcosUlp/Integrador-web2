fetch('/api/ping')
  .then(response => response.json())
  .then(data => {
    document.getElementById('mensaje').textContent = 'Servidor responde: ' + data.message;
  })
  .catch(error => {
    document.getElementById('mensaje').textContent = 'Error al conectar con el servidor';
    console.error(error);
  });
