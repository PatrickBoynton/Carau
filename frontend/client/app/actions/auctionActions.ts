"use server"

import { Auction, PagedResult } from "@/types"

export const getData = async (query: string): Promise<PagedResult<Auction>> => {
	const response = await fetch(`http://localhost:5014/search${query}`)
	const data = await response.json()
	if (!response.ok) throw new Error("Failed to fetch data")

	return data
}
