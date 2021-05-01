import React, { useState, useCallback } from "react"
import { OpenLibraryService } from "../services"
import { BooksSearchForm, BooksSearchFooter, BookCard } from "../components"
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import imgUrl from "../assets/img/spinner.gif"


export const BooksList = ({ selectedBook, onBookSelection }) => {
	const LIST_ITEMS_COUNT = 100
	const [booksList, setBooksList] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [booksListPage, setBooksListPage] = useState({ count: 1 })
	const [searchData, setSearchData] = useState({})

	const addId = (list) => {
		list.forEach(item => {
			item.id = item.key.split("/").pop()
		})
	}

	const handleEventTemplate = (response, query) => {
		addId(response.docs)
		setIsLoading(false)
		setBooksList(response.docs)
		setSearchData({
			request: query,
			founds: response.num_found,
			start: response.start,
			pages: Math.ceil(response.num_found / LIST_ITEMS_COUNT,)
		})
	}

	const handleSearch = useCallback(async ({ search }) => {
		setIsLoading(true)
		const response = await OpenLibraryService.searchBooks(search)
		handleEventTemplate(response, search)
	}, [])


	const handleNextPage = useCallback(async (search) => {
		setBooksListPage({ count: ++booksListPage.count })
		setIsLoading(true)
		const response = await OpenLibraryService.searchBooks(`${search}&page=${ booksListPage.count }`)
		handleEventTemplate(response, search)
	}, [])

	const handlePrevPage = useCallback(async (search) => {
		setBooksListPage({ count: --booksListPage.count })
		setIsLoading(true)
		const response = await OpenLibraryService.searchBooks(`${search}&page=${ booksListPage.count }`)
		handleEventTemplate(response, search)
	}, [])



	return (
		<div className="search">
			<BooksSearchForm isLoading={isLoading} onSearch={handleSearch} />
			<SimpleBar>
				<ul className="search__list">
					{isLoading
						? (
							<img src={`${imgUrl}`} alt="Loading" className="spinner" />
						)
						: booksList.map((book) => (
							<BookCard
								key={book.key}
								book={book}
								selectedBook={selectedBook}
								onBookSelection={onBookSelection}
							/>
						))}
				</ul>
			</SimpleBar>
			<BooksSearchFooter
				searchData={searchData}
				searchPage={booksListPage.count}
				isLoading={isLoading}
				onNextPage={handleNextPage}
				onPrevPage={handlePrevPage}
			/>
		</div>
	)
}
