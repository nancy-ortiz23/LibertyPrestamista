document.addEventListener("DOMContentLoaded", function() {
    // Declaración de elementos del DOM
    const boton = document.getElementById("boton");
    const limpiarBoton = document.getElementById("limpiar");
    const resultadoDiv = document.getElementById("resultado");
    const nombreInput = document.getElementById("nombre");
    const cantidadInput = document.getElementById("cantidad");
    const cuotasInput = document.getElementById("cuotas");
    const monedaInput = document.getElementById("moneda");
    const listado = document.getElementById("listado");

    // Crear arreglo de préstamos
    const prestamos = [];

    // Función para calcular el préstamo
    const calcularPrestamo = () => {
        // Obtener valores de los inputs
        const nombreApellido = nombreInput.value;
        const cantidad = parseFloat(cantidadInput.value);
        const cuotas = parseInt(cuotasInput.value);
        const moneda = monedaInput.value;

        // Validar datos ingresados
        if (!nombreApellido.trim()) {
            mostrarMensaje("Ingresa un nombre y apellido");
            return;
        }

        if (cantidad <= 0 || isNaN(cantidad)) {
            mostrarMensaje("La cantidad a solicitar debe ser un número mayor que cero");
            return;
        }

        if (![12, 18, 24].includes(cuotas)) {
            mostrarMensaje("Por favor, elija una de las opciones válidas (12, 18 o 24 cuotas).");
            return;
        }

        // Calcular intereses
        const tasaInteres = 0.1; // Ejemplo de tasa de interés del 10%
        const intereses = cantidad * tasaInteres;

        // Calcular cuotas
        let cuota;
        switch (cuotas) {
            case 12:
                cuota = (cantidad + intereses) / 12;
                break;
            case 18:
                cuota = (cantidad + intereses) / 18;
                break;
            case 24:
                cuota = (cantidad + intereses) / 24;
                break;
            default:
                cuota = 0;
        }

        // Crear objeto de préstamo
        const Prestamo = {
            nombreApellido: nombreApellido,
            cantidad: cantidad,
            cuota: cuota.toFixed(2),
            intereses: intereses.toFixed(2),
            moneda: moneda
        };

        // Guardar préstamo en el arreglo
        prestamos.push(Prestamo);

        // Guardar en localStorage
        guardarPrestamosEnLocalStorage();

        // Mostrar resultado y mensaje de éxito
        resultadoDiv.innerHTML = `${nombreApellido}, tu cuota fija para pagar tu préstamo de ${cantidad} a ${cuotas} meses es de: ${cuota} ${moneda}`;

        mostrarMensajeExitoso("¡Felicidades, tienes tu préstamo!");

        // Actualizar el listado
        mostrarListado();

        // Enviar datos del formulario
        enviarFormulario();
    };

    // Función para limpiar el formulario
    const limpiarFormulario = () => {
        nombreInput.value = "";
        cantidadInput.value = "";
        cuotasInput.value = "";
        monedaInput.value = "pesos";
        resultadoDiv.innerHTML = "";
    };

    // Función para mostrar mensajes en la página
    const mostrarMensaje = (mensaje) => {
        resultadoDiv.innerHTML = `<p class="error">${mensaje}</p>`;
    };

    // Función para mostrar mensajes de éxito usando SweetAlert2
    const mostrarMensajeExitoso = (mensaje) => {
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: mensaje,
            showConfirmButton: false,
            timer: 2000
        });
    };

    // Función para guardar préstamos en localStorage
    const guardarPrestamosEnLocalStorage = () => {
        localStorage.setItem("prestamos", JSON.stringify(prestamos));
    };

    const enviarFormulario = () => {
        fetch('./data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al cargar los datos: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Mostrar los datos en el div con id "datosJson"
            const datosJsonDiv = document.getElementById('datosJson');
            datosJsonDiv.innerHTML = `
                <p>Mensaje: ${data.mensaje}</p>
                <p>Otro dato: ${data.otroDato}</p>
                <p>Números: ${data.numeros.join(', ')}</p>
                <p>Booleano: ${data.booleano}</p>
            `;
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
    };

    // Asignar evento de clic al botón de enviar formulario
    boton.addEventListener("click", calcularPrestamo);

    // Asignar evento de clic al botón de limpiar formulario
    limpiarBoton.addEventListener("click", limpiarFormulario);
});