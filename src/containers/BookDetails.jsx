import React, { useCallback } from "react"
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

export const BookDetails = ({ selectedBook, onAddBook }) => {
    const {title, subtitle, language, has_fulltext, first_publish_year, publish_year} = selectedBook
    const handleClick = useCallback(() => {
        onAddBook(selectedBook)
    }, [selectedBook])

    if (selectedBook) {
        return (
           <SimpleBar>
               <div className="book-descr">
                   <h2 className="book-descr__title">
                       {title}
                   </h2>
                   <div className="book-descr__subtitle">
                       {subtitle
                           ? subtitle
                           : ``
                       }
                   </div>
                   <div className="book-descr__body">
                       <p className="book-descr__text">
                           Available languages:
                           <span>
                            {language
                                ? language.join(", ")
                                : "no information available"
                            }
                        </span>
                       </p>
                       <p className="book-descr__text">
                           Full text available: &nbsp;
                           <span>
                            {has_fulltext
                                ? "yes"
                                : "no"
                            }
                        </span>

                       </p>
                       <p className="book-descr__text">
                           First publish year:
                           <span>
                            {first_publish_year
                                ? first_publish_year
                                : "no information available"
                            }
                        </span>
                       </p>
                       <p className="book-descr__text">
                           Years published:
                           <span>
                            {publish_year
                                ? publish_year.join(", ")
                                : "no information available"
                            }
                        </span>
                       </p>
                   </div>
                   <button className="book-descr__btn-add primary-btn" onClick={handleClick}>Add book</button>
               </div>
           </SimpleBar>
        )
    }
}
