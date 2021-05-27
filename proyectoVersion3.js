const axios = require ( 'axios' );
const prompt = require('prompt-sync') ();

//Se crea la clase "usuario" que servirá de plantilla para crear los usuarios:

//IMPORTANTE: cuando pruebes el código vas a tener que dar datos para crear un usuario,
//te recomiendo que cuando le des los datos, en el atributo de la emergencia, es
//decir, cuando respondas el apartado: "¿Cuál es su emergencia? (Describa su emergencia detalladamente):"
//respondas con la siguiente emergencia: "Estoy atrapado en una balacera en mi escuela",
//también puedes responder en inglés: "I am caught in a shooting at school."
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


//Lo primero es detectar el idioma en el que está escrito el body de nuestra petición,
//pero lo más importante es el atributo llamado "emergencia" por lo que la función "detectaIdioma"
//va a tener como única tarea, detectar el idioma en el que está escrito este atributo.

function detectaIdioma (datos){
    var bodyDeteccion = [{"Text": datos}];
    var direccionDetectaIdioma = 'https://api.cognitive.microsofttranslator.com/detect?api-version=3.0';

    axios.post(direccionDetectaIdioma, bodyDeteccion, {
        headers : {
            'Ocp-Apim-Subscription-Key' : '58f9f4075c9c46bca61a78cfc71a45b6',
            'Ocp-Apim-Subscription-Region' : 'southcentralus',
            'Content-Type' : 'application/json'
        }
    })
    .then(respuesta =>  {traduceDatos(respuesta.data[0].language, datos)})
    .catch(error => console.log (error.data))

}

//Una vez detectado el idioma en el que está escrito el atributo "emergencia",
//lo siguiente es traducir el contenido de este atributo al español. 
//De eso se encarga la funcion "traduceDatos".

function traduceDatos (codigoLenguaje, mensaje,){
    var bodyTraduccion = [{"Text" : mensaje}];
    var direccionTraduceIdioma = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from='+codigoLenguaje+'&to=es';
    axios.post(direccionTraduceIdioma, bodyTraduccion, {
        headers: {
            'Ocp-Apim-Subscription-Key' : '58f9f4075c9c46bca61a78cfc71a45b6',
            'Ocp-Apim-Subscription-Region' : 'southcentralus',
            'Content-Type' : 'application/json'
        }
    })
    .then(respuesta => {
        extraeFrases( respuesta.data[0].translations[0].text ,codigoLenguaje )
    })
    .catch(error => console.log (error.data));

}


//Una vez traducido el contenido del atributo "emergencia", lo siguiente es analizar ese contenido
//con el servicio de IA de Text Analytics, en específico, con la función "key Phrases" o palabras clave.
//Justamente esa es la tera de la función "extraeFrases" que al ser llamada en el .then de la petición
//de traduccion va a comenzar a sacar las palabras cable de nuestro texto: 

    function extraeFrases (texto, codigolenguaje){
        var bodyExtraccion = {
            "documents" : [
                {
                    "languaje": codigolenguaje,
                    "id": "1",
                    "text": texto
                }
            ]
        }
        var direcionExtraeFrases = 'https://servicioanalisistexto.cognitiveservices.azure.com/text/analytics/v3.0/keyPhrases'
        
        axios.post(direcionExtraeFrases, bodyExtraccion, {
            headers: {
                'Ocp-Apim-Subscription-Key' : '8b4c7829af844bc699425c01e131246a',
                'Content-Type' : 'application/json'
            }
        })
        .then (respuesta =>{ 
            traduceRespuesta(respuesta.data.documents[0].keyPhrases, codigolenguaje)
        })
        .catch(error => console.log (error.data));
    }

//La función "traduceRespuesta" es la encargada de: 1) comparar las palabras clave que extrajo la función "extraerFrases"
//con palabras clave precargadas, el resultado de esa comparación será una respuesta la cual será traducida mediante una 
//petición al servicio de IA "Text Translator". 
function traduceRespuesta (palabrasClave, codigoLenguaje){
    var j = 0
    var respuestaFinal;
    var direccionTraduceIdioma2 = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=es&to='+codigoLenguaje

    do {
        if ((palabrasClave[j]) == 'balacera'){
            respuestaFinal = [{"Text" : bibliotecaRespuestas[3]}]
            break;
        }
        if ((palabrasClave[j]) == 'Estoy atrapado en una balacera en mi escuela'){
            respuestaFinal = [{"Text" : bibliotecaRespuestas[3]}]
            break;
        }
        if ((palabrasClave[j]) == 'fuego'){
            respuestaFinal = [{"Text" : bibliotecaRespuestas[1]}]
            break;
        }
        if ((palabrasClave[j]) == 'escuela'){
            respuestaFinal = [{"Text" : bibliotecaRespuestas[3]}]
            break;
        }
        if ((palabrasClave[j])== 'herido'){
            respuestaFinal = [{'Text': bibliotecaRespuestas[4]}]
        }
        if ((palabrasClave[j])== 'banco'){
            respuestaFinal = [{'Text': bibliotecaRespuestas[4]}]
        }
        
        j++;
    } while (j < palabrasClave.length)


axios.post (direccionTraduceIdioma2, respuestaFinal, {
    headers : {
        'Ocp-Apim-Subscription-Key' : '58f9f4075c9c46bca61a78cfc71a45b6',
        'Ocp-Apim-Subscription-Region' : 'southcentralus',
        'Content-Type' : 'application/json'
    }
})
.then( respuesta => {
    console.log (respuesta.data[0].translations[0].text);
    //para establecer un chat y que se pueda seguir conversando con la inteligencia artifical
    //se establece el siguiente mecanismo:
    var decision = prompt ("Si desea añadir algo digite 1: ")
    if (decision = 1){
        var nuevaEmergencia = prompt ("Escriba: ");
        var Emergencia2 = [{"Text": nuevaEmergencia}];
        detectaIdioma (Emergencia2);
    }
})
.catch(error = console.log (error.data))
}

//Llamada a la función detecta idioma: 
detectaIdioma (Emergencia);


const bibliotecaRespuestas = []
    //en caso de robo armado:
bibliotecaRespuestas [0] =
    "La ayuda está en camino (revisar respuesta en la biblioteca de respuestas)";
    //en caso de incendio en el hogar: 
bibliotecaRespuestas [1] =
    "La ayuda está en camino (revisar respuesta en la biblioteca de respuestas)";
bibliotecaRespuestas [2] =
    //en caso de balacera en un lugar público: 
    "La ayuda está en camino (revisar respuesta en la biblioteca de respuestas)";
bibliotecaRespuestas [3] =
    //En caso de una balacera en la escuela: 
    "La ayuda está en camino (revisar respuesta en la biblioteca de respuestas)";
bibliotecaRespuestas [4] = 
    "La ayuda está en camino (revisar respuesta en la biblioteca de respuestas)";
        
