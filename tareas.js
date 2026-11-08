import fs from 'node:fs/promises';

let tareas = [];

function esFechaValida(fecha) {
    if ( !fecha) return false;
    return !isNaN(Date.parse(fecha));
}

export function esTareaValida(tarea) {

    if ( typeof tarea.titulo !== 'string' || tarea.titulo.trim()=== '') return false;
    
    if (!esFechaValida(tarea.creacion)) return false;

    const estadosValidos = ["PENDING", "IN_PROGRESS", "FINISHED", "CANCELED"];
    if( !estadoValidos.includes(tarea.estado)) return false;

    if ( !['1', '2' , '3'].includes(Number(tarea.dificultad))) return false;

    if (tarea.descripcion !== null && typeof tarea.descripcion !== 'string') return false;

    if (tarea.ultimaEdicion !== null && !esFechaValida(tarea.ultimaEdicion)) return false;

    if (tarea.vencimiento !== null && !esFechaValida(tarea.venciemiento)) return false;

    return true;
}

 export async function cargarTareas() {

    try{ 

        const contenido = await fs.readFile('./task.json' , 'utf-8');
        const datosCrudos = JSON.parse(contenido);

        const tareasFIltadas = datosCrudos.filter(esTareaValida);

        tareas = tareasFiltradas.map((tarea, index) => ({
            id : index + 1,
            ...tarea
        }));

    console.log(`\n Se cargaron exitosamente ${tareas.length} tares desde task.json\n`);

    }catch (error) {

        if(error.code === 'ENOENT') {
            console.log('\n No se encontro el archivo task.json. Se inicia con la lista de tareas vacia.\n');
        } else if ( error instanceof SyntaxError) {
            console.log('\n El archvio task.json esta daniado  o no es un JSON valido.')
        } else {
            console.log('\n Error inseperado al leer el archivo: ${error.message}\n');
        }
        tareas = [];

    }

}

export async function guardarTareas() {
    try {
        const jsonContenido = JSON.stringify(tareas, null, 2);

        await fs.writeFile('./task.json', jsonContenido, 'utf-8');

        console.log('\n Cambios guardados automanticamente en task.json\n');
        
    }catch (error) {
        console.log('\n Error al guardar en task.json: ${error.message}\n');
    }
}


export async function crearTarea(titulo, descripcion = '', dificultad = 'facil', vencimiento = '', estado = 'pendiente') {
    const fechaActual = new Date().toISOString().slice(0, 10);

    const nuevaTarea = {
        id: tareas.length + 1,
        titulo: titulo.trim(),
        descripcion: descripcion.trim() || null,
        estado: estado,
        creacion: fechaActual,
        ultimaEdicion: null,
        vencimiento: vencimiento || null,
        dificultad: Number(dificultad) || 1
    };

    tareas.push(nuevaTarea);
    await guardarTareas();
    return nuevaTarea;
}

export function obtenerTareas(filtro = null) {
    if (!filtro) return tareas;

    return tareas.filter((tarea) => {
        const estado = String(tarea.estado || '').toUpperCase();
        return estado === String(filtro).toUpperCase();
    });
}

export function buscarTareasPorTitulo(texto) {
    const textoBuscado = String(texto).toLowerCase().trim();

    if (!textoBuscado) return tareas;

    return tareas.filter((tarea) =>
        tarea.titulo.toLowerCase().includes(textoBuscado)
    );
}

export function obtenerTareaPorId(id) {
    return tareas.find((tarea) => String(tarea.id) === String(id));
}

