import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'reactstrap';

function Index() {

	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch('https://reqres.in/api/users');
				const data = await response.json();
				setUsers(data.data);
			} catch (error) {
				console.error('Failed to fetch users:', error);
			}
		};

		fetchUsers();
	}, []);


	return (
		<Container>
			<div className='mt-3 text-right'>
				<Button color='primary'>+ Add User</Button>
			</div>

			<Table className='mt-3'>
				<thead>
					<tr>
						<th>ID</th>
						<th>Profile</th>
						<th>Email</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th />
					</tr>
				</thead>

				<tbody>

					{users.map((user) => (
						<tr key={user.id}>
							<th scope='row'>{user.id}</th>
							<td>
								<img src={user.avatar}></img>
							</td>
							<td>{user.email}</td>
							<td>{user.first_name}</td>
							<td>{user.last_name}</td>
							<button>Edit</button>
							<button>Delete</button>
						</tr>
					))}

				</tbody>
			</Table>
		</Container>
	);
}

export default Index;
