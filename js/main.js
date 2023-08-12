//JavaScript//

const alimentos=[
  //Alimentos
  {
      id:"waffle-sencillo",
      nombre:"Waffle sencillo",
      imagen:"../img/1waffle.jpg",
      precio: 50
  },
  {
      id:"waffle-con-helado",
      nombre:"Waffle con helado",
      imagen:"../img/2wafflehelado.jpg",
      precio: 60
  },
  {
      id:"papas-gajo",
      nombre:"Papas gajo",
      imagen:"../img/3papasgajo.jpg",
      precio: 45
  },
  {
      id:"papas-francesa",
      nombre:"Papas a la francesa",
      imagen:"../img/4papasfrancesa.jpg",
      precio: 40
  },
  {
      id:"palomitas-pollo",
      nombre:"Palomitas de pollo",
      imagen:"../img/5palomitaspollo.jpg",
      precio: 45
  },
  {
      id:"mini-waffles",
      nombre:"Mini waffles",
      imagen:"../img/6miniwaffles.jpg",
      precio: 36
  }
];

const contenedorAlimentos = document.querySelector("#contenedor-alimentos");
let botonesAgregar = document.querySelectorAll(".alimento-agregar");
const numero = document.querySelector("#numero");

function cargarAlimentos(){
  alimentos.forEach(alimento => {
      const div = document.createElement("div");
      div.classList.add("alimento");
      div.innerHTML = `
      <img class="alimento-imagen" src="${alimento.imagen}" alt="${alimento.nombre}">
      <div class="alimento-detalles">
          <h3 class="alimento-nombre">${alimento.nombre}</h3>
          <h5 class="alimento-precio">$${alimento.precio}</h5>
          <button type="button" class="btn btn-warning alimento-agregar" id="${alimento.id}" >Agregar</button> 
      </div>
      `;
      contenedorAlimentos.append(div);
  })

  actualizarBotonesAgregar();
}

cargarAlimentos();

function actualizarBotonesAgregar(){
  botonesAgregar = document.querySelectorAll(".alimento-agregar");
  botonesAgregar.forEach(boton => {
      boton.addEventListener("click", agregarAlCarrito);
  });
}

let alimentosEnCarrito;
let alimentosEnCarritoLS = localStorage.getItem("alimentos-en-carrito");

if (alimentosEnCarritoLS) {
  alimentosEnCarrito = JSON.parse(alimentosEnCarritoLS);
  actualizarNumero();
} else {
  alimentosEnCarrito = [];
}

function agregarAlCarrito(e){
  const idBoton = e.currentTarget.id;
  const alimentoAgregado = alimentos.find(alimento => alimento.id === idBoton);

  if(alimentosEnCarrito.some(alimento => alimento.id === idBoton)) {
      const index = alimentosEnCarrito.findIndex(alimento => alimento.id === idBoton);
      alimentosEnCarrito[index].cantidad++;
  } else {
      alimentoAgregado.cantidad =1;
      alimentosEnCarrito.push(alimentoAgregado);
  }
  actualizarNumero();
  localStorage.setItem("alimentos-en-carrito", JSON.stringify(alimentosEnCarrito));
}

function actualizarNumero() {
  let nuevoNumero = alimentosEnCarrito.reduce((acc, alimento) => acc + alimento.cantidad, 0);
  numero.innerText = nuevoNumero; 
}