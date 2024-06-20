import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const getSession = async () => await getServerSession(authOptions)

export const getCurrentUser = async () => {
	try {
		const session = await getSession()
		console.log(session)

		if (!session) return null

		return session.user
	} catch (e) {
		console.error(e)
		return null
	}
}
