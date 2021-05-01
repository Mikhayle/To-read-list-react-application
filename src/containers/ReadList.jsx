import React, {useCallback} from "react"
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import { BookToReadCard } from "../components"



export const ReadList = ({ readList, onMarkBook, onDeleteBook }) => {
    const handleClick = useCallback(() => {
        const readlist = document.getElementById("readlist")
        readlist.classList.remove("is-active")
    }, [])

    return (
        <div className="read">
            <div className="read__header">
                <h3 className="read__title">To read list:</h3>
                <button onClick={handleClick} className="read__btn-close">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.021 1.0205L19.4058 19.4053M1.021 19.4053L19.4058 1.0205" stroke="#f8f7f7"/>
                    </svg>
                </button>
                <div className="read__prop read__prop--common">
                    {readList.length > 0
                        ? `${readList.length} book`
                        : ``
                    }
                </div>
                <div className="read__prop">
                    {readList.some(book => {
                        return book.read === true
                    })
                        ? `${readList.filter(book => {
                            return book.read
                        }).length
                        } read`
                        : ""
                    }
                </div>
            </div>
            <SimpleBar>
                <ul className="read__list">
                    {readList.map((book) => (
                        <BookToReadCard
                            key={book.id}
                            book={book}
                            onMarkBook={onMarkBook}
                            onDeleteBook={onDeleteBook}
                        />
                    )).sort((book) => {
                        if (book.props.book.read) return 1
                        return -1
                    })
                    }
                </ul>
            </SimpleBar>
        </div>
    )
}
