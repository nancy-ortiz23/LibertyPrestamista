document.addEventListener("DOMContentLoaded", () => {
    // Declaración del botón para mostrar el listado
    const btnMostrarListado = document.getElementById("mostrar-listado");

    // Declaración de elementos del DOM
    const boton = document.getElementById("boton");
    const limpiarBoton = document.getElementById("limpiar");
    const resultadoDiv = document.getElementById("resultado");
    const nombreInput = document.getElementById("nombre");
    const cantidadInput = document.getElementById("cantidad");
    const cuotasInput = document.getElementById("cuotas");
    const monedaInput = document.getElementById("moneda");
    const listado = document.getElementById("listado");

    // Creación del arreglo de préstamos
    let prestamos = [];

    // Función para mostrar el listado de préstamos
    const mostrarListado = () => {
        // Limpiamos el listado anterior
        listado.innerHTML = "";

        // Iteramos sobre cada préstamo y creamos un elemento <div> para mostrarlo
        prestamos.forEach((prestamo, index) => {
            const divPrestamo = document.createElement("div");
            divPrestamo.innerHTML = `
                <p><strong>Nombre y Apellido:</strong> ${prestamo.nombreApellido}</p>
                <p><strong>Capital:</strong> ${prestamo.cantidad}</p>
                <p><strong>Cuota:</strong> ${prestamo.cuota}</p>
                <p><strong>Intereses:</strong> ${prestamo.intereses}</p>
                <p><strong>Moneda:</strong> ${prestamo.moneda}</p>
            `;
            listado.appendChild(divPrestamo);
        });
    };

    // Función para calcular préstamo
    const calcularPrestamo = () => {
        // Obtener valores de los inputs
        const nombreApellido = nombreInput.value;
        const capital = Number(cantidadInput.value);
        const cuotas = Number(cuotasInput.value);
        const moneda = monedaInput.value;

        // Validaciones de los datos ingresados
        if (!nombreApellido.trim()) {
            mostrarMensaje("Ingresa un nombre y apellido");
            return;
        }

        if (capital <= 0) {
            mostrarMensaje("La cantidad a solicitar debe ser mayor que cero");
            return;
        }

        if (![12, 18, 24].includes(cuotas)) {
            mostrarMensaje("Por favor, elija una de las opciones válidas (12, 18 o 24 cuotas).");
            return;
        }

        // Calcular intereses (puedes ajustar la tasa de interés según tus necesidades)
        const tasaInteres = 0.1;
        const intereses = capital * tasaInteres;

        // Calcular cuotas
        let cuota;
        switch (cuotas) {
            case 12:
                cuota = (capital + intereses) / 12;
                break;
            case 18:
                cuota = (capital + intereses) / 18;
                break;
            case 24:
                cuota = (capital + intereses) / 24;
                break;
            default:
                cuota = 0;
        }

        // Crear objeto Prestamo con nombre, capital, cuota, intereses y moneda
        const Prestamo = {
            nombreApellido: nombreApellido,
            cantidad: capital,
            cuota: cuota.toFixed(2),
            intereses: intereses.toFixed(2),
            moneda: moneda
        };

        // Guardar préstamo en el arreglo
        prestamos.push(Prestamo);

        // Guardar en localStorage
        guardarPrestamosEnLocalStorage();

        // Mostrar resultado y mensaje de éxito
        resultadoDiv.innerHTML = `${nombreApellido}, tu cuota fija para pagar tu préstamo de ${capital} a ${cuotas} meses es de: ${cuota} ${moneda}`;

        mostrarMensajeExitoso("¡Felicidades, tienes tu préstamo!");

        // Actualizar el listado
        mostrarListado();
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

    // Función para obtener los préstamos guardados en el localStorage
    const obtenerPrestamosDelLocalStorage = () => {
        const prestamosGuardados = localStorage.getItem("prestamos");
        return prestamosGuardados ? JSON.parse(prestamosGuardados) : [];
    };

    // Función para cargar préstamos desde un archivo JSON usando fetch
    const cargarPrestamosDesdeJSON = () => {
        fetch("./data.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al cargar los datos desde el servidor");
                }
                return response.json();
            })
            .then((data) => {
                // Actualizamos los préstamos con los datos cargados desde el servidor
                prestamos = data.prestamos;
                // Guardamos los préstamos en el localStorage
                guardarPrestamosEnLocalStorage();
                // Mostramos el listado de préstamos
                mostrarListado();
            })
            .catch((error) => {
                console.error("Error al cargar los datos:", error);
            });
    };

    // Función para guardar préstamos en localStorage
    const guardarPrestamosEnLocalStorage = () => {
        localStorage.setItem("prestamos", JSON.stringify(prestamos));
    };

    // Inicializamos los préstamos con los datos guardados en el localStorage o un arreglo vacío
    prestamos = obtenerPrestamosDelLocalStorage();

    // Cargamos los préstamos desde el archivo JSON
    cargarPrestamosDesdeJSON();

    // Asignar manejadores de eventos a los botones
    boton.addEventListener("click", calcularPrestamo);
    limpiarBoton.addEventListener("click", limpiarFormulario);
});