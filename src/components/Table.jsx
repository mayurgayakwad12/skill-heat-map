import { SKILLS, COLORS } from '../utils'
import { useState } from 'react'
import Filters from './Filters'
export function Table({ skills = [] }) {
	const [filterSkills, setFilterSkills] = useState([...SKILLS].sort())
	const handleFilter = () => {}
	const Filter = () => <div></div>
	return (
		<div style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
			<Filters setFilterSkills={setFilterSkills} list={filterSkills} />
			<div style={{ marginTop: '18px' }}>
				{filterSkills.map((skill) => {
					return (
						<div
							style={{
								height: '32px',
								display: 'flex',
								alignItems: 'center'
							}}
							key={skill}
						>
							{skill}
						</div>
					)
				})}
			</div>
			<div style={{ display: 'flex' }}>
				{skills.map((user) => {
					const [a, b] = user.name.split(' ')
					const skill_set = user.data.data.skillset
						.map((s) => s.skills)
						.flat()
						.map((s) => ({
							name: s.name,
							score: s?.pos[0].consensus_score
						}))
					return (
						<div>
							<div
								style={{
									transform: 'rotate(325deg)',
									// marginBottom: 10,
									position: 'relative',
									top: -15
								}}
							>
								{a[0]} {b[0]}
							</div>
							{filterSkills.map((e) => {
								const found = skill_set.find(
									(f) => f.name === e
								)
								return (
									<div
										style={{
											width: '40px',
											height: '30px',
											backgroundColor:
												COLORS[found?.score] ||
												'#E9F5EE',
											margin: 2
										}}
									></div>
								)
							})}
						</div>
					)
				})}
			</div>
		</div>
	)
}
