const net = require('net')

const booksController = require('./controllers/booksController')
const { v4 } = require('uuid')

const {v4: uuidv4} = require('uuid');

//Función para validar si una cadena es JSON
function isJSON(str){
    return str.startsWith('{') && str.endsWith('}');
}

const server = net.createServer((socket)=>{
    console.log("Cliente conectado.");

    socket.on('data',(data)=>{
        const command = data.toString().trim();

        if (command === 'GET BOOKS'){
            //Obtenemos todos los libros
            const response = booksController.getBooks();
            socket.write(response);
        }else if(command.startsWith('ADD BOOKS')){
            const bookDataString = command.replace('ADD BOOKS ','')
            //Extraemos los datos del nuevo vehículo del comando

            if(isJSON(bookDataString)){
                const bookData = JSON.parse(bookDataString)
                //convierte los datos a un objeto JSON si la estructura es válida

    //Verificar que los datos sean un objeto como tal
            if (bookData && typeof bookData === 'object'){
                //Crear un nuevo libro con un ID único
                const newBook = {id: uuidv4(), ...bookData}
                const response = booksController.addBook(newBook)
                socket.write(response);
            }else{
                socket.write ('Datos de libro inválidos.')
            }
        }else{
            socket.write('Error: Formato de JSON no válido')
            }
        }else {
            socket.write('Comando no reconocido')
        }
        
    })
    socket.on('end', () =>{
        console.log('Cliente desconectado'); 
    })
});

server.listen(8080, () =>{
    console.log('TCP server listening on port 8080'); 
}); 