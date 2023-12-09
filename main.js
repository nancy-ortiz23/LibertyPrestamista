// Bienvenidos/Liberty Prestamista 
let nombre = prompt("Ingrese su nombre");
alert("Bienvenido/a a Liberty Prestamista : " + nombre);

let monto = Number(prompt("Ingrese el monto a financiar: "));

if (monto <= 1000) {
    alert("No se puede financiar en cuotas para montos menores o iguales a $1000");
} else {
    let tasaInteres = 0.1; // Tasa de interés del 10% (ajusta según tus necesidades)
    let resultado3 = calcularCuota(monto, 3, tasaInteres);
    let resultado6 = calcularCuota(monto, 6, tasaInteres);
    let resultado12 = calcularCuota(monto, 12, tasaInteres);

    // Opciones de cuotas
    alert("Opciones de cuotas:\n\n" +
        "3 cuotas de $" + resultado3.toFixed(2) + "\n" +
        "6 cuotas de $" + resultado6.toFixed(2) + "\n" +
        "12 cuotas de $" + resultado12.toFixed(2));

    // Cantidad de cuotas deseadas
    let cuotasElegidas = Number(prompt("Ingrese la cantidad de cuotas deseadas (3, 6, o 12):"));

    // Monto total a pagar
    let montoTotal;

    while (true) {
        switch (cuotasElegidas) {
            case 3:
                montoTotal = resultado3 * cuotasElegidas;
                break;
            case 6:
            case 12:
                let factor = cuotasElegidas === 6 ? resultado6 : resultado12;
                montoTotal = factor * cuotasElegidas;
                break;
            default:
                alert("Cantidad de cuotas no válida. El programa finalizará.");
                //Agregue una condición de salida del bucle si la cantidad de cuotas no es válida
                break;
        }

        //agregue una condición de salida del bucle si la cantidad de cuotas es válida
        if (cuotasElegidas === 3 || cuotasElegidas === 6 || cuotasElegidas === 12) {
            break;
        }
    }

    if (montoTotal) {
        alert("El monto total a pagar (incluyendo intereses) es: $" + montoTotal.toFixed(2));
    }
}

// Interaccion con el prestamo
let deseaSeguro = confirm("¿Quieres solicitar el prestamo simulado?");

if (deseaSeguro) {
    let telefono = Number(prompt("Ingrese su numero de telefono:"));
    alert("Gracias por contratar nuestro seguro de vivienda. Le contactaremos para más detalles.");
} else {
    alert("Gracias por utilizar Liberty Prestamista. ¡Hasta luego!");
}

// Función para calcular la cuota con interés
function calcularCuota(monto, cuotas, tasaInteres) {
    let interes = monto * tasaInteres;
    return (monto + interes) / cuotas;
}