function solicitarNumero(mensaje) {
    let numero;
    while (true) {
        numero = Number(prompt(mensaje));
        if (!isNaN(numero)) {
            break;
        }
    }
    return numero;
}

function mostrarMensaje(mensaje) {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = mensaje;
    document.body.appendChild(mensajeDiv);
}

function capturarInput(id) {
    return document.getElementById(id).value;
}

function calcularCuota(monto, cuotas, tasaInteres) {
    let interes = monto * tasaInteres;
    return (monto + interes) / cuotas;
}

const prestamosArray = [];

function agregarPrestamo(monto, cuotas, tasaInteres) {
    const prestamo = {
        monto: monto,
        cuotas: cuotas,
        tasaInteres: tasaInteres,
        montoTotal: null
    };

    prestamo.montoTotal = calcularCuota(monto, cuotas, tasaInteres) * cuotas;

    prestamosArray.push(prestamo);

    return prestamo;
}

function simularPrestamo() {
    let nombre = capturarInput("nombre");
    mostrarMensaje("Bienvenido/a a Liberty Prestamista: " + nombre);

    const monto = solicitarNumero("Ingrese el monto a financiar:");
    

    if (monto <= 1000) {
        mostrarMensaje("No se puede financiar en cuotas para montos menores o iguales a $1000");
    } else {
        const tasaInteres = 0.1; // Tasa de interés del 10% (ajusta según tus necesidades)
        const cuotasDisponibles = [3, 6, 12];

        mostrarMensaje("Opciones de cuotas:\n\n" +
            cuotasDisponibles.map(cuota => `${cuota} cuotas de $${calcularCuota(monto, cuota, tasaInteres).toFixed(2)}`).join("\n"));

        const cuotas = solicitarNumero("Ingrese la cantidad de cuotas deseadas (3, 6, o 12):");

        if (!cuotasDisponibles.includes(cuotas)) {
            mostrarMensaje("Cantidad de cuotas no válida. Por favor, ingrese 3, 6 o 12.");
        } else {
            const nuevoPrestamo = agregarPrestamo(monto, cuotas, tasaInteres);

            mostrarMensaje(`El monto total a pagar (incluyendo intereses) es: $${nuevoPrestamo.montoTotal.toFixed(2)}`);

            let deseaPrestamo = confirm("¿Quieres solicitar el préstamo simulado?");

            if (deseaPrestamo) {
                mostrarMensaje("Gracias por contratar Liberty Prestamista. Le contactaremos para más detalles.");
            } else {
                mostrarMensaje("Gracias por utilizar Liberty Prestamista. ¡Hasta luego!");
            }
        }
    }
}

function genTable() {
    const tabElement = document.getElementById("tab");
    tabElement.innerHTML = "";

    let capitalInput = document.getElementById("capital");
    let cuotasInput = document.getElementById("couta");
    let interesInput = document.getElementById("interes");

    let capital = parseFloat(capitalInput.value);
    let cuotas = parseFloat(cuotasInput.value);
    let interes = parseFloat(interesInput.value);

    if (!isNaN(capital) && !isNaN(cuotas) && !isNaN(interes) && capital > 0 && cuotas > 0 && interes > 0) {
        let tablaHtml = "";

        for (let i = 1; i <= cuotas; i++) {
            let cuotaCapital = (capital / cuotas).toFixed(2);
            let interesCuota = (((capital * interes) / 100) / cuotas).toFixed(2);
            let totalCuota = (parseFloat(cuotaCapital) + parseFloat(interesCuota)).toFixed(2);

            tablaHtml += `<tr>
                            <td>${i}</td>
                            <td>${cuotaCapital}</td>
                            <td>${interesCuota}</td>
                            <td>${totalCuota}</td>
                          </tr>`;
        }

        let capitalTotal = (capital).toFixed(2);
        let interesTotal = (((capital * interes) / 100)).toFixed(2);
        let totalPagar = (parseFloat(capitalTotal) + parseFloat(interesTotal)).toFixed(2);

        document.getElementById("t1").textContent = capitalTotal;
        document.getElementById("t2").textContent = interesTotal;
        document.getElementById("t3").textContent = totalPagar;

        tabElement.innerHTML = tablaHtml;
    } else {
        mostrarMensaje("Por favor, ingrese valores numéricos válidos y mayores a cero en todos los campos.");
    }
}

function mostrarMensaje(mensaje) {
    // Mostrar mensaje de error utilizando el DOM
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = mensaje;
    document.body.appendChild(mensajeDiv);
}

function resetForm() {
    // Restablecer los valores de los campos a su estado predeterminado
    document.getElementById("capital").value = "";
    document.getElementById("couta").value = "";
    document.getElementById("interes").value = "";
    document.getElementById("tab").innerHTML = "";
    document.getElementById("t1").textContent = "";
    document.getElementById("t2").textContent = "";
    document.getElementById("t3").textContent = "";
}
