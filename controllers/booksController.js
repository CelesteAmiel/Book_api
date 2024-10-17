const booksModel = require ('../models/booksModel')
const responseView = require ('../views/responseFormatter')

const booksController = {
    getBooks : () => {
      const books = booksModel.readBooks()  
      return responseView.formatResponse(books)
    },
    //Método para agregar un libro
    addBook : (newBook) => {
      //llamamos a la función del modelo para que pueda leer los libros
      const books = booksModel.readBooks();
      books.push(newBook);
      booksModel.writeBooks(books)
      return responseView.formatResponse({ message: 'Libro agregado con éxito'})
    }
}
module.exports = booksController