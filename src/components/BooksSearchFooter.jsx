import React, { useCallback } from 'react'

export const BooksSearchFooter = ({ searchData, searchPage, isLoading, onNextPage, onPrevPage}) => {
	const { request, founds, start, pages } = searchData
	const isFoundsOver = founds > 100
	const isLastPage = searchPage === pages


	const handleClickNext = useCallback(() => {
		onNextPage(request)
	}, [searchData])

	const handleClickPrev = useCallback(() => {
		onPrevPage(request)
	}, [searchData])

	return (
		<div className="search__footer">
			{request
				? (
					<>
						<div className="search__info">
							<div className="search__founds">
								Founds: {founds}
							</div>
							<div className="search__start">
								{isLoading
									? `Start: Loading....`
									: `Start: ${start}`
								}
							</div>
							<div className="search__pages">
								Pages: {pages}
							</div>
						</div>
						{isFoundsOver
							? (
								<div className="search__btns-block">
									<button className="search__prev-page primary-btn" onClick={handleClickPrev} disabled={isLoading}>
										Prev
									</button>
									<button
										className="search__next-page primary-btn"
										onClick={handleClickNext}
										disabled={isLoading
											? isLoading
											: isLastPage
										}
									>
										Next
									</button>
								</div>
							)
							: ``
						}
					</>
				)
				: ``
			}
		</div>
	)
};