fetch('https://random-word-api.herokuapp.com/word?length=5&&number=1&&lang=es')//Endpoint Word hace que traiga palabras al azar, el parametro lenght le dice cuantas letras tiene que tener la palabra, number la cantidad de palabras y lang es español
.then(response => response.json())//Esto es necesario para que funcione, no entiendo como funciona todavia
.then(response => {
    palabra = response[0].toUpperCase().normalize('NFKD').replace(/[^\w]/g, '');//.toUpperCase lleva las cosas a mayuscula, .normalize y .replace quitan y reemplazan los acentos a las palabras
    console.log(palabra);//Para hacer trampa, te deja ver en la consola la palabra actual
})
.catch(err => console.error(err));//En caso de error con la API

function intentar() {
    const INTENTO = leerIntento();
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';//Estas dos lineas crean un div nuevo y le asigna class = "row"

    if (INTENTO.length != 5) {
        alert("SOLO SE ACEPTAN 5 LETRAS!");//En caso de que se intente ingresar una palabra con mas de 5 letras
        return;
    }

    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';//Crea un elemnto span para las letras

        if (INTENTO[i] === palabra[i]) {//Si la letra que corresponde al indice de INTENTO es igual a la letra correspondiente del indice palabra, se vuelve verde

            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green';

        } else if (palabra.includes(INTENTO[i])) {//Si la letra correspondiente del indice de INTENTO esta incluida en la palabra, se vuelve amarilla

            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';

        } else {//Sino, gris 

            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'grey';
        }
        //SImplemente controla letra por letra si esa letra esta en la respuesta correcta. i es indice.
        ROW.appendChild(SPAN)
    }
    GRID.appendChild(ROW)//.appendChild() es lo que se usa para agregar elenmentos a sus divs correspondiente aca
    if (INTENTO === palabra) {
        terminar("<h1>✨GANASTE!✨</h1>")
        return
    }
    intentos--//Va restando la cantidad de intentos sobrantes
    if (intentos == 0) {
        terminar("<h1>PERDISTE!😖</h1>")
    }
}

function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase().normalize('NFKD').replace(/[^\w]/g, '');//Toma la respuesta del usuario y la estandariza
    return intento;

}

function terminar(mensaje) {//Esta funcion simplemente cambia el h1 dependiendo de si ganaste o perdiste
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

let intentos = 4;//Si esto se modifica, se puede aumentar o disminuir el numero de intentos disponibles
/*let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH']
Math.floor(Math.random() * 3) + 1;
const palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
console.log(palabra);//Para hacer trampa, te deja ver en la consola la palabra actual*/
const button = document.getElementById("guess-button");//Consigue la informacion del boton de Intentar
button.addEventListener("click", intentar);//despues del click, llama la funcion intentar