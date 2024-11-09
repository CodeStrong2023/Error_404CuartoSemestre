let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

// Diccionario de personajes con nombres e imágenes
const personajesData = {
    zuko: { nombre: "Zuko", imagen: "images/zuko.png" },
    katara: { nombre: "Katara", imagen: "images/katara.png" },
    aang: { nombre: "Aang", imagen: "images/aang.png" },
    toph: { nombre: "Toph", imagen: "images/toph.png" }
};

function iniciarJuego() {
    const botonPersonajeJugador = document.getElementById('boton-personaje');
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador);

    const botonesAtaque = document.querySelectorAll('.boton-ataque');
    botonesAtaque.forEach(boton => {
        boton.addEventListener('click', (e) => seleccionarAtaque(e.target.id));
    });

    const botonReiniciar = document.getElementById('boton-reiniciar');
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarPersonajeJugador() {
    const personajes = document.querySelectorAll('input[name="personaje"]');
    const spanPersonajeJugador = document.getElementById('personaje-jugador');
    const imagenJugador = document.getElementById('imagen-jugador');
    let personajeSeleccionado = null;

    personajes.forEach(personaje => {
        if (personaje.checked) {
            personajeSeleccionado = personajesData[personaje.id];
        }
    });

    if (!personajeSeleccionado) {
        alert('Selecciona un personaje');
        return;
    }

    // Mostrar el personaje seleccionado
    spanPersonajeJugador.innerHTML = personajeSeleccionado.nombre;
    imagenJugador.src = personajeSeleccionado.imagen;

    seleccionarPersonajeEnemigo();
    document.getElementById('seleccionar-personaje').style.display = 'none';
    document.getElementById('seleccionar-ataque').style.display = 'block';
}

function seleccionarPersonajeEnemigo() {
    const personajesNombres = Object.keys(personajesData);
    const personajeAleatorioKey = personajesNombres[aleatorio(0, personajesNombres.length - 1)];
    const personajeAleatorio = personajesData[personajeAleatorioKey];
    const spanPersonajeEnemigo = document.getElementById('personaje-enemigo');
    const imagenEnemigo = document.getElementById('imagen-enemigo');

    spanPersonajeEnemigo.innerHTML = personajeAleatorio.nombre;
    imagenEnemigo.src = personajeAleatorio.imagen;
}

function seleccionarAtaque(ataqueId) {
    ataqueJugador = ataqueId.replace('boton-', '');
    ataqueEnemigoAleatorio();
    combate();
}

function ataqueEnemigoAleatorio() {
    const ataques = ['puño', 'patada', 'barrida'];
    ataqueEnemigo = ataques[aleatorio(0, ataques.length - 1)];
}

function combate() {
    const mensajeBatalla = document.getElementById('mensaje-batalla');

    if (ataqueJugador === ataqueEnemigo) {
        mensajeBatalla.innerHTML = '¡Empate!';
    } else if (
        (ataqueJugador === 'puño' && ataqueEnemigo === 'barrida') ||
        (ataqueJugador === 'patada' && ataqueEnemigo === 'puño') ||
        (ataqueJugador === 'barrida' && ataqueEnemigo === 'patada')
    ) {
        mensajeBatalla.innerHTML = '¡Ganaste esta ronda!';
        vidasEnemigo--;
    } else {
        mensajeBatalla.innerHTML = 'Perdiste esta ronda...';
        vidasJugador--;
    }

    actualizarVidas();
    revisarFinJuego();
}

function actualizarVidas() {
    document.getElementById('vidas-jugador').innerHTML = vidasJugador;
    document.getElementById('barra-vida-jugador').value = vidasJugador;
    document.getElementById('vidas-enemigo').innerHTML = vidasEnemigo;
    document.getElementById('barra-vida-enemigo').value = vidasEnemigo;
}

function revisarFinJuego() {
    if (vidasJugador === 0) {
        mostrarMensajeFin('Perdiste el juego... ¡Intenta nuevamente!', 'images/derrota.gif');
    } else if (vidasEnemigo === 0) {
        const spanPersonajeEnemigo = document.getElementById('personaje-enemigo').innerHTML;
        const mensaje = `¡Ganaste contra ${spanPersonajeEnemigo} - CPU! ¡Felicidades!`;
        const imagenSrc = `images/${spanPersonajeEnemigo.toLowerCase()}Feliz.png`;
        mostrarMensajeFin(mensaje, imagenSrc);
    }
}

function mostrarMensajeFin(mensaje, imagenSrc) {
    const textoVictoria = document.getElementById('texto-victoria');
    const imagenVictoria = document.getElementById('imagen-victoria');
    textoVictoria.innerHTML = mensaje;
    imagenVictoria.src = imagenSrc;
    document.getElementById('seleccionar-ataque').style.display = 'none';
    document.getElementById('reiniciar').style.display = 'block';
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego);
