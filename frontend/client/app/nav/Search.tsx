"use client"
import { FaSearch } from "react-icons/fa"
import { useParamsStore } from "@/app/hooks/useParamsStore"
import { ChangeEvent } from "react"

export const Search = () => {
	const { setParams, setSearchValue, searchValue } = useParamsStore()

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	const search = () => {
		setParams({ searchTerm: searchValue })
	}

	return (
		<div className="flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm">
			<input
				value={searchValue}
				onKeyDown={e => {
					if (e.key === "Enter") search()
				}}
				onChange={onChange}
				type="text"
				className="flex-grow
						   pl-5
						   bg-transparent
						   focus:outline-none
						   border-transparent
						   focus:border-transparent
						   focus:ring-0
						   text-md
						   text-gray-600"
				placeholder="Search for cars by make, model or color"
			/>
			<button onClick={search}>
				<FaSearch
					size={34}
					className="bg-red-400
					 	       text-white
					 	       rounded-full
					 	       p-2
					 	       mx-3
					 	       cursor-pointer"
				/>
			</button>
		</div>
	)
}
