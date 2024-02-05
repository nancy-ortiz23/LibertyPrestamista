// Declaración de elementos del DOM
const boton = document.getElementById("boton");
const limpiarBoton = document.getElementById("limpiar");
const resultadoDiv = document.getElementById("resultado");
const nombreInput = document.getElementById("nombre");
const cantidadInput = document.getElementById("cantidad"); // Cambiado de capital a cantidadInput
const cuotasInput = document.getElementById("cuotas");
const monedaInput = document.getElementById("moneda");
const listado = document.getElementById("listado");

// Creación del arreglo de préstamos
const prestamos = [];

// Función para calcular préstamo
const calcularPrestamo = () => {
    // Obtener valores de los inputs
    const nombreApellido = nombreInput.value;
    const cantidad = Number(cantidadInput.value); // Cambiado de capital a cantidad
    const cuotas = Number(cuotasInput.value);
    const moneda = monedaInput.value;

    // Validaciones de los datos ingresados
    if (!nombreApellido.trim()) {
        mostrarMensaje("Ingresa un nombre y apellido");
        return;
    }

    if (cantidad <= 0) { // Cambiado de capital a cantidad
        mostrarMensaje("La cantidad a solicitar debe ser mayor que cero");
        return;
    }

    if (![12, 18, 24].includes(cuotas)) {
        mostrarMensaje("Por favor, elija una de las opciones válidas (12, 18 o 24 cuotas).");
        return;
    }

    // Calcular intereses (puedes ajustar la tasa de interés según tus necesidades)
    const tasaInteres = 0.1; // Ejemplo de tasa de interés del 10%
    const intereses = cantidad * tasaInteres; // Cambiado de capital a cantidad

    // Calcular cuotas
    let cuota;
    switch (cuotas) {
        case 12:
            cuota = (cantidad + intereses) / 12; // Cambiado de capital a cantidad
            break;
        case 18:
            cuota = (cantidad + intereses) / 18; // Cambiado de capital a cantidad
            break;
        case 24:
            cuota = (cantidad + intereses) / 24; // Cambiado de capital a cantidad
            break;
        default:
            cuota = 0;
    }

    // Crear objeto Prestamo con nombre, cantidad, cuota, intereses y moneda
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
};


// Función para limpiar el formulario
const limpiarFormulario = () => {
    nombreInput.value = "";
    capitalInput.value = "";
    cuotasInput.value = "";
    monedaInput.value = "pesos"; // Restablecer la opción predeterminada
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
            prestamos.push(...data);
            mostrarListado();
        })
        .catch((error) => {
            console.error("Error al cargar los datos:", error);
        });
};

// Función para mostrar el listado de préstamos
const mostrarListado = () => {
    listado.innerHTML = ""; // Limpiar el listado antes de mostrar los nuevos datos

    prestamos.forEach((prestamo) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <h4>${prestamo.nombreApellido}</h4>
            <p>Capital: ${prestamo.capital}</p>
            <p>Cuota: ${prestamo.cuota}</p>
            <p>Intereses: ${prestamo.intereses}</p>
            <p>Moneda: ${prestamo.moneda}</p>
            <hr/>
        `;
        listado.append(li);
    });
};

// Event listeners
boton.addEventListener("click", calcularPrestamo);
limpiarBoton.addEventListener("click", limpiarFormulario);

// Llama a la función para cargar préstamos desde JSON
cargarPrestamosDesdeJSON();