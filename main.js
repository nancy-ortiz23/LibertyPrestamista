// Función para solicitar un número al usuario y manejar errores
function solicitarNumero(mensaje) {
    let numero;
    while (true) {
        numero = Number(prompt(mensaje));
        if (!isNaN(numero)) {
            break; // Sale del bucle si el usuario ingresa un número válido
        } else {
            alert("Por favor, ingrese un número válido.");
        }
    }
    return numero;
}

// Función para calcular la cuota con interés
function calcularCuota(monto, cuotas, tasaInteres) {
    let interes = monto * tasaInteres;
    return (monto + interes) / cuotas;
}

// Array de préstamos
const prestamosArray = [];

// Función para agregar un préstamo al array
function agregarPrestamo(monto, cuotas, tasaInteres) {
    const prestamo = {
        monto: monto,
        cuotas: cuotas,
        tasaInteres: tasaInteres,
        montoTotal: null
    };

    // Calcular monto total a pagar
    prestamo.montoTotal = calcularCuota(monto, cuotas, tasaInteres) * cuotas;

    // Agregar el préstamo al array
    prestamosArray.push(prestamo);

    return prestamo;
}

// Bienvenidos/Liberty Prestamista
let nombre = prompt("Ingrese su nombre");
alert("Bienvenido/a a Liberty Prestamista: " + nombre);

// Solicitar información del préstamo
const monto = solicitarNumero("Ingrese el monto a financiar:");

if (monto <= 1000) {
    alert("No se puede financiar en cuotas para montos menores o iguales a $1000");
} else {
    const tasaInteres = 0.1; // Tasa de interés del 10% (ajusta según tus necesidades)
    const cuotasDisponibles = [3, 6, 12];

    // Opciones de cuotas
    alert("Opciones de cuotas:\n\n" +
        cuotasDisponibles.map(cuota => `${cuota} cuotas de $${calcularCuota(monto, cuota, tasaInteres).toFixed(2)}`).join("\n"));

    // Cantidad de cuotas deseadas
    const cuotas = solicitarNumero("Ingrese la cantidad de cuotas deseadas (3, 6, o 12):");

    // Verificar si la cantidad de cuotas es válida
    if (!cuotasDisponibles.includes(cuotas)) {
        alert("Cantidad de cuotas no válida. Por favor, ingrese 3, 6 o 12.");
    } else {
        // Agregar el préstamo al array
        const nuevoPrestamo = agregarPrestamo(monto, cuotas, tasaInteres);

        // Mostrar el monto total a pagar
        alert(`El monto total a pagar (incluyendo intereses) es: $${nuevoPrestamo.montoTotal.toFixed(2)}`);
    }
}

// Interacción con el préstamo
let deseaSeguro = confirm("¿Quieres solicitar el préstamo simulado?");

// Objeto para almacenar información de la persona
const persona = {
    nombre: nombre,
    edad: null,
    direccion: null,
    telefono: null
};

// Solicitar información adicional de la persona
persona.edad = solicitarNumero("Ingrese su edad:");
persona.direccion = prompt("Ingrese su dirección:");
persona.telefono = solicitarNumero("Ingrese su número de teléfono:");

console.log("Información de la persona:", persona);

// Imprimir información de todos los préstamos en la consola
console.log("Información de todos los préstamos:", prestamosArray);

// Buscar un préstamo por monto utilizando find
const montoBuscado = 5000; // Puedes ajustar este valor según tus necesidades
const prestamoEncontrado = prestamosArray.find(prestamo => prestamo.monto === montoBuscado);

if (prestamoEncontrado) {
    console.log(`Préstamo encontrado con un monto de $${montoBuscado}:`, prestamoEncontrado);
} else {
    console.log(`No se encontró ningún préstamo con un monto de $${montoBuscado}.`);
}

if (deseaSeguro) {
    alert("Gracias por contratar nuestro seguro de vivienda. Le contactaremos para más detalles.");
} else {
    alert("Gracias por utilizar Liberty Prestamista. ¡Hasta luego!");
}