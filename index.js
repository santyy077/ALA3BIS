
import rl from 'readline-sync';
import { mostrarMenuPrincipal, mostrarMenuVertareas, mostrarDetallesTarea } from './menu.js';
import { crearTarea,cargarTareas, obtenerTareas, buscarTareasPorTitulo, obtenerTareaPorId } from './tareas.js';
import { formatearDificultad, formatearEstado } from './formatter.js';

crearTarea('Aprender Node', 'Practicar imports y exports', '2', '2026-12-31', 'p');

 async function manejarEdicion(tarea) {
    console.log('\n--- Modo Edicion ---');
    console.log('(Presiona ENTER para mantener el valor actual o ingresa un ESPACIO para borrarlo)');

    const nuevoTitulo = rl.question(`Titulo actual [${tarea.titulo}]: `);
    if (nuevoTitulo.trim() !== '') tarea.titulo = nuevoTitulo.trim();

    const nuevaDesc = rl.question(`Descripcion actual [${tarea.descripcion}]: `);
    if (nuevaDesc === ' ') tarea.descripcion = '';
    else if (nuevaDesc !== '') tarea.descripcion = nuevaDesc.trim();

    const nuevoEstado = rl.question(`Estado actual [${tarea.estado}] (1.PENDING 2.IN_PROGRESS 3.FINISHED 4.CANCELED): `);
    if (nuevoEstado.trim() !== '') tarea.estado = formatearEstado(nuevoEstado);

    const nuevaDif = rl.question(`Dificultad actual [${tarea.dificultad}] (1.Facil 2.Media 3.Dificil): `);
    if (nuevaDif.trim() !== '') tarea.dificultad = Number(nuevaDif) || tarea.dificultad;

    tarea.ultimaEdicion = new Date().toISOString();

    await guardarTareas();
    console.log('\n✅ ¡Tarea actualizada con éxito!');
}

function mostrarListado(tareas, titulo) {
    while (true) {
        console.log(`\n=== ${titulo} ===`);
        if (tareas.length === 0) {
            console.log('No hay tareas para mostrar.');
        } else {
            tareas.forEach(t => {
                console.log(`[${t.id}] ${t.titulo} - ${t.estado}`);
            });
        }

        const opcion = rl.question('\nIngresa el ID de la tarea para ver detalles, o 0 para volver: ');
        
        if (opcion === '0') break;

        const tareaEncontrada = obtenerTareaPorId(opcion);
        if (tareaEncontrada) {
            let enDetalle = true;
            while (enDetalle) {
                mostrarDetallesTarea(tareaEncontrada, formatearDificultad(tareaEncontrada.dificultad));
                const accion = rl.question('Presiona "E" para editar, o "0" para volver: ');
                
                if (accion === '0') enDetalle = false;
                else if (accion.toLowerCase() === 'e') manejarEdicion(tareaEncontrada);
                else console.log(' Opcion no valida.');
            }
        } else {
            console.log(' ID no encontrado.');
        }
    }
}

function flujoVerTareas() {
    while (true) {
        mostrarMenuVertareas();
        const opcion = rl.question('Elige una opcion: ');

        switch (opcion) {
            case '1':
                mostrarListado(obtenerTareas(), 'Todas las Tareas'); 
                break;
            case '2': 
            mostrarListado(obtenerTareas('pendiente'), 'Tareas Pendientes');
             break;
            case '3':
                 mostrarListado(obtenerTareas('en curso'), 'Tareas En Curso');
                  break;
            case '4':
                 mostrarListado(obtenerTareas('terminada'), 'Tareas Terminadas');
                  break;
            case '0': 
            return;
            default: console.log(' Opcion no valida.');
        }
    }
}

function flujoAgregarTarea() {
    console.log('\n--- AGREGAR NUEVA TAREA ---');
    let titulo = '';
    while (!titulo.trim()) {
        titulo = rl.question('Titulo (Obligatorio): ');
    }
    
    const descripcion = rl.question('Descripcion (Opcional): ');
    const estadoInput = rl.question('Estado (1.Pendiente 2.En Curso 3.Terminada) [Por defecto: Pendiente]: ');
    const difInput = rl.question('Dificultad (1.Facil 2.Media 3.Dificil) [Por defecto: Facil]: ');
    const vencimiento = rl.question('Vencimiento YYYY-MM-DD (Opcional): ');

    const estado = formatearEstado(estadoInput);
    
    crearTarea(titulo, descripcion, difInput, vencimiento, estado);
    console.log('\n✅ ¡Tarea guardada correctamente!');
}

 async function iniciarApp() {

    await cargarTareas();


    let corriendo = true;
    while (corriendo) {
        mostrarMenuPrincipal();
        const opcion = rl.question('Elige una opcion: ');

        switch (opcion) {
            case '1':
                flujoVerTareas();
                break;
            case '2':
                const query = rl.question('\nIngresa una palabra para buscar: ');
                const resultados = buscarTareasPorTitulo(query);
                mostrarListado(resultados, `Resultados para: "${query}"`);
                break;
            case '3':
                flujoAgregarTarea();
                break;
            case '0':
                console.log('¡Saliendo de la app!');
                corriendo = false;
                break;
            default:
                console.log('⚠️ Opcion no valida. Intenta de nuevo.');
        }
    }
}

iniciarApp();