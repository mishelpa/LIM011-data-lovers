
import POKEMON from './data/pokemon/pokemon.js';

// import { mostrarListaPokemon } from './data.js';

const datosPokemon = (datos) => {
  datos.forEach((poke) => {
    // Creando la vista adelante del Pokemon(numero, nombre e imagen)
    const caja = document.createElement('div');
    caja.setAttribute('id', 'caja');
    const tarjetaPrincipalPokemon = document.createElement('div');
    tarjetaPrincipalPokemon.setAttribute('id', 'tarjeta-principal-pokemon');
    const tarjetaDatosPokemon = document.createElement('div');
    tarjetaDatosPokemon.setAttribute('id', 'tarjeta-datos-pokemon');
    const divNumeroPokemon = document.createElement('h4');
    const numeroPokemon = document.createTextNode(poke.num);
    divNumeroPokemon.appendChild(numeroPokemon);
    const divNombrePokemon = document.createElement('div');
    divNombrePokemon.setAttribute('id', 'nombre-Pokemon');
    const nombrePokemon = document.createTextNode(poke.name);
    divNombrePokemon.appendChild(nombrePokemon);
    const imagenPokemon = document.createElement('img');
    imagenPokemon.setAttribute('src', poke.img);
    tarjetaDatosPokemon.appendChild(divNumeroPokemon);
    tarjetaDatosPokemon.appendChild(divNombrePokemon);
    tarjetaDatosPokemon.appendChild(imagenPokemon);

    // Creando la vista atras del Pokemon(caracteristicas)
    const tarjetaCaracteristicasPokemon = document.createElement('div');
    tarjetaCaracteristicasPokemon.setAttribute('id', 'tarjeta-caracteristicas-pokemon');
    const etiquetaNombrePokemon = document.createElement('h2');
    const nombrePokemonAtras = document.createTextNode(poke.name);
    etiquetaNombrePokemon.appendChild(nombrePokemonAtras);
    tarjetaCaracteristicasPokemon.appendChild(etiquetaNombrePokemon);
    const parrafoCaracteristicasPokemon = document.createElement('p');
    const arrayCaracteristicas = [`Tipo: ${poke.type}`, `Peso: ${poke.weight}`, `Tamaño: ${poke.height}`, `Debilidades: ${poke.weaknesses}`];
    for (let a = 0; a < arrayCaracteristicas.length; a += 1) {
      const saltoLinea = document.createElement('br');
      const caracteristica = document.createTextNode(arrayCaracteristicas[a]);
      parrafoCaracteristicasPokemon.appendChild(saltoLinea);
      parrafoCaracteristicasPokemon.appendChild(caracteristica);
    }
    tarjetaCaracteristicasPokemon.appendChild(parrafoCaracteristicasPokemon);
    tarjetaPrincipalPokemon.appendChild(tarjetaDatosPokemon);
    tarjetaPrincipalPokemon.appendChild(tarjetaCaracteristicasPokemon);
    caja.appendChild(tarjetaPrincipalPokemon);
    const contenedorPokemon = document.querySelector('#contenedor-pokemon');
    contenedorPokemon.appendChild(caja);
  });
  return datosPokemon;
};

datosPokemon(POKEMON);
