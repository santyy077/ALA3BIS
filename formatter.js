export function formatearDificultad(dificultad) {
    const diff = Number(dificultad);

    switch (diff) {
        case 1:
            return '★☆☆ (Fácil)';
        case 2:
            return '★★☆ (Media)';
        case 3:
            return '★★★ (Difícil)';
        default:
            return '★☆☆ (Fácil)';
    }
}

export function formatearEstado(texto) {
    const estado = String(texto).toLowerCase().trim();

    switch (estado) {
        case '1':
        case 'p':
        case'pendiente':
         case'pending':
        return 'PENDING';

        case '2':
        case 'e':
        case 'en curso':
        case 'in-progress':
        case 'in progress':
        return 'IN_PROGRESS';

        case '3':
        case 't':
        case 'terminada':
        case 'finished':
        case 'completada':
        return 'FINISHED';

        case 4:
        case 'c':
        case 'cancelada':
        case 'canceled':
        return 'CANCELED';

        default:
        return 'PENDING';
    }

                            
    
    }
