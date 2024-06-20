"use client"
import { AiOutlineCar } from "react-icons/ai"
import { useParamsStore } from "@/app/hooks/useParamsStore"
import { usePathname, useRouter } from "next/navigation"

export const Logo = () => {
	const router = useRouter()
	const pathname = usePathname()
	const { reset } = useParamsStore()

	const doReset = () => {
		if (pathname !== "/") router.push("/")
		reset()
	}

	return (
		<div
			onClick={doReset}
			className="cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500">
			<AiOutlineCar size={34} />
			<h3>Carau</h3>
		</div>
	)
}
