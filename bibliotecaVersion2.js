


//La biblioteca de emergencias básicamente son las emergencias que el programa tendría la 
//capacidad de manejar, por el momento, están en español pero podrían ser usadas en inglás. 
//(haciendo las modificaciones respectivas en el código). 

/*"1) Estoy atrapado en una balacera en la escuela"
    "I am caught in a shooting at school"

"2) Estoy atrapado en una balacera en el Banco"
    "I am caught in a bank shootout"

"3) Un ladron entro a mi casa y me esta amenazando con su arma"
    "A thief entered my house and is threatening me with his weapon"
    
"4) Mi casa se está incendiando y estoy atrapada dentro con mi hija, el fuego avanza rápido"
    "My house is on fire and I am trapped inside with my daughter, the fire is moving fast"*/


/*La biblioteca de respuestas o "bibliotecaRespuestas", son respuestas que contienen indicaciones de que hacer en emergencias 
específicas. Como son recomendaciones muy largas pueden ser reemplazadas por un mensaje de "la ayuda va en camino. 
Estas respuestas serían las que devolvería el programa cuando detecte de que situación de emergencia se trata. 
Estas mismas también son traducidas al idioma en el que está escrita la emergencia en la petición incial. 
Por ahora solo hay cuatro respuestas para emergencias específicas." */
var arrayIncendio = ['fuego', "incendio", "humo", "amigo", "casa"];
var arrayTiroteo =  ["amigo", "casa", "balacera", "tiroteo", "balazo", "bala", "pistola",
                     "estomago", "brazo", "Tiroteo escolar", "hay una balacera en", "tirar"];
var arrayHerida = ["higado", "corte", "balazo", "disparo", "tiroteo", "pierna", "cabeza", "amigo", "herido", "hirieron", "herida"];
exports.palabraClaveIncendio = (index) =>{
    return arrayIncendio[index];
}
exports.palabraClaveTiroteo = (index) =>{
    return arrayTiroteo[index];
}
exports.palabraClaveHerida = (index) => {
    return arrayHerida[index]
}
exports.find = (index) =>{
    switch (index) {
        case 0:
            return "Si se encuentra atrapado dentro de su hogar y no puede salir, dirijase a un lugar visible desde fuera " +
    "Cierre las puertas que pueda a su paso hasta llegar al lugar indicado. Si puede, bloquee "+
    "la rendija de la puerta con una tela mojada para que no pase el humo. "+
    "Usted también puede taparse nariz y boca con una tela mojada para evitar el humo "+
    "Mantenga la calma y haga señales para que sea más visible "+
    "Si está en su departamento y la parte baja del edificio se esta incendiando, por nada del mundo baje, "+
    "haga lo que ya se recomendó y evite que el humo entre a su departamento. "+
    "Si la parte alta del edificio se está incendiando, si puede, recoja las llaves de su departamento "+
    "y baje por las escaleras, o salga de su domicilio. ";
        case 1:
            return "Serenate y manten la calma, tu raciocinio es tu mejor recurso en estos casos. Lo primero es que evites "+
    "congelarte por el miedo, si estas atrapado dentro de una balacera en algún lugar público lo más "+
    "seguro es que existan rutas de escape, si la conoces, intenta utilizarlas. Sin embargo, si seguir esas "+
    "rutas no son seguras entonces no lo hagas, si parece seguro, no te confíes y visualiza tus movimientos, "+
    "piensa: ¿Qué pasillos tengo que atravesar para llegar ahí? ¿Cómo me debo mover?, debes moverte rápido "+
    "pero con sigilo y silencio, los tiradores suelen disparar a quemaropa contra cualquier objetivo, "+
    "para dispararte antes deben verte, evita ser visto moviendote en cunclillas o reptando, así también "+
    "evitas las balas perdidas. Si logras salir de manera segura alerta a las autoridades y si puedes ayudar "+
    "a personas que no saben que hacer o estan alteradas, hazlo, pero siempre manten la prioridad en ti mismo "+
    "o en menores. Si no puedes salir, busca un escondite como una habitación o cuarto, cierra la puerta, "+
    "bloqueala y aléjate ya que los tiradores suelen disparar a las puertas para que las balas las atraviesen, "+
    "esconde tu cuerpo y tirate al suelo pero no te cubras la cabeza, si un tirador te ve puede pensar que "+
    "ya estas muerto. No hagas ruido y mejor silecia tu teléfono. Si resultaste herido, tranquilizate, las "+
    "heridas de bala ya de por si son dificiles de tratar y que te alteres no ayuda. Aplica presión en el "+
    "orificio de la herida para intentar parar el sangrado, si la herida es en una extremidad puedes aplicar "+
    "Un torniquete lo más cerca de la herida pero siempre arriba, los torniquetes pueden detener la hemorragia "+
    "pero pueden causar daño, afloja el torniquete cada tanto para revisar el estado de la herida. Tranquilizate"+
    "la ayuda no tardará en llegar.";
    break;
    case 2:
        return "Si la herida está sangrando profusamente, llame al número local de emergencias, como el 911 (en los Estados Unidos)" +
        "Las heridas menores y las punciones se pueden tratar en casa. Proporcionar los primeros auxilios de manera oportuna puede " 
        + "ayudar a prevenir una infección, y por lo tanto, acelera la curación y reduce la cantidad de cicatrices."
        + "Siga los siguientes pasos:" + "EN CASO DE CORTADURAS MENORES:\n" + "Lávese las manos con jabón o un limpiador "
        + "antibacteriano para prevenir una infección." + "\nLuego, lave completamente la herida con agua y un jabón suave" +
        "\nUse presión directa para detener el sangrado." + "\nAplique un ungüento antibacteriano y un vendaje limpio que no" +
        " se pegue a la herida.\n" + "EN CASO DE PUNCIONES MENORES:\n" + "Lávese las manos con jabón o un limpiador antibacteriano" +
        "para prevenir una infección.\n" + "\nEnjuague el sitio de la punción durante al menos 5 minutos con agua corriente y" + 
        "luego lave con jabón." + "Busque objetos dentro de la herida (pero no hurgue). Si encuentra alguno, no lo retire."+ 
        " Acuda a la sala de emergencias o centro de urgencias." + "\nSi no puede ver nada dentro de la herida, pero falta un fragmento del objeto" 
        + " que la causó, busque también atención médica." + "\nAplique un ungüento antibacteriano y un vendaje limpio que" +
        " no se pegue a la herida."
        default:
            break;
    }
}