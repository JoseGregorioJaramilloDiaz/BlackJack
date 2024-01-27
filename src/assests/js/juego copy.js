/**
 * 2C = 2 de Trebol
 * 2D = 2 de Diamante
 * 2H = 2 de Corazon
 * 2S = 2 de Pica
 */

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias de HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador     = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');


const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    } 

    for (let tipo of tipos) {
        for (let espc of especiales) {
            deck.push(espc + tipo);
        }
    } 

    // console.log(deck);
    deck = _.shuffle(deck)
    //console.log(deck);
    return deck;
}

crearDeck();

//  Tomar carta

const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay mas cartas';
    }

    const carta = deck.pop();
    //console.log(deck);
    //console.log(carta);
    return carta;
}

// pedirCarta();

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN(valor)) ?
             (valor === 'A') ? 11 : 10
             : valor * 1;
// lo hecho en el return es lo mismo de todas las instrucciones de abajo
    // let puntos = 0;

    // if ( isNaN(valor)) {
    //     console.log('No es un numero');
    //     puntos = (valor === 'A') ? 11 : 10;
    // } else {
    //     console.log('Es un numero');
        // al multiplicar por 1 se convierte un numero string en numero
    //     puntos = valor * 1;
    //}
    // console.log(puntos);
}

// const valor = valorCarta(pedirCarta());
//console.log({valor});

const turnoComputadora = (puntosMinimos) => {

    do { 
        const carta = pedirCarta();
        console.log({carta});
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;

        // <img class="carta" src="./assests/imagenes/10C.png" alt="" srcset=""></img>
        const imgCarta = document.createElement('img');
        imgCarta.className = 'carta';
        imgCarta.src = `./assests/imagenes/${carta}.png`; // 3H, JD ....
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }}
    while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) )

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Nadie gana....');
        }  else if (puntosComputadora > 21) {
            alert('Jugador gana ......');
        } else alert('Computadora gana ......');
    }, 40);
    

}

//  Eventos

btnNuevo.addEventListener('click', () => {

    
    console.clear();

    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = '0';
    puntosHTML[1].innerText = '0';

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled =  false;
    btnDetener.disabled = false;
    
})

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    // <img class="carta" src="./assests/imagenes/10C.png" alt="" srcset=""></img>
    const imgCarta = document.createElement('img');
    imgCarta.className = 'carta';
    imgCarta.src = `./assests/imagenes/${carta}.png`; // 3H, JD ....

    divCartasJugador.append(imgCarta);
    if (puntosJugador > 21) {
        console.warn('Lo siento perdiste...')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('21, genial....')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }

})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
})