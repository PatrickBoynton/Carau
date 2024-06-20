"use client"
import { useState } from "react"
import { updateAuctionTest } from "@/app/actions/auctionActions"
import { Button } from "flowbite-react"

export const AuthTest = () => {
	const [loading, setLoading] = useState(false)
	const [result, setResult] = useState<any>()

	const handleUpdate = () => {
		setResult(undefined)
		setLoading(true)
		updateAuctionTest()
			.then(res => {
				setResult(res)
				setLoading(false)
			})
			.finally(() => setLoading(false))
	}
	return (
		<div className="flex items-center gap-4">
			<Button outline isProcessing={loading} onClick={handleUpdate}>
				Test Auth
			</Button>
			<div>{JSON.stringify(result, null, 2)}</div>
		</div>
	)
}
