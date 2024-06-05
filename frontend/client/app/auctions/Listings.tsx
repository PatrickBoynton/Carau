"use client"
import { AuctionCard } from "@/app/auctions/AuctionCard"
import { AppPagination } from "@/app/components/AppPagination"
import { getData } from "@/app/actions/auctionActions"
import { useEffect, useState } from "react"
import { Filters } from "@/app/auctions/Filters"
import { Auction, PagedResult } from "@/types"
import { useParamsStore } from "@/app/hooks/useParamsStore"
import { shallow } from "zustand/shallow"
import qs from "query-string"
import { EmptyFilter } from "@/app/components/EmptyFilter"

export const Listings = () => {
	const [data, setData] = useState<PagedResult<Auction>>()
	const params = useParamsStore(
		state => ({
			pageNumber: state.pageNumber,
			pageSize: state.pageSize,
			searchTerm: state.searchTerm,
			orderBy: state.orderBy,
			filterBy: state.filterBy,
		}),
		shallow,
	)

	const { setParams } = useParamsStore()
	const url = qs.stringifyUrl(
		{ url: "", query: params },
		{ skipEmptyString: true },
	)

	const setPageNumber = (pageNumber: number) => {
		setParams({ pageNumber })
	}

	useEffect(() => {
		getData(url).then(data => {
			setData(data)
		})
	}, [url])

	if (!data) return <h3>Loading...</h3>

	return (
		<>
			<Filters />
			{data.totalCount === 0 ? (
				<EmptyFilter showReset />
			) : (
				<>
					<div className="grid grid-cols-4 gap-6">
						{data.results &&
							data.results.map(auction => (
								<AuctionCard
									key={auction.id}
									auction={auction}
								/>
							))}
					</div>
					<div className="flex justify-center mt-4">
						<AppPagination
							currentPage={params.pageNumber}
							pageCount={data.pageCount}
							pageChanged={setPageNumber}
						/>
					</div>
				</>
			)}
		</>
	)
}
