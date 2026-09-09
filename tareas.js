export const ListaTareas = [];

export function crearTarea (titulo, descripcion = "", dificultad = "facil", vencimiento = null) {
    const nuevaTarea = {
        id: Date.now(),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        Estado: "pendiente",
        dificultad: dificultad || 'Fácil',
        creacion: fechaActual,
        ultimaEdicion: fechaActual,
        vencimiento: vencimiento || null,

    };
    return nuevaTarea;
}