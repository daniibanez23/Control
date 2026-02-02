// ===== GUARDAR TRABAJADORES =====
document.getElementById("formTrabajador").addEventListener("submit", function(e) {
    e.preventDefault();

    const trabajador = {
        dni: document.getElementById("dni").value,
        nombre: document.getElementById("nombre").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value
    };

    let trabajadores = JSON.parse(localStorage.getItem("trabajadores")) || [];

    // Verificar si el DNI ya existe
    const existe = trabajadores.some(t => t.dni === trabajador.dni);
    if (existe) {
        alert("Este trabajador ya está registrado.");
        return;
    }

    trabajadores.push(trabajador);
    localStorage.setItem("trabajadores", JSON.stringify(trabajadores));

    alert("Trabajador guardado correctamente");
    this.reset();
});


// ===== REGISTRAR PRESENCIA =====
document.getElementById("formPresencia").addEventListener("submit", function(e) {
    e.preventDefault();

    const dni = document.getElementById("dniPresencia").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;

    let trabajadores = JSON.parse(localStorage.getItem("trabajadores")) || [];
    let presencias = JSON.parse(localStorage.getItem("presencias")) || [];

    // Verificar que el trabajador exista
    const trabajador = trabajadores.find(t => t.dni === dni);
    if (!trabajador) {
        alert("Trabajador no encontrado. Regístralo primero.");
        return;
    }

    const registro = {
        dni: dni,
        nombre: trabajador.nombre,
        fecha: fecha,
        hora: hora
    };

    presencias.push(registro);
    localStorage.setItem("presencias", JSON.stringify(presencias));

    alert("Presencia registrada correctamente");
    this.reset();
});
document.getElementById("verListados").addEventListener("click", function() {
    const trabajadores = JSON.parse(localStorage.getItem("trabajadores")) || [];
    const presencias = JSON.parse(localStorage.getItem("presencias")) || [];

    const cuerpoTrabajadores = document.querySelector("#tablaTrabajadores tbody");
    const cuerpoPresencias = document.querySelector("#tablaPresencias tbody");

    cuerpoTrabajadores.innerHTML = "";
    cuerpoPresencias.innerHTML = "";

    // Mostrar trabajadores
    trabajadores.forEach(t => {
        const fila = `
            <tr>
                <td>${t.dni}</td>
                <td>${t.nombre}</td>
                <td>${t.telefono}</td>
                <td>${t.correo}</td>
            </tr>
        `;
        cuerpoTrabajadores.innerHTML += fila;
    });

    // Mostrar presencias
    presencias.forEach(p => {
        const fila = `
            <tr>
                <td>${p.dni}</td>
                <td>${p.nombre}</td>
                <td>${p.fecha}</td>
                <td>${p.hora}</td>
            </tr>
        `;
        cuerpoPresencias.innerHTML += fila;
    });

    if (trabajadores.length === 0) {
        cuerpoTrabajadores.innerHTML = "<tr><td colspan='4'>No hay trabajadores registrados</td></tr>";
    }

    if (presencias.length === 0) {
        cuerpoPresencias.innerHTML = "<tr><td colspan='4'>No hay registros de presencia</td></tr>";
    }
});
document.getElementById("verListados").addEventListener("click", function () {
    const panel = document.getElementById("panelListados");
    const listaTrabajadores = document.getElementById("listaTrabajadores");
    const listaPresencias = document.getElementById("listaPresencias");

    const trabajadores = JSON.parse(localStorage.getItem("trabajadores")) || [];
    const presencias = JSON.parse(localStorage.getItem("presencias")) || [];

    // Alternar visibilidad
    panel.classList.toggle("oculto");

    // Limpiar listas
    listaTrabajadores.innerHTML = "";
    listaPresencias.innerHTML = "";

    // Cambiar texto del botón
    this.textContent = panel.classList.contains("oculto")
        ? "Mostrar Trabajadores y Registros"
        : "Ocultar Listados";

    // Mostrar trabajadores
    if (trabajadores.length === 0) {
        listaTrabajadores.innerHTML = "<li>No hay trabajadores registrados</li>";
    } else {
        trabajadores.forEach(t => {
            const item = document.createElement("li");
            item.innerHTML = `
                <strong>DNI:</strong> ${t.dni} |
                <strong>Nombre:</strong> ${t.nombre} |
                <strong>Teléfono:</strong> ${t.telefono} |
                <strong>Correo:</strong> ${t.correo}
            `;
            listaTrabajadores.appendChild(item);
        });
    }

    // Mostrar presencias
    if (presencias.length === 0) {
        listaPresencias.innerHTML = "<li>No hay registros de presencia</li>";
    } else {
        presencias.forEach(p => {
            const item = document.createElement("li");
            item.innerHTML = `
                <strong>DNI:</strong> ${p.dni} |
                <strong>Nombre:</strong> ${p.nombre} |
                <strong>Fecha:</strong> ${p.fecha} |
                <strong>Hora:</strong> ${p.hora}
            `;
            listaPresencias.appendChild(item);
        });
    }
});
