const entradas = [
  {
    id: 1,
    nombre: "Trainee",
    beneficios: "Acceso general",
    precio: 50,
  },
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
    beneficios:  "Acceso VIP + 2 bedidas gratis + Camiseta CoderFest",
    precio: 350,
  },
  {
    id: 5,
    nombre: "CEO",
    beneficios: "Acceso VIP + Bebidas ilimitadas + Camiseta CoderFest + Meet & Greet con artistas invitados",
    precio: 500, 
  }
]
localStorage.setItem("entradas", JSON.stringify(entradas));

const contenedorEntradas = document.getElementById("entrada-container")

let carro = 0;
let cantidadEntradas = {};

function actualizarCarro() {
  console.log(`Carro de compras precio total: $${carro}`);
  localStorage.setItem("carro", carro);
  localStorage.setItem("cantidadEntradas", JSON.stringify(cantidadEntradas));
}

function crearEntrada(entradas) {
  entradas.forEach(entrada => {
    const nuevaEntrada = document.createElement("div");
    nuevaEntrada.classList = "entrada-producto"; 
    nuevaEntrada.innerHTML = `
    <img src="./img/${entrada.id}.jpg">
    <h2> ${entrada.nombre}</h2>
    <p> ${entrada.beneficios}</p>
    <span>$ ${entrada.precio}</span>
    <button class="btn-comprar">Comprar</button>
    <button class="btn-eliminar">Eliminar</button>
    `
    nuevaEntrada.querySelector(".btn-comprar").addEventListener("click", () => {
      carro += entrada.precio;
      cantidadEntradas[entrada.id] = (cantidadEntradas[entrada.id] || 0) + 1;
      console.log(`Fue añadida una entrada ${entrada.nombre}`);
      actualizarCarro();
    })
    nuevaEntrada.querySelector(".btn-eliminar").addEventListener("click", () => {
      if(cantidadEntradas[entrada.id] > 0) {
        carro -= entrada.precio;
        cantidadEntradas[entrada.id] -= 1;
        console.log(`Fue eliminada una entrada ${entrada.nombre}`);

        if(cantidadEntradas[entrada.id] === 0) {
          delete cantidadEntradas[entrada.id];
        }
       actualizarCarro();
      } else {
        console.log(`No hay entradas ${entrada.nombre} para eliminar`);
      }
    })
    contenedorEntradas.appendChild(nuevaEntrada);
    })
  };

crearEntrada(entradas);






