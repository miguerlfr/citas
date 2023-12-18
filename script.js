let citas = [];
let isEditing = false;
let estadoSeleccionado = 'Abierta';
let primeraCitaAgregada = false; // Bandera para indicar si se agregó la primera cita

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
      mostrarAlerta("Ingrese un número de teléfono que sea mayor a 9 dígitos.");
    } else {
      let fechaCita = new Date(`${diaCita} ${horaCita}`);
      let fechaActual = new Date();
  
      // Restringir fechas anteriores al día actual
      if (fechaCita < fechaActual) {
        mostrarAlerta("Seleccione una hora futura a la hora actual entre las 8:00 am y las 8:00 pm.");
      } else {
        // Obtener solo la hora de la cita
        let horaCitaSeleccionada = fechaCita.getHours();
  
        // Restringir horas fuera del horario laboral
        if (horaCitaSeleccionada < 8 || (horaCitaSeleccionada === 20 && fechaCita.getMinutes() > 1) || horaCitaSeleccionada > 20) {
          
          mostrarAlerta("La hora de la cita debe estar entre las 8:00 am.");

        } else {
          
          if (!isEditing) {
            // Si no está en modo de edición, agregar nueva cita
            agregarCita("Abierta");
          } else {
            // Si está en modo de edición, aplicar cambios
            aplicarCambiosCita();
            // Restaurar el estado de edición a falso después de aplicar cambios
            isEditing = false;
          }
          
          // Limpiar campos después de agregar la cita
          limpiarCampos();
          
          // Restaurar el texto del botón a "Agendar Cita"
          document.getElementById("agendarButtonText").textContent = "Agendar Cita";
          
          // Si se ha seleccionado un estado, mostrar citas por ese estado
          if (estadoSeleccionado) {
            mostrarCitasPorEstado(estadoSeleccionado);
          } else {
            
            // Si no se ha seleccionado ningún estado, mostrar citas en estado "Abierta"
            mostrarCitasPorEstado('Abierta');
          }
        }
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
    estado: estado // Agregar el estado de la cita
  });

  // Limpiar campos después de agregar la cita
  limpiarCampos();
}

function mostrarCitasPorEstado(estado) {
  document.getElementById("containerPadre").innerHTML = '';

  citas.forEach(item => {
    if (item.estado === estadoSeleccionado) {
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
      let editarCita = document.createElement("button")
      let cancelarCita = document.createElement("button");
  
      imagen.src = item.imagen;
      nombre.textContent = 'Nombre: ' + item.nombre;
      propietario.textContent = 'Propietario: ' + item.propietario;
      telefono.textContent = 'Teléfono: ' + item.telefono;
      tipo.textContent = 'Tipo: ' + item.tipo;
      dia.textContent = 'Día: ' + item.dia;
      
      // Convertir la hora de formato 24 horas a formato 12 horas
      const horaFormato12 = convertirHoraAFormato12(item.hora);
      hora.textContent = 'Hora: ' + horaFormato12;
      
      sintomas.textContent = 'Síntomas: ' + item.sintomas;
  
      container.classList.add('container');
      imagen.classList.add('imagen');
      nombre.classList.add('nombre');
      propietario.classList.add('propietario');
      telefono.classList.add('telefono');
      tipo.classList.add('tipo');
      dia.classList.add('dia');
      hora.classList.add('hora');
      sintomas.classList.add('sintomas');
      editarCita.classList.add('editarCita');
      cancelarCita.classList.add('cancelarCita');
  
      if (item.estado !== 'Abierta') {
        // Ocultar el botón si la cita está en estado "Anulada" o "Cerrada"
        editarCita.style.display = "none";
        cancelarCita.style.display = "none";
      }
      
      editarCita.textContent = "Editar Cita"// En la función que maneja el botón "Editar Cita"
            editarCita.addEventListener("click", function() {
              editar(item)
            });
      // Agregar botón "Cancelar Cita"
      cancelarCita.textContent = "Cancelar Cita";
      // En la función que maneja el botón "Cancelar Cita"
      cancelarCita.addEventListener("click", function() {
        // Lógica para cancelar la cita, por ejemplo, cambiar su estado a "Anulada"
        item.estado = "Anulada";
        // Mostrar todas las citas después de cancelar
        mostrarCitasPorEstado('Abierta');
      
        // Obtén el botón del estado abierto
        const botonAbierta = document.getElementById('abiertaBtn');
      
        // Establece el estilo seleccionado para el botón del estado abierto
        botonAbierta.classList.add('selected');
      });
  
      container.appendChild(imagen);
      container.appendChild(nombre);
      container.appendChild(propietario);
      container.appendChild(telefono);
      container.appendChild(tipo);
      container.appendChild(dia);
      container.appendChild(hora);
      container.appendChild(sintomas);
      container.appendChild(editarCita);
      container.appendChild(cancelarCita);
  
      fragment.appendChild(container);
      document.getElementById("containerPadre").appendChild(fragment);
    }
  });  

  // Cambiar el estilo del botón seleccionado
  cambiarEstiloBotonSeleccionado(estadoSeleccionado);
}

function aplicarCambiosCita() {
  // Obtener el índice de la cita en el arreglo
  const indiceCita = citas.findIndex(item => item.estado === 'Abierta');
  
  if (indiceCita !== -1) {
    // Actualizar los valores de la cita con los nuevos valores de los campos de entrada
    citas[indiceCita].nombre = document.getElementById("nombreMascota").value;
    citas[indiceCita].propietario = document.getElementById("Propietario").value;
    citas[indiceCita].telefono = document.getElementById("Telefono").value;
    citas[indiceCita].tipo = document.getElementById("tipoMascota").value;
    citas[indiceCita].dia = document.getElementById("diaCita").value;
    citas[indiceCita].hora = document.getElementById("horaCita").value;
    citas[indiceCita].sintomas = document.getElementById("Sintomas").value;

    // Puedes agregar lógica adicional según tus necesidades

    // Limpiar campos después de aplicar cambios
    limpiarCampos();
  }
}

function editar(it) {
  // Set values for editing
  document.getElementById("nombreMascota").value = it.nombre;
  document.getElementById("Propietario").value = it.propietario;
  document.getElementById("Telefono").value = it.telefono;
  document.getElementById("tipoMascota").value = it.tipo;
  document.getElementById("diaCita").value = it.dia;
  document.getElementById("horaCita").value = it.hora;
  document.getElementById("Sintomas").value = it.sintomas;

  // Set a flag or variable to indicate edit mode
  // For example, you can use a global variable like 'isEditing'
  isEditing = true;
  document.getElementById("agendarButtonText").textContent = "Agregar Cambios";
}

function mostrarTodasLasCitas() {
  document.getElementById("containerPadre").innerHTML = '';

  // Limpiar el estilo del botón seleccionado
  limpiarEstiloBotonSeleccionado();
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

  // Mostrar citas en el estado "Abierta"
  mostrarCitasPorEstado('Abierta');
}

// Función para cambiar el estilo del botón seleccionado
function cambiarEstiloBotonSeleccionado(estado) {
  
  // Actualizar la variable global estadoSeleccionado
  estadoSeleccionado = estado;
  
  // Eliminar la clase 'selected' de todos los botones
  document.getElementById('abiertaBtn').classList.remove('selected');
  document.getElementById('cerradaBtn').classList.remove('selected');
  document.getElementById('anuladaBtn').classList.remove('selected');

  // Agregar la clase 'selected' al botón del nuevo estado
  document.getElementById(`${estado.toLowerCase()}Btn`).classList.add('selected');
}

// Función para limpiar el estilo del botón seleccionado
function limpiarEstiloBotonSeleccionado() {
  // Eliminar la clase 'selected' de todos los botones
  document.getElementById('abiertaBtn').classList.remove('selected');
  document.getElementById('cerradaBtn').classList.remove('selected');
  document.getElementById('anuladaBtn').classList.remove('selected');
}

function cambiarEstado(nuevoEstado) {
  // Actualizar la variable global estadoSeleccionado
  estadoSeleccionado = nuevoEstado;
  
  // Limpiar el estilo del botón seleccionado
  limpiarEstiloBotonSeleccionado();
  
  // Llamar a la función mostrarCitasPorEstado con el nuevo estado
  mostrarCitasPorEstado(nuevoEstado);
}

// Antes de agregar la primera cita, mostrar citas por estado del estadoPorDefecto
if (!primeraCitaAgregada) {
  mostrarCitasPorEstado('Abierta');
}

// Asigna el evento click a los botones de estado
document.getElementById('abiertaBtn').addEventListener('click', function() {
  cambiarEstado('Abierta');
});

document.getElementById('cerradaBtn').addEventListener('click', function() {
  cambiarEstado('Cerrada');
});

document.getElementById('anuladaBtn').addEventListener('click', function() {
  cambiarEstado('Anulada');
});

// Función para convertir la hora a formato 12 horas
function convertirHoraAFormato12(hora24) {
  const partesHora = hora24.split(':');
  let horas = parseInt(partesHora[0]);
  const minutos = partesHora[1];
  const ampm = horas >= 12 ? 'pm' : 'am';

  horas = horas % 12 || 12; // Convertir a formato de 12 horas
  return `${horas}:${minutos} ${ampm}`;
}
