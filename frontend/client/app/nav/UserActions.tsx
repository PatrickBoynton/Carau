"use client"
import { Dropdown } from "flowbite-react"
import { User } from "next-auth"
import { HiCog, HiUser } from "react-icons/hi"
import Link from "next/link"
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from "react-icons/ai"
import { signOut } from "next-auth/react"

type Props = {
	user: Partial<User>
}

export const UserActions = ({ user }: Props) => {
	return (
		<Dropdown label={`Welcome ${user.name}`} inline>
			<Dropdown.Item icon={HiUser}>
				<Link href="/">My Auctions</Link>
			</Dropdown.Item>
			<Dropdown.Item icon={AiFillTrophy}>
				<Link href="/">Auctions Won</Link>
			</Dropdown.Item>
			<Dropdown.Item icon={AiFillCar}>
				<Link href="/">Sell My Car</Link>
			</Dropdown.Item>
			<Dropdown.Item
				icon={AiOutlineLogout}
				onClick={() => signOut({ callbackUrl: "/" })}>
				Sign Out
			</Dropdown.Item>
			<Dropdown.Divider />
			{/*Not for development*/}
			<Dropdown.Item icon={HiCog}>
				<Link href="/session">Session</Link>
			</Dropdown.Item>
		</Dropdown>
	)
}
