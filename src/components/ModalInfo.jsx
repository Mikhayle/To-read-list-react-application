import React from 'react'

export const ModalInfo = ({isError}) => {
    return (
        <div className={`modal-info ${isError ? "is-active" : ""}`}>
            <p className="modal-info__text">
                This book on the read list already!
                Choose another book from the search List
            </p>
        </div>
    )
}