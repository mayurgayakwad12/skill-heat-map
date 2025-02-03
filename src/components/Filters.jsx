import * as React from 'react'
import { SKILLS, COLORS } from '../utils'
export default function Filters({ list, setFilterSkills }) {
	const [expand, setExpand] = React.useState(false)
	return (
		<div
			style={{
				width: '250px',
				borderRadius: '16px',
				color: 'black',
				position: 'absolute'
			}}
		>
			<div
				style={{
					display: 'flex',
					gap: '10px',
					alignItems: 'center',
					fontWeight: 'bold',
					cursor: 'pointer',
					width: '100px'
				}}
			>
				<div onClick={() => setExpand((prev) => !prev)}>Filters ⚙️</div>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '10px',
					padding: expand ? '16px' : '0px',
					fontWeight: 'bold',
					overflowY: 'scroll',
					maxHeight: expand ? '200px' : '0px',
					background: '#fff'
				}}
			>
				{SKILLS.sort().map((item) => {
					return (
						<div style={{ display: 'flex', gap: '10px' }}>
							<input
								id={item}
								type="checkbox"
								checked={list.includes(item)}
								onChange={(e) => {
									if (e.target.checked) {
										setFilterSkills((prev) =>
											[...prev, item].sort()
										)
									} else {
										setFilterSkills((prev) => {
											return prev
												.filter((e) => e !== item)
												.sort()
										})
									}
								}}
							/>
							<label htmlFor={item}>{item}</label>
						</div>
					)
				})}
			</div>
		</div>
	)
}
