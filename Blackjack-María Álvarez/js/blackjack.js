
// CANVAS
const canvas = document.getElementById("canvas");
canvas.width = 1220 * 2;
canvas.height = 400 * 2;
canvas.style.width = "1220px";
canvas.style.height = "400px";

const ctx = canvas.getContext("2d");

// SONIDO
const sonidoCarta = new Audio("sonidos/carta.mp3");
sonidoCarta.preload = "auto";
const sonidoGanar = new Audio("sonidos/ganar.mp3");
sonidoGanar.preload = "auto";
const sonidoPerder = new Audio("sonidos/perder.mp3");
sonidoPerder.preload = "auto";
const fondo = new Audio("sonidos/fondo.mp3");
fondo.loop = true;

// Función para la musica ambiental del juego
function Musica() {
	if(fondo.paused) {
		fondo.play();
	}else {
		fondo.pause();
	}
}

// Clase carta
class Carta {
	constructor(valor, palo) {
		this.valor = valor;
		this.palo = palo;

		this.img = new Image();
		this.img.src = `imagenes/cartas/${valor}${palo}.svg`;
	}
}

// Variables utilizadas para el resto de funciones
const palos = ["S", "H", "D", "C"];

let cartas = [];
let cartasJugador = [];
let cartasCrupier = [];
let indiceCarta = 0;
let puntosCrupier = 0;
let puntosJugador = 0;

let jugadorX = 50;
let crupierX = 50;

const info = document.getElementById("info");

// Funcion que crea la baraja 
function crearBaraja() {
	cartas = [];

	for (let i = 0; i < palos.length; i++) {
		for (let j = 1; j <= 13; j++) {
			cartas.push(new Carta(j, palos[i]));
		}
	}

	// mezcla las cartas de forma aletoria
	for (let i = cartas.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[cartas[i], cartas[j]] = [cartas[j], cartas[i]];
	}
}

// Llamamos a la función para que se ejecute
crearBaraja();

// Funcion para cargar la imagen de las cartas
function dibujarCarta(carta, x, y) {
	ctx.drawImage(carta.img, x, y, 239, 335);
}

// Funcion que calcula los puntos objtenidos en total
function calcularPuntos(lista) {
	let total = 0;
	for (let c of lista) {
		total += c.valor;
	}
	return total;
}


// Funcion que nos da una carta aleatoria de la baraja cada vez que se pide
function pedirCarta() {
	if (indiceCarta >= 8) return;

	// sonido
	sonidoCarta.currentTime = 0;
	sonidoCarta.play().catch(() => {});

	const carta = cartas[indiceCarta];
	cartasJugador.push(carta);

	//dibuja
	dibujarCarta(carta, jugadorX, 50);
	jugadorX += 260;

	indiceCarta++;

	info.innerHTML = `Puntuación jugador: ${calcularPuntos(cartasJugador)}`;
}

// Funcion que comprueba los puntos del jugador y del crupier
function comprobarGanador() {

	let puntosJugador = calcularPuntos(cartasJugador);
	let puntosCrupier = calcularPuntos(cartasCrupier);

	let msg = `Puntuación jugador: ${puntosJugador}<br>` + `Puntuación crupier: ${puntosCrupier}`;

	if (puntosJugador === 21){
		msg += "<br><b>Blackjack!</b>";
		sonidoGanar.currentTime = 0;
		sonidoGanar.play().catch(() => {});
	}
	else if (puntosJugador > 21){
		msg += "<br><b>Te has pasado..</b>";
		sonidoPerder.currentTime = 0;
		sonidoPerder.play().catch(() => {});
	} 
	else if (puntosCrupier > 21){
		msg += "<br><b>Ganas!</b>";
		sonidoGanar.currentTime = 0;
		sonidoGanar.play().catch(() => {});
	}
	else if (puntosCrupier > puntosJugador){
		msg += "<br><b>Gana el crupier..</b>";
		sonidoPerder.currentTime = 0;
		sonidoPerder.play().catch(() => {});
	}
	else if (puntosCrupier === puntosJugador) {
		msg += "<br><b>Empate..</b>";
		sonidoPerder.currentTime = 0;
		sonidoPerder.play().catch(() => {});
	}
	else if (puntosCrupier < puntosJugador){
		msg += "<br><b>Has ganado!</b>";
		sonidoGanar.currentTime = 0;
		sonidoGanar.play().catch(() => {});
	}

	info.innerHTML = msg;
}

// El crupier sigue robando hasta alcanzar al menos 17 puntos
function sacarCartaCrupier() {

	if (puntosCrupier >= 17) {
		comprobarGanador();
		return;
	}

	const carta = cartas[indiceCarta];

	cartasCrupier.push(carta);
	puntosCrupier += carta.valor;
	indiceCarta++;

	// sonido
	sonidoCarta.currentTime = 0;
	sonidoCarta.play().catch(() => {});

	// dibujar
	dibujarCarta(carta, crupierX, 450);
	crupierX += 260;

	info.innerHTML = `Puntuación jugador: ${calcularPuntos(cartasJugador)}<br>Puntuación crupier: ${calcularPuntos(cartasCrupier)}`;

	// siguiente carta dentro de 1 segundo
	setTimeout(sacarCartaCrupier, 1000);
}

// Funcion para dejar de pedir cartas y darle paso al crupier
function plantarme() {
	document.getElementById("pedir").disabled = true;
	document.getElementById("plantar").disabled = true;
	document.getElementById("reset").style.visibility = "visible";

	let puntosJugador = calcularPuntos(cartasJugador);
	let puntosCrupier = 0;

	sacarCartaCrupier();
	
}

// Funcion para resetear la partida
function playagain() {
	location.reload();
}
