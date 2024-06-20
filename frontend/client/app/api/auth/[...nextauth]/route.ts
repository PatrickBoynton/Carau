import NextAuth, { NextAuthOptions } from "next-auth"
import DuendeIdentityServer6 from "next-auth/providers/duende-identity-server6"

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		DuendeIdentityServer6({
			id: "id-server",
			clientId: "nextApp",
			clientSecret: "Not a secret!",
			issuer: "http://localhost:5002",
			authorization: { params: { scope: "openid profile Carau" } },
			idToken: true,
		}),
	],
	callbacks: {
		async jwt({ token, profile, account }) {
			if (profile) {
				token.username = profile.username
			}

			if (account) {
				token.access_token = account.access_token
			}
			return token
		},
		async session({ session, token, user }) {
			if (token) {
				session.user.username = token.username
			}
			return session
		},
	},
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
