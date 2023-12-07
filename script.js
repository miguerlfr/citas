let citas = [];

async function Agendar() {
    let nombreMascota = document.getElementById("nombreMascota").value;
    let propietario = document.getElementById("Propietario").value;
    let telefono = document.getElementById("Telefono").value;
    let tipoMascota = document.getElementById("tipoMascota").value;
    let diaCita = document.getElementById("diaCita").value;
    let horaCita = document.getElementById("horaCita").value;
    let sintomas = document.getElementById("Sintomas").value;

    // Validaciones
    if (!nombreMascota || !propietario || !telefono || !tipoMascota || !diaCita || !horaCita || !sintomas) {
        mostrarAlerta("Por favor, complete todos los campos.");
    } else if (telefono.length < 10) {
        mostrarAlerta("Ingrese un número de teléfono válido.");
    } else {
        let horaCitaObj = new Date(`${diaCita}T${horaCita}`);
        let fechaActual = new Date();

        // Verificar si la cita es para el mismo día y si la hora ya pasó
        if (horaCitaObj <= fechaActual) {
            // La cita pasa automáticamente a estado cerrado
            agregarCita("Cerrada");
        } else {
            // La cita se agrega con estado abierto
            agregarCita("Abierta");
        }
    }
}

function agregarCita(estado) {
    let nombreMascota = document.getElementById("nombreMascota").value;
    let propietario = document.getElementById("Propietario").value;
    let telefono = document.getElementById("Telefono").value;
    let tipoMascota = document.getElementById("tipoMascota").value;
    let diaCita = document.getElementById("diaCita").value;
    let horaCita = document.getElementById("horaCita").value;
    let sintomas = document.getElementById("Sintomas").value;

    let imagenes = {
        'Perro': 'img/image1.jpg',
        'Gato': 'img/image2.jpg',
        'Conejo': 'img/image3.jpg',
        'Tortuga': 'img/image4.jpg'
    };

    let imagen = imagenes[tipoMascota] || 'img/default.jpg';

    citas.push({
        id: citas.length + 1,
        imagen: imagen,
        nombre: nombreMascota,
        propietario: propietario,
        telefono: telefono,
        tipo: tipoMascota,
        dia: diaCita,
        hora: horaCita,
        sintomas: sintomas,
        estado: estado  // Agregar el estado de la cita
    });

    // Limpiar campos después de agregar la cita
    limpiarCampos();

    // Mostrar las citas según el estado seleccionado
    mostrarCitasPorEstado('Abierta');
}

function mostrarCitasPorEstado(estado) {
    document.getElementById("containerPadre").innerHTML = '';

    citas.forEach(item => {
        if (item.estado === estado) {
            let fragment = document.createDocumentFragment();
            let container = document.createElement("div");
            let imagen = document.createElement("img");
            let nombre = document.createElement("p");
            let propietario = document.createElement("p");
            let telefono = document.createElement("p");
            let tipo = document.createElement("p");
            let dia = document.createElement("p");
            let hora = document.createElement("p");
            let sintomas = document.createElement("p");
            let cancelarCita = document.createElement("button");

            imagen.src = item.imagen;
            nombre.textContent = 'Nombre:' + " " + item.nombre;
            propietario.textContent = 'Propietario:' + " " + item.propietario;
            telefono.textContent = 'Teléfono:' + " " + item.telefono;
            tipo.textContent = 'Tipo:' + " " + item.tipo;
            dia.textContent = 'Día:' + " " + item.dia;
            hora.textContent = 'Hora' + " " + item.hora;
            sintomas.textContent = 'Síntomas:' + " " + item.sintomas;

            container.classList.add('container');
            imagen.classList.add('imagen');
            nombre.classList.add('nombre');
            propietario.classList.add('propietario');
            telefono.classList.add('telefono');
            tipo.classList.add('tipo');
            dia.classList.add('dia');
            hora.classList.add('hora');
            sintomas.classList.add('sintomas');
            cancelarCita.classList.add('cancelarCita');

            if (item.estado !== 'Anulada') {
                cancelarCita.textContent = "Cancelar Cita";
                cancelarCita.addEventListener("click", function() {
                    // Lógica para cancelar la cita, por ejemplo, cambiar su estado a "Anulada"
                    item.estado = "Anulada";
                    // Mostrar todas las citas después de cancelar
                    mostrarTodasLasCitas();
                });

                container.appendChild(cancelarCita);
            } else {
                // Ocultar el botón si la cita está en estado "Anulada"
                cancelarCita.style.display = "none";
            }

            // Agregar botón "Cancelar Cita"

            cancelarCita.textContent = "Cancelar Cita";
            cancelarCita.addEventListener("click", function() {
                // Lógica para cancelar la cita, por ejemplo, cambiar su estado a "Anulada"
                item.estado = "Anulada";
                // Mostrar todas las citas después de cancelar
                mostrarTodasLasCitas();
            });

            container.appendChild(imagen);
            container.appendChild(nombre);
            container.appendChild(propietario);
            container.appendChild(telefono);
            container.appendChild(tipo);
            container.appendChild(dia);
            container.appendChild(hora);
            container.appendChild(sintomas);
            container.appendChild(cancelarCita);

            fragment.appendChild(container);
            document.getElementById("containerPadre").appendChild(fragment);
        }
    });
}

function mostrarTodasLasCitas() {
    document.getElementById("containerPadre").innerHTML = '';
    
    citas.forEach(item => {
        // ... (lógica para mostrar la cita similar a la que ya tienes)
    });
}

function mostrarAlerta(mensaje) {
    swal({
        title: "Error",
        text: mensaje,
        icon: "warning",
        button: "OK",
        className: "mi-boton-ok", // Agrega tu clase personalizada aquí
    });
}

function limpiarCampos() {
    document.getElementById("nombreMascota").value = "";
    document.getElementById("Propietario").value = "";
    document.getElementById("Telefono").value = "";
    document.getElementById("tipoMascota").value = "";
    document.getElementById("diaCita").value = "";
    document.getElementById("horaCita").value = "";
    document.getElementById("Sintomas").value = "";
}

function obtenerFechaActual() {
    const ahora = new Date();
    const anio = ahora.getFullYear();
    const mes = ahora.getMonth() + 1; // Sumar 1 porque los meses van de 0 a 11
    const dia = ahora.getDate();

    // Formato YYYY-MM-DD
    return `${anio}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
}

// Obtener la fecha actual y establecerla como el valor mínimo del input
document.getElementById("diaCita").min = obtenerFechaActual();

// Verificar el estado de las citas cada minuto (puedes ajustar el intervalo según tus necesidades)
setInterval(verificarCitas, 60000);  // 60000 milisegundos = 1 minuto

function verificarCitas() {
    const fechaActual = new Date();

    citas.forEach(item => {
        const fechaCita = new Date(`${item.dia}T${item.hora}`);
        
        // Verificar si la fecha y hora de la cita han pasado
        if (fechaActual >= fechaCita) {
            // Cambiar el estado de la cita a "Cerrada"
            item.estado = 'Cerrada';
        }
    });

    // Mostrar las citas en estado 'Abierta' después de la verificación
    mostrarCitasPorEstado('Abierta');
}
