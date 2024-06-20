"use server"

import { Auction, PagedResult } from "@/types"
import { cookies, headers } from "next/headers"
import { NextApiRequest } from "next"
import { getToken } from "next-auth/jwt"

export const getData = async (query: string): Promise<PagedResult<Auction>> => {
	const response = await fetch(`http://localhost:5014/search${query}`)
	const data = await response.json()
	if (!response.ok) throw new Error("Failed to fetch data")

	return data
}

export const updateAuctionTest = async () => {
	const data = {
		mileage: Math.floor(Math.random() * 100000) + 1,
	}
	const token = await getTokenWorkaround()

	const response = await fetch(
		"http://localhost:5014/auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c",
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(data),
		},
	)

	if (!response.ok)
		return { status: response.status, message: response.statusText }

	return response.statusText
}

export const getTokenWorkaround = async () => {
	const req = {
		headers: Object.fromEntries(headers() as Headers),
		cookies: Object.fromEntries(
			cookies()
				.getAll()
				.map(c => [c.name, c.value]),
		),
	} as NextApiRequest

	return await getToken({ req })
}
