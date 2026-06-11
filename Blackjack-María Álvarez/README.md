# Blackjack en JavaScript

Proyecto desarrollado para la asignatura de prácticas.

## Tecnologías utilizadas

* HTML
* CSS
* JavaScript
* Canvas

## Funcionalidades

* Baraja aleatoria
* Sistema de puntuación
* Crupier automático
* Sonidos de cartas
* Música de fondo
* Reinicio de partida

## Cómo ejecutar

Abrir el archivo index.html en un navegador web.

## Cómo jugar

1. Pulsa "Pedir carta" para obtener una carta.
2. Intenta acercarte a 21 sin pasarte y sin quedar por debajo de la puntuación del crupier.
3. Cuando quieras terminar tu turno, pulsa "Plantarme".
4. El crupier robará cartas automáticamente.
5. El resultado aparecerá en pantalla.

## Botones
- Pedir carta
- Plantarme
- Reiniciar partida
- Música on/off

## UML
```text
+----------------+
|     Carta      |
+----------------+
| valor : int    |
| palo : string  |
| img : Image    |
+----------------+
```

La clase Carta define cada carta del juego, almacena su valor,
palo e imagen asociada para su representación en el canvas.

## Problemas encontrados e implementaciones:

- Inicialmente las cartas no aparecían debido a problemas de carga de imágenes que se resolvió eliminando el uso incorrecto de onload en el renderizado.
- Se ajustó la sincronización del crupier para evitar bloqueos del flujo del juego.
- Se implementó manejo de audio compatible con restricciones del navegador..
- Se implementó un sistema de sonido para las cartas, las partidas ganadas y perdidas.
- El crupier se modificó utilizando setTimeout para que las cartas aparezcan progresivamente y no directamente.
- Se incorporó música de fondo que es opcional.

## Autor

María Álvarez Castillo
