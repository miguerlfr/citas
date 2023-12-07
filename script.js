let cita = []

function Agendar() {
    let a = document.getElementById("nombreMascota").value;
    let b = document.getElementById("Propietario").value;
    let c = document.getElementById("Telefono").value;
    let d = document.getElementById("tipoMascota").value;
    let e = document.getElementById("diaCita").value;
    let f = document.getElementById("horaCita").value;
    let g = document.getElementById("Sintomas").value;
    
        let z;
        if (d === 'Perro') {
            z = "img/image1.jpg";
        } else if (d === 'Gato') {
            z = "img/image2.jpg";
        } else if (d === 'Conejo') {
            z = "img/image3.jpg";
        } else if (d === 'Tortuga') {
            z = "img/image4.jpg";
        } else {
            z = "";
        }

    cita.push(
        { id: 1, imagen: z, nombre: a, propietario: b, telefono: c, tipo: d, dia: e, hora: f, sintomas: g }
    )

    document.getElementById("containerPadre").innerHTML = '';

    cita.forEach(item => {
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

        imagen.src = item.imagen;
        nombre.textContent = 'Nombre:' + " " + item.nombre;
        propietario.textContent = 'Propietario:' + " " + item.propietario;
        telefono.textContent = 'Teléfono:' + " " +item.telefono;
        tipo.textContent = 'Tipo:' + " " + item.tipo;
        dia.textContent = 'Día:' + " " + item.dia;
        hora.textContent = 'Hora' + " " + item.hora;
        sintomas.textContent = 'Sintomas:' + " " + item.sintomas;

        container.classList.add('container');
        imagen.classList.add('imagen');
        nombre.classList.add('nombre');
        propietario.classList.add('propietario');
        telefono.classList.add('telefono');
        tipo.classList.add('tipo');
        dia.classList.add('dia');
        hora.classList.add('hora');
        sintomas.classList.add('sintomas');

        container.appendChild(imagen);
        container.appendChild(nombre);
        container.appendChild(propietario);
        container.appendChild(telefono);
        container.appendChild(tipo);
        container.appendChild(dia);
        container.appendChild(hora);
        container.appendChild(sintomas);

        fragment.appendChild(container);
        document.getElementById("containerPadre").appendChild(fragment);
    });
}