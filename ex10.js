/* ## SERVIDOR DE TIEMPO (Ejercicio 10 de 13)  

¡Crea un Servidor de tiempo y hora TCP !  

El servidor debe escuchar conexiones TCP en el puerto indicado por el  
primer argumento del programa. Para cada conexión debes escribir la fecha  
actual y la hora en formato 24hs del siguiente modo:  

"AAAA-MM-DD hh:mm"  

seguido por un carácter newline('\n'). Tanto el mes, el día como la hora y  
minuto deben tener un 0 para ocupar 2 espacios, por ejemplo:  

"2013-07-06 17:42"  
─────────────────────────────────────────────────────────────────────────────  
## PISTAS  

Para este ejercicio crearemos un servidor TCP en lugar de usar el módulo  
HTTP usaremos el módulo net del núcleo de Node que tiene funcionalidades  
de red.

El módulo net tiene un método net.createServer() que recibe un callback. A
diferencia de otros callbacks en Node, el callback createServer() se llama
una vez por cada conexión entrante. La firma es la siguiente:

function callback (socket) { ...  }

net.createServer() devuelve una variable instancia de server. Para iniciar
la escucha del servicio hay que llamar a server.listen(portNumber).
Un ejemplo de un servidor Node típico es como sigue:

        const net = require('net')
        const server = net.createServer(function (socket) {
          // manejo del socket
        })
        server.listen(8000)

Recuerda usar el puerto recibido por argumento.

El objeto socket contiene información sobre la conexión y es un Stream
duplex, es decir que se puede escribir y leer a la vez.

Puedes usar socket.write(data) para escribir en el socket y luego
socket.end() para cerrar el socket. Alternativamente, el método end()
puede recibir un objeto de datos socket.end(data).

Para calcular la fecha puedes usar new Date() y luego llamar a algunos
métodos específicos:

        date.getFullYear()
        date.getMonth() // empieza en 0 +1
        date.getDate() // devuelve día del mes, empieza en 1 (COMPTE!!!!!!!!!!)
        date.getHours()
        date.getMinutes()

Otra opción más intrépida es usar el paquete strftime disponible en npm.      
La función strftime(formato, fecha) recibe un formato de fecha similar al     
date de UNIX. Más información de strftime en:
     (https://github.com/samsonjs/strftime) */

const net = require("node:net");

// manejo del socket

function createDate() {
  const date = new Date();
  // ANY
  let year = date.getFullYear();
  // MES
  let month = date.getMonth() + 1;
  if (month <= 9) {
    month = "0" + month;
  }
  // DIA
  let day = date.getDate();
  if (day <= 9) {
    day = "0" + day;
  }
  // HORA
  let hours = date.getHours();
  if (hours <= 9) {
    hours = "0" + hours;
  }
  // MINUTS
  let minutes = date.getMinutes();
  if (minutes <= 9) {
    minutes = "0" + minutes;
  }
  let actualDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes;
  console.log(actualDate);
}

const server = net.createServer(function (socket) {
  socket.end(createDate);
});

socket.listen(server