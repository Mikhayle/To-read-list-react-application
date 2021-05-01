import React, { useCallback } from "react"

export const BookToReadCard = ({ book, onMarkBook, onDeleteBook }) => {
    const {title, subtitle, language, author_name} = book
    const handleMarkClick = useCallback(() => {
        onMarkBook(book)
    }, [onMarkBook])
    const handleDeleteClick = useCallback(() => {
        onDeleteBook(book)
    }, [onDeleteBook])
    return (
        <li className={`book-card ${book.read ? "wasted" : ""}`}>
            <h2 className="book-card__title">
                {title} &nbsp;
                <span>
                    ({language?.join(", ")})
                </span>
            </h2>
            <div className="book-card__subtitle">
                {subtitle}
            </div>
            <div className="book-card__author">
                Author: {author_name?.join(", ")}
            </div>
            {!book.read && (
                <div className="book-card__btn-block">
                    <button className="primary-btn book-card__btn" onClick={handleMarkClick}>Mark as read</button>
                    <button className="primary-btn book-card__btn" onClick={handleDeleteClick}>Remove from list</button>
                </div>
            )}
        </li>
    )
}
