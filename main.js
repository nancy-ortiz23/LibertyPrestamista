// Declaración de elementos del DOM
const boton = document.getElementById("boton");
const limpiarBoton = document.getElementById("limpiar");
const resultadoDiv = document.getElementById("resultado");
const nombreInput = document.getElementById("nombre");
const cantidadInput = document.getElementById("cantidad");
const plazoInput = document.getElementById("plazo");
const listado = document.getElementById("listado");

// Creación del arreglo de préstamos
const prestamos = [];

// Función para calcular préstamo
const calcularPrestamo = () => {
    // Obtener valores de los inputs
    const nombre = nombreInput.value;
    const cantidad = Number(cantidadInput.value);
    const plazo = Number(plazoInput.value);

    // Validaciones de los datos ingresados
    if (!nombre.trim()) {
        mostrarMensaje("Ingresa un nombre y apellido");
        return;
    }

    if (cantidad > 1000000) {
        mostrarMensaje("La cantidad que ingresaste es mayor a 1,000,000 de pesos argentinos. Ingresa un monto menor");
        return;
    }

    if (![12, 18, 24].includes(plazo)) {
        mostrarMensaje("Por favor, elija una de las opciones válidas (6, 12 o 24).");
        return;
    }

    // Calcular 
    let cuotas;
    switch (plazo) {
        case 6:
            cuotas = cantidad / 12;
            break;
        case 12:
            cuotas = cantidad / 18;
            break;
        case 24:
            cuotas = cantidad / 24;
            break;
        default:
            cuotas = 0;
    }

    // Crear objeto Prestamo
    const Prestamo = {
        nombre: nombre,
        capital: cantidad,
        plazo: plazo,
        cuotas: cuotas.toFixed(2) // Limitar a 2 decimales
    };

    // Guardar préstamo en el arreglo
    prestamos.push(Prestamo);

    // Guardar en localStorage
    guardarPrestamosEnLocalStorage();

    // Mostrar resultado y mensaje de éxito en pesos argentinos
    resultadoDiv.innerHTML = `${nombre}, tu cuota fija para pagar tu préstamo de ${cantidad} a ${plazo} meses es de: ${cuotas} pesos argentinos`;

    mostrarMensajeExitoso("¡Felicidades, tienes tu préstamo en pesos argentinos!");
};

// Función para limpiar el formulario
const limpiarFormulario = () => {
    nombreInput.value = "";
    cantidadInput.value = "";
    plazoInput.value = "";
    resultadoDiv.innerHTML = "";
};

// Event listeners
boton.addEventListener("click", calcularPrestamo);
limpiarBoton.addEventListener("click", limpiarFormulario);

// Función para mostrar mensajes en la página
const mostrarMensaje = (mensaje) => {
    resultadoDiv.innerHTML = `<p class="error">${mensaje}</p>`;
};

// Función para mostrar mensajes de éxito usando SweetAlert2
const mostrarMensajeExitoso = (mensaje) => {
    console.log(Swal); // Agrega esta línea para verificar si SweetAlert2 está disponible
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

// Función para cargar préstamos desde localStorage
const cargarPrestamosDesdeLocalStorage = () => {
    const prestamosGuardados = localStorage.getItem("prestamos");
    if (prestamosGuardados) {
        prestamos.push(...JSON.parse(prestamosGuardados));
    }
};
