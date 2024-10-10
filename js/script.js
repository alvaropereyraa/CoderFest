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
      try {
        if (entrada.id === 4) {
          throw new Error("No se puede comprar la entrada Manager");
        }

        const productoEnCarrito = carrito.find(
          (producto) => producto.id === entrada.id
        );
        if (productoEnCarrito) {
          productoEnCarrito.cantidad++;
        } else {
          carrito.push({ ...entrada, cantidad: 1 });
        }
        renderizarCarrito();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      }
    });
    entradaContainer.appendChild(nuevaEntrada);
  });
}

fetch("./js/entradas.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    return response.json();
  })
  .then((informacion) => {
    crearEntrada(informacion);
  });

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
    carritoContainer.innerHTML = "<p>Carrito vacío</p>";
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
  actualizarVisibilidadTotalCarrito();
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
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Se borrara todo el contenido del carro.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, vaciar carro.',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = [];
      renderizarCarrito();
      Swal.fire(
        '¡Vaciado!',
        'El carrito ha sido vaciado.',
        'success'
      );
    }
  });
});

document.getElementById("finalizar-compra").addEventListener("click", () => {
  document.getElementById("formulario-compra").style.display = "block";
});
function actualizarVisibilidadTotalCarrito() {
  const totalCarrito = document.getElementById("total-carrito");
  if (carrito.length === 0) {
    totalCarrito.style.display = "none";
  } else {
    totalCarrito.style.display = "block";
  }
}

document
  .getElementById("formulario-compra")
  .addEventListener("submit", function (evento) {
    evento.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("direccion").value;
  });

document.getElementById("carrito-imagen").addEventListener("click", () => {
  const carritoContenido = document.getElementById("carrito-contenido");
  carritoContenido.classList.toggle("oculto");
});

cargarCarrito();

document
  .getElementById("formulario-compra")
  .addEventListener("submit", function (evento) {
    evento.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const pais = document.getElementById("pais").value;
    const ciudad = document.getElementById("ciudad").value;
    const direccion = document.getElementById("direccion").value;

    Swal.fire({
      icon: "success",
      title: "Compra finalizada",
      text: "Gracias por tu compra!",
    }).then(() => {
      carrito = [];
      renderizarCarrito();
    });

    modal.style.display = "none";
  });

const modal = document.getElementById("modal");
const btnFinalizarCompra = document.getElementById("finalizar-compra");
const spanCerrar = document.getElementsByClassName("cerrar")[0];

btnFinalizarCompra.onclick = function () {
  modal.style.display = "block";
};

spanCerrar.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
