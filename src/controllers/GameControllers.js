async function generarPregunta(req, res) {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');//traemos el contenido de la api
    const countries = await response.json();//"paises"el contenido ahora esta en formato json

    // Filtramos países con datos válidos, necesario para los 3 tipos de pregunta que queremos realizar
    //basicamente filtra el array de paises y solo deja aquellos que tengan datos completos,
    //nombre, capital, bandera y tenga paises limitrofes
    const validCountries = countries.filter(c =>
      c.capital && c.capital.length > 0 && c.name && c.name.common && c.flags && c.borders
    );

    // Elegimos un país aleatorio
    const pais = validCountries[Math.floor(Math.random() * validCountries.length)];

    // Elegimos tipo de pregunta aleatoriamente
    const tipos = ['capital', 'bandera', 'frontera'];
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];

    let pregunta = {};
    let respuestaCorrecta = '';//respuesta correcta
    let opciones = [];//aqui estaran las 4 opcione

    switch (tipo) {
      case 'capital':
        pregunta.texto = `¿la capital ${pais.capital[0]} a que pais corresponde??`;
        respuestaCorrecta = pais.name.common;
        pregunta.puntaje = 3;
        break;
      case 'bandera':
        pregunta.texto = `¿A qué país pertenece la siguiente bandera?`;
        pregunta.imagen = pais.flags.svg;
        respuestaCorrecta = pais.name.common;
        pregunta.puntaje = 5;
        break;
      case 'frontera':
        pregunta.texto = `¿Cuántos países limítrofes tiene ${pais.name.common}?`;
        respuestaCorrecta = pais.borders.length.toString();
        pregunta.puntaje = 3;
        break;
    }

    // Generamos 3 respuestas incorrectas para las 4 opciones 
    while (opciones.length < 3) {
      const candidato = validCountries[Math.floor(Math.random() * validCountries.length)];//aqui se busca un pais al azar

      if (tipo === 'frontera') {
        const valor = candidato.borders.length.toString();//si es de tipo frontera se genera un numero de paise limitrofes             
        if (!opciones.includes(valor) && valor !== respuestaCorrecta) {
          opciones.push(valor);
        }
      } else {
        if (!opciones.includes(candidato.name.common) && candidato.name.common !== respuestaCorrecta) {
          opciones.push(candidato.name.common);
        }
      }
    }

    opciones.push(respuestaCorrecta);
    opciones = opciones.sort(() => Math.random() - 0.5); // se le asigna aleatoriamente valores positivos y negativos

    pregunta.opciones = opciones;
    pregunta.respuesta = respuestaCorrecta; // guardamos la respuesta correcta en una vae
    pregunta.tipo = tipo;

    pregunta.puntaje = pregunta.puntaje || (
      tipo === 'bandera' ? 5 : 3
    )
    res.json(pregunta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generando pregunta' });
  }
}

module.exports = { generarPregunta };