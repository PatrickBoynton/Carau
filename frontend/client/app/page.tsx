import { Listings } from "@/app/auctions/Listings"

export default function Home() {
	return (
		<>
			<h1 className="text-3xl font-semibold">
				Carau - The Car Auction Platform
			</h1>
			<Listings />
		</>
	)
}
