const net = require ('net')
const readline = require ('readline')

//Creamos la interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Creamos el cliente
const client = new net.Socket();

//Conexión con el servidor
client.connect(8080, 'localhost', ()=>{
    console.log("Conectado al servidor TCP");

    rl.question('Escribe un comando (Por ejemplo: GET BOOKS o ADD BOOKS ("title" : "El Alquimista", "author": "Paulo Coelho", "editorial": "Companhia das Letras")): ',(command) =>{
    client.write(command)//enviamos comando al servidor
    });
})

//Manejo de la respuesta del servidor
client.on('data', (data)=>{
    console.log("Respuesta del servidor: ");
    console.log(data.toString())//Convierte los datos a una cadeena de texto

    rl.close()//cierra la interfaz

    client.destroy()//Cierra la conexión con el server
});

//Manejo de evento close
client.on('close', ()=>{
    console.log('Conexion cerrada');
})