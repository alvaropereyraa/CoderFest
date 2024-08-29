const precios = [50, 75, 100, 350, 500];
const entradas = ["Trainee", "Junior", "Senior", "Manager", "CEO"];
let terminos = confirm(
    "¿Estas de acuerdo con nuestros terminos y condiciones?"
  );
let trainee = precios[0];
let junior = precios[1];
let senior = precios[2];
let manager = precios[3];
let ceo = precios[4];
let nombre = "";
let numero = 0;
function datosUsuario() {
  nombre = prompt("Ingresa tu nombre");
  numero = prompt("Ingresa tu numero de telefono");
}
datosUsuario();
for (let i = 0; i < entradas.length; i++) {
  console.log(nombre[0].toUpperCase() + nombre.substring(1) + " el precio de la entrada " + entradas[i] + " es " + precios[i] + ".");
}
function elegirEntrada(eleccion) {
    function talleCamiseta() {
        return prompt('¿Que talle de camiseta prefieres? (S, M, L, XL, XXL)')
    }
    let talle; 
  switch (eleccion) {
    case trainee:
      console.log(
        'Gracias por elegir la entrada Trainee. Bienvenido a CoderFest. Te contactaremos al ' + numero);
      break;
    case junior:
      console.log(
        'Gracias por elegir la entrada Junior. Bienvenido a CoderFest. Te contactaremos al ' + numero );
      break;
    case senior:
        talle =  talleCamiseta();
      console.log('Gracias por elegir la entrada Senior. Bienvenido a CoderFest. Te contactaremos al ' + numero + ' y te enviaremos la camiseta talle ' + talle + '.');
      break;
    case manager:
        talle = talleCamiseta();
      console.log('Gracias por elegir la entrada Manager. Bienvenido a CoderFest. Te contactaremos al ' + numero + ' y te enviaremos la camiseta talle ' + talle + '.');
      break;
    case ceo:
        talle = talleCamiseta();
      console.log('Gracias por elegir la entrada CEO. Bienvenido a CoderFest. Te contactaremos al ' + numero + ' y te enviaremos la camiseta talle ' + talle + '.');
      break;
    default:
      console.log('Debes elegir una de las entradas disponibles.');
      break;
  }
}