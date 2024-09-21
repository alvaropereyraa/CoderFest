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
const contenedorEntradas = document.getElementById("entrada-container")

function crearEntrada(entradas) {
  entradas.forEach(entrada => {
    const nuevaEntrada = document.createElement("div");
    nuevaEntrada.classList = "entrada-producto"; 
    nuevaEntrada.innerHTML = `
    <img src="./img/${entrada.id}.jpg">
    <h2> ${entrada.nombre}</h2>
    <p> ${entrada.beneficios}</p>
    <span>$ ${entrada.precio}</span>
    <button>Comprar</button>
    `
    contenedorEntradas.appendChild(nuevaEntrada);
    contenedorEntradas.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(entrada))
    })
  };

crearEntrada(entradas)
let terminos = confirm(
  "¿Estas de acuerdo con nuestros terminos y condiciones?"
);
let nombre = "";
let numero = 0;
function datosUsuario() {
  nombre = prompt("Ingresa tu nombre");
  numero = prompt("Ingresa tu numero de telefono");
}
datosUsuario();
for (let i = 0; i < entradas.length; i++) {
  console.log(
    nombre[0].toUpperCase() +
      nombre.substring(1) +
      " el precio de la entrada " +
      entradas[i].nombre +
      " es " +
      entradas[i].precio +
      "."
  );
}
function elegirEntrada(eleccion) {
  function talleCamiseta() {
    return prompt("¿Que talle de camiseta prefieres? (S, M, L, XL, XXL)");
  }
  let talle;
  switch (eleccion) {
    case Trainee:
      console.log(
        `Gracias por elegir la entrada Trainee. Bienvenido a CoderFest. Te contactaremos al ${numero}`);
      break;
    case Junior:
      console.log(
        `Gracias por elegir la entrada Junior. Bienvenido a CoderFest. Te contactaremos al ${numero}`);
      break;
    case Senior:
      talle = talleCamiseta();
      console.log(
        `Gracias por elegir la entrada Senior. Bienvenido a CoderFest. Te contactaremos al ${numero} y te enviaremos la camiseta talle ${talle}.`);
      break;
    case Manager:
      talle = talleCamiseta();
      console.log(
        `Gracias por elegir la entrada Manager. Bienvenido a CoderFest. Te contactaremos al ${numero} y te enviaremos la camiseta talle ${talle}.`
      );
      break;
    case CEO:
      talle = talleCamiseta();
      console.log(
        `Gracias por elegir la entrada CEO. Bienvenido a CoderFest. Te contactaremos al ${numero} y te enviaremos la camiseta talle ${talle}.`);
      break;
    default:
      console.log("Debes elegir una de las entradas disponibles.");
      break;
  }
}
