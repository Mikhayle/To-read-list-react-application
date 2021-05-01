export class ReadListService {
    static #setReadList(readList) {
        localStorage.setItem('readList', JSON.stringify(readList))
    }

    static get readList() {
        const json = localStorage.getItem('readList')
        return json ? JSON.parse(json) : []
    }

    static addBook(book) {
        const newReadList = [...ReadListService.readList]
        const isBookInList =  newReadList.every(item => {
            return item.id !== book.id
        })
        if (isBookInList) {
            newReadList.push(book)
        }
        if (!isBookInList) {
            console.log(`Такая книга уже есть!`)
        }
        ReadListService.#setReadList(newReadList)
        return newReadList
    }

    static markBook(bookId) {
        const newArray = [...ReadListService.readList]
        newArray.map((item) => {
            if (item.id === bookId) {
                item.read = true
            }
        })
        ReadListService.#setReadList(newArray)
        return newArray
    }

    static deleteBook(bookId) {
        const newReadList = ReadListService.readList.filter((book) => {
            return book.id !== bookId
        })
        ReadListService.#setReadList(newReadList)
        return newReadList
    }
}
