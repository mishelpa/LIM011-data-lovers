
/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import POKEMON from './data/pokemon/pokemon.js';
import { filtData, sortData, topDesc, top, filtEgg, searchData, sortDataDesc } from './data.js';

const container = document.querySelector('.container-poke');
const filterOption = document.querySelector('.filter-option');
const divTop = document.querySelector('.div-top');
const message = document.querySelector('.message');
const sortOption = document.querySelector('.sort-option');


// OCULTAR ELEMENTOS
filterOption.classList.add('hide');
document.querySelector('.div-top').classList.add('hide');

// MOSTRAR LOS 151 POKEMON
const showData = (arr) => {
  arr.forEach((obj) => {
    // Creando tarjeta principal
    const mainCard = document.createElement('div');
    mainCard.classList.add('main-card');
    mainCard.innerHTML = `
    <img src = ${obj.img}>
    <div id = "nombre-Pokemon">${obj.name}</div>
    <h4>${obj.num}</h4>
    `;
    container.appendChild(mainCard);

    // EVENTO CLICK PARA CADA POKEMON
    mainCard.addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.innerHTML = `
      <div class = "flex">
        <div class = modal-card> 
          <span class="close" id="close">&times;</span>
          <div class = modal-poke>
            <img class = "img-poke" src = ${obj.img}>
          </div>
          <div class = "modal-body">
            <h4>${obj.name}</h4><br>
            <div><h3>${obj.type}</h3>
            <div class = "mb-first">
              <div>
                <p><b>${obj.weight}</b></p>
                <span>PESO</span>
              </div> 
              <div>
                <p><b>${obj.weaknesses}</b></p>
                <span>DEBILIDADES</span>
              </div> 
              <div>
                <p><b>${obj.height}</b></p>
                <span>TAMAÑO</span>
              </div> 
            </div>
            <div class = "mb-second">
            <div>
              <p><b>${obj.avg_spawns} de 10000</b></p>
              <span># APARICION</span>
            </div> 
            <div>
              <p><b>${obj.spawn_time}</b></p>
              <span>HORA DE APARICION</span>
            </div> 
            <div>
              <p><b>${obj.egg}</b></p>
              <span>KM HUEVO</span>
            </div> 
          </div>
          </div>
          </div>
          <div class = "modal-evolution">
        </div>
      </div>
      `;
      document.body.appendChild(modal);
      // CREANDO LAS EVOLUCIONES DE CADA POKEMON

      const evolucion = filtData(POKEMON, 'candy', obj.candy);
      if (obj.candy !== 'None') {
        for (let i = 0; i < evolucion.length; i += 1) {
          const divEvolucion = document.createElement('div');
          divEvolucion.classList.add('div-evolucion');
          divEvolucion.innerHTML = `
          <img class= "img-evolucion" src="${evolucion[i].img}">
          <p>${evolucion[i].name}</p>
          `;
          document.querySelector('.modal-evolution').appendChild(divEvolucion);
        }
      }

      // SALIR DEL MODAL
      document.getElementById('close').addEventListener('click', () => {
        document.body.removeChild(modal);
      });
    });
  });
  return showData;
};

showData(POKEMON);
document.querySelector('.paint-canvas-spawn').innerHTML = '';
document.querySelector('.menu-options').classList.add('hide');

// Crear la barra de navegación
document.querySelector('#resumen').addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('active');
});

// POKEBOLA sección donde se muestra los 151 pokemon
document.querySelector('#menu-pokeball').addEventListener('click', () => {
  container.innerHTML = '';
  message.innerHTML = '';
  filterOption.classList.add('hide');
  divTop.classList.add('hide');
  sortOption.classList.remove('hide');
  document.querySelector('.menu-option').reset();
  showData(POKEMON);
  document.querySelector('.paint-canvas-spawn').innerHTML = '';
  document.querySelector('.menu-options').classList.add('hide');
});

// Opcion ordenar.
document.querySelector('#AZ').addEventListener('click', () => {
  container.innerHTML = '';
  showData(sortData(POKEMON, 'name', 'asc'));
});

document.querySelector('#ZA').addEventListener('click', () => {
  container.innerHTML = '';
  showData(sortDataDesc(POKEMON, 'name'));
});

document.querySelector('#asc').addEventListener('click', () => {
  container.innerHTML = '';
  showData(sortData(POKEMON, 'id'));
});

document.querySelector('#desc').addEventListener('click', () => {
  container.innerHTML = '';
  showData(sortDataDesc(POKEMON, 'id'));
});

// Opcion filtro
document.querySelector('#menu-filter').addEventListener('click', () => {
  container.innerHTML = '';
  filterOption.classList.remove('hide');
  sortOption.classList.add('hide');
  divTop.classList.add('hide');
  showData(POKEMON);
  document.querySelector('.paint-canvas-spawn').innerHTML = '';
  document.querySelector('.menu-options').classList.add('hide');
});

document.querySelector('#filter-type').addEventListener('change', () => {
  container.innerHTML = '';
  const typePoke = document.querySelector('#filter-type').value;
  showData(filtData(POKEMON, 'type', typePoke));
  message.innerHTML = `Hay ${filtData(POKEMON, 'type', typePoke).length} pokemon tipo ${typePoke} y son:`;
});

document.querySelector('#filter-weak').addEventListener('change', () => {
  container.innerHTML = '';
  const weakPoke = document.querySelector('#filter-weak').value;
  showData(filtData(POKEMON, 'weaknesses', weakPoke));
  // message.innerHTML = `Hay ${filtData(filtData(POKEMON, 'type', typePoke), 'weaknesses', weakPoke).length} pokemon ${typePoke} con debilidad ${weakPoke} son:`;
  message.innerHTML = `Hay ${filtData(POKEMON, 'weaknesses', weakPoke).length} pokemon con debilidad ${weakPoke} son:`;
});

document.querySelector('#filt-km').addEventListener('change', () => {
  container.innerHTML = '';
  const kmPoke = document.querySelector('#filt-km').value;
  showData(filtEgg(POKEMON, kmPoke));
  message.innerHTML = `Los pokemon con distancia huevo de ${kmPoke} son:`;
});

const paintCanvas = (pokemon, number) => {
  const paintCanvasSpawn = document.querySelector('.paint-canvas-spawn');
  const sectionPie = document.createElement('div');
  sectionPie.classList.add('section-pie');
  const sectionCanvas = document.createElement('canvas');
  sectionPie.appendChild(sectionCanvas);
  paintCanvasSpawn.appendChild(sectionPie);
  const ctx = sectionCanvas.getContext('2d');
  const pokeName = [];
  const pokeSpawns = [];
  for (let i = 0; i < number; i += 1) {
    pokeName.push(pokemon[i].name);
    pokeSpawns.push(pokemon[i].spawn_chance);
  }
  // eslint-disable-next-line no-undef
  const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: pokeName,
      datasets: [{
        label: 'My First dataset',
        backgroundColor: ['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B', '#E377C2', '#7F7F7F', '#BCBD22', '#17BECF'],
        borderColor: ['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B', '#E377C2', '#7F7F7F', '#BCBD22', '#17BECF'],
        data: pokeSpawns,
      }],
    },
    options: {
      legend: {
        position: 'right',
        align: 'center',
      },
    },
  });
  chart.render();
};
// TOP 10 seccion donde se muestra los pokemon con mayor aparicion
document.querySelector('#menu-top').addEventListener('click', () => {
  container.innerHTML = '';
  message.innerHTML = '';
  filterOption.classList.add('hide');
  sortOption.classList.add('hide');
  divTop.classList.remove('hide');
  document.querySelector('.menu-option').reset();
  document.querySelector('.paint-canvas-spawn').innerHTML = '';
  paintCanvas(topDesc(POKEMON, 10), 10);
  showData(topDesc(POKEMON, 10));
  document.querySelector('.menu-options').classList.remove('hide');
});

document.querySelector('#mas-vistos').addEventListener('click', () => {
  container.innerHTML = '';
  document.querySelector('.input-top').addEventListener('change', (event) => {
    container.innerHTML = '';
    const valueRadio = event.target.value;
    document.querySelector('.paint-canvas-spawn').innerHTML = '';
    paintCanvas(topDesc(POKEMON, 10), valueRadio);
    showData(topDesc(POKEMON, valueRadio));
  });
});

document.querySelector('#menos-vistos').addEventListener('click', () => {
  container.innerHTML = '';
  document.querySelector('.input-top').addEventListener('change', (event) => {
    container.innerHTML = '';
    const valueRadio = event.target.value;
    document.querySelector('.paint-canvas-spawn').innerHTML = '';
    paintCanvas(top(POKEMON, 10), valueRadio);
    showData(top(POKEMON, valueRadio));
  });
});

// BUSCADOR se busca el pokemon por el nombre.
document.querySelector('#search-poke').addEventListener('input', () => {
  container.innerHTML = '';
  showData(searchData(POKEMON, document.querySelector('#search-poke').value));
});
