let terminos = confirm("¿Estas de acuerdo con nuestros terminos y condiciones?");
const precios = [50, 75, 100, 350, 500];
const entradas =['Trainee', 'Junior', 'Senior','Manager','CEO'];
let trainee = precios[0];
let junior = precios[1];
let senior = precios[2];
let manager = precios[3];
let ceo = precios[4];

for (let i=0; i < entradas.length; i++) {
    console.log('El precio de la entrada ' + entradas[i] + ' es ' + precios[i])
}
function mostrarPrecio() {
  let Eleccion = prompt(
    "Elige un tipo de entradas: trainee, junior, senior, manager o ceo");
  switch (Eleccion) {
    case "trainee":
      alert(
        "Gracias por elegir la entrada Trainee. El precio total es " + trainee);
      break;
    case "junior":
      alert(
        "Gracias por elegir la entrada Junior. El precio total es " + junior);
      break;
    case "senior":
      alert(
        "Gracias por elegir la entrada Senior. El precio total es " + senior);
      break;
    case "manager":
      alert(
        "Gracias por elegir la entrada Manager. El precio total es " + manager);
        break;
    case "ceo":
      alert("Gracias por elegir la entrada CEO. El precio total es " + ceo);
      break;
    default:
      alert("Debes elegir una de las entradas disponibles.");
      break;
  }
}
mostrarPrecio();
