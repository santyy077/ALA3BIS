function formatearTarea(dificultad) {
    const difficult = String(dificultad).toLowerCase().trim();

    switch (difficult) {
        case 'facil':
        case 'easy':
        case '1':
        case 'f':
            return '★☆☆ (Fácil)';
        case 'media':
        case 'medium':
        case '2':
        case 'm':
            return '★★☆ (Media)';
        case 'dificil':
        case 'hard':
        case '3':
        case 'd':
            return '★★★ (Difícil)';
        default:
            return '★☆☆ (Fácil)';
    }
}

export function formatearEstado(texto) {
    if()


