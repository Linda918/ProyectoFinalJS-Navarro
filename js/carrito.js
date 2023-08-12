//Carrito

let alimentosEnCarrito = localStorage.getItem("alimentos-en-carrito");
alimentosEnCarrito = JSON.parse(alimentosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoAlimentos = document.querySelector("#carrito-alimentos");
const contenedorCarritoOpciones = document.querySelector("#carrito-opciones");
const contenedorCarritoGracias = document.querySelector("#carrito-gracias");
let botonEliminar = document.querySelectorAll(".carrito-eliminar");
const botonVaciar = document.querySelector("#carrito-opciones-vaciar");
const cuentaTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-opciones-comprar");

function agregarAlimentosCarrito(){
    if(alimentosEnCarrito && alimentosEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoAlimentos.classList.remove("disabled");
        contenedorCarritoOpciones.classList.remove("disabled");
        contenedorCarritoGracias.classList.add("disabled");

        contenedorCarritoAlimentos.innerHTML = "";

        alimentosEnCarrito.forEach(alimento => {
        const div = document.createElement("div");
        div.classList.add("carrito-alimento"); 
        div.innerHTML = `
        <img class="carrito-imagen" src="${alimento.imagen}" alt="${alimento.nombre}">
        <div class="carrito-alimento-nombre">
            <small>Alimento</small>
            <h3>${alimento.nombre}</h3>
        </div>
        <div class="carrito-alimento-cantidad">
            <small>Cantidad</small>
            <p>${alimento.cantidad}</p>
        </div>
        <div class="carrito-alimento-precio">
            <small>Precio</small>
            <p>$${alimento.precio}</p>
        </div>
        <div class="carrito-alimento-subtotal">
            <small>Subtotal</small>
            <p>$${alimento.precio * alimento.cantidad}</p>
        </div>
        <button type="button" class="btn btn-warning carrito-eliminar" id="${alimento.id}"><i class="bi bi-cart-x-fill">Eliminar</i></button> 
        `;
        contenedorCarritoAlimentos.append(div);
        })
    
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoAlimentos.classList.add("disabled");
        contenedorCarritoOpciones.classList.add("disabled");
        contenedorCarritoGracias.classList.add("disabled");
    }
    actualizarBotonEliminar();
    compraTotal();
}

agregarAlimentosCarrito();

function actualizarBotonEliminar(){
    botonEliminar = document.querySelectorAll(".carrito-eliminar");
    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = alimentosEnCarrito.findIndex(alimento => alimento.id === idBoton);
    alimentosEnCarrito.splice(index, 1);
    agregarAlimentosCarrito();
    localStorage.setItem("alimentos-en-carrito", JSON.stringify(alimentosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    alimentosEnCarrito.length = 0;
    localStorage.setItem("alimentos-en-carrito", JSON.stringify(alimentosEnCarrito));
    agregarAlimentosCarrito();
}

function compraTotal() {
    const totalCuenta = alimentosEnCarrito.reduce((acc, alimento) => acc + (alimento.precio * alimento.cantidad), 0);
    total.innerText = `$${totalCuenta}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    alimentosEnCarrito.length = 0;
    localStorage.setItem("alimentos-en-carrito", JSON.stringify(alimentosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoAlimentos.classList.add("disabled");
    contenedorCarritoOpciones.classList.add("disabled");
    contenedorCarritoGracias.classList.remove("disabled");
}