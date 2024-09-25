const entradas = [
  { id: 1, nombre: "Trainee", beneficios: "Acceso general", precio: 50 },
  { id: 2, nombre: "Junior", beneficios: "Acceso general + 1 bebida gratis", precio: 100 },
  { id: 3, nombre: "Senior", beneficios: "Acceso general + 2 bebidas gratis + Camiseta CoderFest", precio: 150 },
  { id: 4, nombre: "Manager", beneficios: "Acceso VIP + 2 bebidas gratis + Camiseta CoderFest", precio: 350 },
  { id: 5, nombre: "CEO", beneficios: "Acceso VIP + Bebidas ilimitadas + Camiseta CoderFest + Meet & Greet con artistas invitados", precio: 500 }
];

let carrito = [];

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        renderizarCarrito();
    }
}

function renderizarCarrito() {
    const carritoContainer = document.getElementById('carrito');
    carritoContainer.innerHTML = '';
    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="producto-nombre">${producto.nombre} - ${producto.cantidad}</span>
            <div class="botones">
                <button class="btn-sumar" onclick="incrementarCantidad(${index})">+</button>
                <button class="btn-restar" onclick="disminuirCantidad(${index})">-</button>
            </div>
        `;
        carritoContainer.appendChild(li);
    });
    actualizarTotal();
    guardarCarrito();
}

function incrementarCantidad(index) {
    carrito[index].cantidad++;
    renderizarCarrito();
}

function disminuirCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    } else {
        carrito.splice(index, 1);
    }
    renderizarCarrito();
}

function actualizarTotal() {
    const total = carrito.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);
    document.getElementById('total-carrito').textContent = `Total: $${total}`;
}

document.getElementById('vaciar-carrito').addEventListener('click', () => {
    carrito = [];
    renderizarCarrito();
});

document.getElementById('finalizar-compra').addEventListener('click', () => {
    alert('Compra finalizada');
});

document.getElementById('carrito-imagen').addEventListener('click', () => {
    const carritoContenido = document.getElementById('carrito-contenido');
    carritoContenido.classList.toggle('oculto');
});

document.addEventListener('DOMContentLoaded', cargarCarrito);

function crearEntrada(entradas) {
  const entradaContainer = document.getElementById('entrada-container');
  entradas.forEach(entrada => {
    const nuevaEntrada = document.createElement("div");
    nuevaEntrada.classList = "entrada-producto"; 
    nuevaEntrada.innerHTML = `
      <img src="./img/${entrada.id}.jpg">
      <h2>${entrada.nombre}</h2>
      <p>${entrada.beneficios}</p>
      <span>$${entrada.precio}</span>
      <button class="btn-comprar">Comprar</button>
    `;
    nuevaEntrada.querySelector(".btn-comprar").addEventListener("click", () => {
      const productoEnCarrito = carrito.find(producto => producto.id === entrada.id);
      if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
      } else {
        carrito.push({ ...entrada, cantidad: 1 });
      }
      renderizarCarrito();
    });
    entradaContainer.appendChild(nuevaEntrada);
  });
}

document.addEventListener('DOMContentLoaded', () => crearEntrada(entradas));
