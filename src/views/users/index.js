import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'reactstrap';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';

function Index() {
	const [currentPage, setCurrentPage] = useState(1);
	const [usersPerPage] = useState(10);

	const [addModalOpen, setAddModalOpen] = useState(false);
	const [editModalOpen, setEditModal] = useState(false);
	const [deleteModalOpen, setDeleteModal] = useState(false);

	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [userDelete, setUserDelete] = useState(null);

	const toggleAddModal = () => setAddModalOpen(!addModalOpen);
	const toggleEditModal = () => setEditModal(!editModalOpen);
	const toggleDeleteModal = () => setDeleteModal(!deleteModalOpen);

	const lastUserIndex = usersPerPage * currentPage;
	const firstUserIndex = lastUserIndex - usersPerPage;
	const currentUsers = users.slice(firstUserIndex, lastUserIndex);

	const totalPages = Math.ceil(users.length / usersPerPage);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch('https://reqres.in/api/users');
				const data = await response.json();
				setUsers(data.data);
			} catch (error) {
				console.error('Error in fetching users:', error);
			}
		};

		fetchUsers();
	}, []);

	const handleAddUser = async (newUser) => {
		const response = await fetch('https://reqres.in/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newUser),
		});

		const data = await response.json();
		console.log(data);

		const id = users.length + 1;
		const avatar = '/images/avatar.png';
		setUsers([...users, { id, avatar, ...newUser }]);
	};

	const handleEditUser = async (updatedUser) => {
		try {
			const response = await fetch(`https://reqres.in/api/users/${updatedUser.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedUser),
			});

			const data = await response.json();
			console.log(data);

			setUsers(users.map(user =>
				user.id === updatedUser.id ? { ...user, ...updatedUser } : user
			));
		} catch (error) {
			console.error('Failed to update user:', error);
		}
	};

	const handleDeleteUser = async (userId) => {
		try {
			await fetch(`https://reqres.in/api/users/${userId}`, {
				method: 'DELETE',
			});
			setUsers(users.filter(user => user.id !== userId));
		} catch (error) {
			console.error('Failed to delete user:', error);
		}
	};

	return (
		<Container>
			<div className='mt-3 text-right'>
				<Button color='primary' onClick={toggleAddModal}>+ Add User</Button>
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
					{currentUsers.map((user) => (
						<tr key={user.id}>
							<th scope='row'>{user.id}</th>
							<td>
								<img
									src={user.avatar}
									alt={`${user.first_name}'s avatar`}
									className="rounded-circle"
									style={{ width: '40px', height: '40px', objectFit: 'cover' }}
								/>
							</td>
							<td>{user.email}</td>
							<td>{user.first_name}</td>
							<td>{user.last_name}</td>
							<td>
								<div className="d-flex justify-content-center">
									<Button
										color="warning"
										size="sm"
										className="me-2"
										style={{ width: '60px' }}
										onClick={() => {
											setSelectedUser(user);
											toggleEditModal();
										}}
									>
										Edit
									</Button>
									<Button
										color="danger"
										size="sm"
										style={{ width: '60px' }}
										onClick={() => {
											setUserDelete(user);
											toggleDeleteModal();
										}}
									>
										Delete
									</Button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			{/* Pagination buttons */}
			<div className="d-flex justify-content-center align-items-center mt-3">
				<Button
					color="secondary"
					disabled={currentPage === 1}
					onClick={() => setCurrentPage(currentPage - 1)}
				>
					Previous
				</Button>

				<span className="mx-3">
					Page {currentPage} of {totalPages}
				</span>

				<Button
					color="secondary"
					disabled={currentPage === totalPages}
					onClick={() => setCurrentPage(currentPage + 1)}
				>
					Next
				</Button>
			</div>

			<AddUserModal
				isOpen={addModalOpen}
				toggle={toggleAddModal}
				onSubmit={handleAddUser}
			/>

			{selectedUser && (
				<EditUserModal
					isOpen={editModalOpen}
					toggle={toggleEditModal}
					onSubmit={handleEditUser}
					user={selectedUser}
				/>
			)}

			<DeleteUserModal
				isOpen={deleteModalOpen}
				toggle={toggleDeleteModal}
				onConfirm={() => handleDeleteUser(userDelete.id)}
				user={userDelete}
			/>
		</Container>
	);
}

export default Index;
