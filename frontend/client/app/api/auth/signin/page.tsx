import { EmptyFilter } from "@/app/components/EmptyFilter"

const Page = ({ searchParams }: { searchParams: { callbackUrl: string } }) => {
	return (
		<EmptyFilter
			title="You need to be logged in to do that."
			subtitle="Please click below to sign in."
			callbackUrl={searchParams.callbackUrl}
			showLogin
		/>
	)
}

export default Page
