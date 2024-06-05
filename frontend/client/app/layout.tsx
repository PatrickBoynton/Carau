import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/app/nav/Navbar"
import { ReactNode } from "react"

export const metadata: Metadata = {
	title: "Carau - The Car Auction Platform",
	description: "A platform for buying and selling cars",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang="en">
			<body>
				<Navbar />
				<main className="container mx-auto px-5 pt-10">{children}</main>
			</body>
		</html>
	)
}
