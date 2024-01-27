//  es una funcion anonima para que nuestro codigo no sea
// facilmente manipulado por usuarios conocedores de HTML, JavaScrip
// 'use strict' es para que javascrip verifique errores y te indique
// para corregirlos

 
const miModulo = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];
    
    let puntosJugadores = [];
    
    // Referencias de HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');
    
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');
    
    // Esta funcion inicializa el juego
    const inicializarJuego = (numJuagadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJuagadores; i++) {
            puntosJugadores.push(0);
        }
        
        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
    
        btnPedir.disabled =  false;
        btnDetener.disabled = false;   
    }
     
    // Esta funcion crea un nuevo deck
    const crearDeck = () => {
    
        deck = [];
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
        // el comando _.shuffle se usa para ordenar aleatoriamente un arreglo
        return _.shuffle(deck);;
    }

    // Esta funcion me permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }
    // Esta funcion me da el valor de la carta para la suma de puntos
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN(valor)) ?
                 (valor === 'A') ? 11 : 10
                 : valor * 1;
    }
    
    // Turno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta,turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.className = 'carta';
        imgCarta.src = `./assests/imagenes/${carta}.png`; // 3H, JD ....
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {
        const [puntosMinimos,puntosComputadora] = puntosJugadores;
        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana ......');
            }  else if (puntosComputadora > 21) {
                alert('Jugador gana ......');
            } else alert('Computadora gana ......');
        }, 40);
    }

    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do { 
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta,puntosJugadores.length - 1);
            crearCarta(carta,puntosJugadores.length - 1);
            
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        determinarGanador();
    }
    
    //  Eventos
      
    btnPedir.addEventListener('click', () => {
    
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta,0);
        crearCarta(carta, 0);
        
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
        turnoComputadora(puntosJugadores[0]);
    })

    //btnNuevo.addEventListener('click', () => {
    //   inicializarJuego();
    //})

    return {
        nuevoJuego: inicializarJuego
    };

})();
