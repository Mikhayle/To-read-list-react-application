import React, { useCallback } from 'react'

export const BookCard = ({ book, selectedBook, onBookSelection }) => {
    const handleClick = useCallback(() => {
        onBookSelection(book)
    }, [book])
    const isBookSelected = selectedBook?.id === book.id

    return (
        <li
            onClick={handleClick}
            className={`book-card ${isBookSelected ? 'selected' : ''}`}
        >
            <h2 className="book-card__title">
                {book.title} &nbsp;
                <span>
                    ({book.language?.join(", ")})
                </span>
            </h2>
            <div className="book-card__subtitle">
                <small>{book.subtitle}</small>
            </div>
        </li>
    )
}
