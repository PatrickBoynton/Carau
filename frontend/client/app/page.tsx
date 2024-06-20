import { Listings } from "@/app/auctions/Listings"

const Home = () => {
	return (
		<>
			<h1 className="text-3xl font-semibold">
				Carau - The Car Auction Platform
			</h1>
			<Listings />
		</>
	)
}

export default Home
