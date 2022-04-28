import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		fetch("http://localhost:5000/user")
			.then((res) => res.json())
			.then((data) => setUsers(data));
	}, []);

	const handleUserDelete = (id) => {
		const proceed = window.confirm("Are yoy Sure?");
		if (proceed) {
			const url = `http://localhost:5000/user/${id}`;
			fetch(url, {
				method: "DELETE",
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.deletedCount > 0) {
						console.log("deleted", data);
						const rest = users.filter((user) => user._id !== id);
						setUsers(rest);
					}
				});
		}
	};
	return (
		<div>
			<h2>Home</h2>
			<h3>Available users: {users.length}</h3>
			<ul>
				{users.map((user) => (
					<li key={user._id}>
						Name: {user.name} Email: {user.email} <Link to={`/update/${user._id}`}>update</Link>
						<button onClick={() => handleUserDelete(user._id)}>X</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
