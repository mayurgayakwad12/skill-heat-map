import React from 'react'
import { Table } from './components/Table'
import { Loader } from './components/Loader'
import './App.css'

const App = () => {
	const [users, setUsers] = React.useState([])
	const [skills, setSkills] = React.useState([])
	const [loading, setLoading] = React.useState(false)
	const userFetched = React.useRef([])
	const fetchUsers = async () => {
		try {
			const response = await fetch(
				'https://forinterview.onrender.com/people'
			)
			const res = await response.json()
			setUsers(res)
		} catch (e) {
			console.log(e)
		}
	}

	const fetchSkills = async (id) => {
		setLoading(true)
		try {
			const response = await fetch(
				'https://forinterview.onrender.com/people' + `/${id}`
			)
			const res = await response.json()
			userFetched.current.push(id)
			setSkills((prev) => [...prev, res])
		} catch (e) {
			console.log(e)
		}
		setLoading(false)
	}

	React.useEffect(() => {
		fetchUsers()
	}, [])
	return (
		<div style={{ display: 'flex', padding: 20 }}>
			{loading && <Loader />}
			<div
				style={{
					marginTop: '5px',
					marginRight: 40,
					border: '1px solid #000000',
					// padding: '10px',
					width: 200
				}}
			>
				<h3
					style={{
						margin: '10px auto',
						paddingBottom: '8px',
						display: 'flex',
						alignItems: 'center',
						borderBottom: '1px solid #000000',
						cursor: 'pointer',
						paddingLeft: '10px'
					}}
				>
					Most Recommended
				</h3>
				{users.map((user) => {
					const isUserSelected = userFetched.current.includes(user.id)
					return (
						<div
							key={user.id}
							style={{
								margin: '10px auto',
								paddingBottom: '8px',
								width: '90%',
								display: 'flex',
								alignItems: 'center',
								borderBottom: '1px solid #000000',
								cursor: 'pointer'
							}}
							onClick={() => {
								if (!isUserSelected) {
									fetchSkills(user.id)
								}
							}}
						>
							<span
								style={{
									cursor: 'pointer',
									color: isUserSelected ? 'gray' : ''
								}}
							>
								👤 {user.name}
							</span>
						</div>
					)
				})}
			</div>
			<Table skills={skills} />
		</div>
	)
}

export default App
