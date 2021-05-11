

swal('Bienvenidos',`Comienza a jugar, mira la secuencia en que alumbran los vasos e imitala.


ganas cuando los vasos esten llenos


si marcas un error el juego vuelve a empezar.
`);

 var empezar = document.querySelector('#empezar'),
 salida = document.querySelector('#salida'),
 aparato = document.querySelector('#action')

var glass1 = document.getElementById('addClass'),
 beer = document.getElementById('beer'),
 pipe = document.querySelector('.pipe'),

 glass2 = document.getElementById('addClass2'),
 beer2 = document.getElementById('beer2'),
 pipe2 = document.querySelector('.pipe2'),

 glass3 = document.getElementById('addClass3'),
 beer3 = document.getElementById('beer3'),
 pipe3 = document.querySelector('.pipe3')




glass1.addEventListener('click', function(){
    beer.classList.add('beer')
    pipe.setAttribute("id","pipe")
});

glass2.addEventListener('click', function(){
    beer2.classList.add('beer2')
    pipe2.setAttribute("id","pipe2")
});

glass3.addEventListener('click', function(){
    beer3.classList.add('beer3')
    pipe3.setAttribute("id","pipe3")
});


 // variables con los estilos CSS para los cuatro pulsadores en ambos estados: apagado y encendido...
 var glass1Apagado = 'background: rgba(255, 255, 255, 0.3)',
 glass1Encendido = 'background: rgba(150, 239, 132, 0.3); transform: scale(1.08);',
 glass2Apagado = 'background: rgba(255, 255, 255, 0.3)',
 glass2Encendido = 'background: rgba(239, 132, 132, 0.3); transform: scale(1.08);',
 glass3Apagado = 'background: rgba(255, 255, 255, 0.3)',
 glass3Encendido = 'background: rgba(238, 239, 132, 0.3); transform: scale(1.08);',


 nivel,          // indica el nivel actual
 secuencia,      // array con los colores a repetir
 indSec;         // índice de la secuencia de colores

// Se programa que cuando se cliqueé el botón "COMENZAR" comienze la partida...

empezar.addEventListener("click", comienzaPartida);

function comienzaPartida(){
    empezar.style.cssText = 'display: none;';     // se oculta el botón "EMPEZAR"

    reseteaAparato();
    aniadeColorSecuencia();
    reproduceSecuencia(); 


    function reseteaAparato(){
        nivel = 1;
        secuencia = [];
        indSec = 0;

        glass1.style.cssText = glass1Apagado;
        glass2.style.cssText = glass2Apagado;
        glass3.style.cssText = glass3Apagado;
        

        salida.innerHTML = 'NIVEL ' + nivel;
    }

    function aniadeColorSecuencia(){
        var colores = ['verde', 'rojo', 'amarillo'];

        secuencia.push( colores[numAleat(0,2)] );   // se añade un color aleatorio al final del array
    }

    function reproduceSecuencia(){
        if(indSec < secuencia.length){      // Si quedan colores por encender en la reproducción de la secuencia...
            enciendeColor();
        }
        else{                               // Secuencia reproducida, ahora le toca al jugador repetirla
            indSec = 0;
            aparato.addEventListener('click', compruebaPulsacion);
        }

        function enciendeColor(){
            switch(secuencia[indSec]){
                case 'verde':
                    glass1.style.cssText = glass1Encendido;
                    break;
                case 'rojo':
                    glass2.style.cssText = glass2Encendido;
                    break;
                case 'amarillo':
                    glass3.style.cssText = glass3Encendido;
                    break;
            }

            setTimeout(apagaColor, 900);
            }
        
            function apagaColor(){
                switch(secuencia[indSec]){
                    case 'verde':
                        glass1.style.cssText = glass1Apagado;
                        break;
                    case 'rojo':
                        glass2.style.cssText = glass2Apagado;
                        break;
                    case 'amarillo':
                        glass3.style.cssText = glass3Apagado;
                        break;
                   
                }

                indSec++;
                setTimeout(reproduceSecuencia, 150);
            }

            function compruebaPulsacion(ev){
                var pulsador = ev.target;
                console.log(pulsador)

                if(pulsador.id != 'aparato'){
                    if(pulsador.id == secuencia[indSec]){       // Si se pulsa el pulsador correcto...
                        enciendePulsador(pulsador.id);
                    }
                    else{                                       // ERROR, y enciende a rojo todos los pulsadores
                        glass1.style.cssText = glass2Encendido;
                        glass2.style.cssText = glass2Encendido;
                        glass3.style.cssText = glass2Encendido;
                        
                        salida.innerHTML = 'HAS PERDIDO.\n\nHas llegado al nivel ' + nivel + '.\n\nHaz clic en EMPEZAR para volver a jugar';
                        aparato.removeEventListener('click', compruebaPulsacion);
                        empezar.style.cssText = 'display: block;';          // se vuelve a mostrar el botón "EMPEZAR"
                    }
                }

                function enciendePulsador(pulsador){
                    switch(pulsador){
                        case 'verde':
                            glass1.style.cssText = glass1Encendido;
                            break;
                        case 'rojo':
                            glass2.style.cssText = glass2Encendido;
                            break;
                        case 'amarillo':
                            glass3.style.cssText = glass3Encendido;
                            break;
                    }

                    setTimeout(apagaPulsador, 150, pulsador);
                }

                function apagaPulsador(pulsador){
                    switch(pulsador){
                        case 'verde':
                            glass1.style.cssText = glass1Apagado;
                            break;
                        case 'rojo':
                            glass2.style.cssText = glass2Apagado;
                            break;
                        case 'amarillo':
                            glass3.style.cssText = glass3Apagado;
                            break;
                        
                    }

                    indSec++;
                    if(indSec == secuencia.length){             // Si ya no queda secuencia, Nivel superado
                        nivel++;                                // se pasa al siguiente nivel
                        salida.innerHTML = 'NIVEL ' + nivel;
                        aniadeColorSecuencia();                 // se añade un nuevo color al final de la secuencia
                        indSec = 0;                             // y se resetea el índice de la misma
                        aparato.removeEventListener('click', compruebaPulsacion);   // se elimina el escuchador de evento clic
                        setTimeout(reproduceSecuencia, 1000);   // y se programa que tras un segundo se reproduzca la secuencia, repitiéndose así el proceso
                    }
                }
            }
        }


        function numAleat(limInf, limSup){
            return limInf + Math.floor( Math.random() * (limSup - limInf + 1) );
        }
}