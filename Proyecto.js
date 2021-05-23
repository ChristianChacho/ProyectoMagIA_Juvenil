const axios = require ( 'axios' );
const prompt = require('prompt-sync') ();

//Se crea la clase "usuario" que servirá de plantilla para crear los usuarios:

//IMPORTANTE: cuando pruebes el código vas a tener que dar datos para crear un usuario,
//te recomiendo que cuando le des los datos, en el atributo de la emergencia, es
//decir, cuando respondas el apartado: "¿Cuál es su emergencia? (Describa su emergencia detalladamente):"
//respondas con la siguiente emergencia: "Un ladron armado entro a mi casa y me esta amenazando con su arma".
//Claro, no uses las comillas ni ningún acento porque la terminal no reconoce palabras con tildes.
class usuario {
    constructor (nombresApellidos, ID, emergencia) {
        this.nombresApellidos = nombresApellidos;
        this.ID = ID;
        this.emergencia = emergencia;
    }
};
var nombresApellidos = prompt ("Ingrese sus nombres y apellidos: ");
var ID = prompt ("Ingrese su número de identificación o número de cédula: ");
var emergencia = prompt ("¿Cuál es su emergencia? (Describa su emergencia detalladamente): " )

//El objeto que crea la clase "usuario" es guardado en la variable "priimerUsiario":
var primerUsuario = new usuario (nombresApellidos, ID, emergencia) 

//Dentro de la variable "Emergencia" se va a guardar el atributo llamado "emergencia"
//el cual es un atributo del objeto que creó la clase "usuario" y que anteriormente 
//se guardó en la variable "primerUsuario":
var Emergencia = primerUsuario.emergencia

//Aquí está una biblioteca de las direcciones a usar (prestar especial atención a las de traducción):
var direccionDetectaIdioma = 'https://api.cognitive.microsofttranslator.com/detect?api-version=3.0';

var direccionTraduceIdioma = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from='+'Aquí va a esta el código del idioma detectado en la función "detectaIdioma'+'&to=es';
var direccionTraduceIdioma2 = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=es&to='+'Aquí va estar el código del idioma detectado en la función "detectaIdioma"';

var direccionExtraefrases = 'https://servicioanalisistexto.cognitiveservices.azure.com/text/analytics/v3.0/keyPhrases';

//Lo primero es detectar el idioma en el que está escrito el body de nuestra petición,
//pero lo más importante es el atributo llamado "emergencia" por lo que la función "detectaIdioma"
//va a tener como única tarea, detectar el idioma en el que está escrito este atributo.

function detectaIdioma (callback, datos){
    var bodyDeteccion = [{"Text": datos}];
    var direccionDetectaIdioma = 'https://api.cognitive.microsofttranslator.com/detect?api-version=3.0';

    axios.post(direccionDetectaIdioma, bodyDeteccion, {
        headers : {
            'Ocp-Apim-Subscription-Key' : '58f9f4075c9c46bca61a78cfc71a45b6',
            'Ocp-Apim-Subscription-Region' : 'southcentralus',
            'Content-Type' : 'application/json'
        }
    })
    .then(respuesta => {callback (respuesta.data[0].language, datos)})
    .catch(error => console.log (error.data))

}

//Una vez detectado el idioma en el que está escrito el atributo "emergencia",
//lo siguiente es traducir el contenido de este atributo al español. 
//De eso se encarga la funcion "traduceDatos".

function traduceDatos (codigoLenguaje, mensaje){
    var bodyTraduccion = [{"Text" : mensaje}];
    var direccionTraduceIdioma = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from='+codigoLenguaje+'&to=es';
    axios.post(direccionTraduceIdioma, bodyTraduccion, {
        headers: {
            'Ocp-Apim-Subscription-Key' : '58f9f4075c9c46bca61a78cfc71a45b6',
            'Ocp-Apim-Subscription-Region' : 'southcentralus',
            'Content-Type' : 'application/json'
        }
    })
    .then(respuesta => {callback (respuesta.data[0].translations[0].text, codigoLenguaje)})
    .catch(error => console.log (error.data));
};

//Se llama a la función "detectaIdioma" dandole como callback la función "traduceDatos" 
//y el contendio de la varibale "Emergencia" en la cual anteriormente se guardó el 
//atributo "emergencia" del objeto creado por la clase. 

detectaIdioma (traduceDatos, Emergencia);

//Lo siguiente es mandar la traduccion del atributo "emergencia" al servicio que extrae 
//palabras clave para luego con un switch poder enviar respuestas de acuerdo con el tipo 
//de emergencia. Esas respuestas van a estar en español por lo que tendremos que usar 
//por segunda ocasión el servicio de traducción de textos para traducir la respuesta al idioma
//origial en el que fue escrito la petición, para esto usar la dirección llamada:
// "direccionTraduceIdioma2". 

