//variables
const formulario = document.querySelector('#formulario');
const lista = document.querySelector('#lista-tweets');
let tweets = [];

//event listener
eventListeners();

function eventListeners(){
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);
    //eliminar tweets de la pantalla
    document.addEventListener('DOMContentLoaded', () =>{
        tweets = JSON.parse( localStorage.getItem('tweets') || [] );

        console.log(tweets);

        crearHtml();
    })
}

//funciones
function agregarTweet(e){
    e.preventDefault();


    //textarea donde se escribe
    const tweet = document.querySelector('#tweet').value;

    //validacion...
    if(tweet === ''){
        mostrarError('Un Mensaje no puede ir Vacio...');

        return;
    }
    const tweetObj = {
        id:Date.now(),
        tweet
    }
    //añadir al arreglo de twets
    tweets = [...tweets, tweetObj];
    

    //una vez creado el arreglo creamos el html
    crearHtml();

    //reiniciar formulario
    formulario.reset();
}
//mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertar el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //eliminar la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    },2000);
}

//mostrar un listado de los tweets

function crearHtml(){

    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach( tweet => {
//agregar boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerHTML = 'X'
            //añadir la funcion de eliminar
            btnEliminar.onclick=() => {
                borrarTweet(tweet.id);
            }

            //crear el html
            const li = document.createElement('li');
            //añadir texto
            li.innerText = tweet.tweet;

            //asignar el boton
            li.appendChild(btnEliminar);

            //insertar datos en el html
            lista.appendChild(li);

        })
    }
    sincronizarStorage();
}

//agregar los twets actuales a storage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

//llimpiar html
function limpiarHTML(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
}

//eliminar tweet
function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id)

    console.log(tweets);
}

