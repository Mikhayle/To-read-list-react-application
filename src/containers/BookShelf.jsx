import React, { useCallback, useState } from "react"
import { ModalInfo } from "../components/ModalInfo"
import { ReadListService } from "../services"
import { Col, Grid } from "../components"
import { BooksList } from "./BooksList"
import { BookDetails } from "./BookDetails"
import { ReadList } from "./ReadList"

export const BookShelf = () => {
    const [selectedBook, setSelectedBook] = useState()
    const [isBookInRead, setIsBookInRead] =useState()
    const [readList, setReadList] = useState(ReadListService.readList)

    const handleBookSelection = useCallback((book) => {
        setIsBookInRead(false)
        setSelectedBook(book)
    }, [])

    const handleAddBook = useCallback((book) => {
        const isBookInList = ReadListService.readList.some(item => {
            return item.id === book.id
        })
        if (isBookInList) {
            setIsBookInRead(isBookInList)
        }
        if (!isBookInList) {
            const newReadList = ReadListService.addBook(book)
            setReadList(newReadList)
        }

    }, [])

    const handleMarkBook = useCallback((book) => {
        const newReadList = ReadListService.markBook(book.id)
        setReadList(newReadList)
    }, [])

    const handleDeleteBook = useCallback((book) => {
        const newReadList = ReadListService.deleteBook(book.id)
        setReadList(newReadList)
    }, [])


    return (
        <Grid>
            <Col>
                <BooksList
                    selectedBook={selectedBook}
                    onBookSelection={handleBookSelection}
                />
            </Col>
            <Col>
                {selectedBook && (
                    <BookDetails
                        selectedBook={selectedBook}
                        onAddBook={handleAddBook}
                    />
                )}
                {isBookInRead && (
                    <ModalInfo isError={isBookInRead} />
                )}
            </Col>
            <Col number={"readlist"}>
                <ReadList
                    readList={readList}
                    onMarkBook={handleMarkBook}
                    onDeleteBook={handleDeleteBook}
                />
            </Col>
        </Grid>
    )
}
