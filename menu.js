export function mostrarMenuPrincipal() {
    console.log(`
        ==========================
            MENU PRINCIPAL
        ==========================
        1. Ver Mis Tareas
        2. Buscar Tarea
        3. Agregar Tarea
        0. Salir
    `);
}

export function mostrarMenuVertareas() {
    console.log(`
        ==========================
            VER MIS TAREAS
        ==========================
        1. Ver Todas las Tareas
        2. Ver Tareas Pendientes
        3. Ver Tareas Completadas
        4. Ver Tareas en Progreso
        0. Volver al Menú Principal
    `);
}

export function mostrarDetallesTarea(tarea, dificultadFormateada) {
    console.log(`
        ==========================
            DETALLES DE LA TAREA
        ==========================
        titulo: ${tarea.titulo}
        descripcion: ${tarea.descripcion}
        Estado: ${tarea.Estado}
        dificultad: ${dificultadFormateada}
        creacion: ${tarea.creacion}
        ultimaEdicion: ${tarea.ultimaEdicion}
        vencimiento: ${tarea.vencimiento || 'No tiene vencimiento'}
        ==========================
    `);
}