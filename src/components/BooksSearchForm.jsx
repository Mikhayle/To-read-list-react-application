import React, { useCallback } from 'react'

export const BooksSearchForm = ({ onSearch, isLoading }) => {
	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault()
			const formDataEntries = new FormData(e.target).entries()
			const data = Object.fromEntries(formDataEntries)
			onSearch(data)
		},
		[onSearch]
	)

	const handleClick = useCallback(() => {
		const readlist = document.getElementById("readlist")
		readlist.classList.add("is-active")
	}, [])

	return (
		<div className="search__form-wrapper">
			<form className="search__form" onSubmit={handleSubmit}>
				<input className="search__input" type="text" name="search" />
				<button className="search__btn-submit primary-btn" type="submit" disabled={isLoading}>
					Go!
				</button>
			</form>
			<button onClick={handleClick} className="search__btn-to-read-list">
				Read list
			</button>
		</div>
	)
}
