"use client"
import { Button, ButtonGroup } from "flowbite-react"
import { useParamsStore } from "@/app/hooks/useParamsStore"
import { AiOutlineClockCircle, AiOutlineSortAscending } from "react-icons/ai"
import { BsStopCircleFill, BsStopwatchFill } from "react-icons/bs"
import { GiFinishLine, GiFlame } from "react-icons/gi"

const pageSizeButtons = [4, 8, 12]
const orderButtons = [
	{
		label: "Alphabetical",
		icon: AiOutlineSortAscending,
		value: "make",
	},
	{
		label: "End date",
		icon: AiOutlineClockCircle,
		value: "endingSoon",
	},
	{
		label: "Recently added",
		icon: BsStopCircleFill,
		value: "new",
	},
]

const filterButtons = [
	{
		label: "LiveAuctions",
		icon: GiFlame,
		value: "live",
	},
	{
		label: "Ending < 6 hours",
		icon: GiFinishLine,
		value: "endingSoon",
	},
	{
		label: "Completed",
		icon: BsStopwatchFill,
		value: "finished",
	},
]

export const Filters = () => {
	const { pageSize, setParams, orderBy, filterBy } = useParamsStore()
	return (
		<div className="justify-between items-center mb-4">
			<div>
				<span className="uppercase text-sm text-gray-500 mr-2">
					Filter By
				</span>
				<ButtonGroup>
					{filterButtons.map(({ label, icon: Icon, value }) => (
						<Button
							key={value}
							onClick={() => {
								console.log("value", value)
								setParams({ filterBy: value })
							}}
							color={`${filterBy === value ? "red" : "gray"}`}>
							<Icon className="mr-3 h-4 w-4" />
							{label}
						</Button>
					))}
				</ButtonGroup>
			</div>

			<div className="mt-2">
				<span className="uppercase text-sm text-gray-500 mr-2">
					Order By
				</span>
				<ButtonGroup>
					{orderButtons.map(({ label, icon: Icon, value }) => (
						<Button
							key={value}
							onClick={() => {
								console.log("value", value)
								setParams({ orderBy: value })
							}}
							color={`${orderBy === value ? "red" : "gray"}`}>
							<Icon className="mr-3 h-4 w-4" />
							{label}
						</Button>
					))}
				</ButtonGroup>
			</div>
			<div>
				<span className="uppercase text-sm text-gray-500 mr-2">
					Page Size
				</span>
				<ButtonGroup>
					{pageSizeButtons.map((value, index) => (
						<Button
							key={index}
							className="focus:ring-0"
							onClick={() => setParams({ pageSize: value })}
							color={`${pageSize === value ? "red" : "gray"}`}>
							{value}
						</Button>
					))}
				</ButtonGroup>
			</div>
		</div>
	)
}
