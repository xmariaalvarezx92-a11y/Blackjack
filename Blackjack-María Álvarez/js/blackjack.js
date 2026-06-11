
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

function Musica() {
	if(fondo.paused) {
		fondo.play();
	}else {
		fondo.pause();
	}
}

// CARTA
class Carta {
	constructor(valor, palo) {
		this.valor = valor;
		this.palo = palo;

		this.img = new Image();
		this.img.src = `imagenes/cartas/${valor}${palo}.svg`;
	}
}

// VARIABLES
const palos = ["S", "H", "D", "C"];

let cartas = [];
let cartasJugador = [];
let cartasCrupier = [];
let indiceCarta = 0;
let puntosCrupier = 0;
let puntosJugador = 0;
let a = 0;

let jugadorX = 50;
let crupierX = 50;

const info = document.getElementById("info");

// CREAR BARAJA
function crearBaraja() {
	cartas = [];

	for (let i = 0; i < palos.length; i++) {
		for (let j = 1; j <= 13; j++) {
			cartas.push(new Carta(j, palos[i]));
		}
	}

	// shuffle correcto
	for (let i = cartas.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[cartas[i], cartas[j]] = [cartas[j], cartas[i]];
	}
}

crearBaraja();

// DIBUJAR CARTA (SIN ONLOAD)
function dibujarCarta(carta, x, y) {
	ctx.drawImage(carta.img, x, y, 239, 335);
}

// PUNTOS
function calcularPuntos(lista) {
	let total = 0;
	for (let c of lista) {
		total += c.valor;
	}
	return total;
}


// PEDIR CARTA
function pedirCarta() {
	if (indiceCarta >= 8) return;

	// sonido (sin bloquear)
	sonidoCarta.currentTime = 0;
	sonidoCarta.play().catch(() => {});

	const carta = cartas[indiceCarta];
	cartasJugador.push(carta);

	dibujarCarta(carta, jugadorX, 50);
	jugadorX += 260;

	indiceCarta++;

	info.innerHTML = `Puntuación jugador: ${calcularPuntos(cartasJugador)}`;
}

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
	else if (puntosCrupier === puntosJugador) msg += "<br><b>Empate..</b>";
	else if (puntosCrupier < puntosJugador){
		msg += "<br><b>Has ganado!</b>";
		sonidoGanar.currentTime = 0;
		sonidoGanar.play().catch(() => {});
	}

	info.innerHTML = msg;
}

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

// PLANTARSE
function plantarme() {
	document.getElementById("pedir").disabled = true;
	document.getElementById("plantar").disabled = true;
	document.getElementById("reset").style.visibility = "visible";

	let puntosJugador = calcularPuntos(cartasJugador);
	let puntosCrupier = 0;

	sacarCartaCrupier();
	
}

// RESET
function playagain() {
	location.reload();
}