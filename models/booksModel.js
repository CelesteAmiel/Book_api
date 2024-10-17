const fs = require ('fs')
const path = require ('path')

const filePath = path.join(__dirname, '../data/books.json')
const booksModel= {
    readBooks: () => {
        const data = fs.readFileSync(filePath)
        return JSON.parse(data)
    },

    writeBooks: (book) => {
        const jsonData = JSON.stringify(books, null, 2)
        fs.writeFileSync(filePath, jsonData)
    }
}

module.exports = booksModel; 