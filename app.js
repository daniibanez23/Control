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
