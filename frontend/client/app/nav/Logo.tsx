"use client"
import { AiOutlineCar } from "react-icons/ai"
import { useParamsStore } from "@/app/hooks/useParamsStore"

export const Logo = () => {
	const { reset } = useParamsStore()
	return (
		<div
			onClick={reset}
			className="cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500">
			<AiOutlineCar size={34} />
			<h3>Carau</h3>
		</div>
	)
}
