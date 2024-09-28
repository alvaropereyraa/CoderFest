const entradas = [
  { id: 1, nombre: "Trainee", beneficios: "Acceso general", precio: 50 },
  {
    id: 2,
    nombre: "Junior",
    beneficios: "Acceso general + 1 bebida gratis",
    precio: 100,
  },
  {
    id: 3,
    nombre: "Senior",
    beneficios: "Acceso general + 2 bebidas gratis + Camiseta CoderFest",
    precio: 150,
  },
  {
    id: 4,
    nombre: "Manager",
    beneficios: "Acceso VIP + 2 bebidas gratis + Camiseta CoderFest",
    precio: 350,
  },
  {
    id: 5,
    nombre: "CEO",
    beneficios:
      "Acceso VIP + Bebidas ilimitadas + Camiseta CoderFest + Meet & Greet con artistas invitados",
    precio: 500,
  },
];

let carrito = [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    renderizarCarrito();
  }
}

function renderizarCarrito() {
  const carritoContainer = document.getElementById("carrito");
  carritoContainer.innerHTML = "";
  if (carrito.length === 0) {
    carritoContainer.innerHTML = '<p>Carrito vacío</p>';
  } else {
    carrito.forEach((producto, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
              <span class="producto-nombre">${producto.nombre} - ${producto.cantidad}</span>
              <div class="botones">
                  <button class="btn-sumar" onclick="incrementarCantidad(${index})">+</button>
                  <button class="btn-restar" onclick="disminuirCantidad(${index})">-</button>
                  <button class="btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
              </div>
          `;
      carritoContainer.appendChild(li);
    });
  }
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

function eliminarProducto(index) {
  carrito.splice(index, 1);
  renderizarCarrito();
}

function actualizarTotal() {
  const total = carrito.reduce(
    (sum, producto) => sum + producto.precio * producto.cantidad,
    0
  );
  document.getElementById("total-carrito").textContent = `Total: $${total}`;
}

document.getElementById("vaciar-carrito").addEventListener("click", () => {
  carrito = [];
  renderizarCarrito();
});
document.getElementById("finalizar-compra").addEventListener("click", () => {
  document.getElementById("formulario-compra").style.display = "block";
});

document.getElementById('formulario-compra').addEventListener('submit', function(evento) {
    evento.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    mostrarResumen(nombre, direccion);
});

function mostrarResumen(nombre, direccion) {
    document.querySelector('.resumen').innerHTML = `
        <h2>Resumen de compra</h2>
        <p>Nombre: ${nombre}</p>
        <p>Dirección: ${direccion}</p>
    `;
}


document.getElementById("carrito-imagen").addEventListener("click", () => {
  const carritoContenido = document.getElementById("carrito-contenido");
  carritoContenido.classList.toggle("oculto");
});

cargarCarrito();

function crearEntrada(entradas) {
  const entradaContainer = document.getElementById("entrada-container");
  entradas.forEach((entrada) => {
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
      const productoEnCarrito = carrito.find(
        (producto) => producto.id === entrada.id
      );
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

crearEntrada(entradas);

document.getElementById('formulario-compra').addEventListener('submit', function(evento) {
  evento.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const pais = document.getElementById('pais').value;
  const ciudad = document.getElementById('ciudad').value;
  const direccion = document.getElementById('direccion').value;
  mostrarResumen(nombre, apellido, pais, ciudad, direccion);
  modal.style.display = "none"; 
});

function mostrarResumen(nombre, apellido, pais, ciudad, direccion) {
  document.querySelector('.resumen').innerHTML = `
      <h2>Resumen de compra</h2>
      <p>Nombre: ${nombre}</p>
      <p>Apellido: ${apellido}</p>
      <p>País: ${pais}</p>
      <p>Ciudad: ${ciudad}</p>
      <p>Dirección: ${direccion}</p>
  `;
}

const modal = document.getElementById("modal");
const btnFinalizarCompra = document.getElementById("finalizar-compra");
const spanCerrar = document.getElementsByClassName("cerrar")[0];

btnFinalizarCompra.onclick = function() {
modal.style.display = "block";
}

spanCerrar.onclick = function() {
modal.style.display = "none";
}

window.onclick = function(event) {
if (event.target == modal) {
  modal.style.display = "none";
}
}