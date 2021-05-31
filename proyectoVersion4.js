const axios = require ( 'axios' );
const prompt = require('prompt-sync') ();
const biblioteca = require('./bibliotecaVersion2');

//IMPORTANTE: Cuando ingrese tu emergencia, es
//decir, cuando respondas el apartado: "¿Cuál es su emergencia? (Describa su emergencia detalladamente):"
//respondas con la siguiente emergencia: "Estoy atrapado en una balacera en mi escuela",
//también puedes responder en inglés: "I am caught in a shooting at school."
//No uses las comillas ni ningún acento porque la terminal no reconoce palabras con tildes.
var emergencia = prompt ("¿Cuál es su emergencia? (Describa su emergencia detalladamente): " )

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
        .catch(error => console.log (error.data));
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
        .then(respuesta => {
        extraeFrases( respuesta.data[0].translations[0].text, codigoLenguaje );
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
        "languaje": "es",
        "id": "1",
        "text": texto
    }
]
}
var direcionExtraeFrases = 'https://southcentralus.api.cognitive.microsoft.com/text/analytics/v2.1/keyPhrases';

axios.post(direcionExtraeFrases, bodyExtraccion, {
headers: {
    'Ocp-Apim-Subscription-Key' : '8b4c7829af844bc699425c01e131246a',
    'Content-Type' : 'application/json'
}
})
.then (respuesta =>{ 
detectarSituacion(respuesta.data.documents[0].keyPhrases, codigolenguaje);
})
.catch(error => console.log (error.data));
}

function detectarSituacion(datos, codigoLenguaje) {
var situaciones_detectadas = [];
var incendio=0, tiroteo=0, herida=0; 
for (let index = 0; index < datos.length; index++) {
    for (let index2 = 0; index2 < 5; index2++) {
        if(datos[index].toLowerCase() == biblioteca.palabraClaveIncendio(index2)){
            incendio++;
            break;
        }
    }
}
for (let index = 0; index < datos.length; index++) {
    for (let index2 = 0; index2 < 10; index2++) {
        if(datos[index].toLowerCase() == biblioteca.palabraClaveTiroteo(index2)){
            tiroteo++;
            break;
        }
    }
}
for (let index = 0; index < datos.length; index++) {
for (let index2 = 0; index2 < 9; index2++) {
    if(datos[index].toLowerCase() == biblioteca.palabraClaveHerida(index2)){
        herida++;
        break;
    }
}
}
    if(incendio>=1){
        situaciones_detectadas.push("incendio");
    }
    if (tiroteo>=1) {
        situaciones_detectadas.push("tiroteo");
    }
    if(herida>=1){
        situaciones_detectadas.push("herida");
    }
detectaRespuesta(situaciones_detectadas, codigoLenguaje);   
}

//La función "traduceRespuesta" es la encargada de: 1) comparar las palabras clave que extrajo la función "extraerFrases"
//con palabras clave precargadas, el resultado de esa comparación será una respuesta la cual será traducida mediante una 
//petición al servicio de IA "Text Translator". 
function detectaRespuesta (situaciones_detectadas, codigoLenguaje){
    var j = 0;
    var respuestaFinal;
    var direccionTraduceIdioma2 = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=es&to='+codigoLenguaje;

    var ayuda = [];
    for (let index = 0; index < situaciones_detectadas.length; index++) {
        ayuda.push({"text" : "La situacion " + (index+1) + " es: '" + situaciones_detectadas[index] +
        "'\nPresiona " + (index+1) + " para verla"});
    }
        traducirSituaciones(direccionTraduceIdioma2, ayuda, situaciones_detectadas);  

}

function traducirSituaciones(direccionTraduceIdioma2, datos, situaciones_detectadas) {
    axios.post (direccionTraduceIdioma2, datos, {
        headers : {
            'Ocp-Apim-Subscription-Key' : '58f9f4075c9c46bca61a78cfc71a45b6',
            'Ocp-Apim-Subscription-Region' : 'southcentralus',
            'Content-Type' : 'application/json'
        }
        })
    .then( respuesta => {
        for (let index = 0; index < datos.length; index++) {
            console.log(respuesta.data[index].translations[0].text);   
        }
        if(situaciones_detectadas[0]!="0")
            opciones(direccionTraduceIdioma2, situaciones_detectadas);        
    }).catch(error => console.log (error.data))
}

function Traducir(direccionTraduceIdioma2, datos) {
    axios.post (direccionTraduceIdioma2, datos, {
        headers : {
            'Ocp-Apim-Subscription-Key' : '58f9f4075c9c46bca61a78cfc71a45b6',
            'Ocp-Apim-Subscription-Region' : 'southcentralus',
            'Content-Type' : 'application/json'
        }
        })
    .then( respuesta => {
        console.log(respuesta.data[0].translations[0].text);   
        if (datos[0].text != "Gracias por usar el programa") {
            PreguntarDesicion(direccionTraduceIdioma2);            
        }
    }).catch(error => console.log(error));  
}
//Para establecer un chat y que se pueda seguir conversando con la inteligencia artifical
    //se establece el siguiente mecanismo:  
function PreguntarDesicion(direccionTraduceIdioma2) {
    var decision = prompt ("Si desea añadir algo digite 1: ");
    if (decision == 1){
        var nuevaEmergencia = prompt ("Escriba: ");
        detectaIdioma (nuevaEmergencia);
    }else{
        Traducir(direccionTraduceIdioma2, [{"text" : "Gracias por usar el programa"}])
    }
}
function opciones(direccionTraduceIdioma2, situaciones_detectadas) {
    var IndexOpcions = prompt();
    switch (situaciones_detectadas[IndexOpcions-1]) {
        case "incendio":
                var help = [{"text" : biblioteca.find(0)}];
                Traducir(direccionTraduceIdioma2, help);
            break;
        case "tiroteo":
                var help = [{"text" : biblioteca.find(2)}];
                Traducir(direccionTraduceIdioma2, help);
            break;
        case "herida":
                var help = [{"text" : biblioteca.find(4)}];
                Traducir(direccionTraduceIdioma2, help);
            break;
        default:
            break;
    }
}
detectaIdioma (emergencia);
