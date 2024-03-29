import React, { useEffect, useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "./Create.css";

const categories = [
	{ value: "Development", label: "Development" },
	{ value: "Design", label: "Design" },
	{ value: "Sales", label: "Sales" },
	{ value: "Marketing", label: "Marketing" },
];

const Create = () => {
	const { documents } = useCollection("users");
	const [users, setUsers] = useState([]);
	const { user } = useAuthContext();
	const { addDocument, response } = useFirestore("projects");
	const navigate = useNavigate();
	// form field values
	const [name, setName] = useState("");
	const [details, setDetails] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [category, setCategory] = useState("");
	const [assignedUsers, setAssignedUsers] = useState([]);
	const [formError, setFormError] = useState(null);

	useEffect(() => {
		if (documents) {
			const options = documents.map(user => {
				return { value: user, label: user.displayName };
			});
			setUsers(options);
		}
	}, [documents]);

	const handleSubmit = async e => {
		e.preventDefault();
		setFormError(null);

		if (!category) {
			setFormError("Please select a project category");
			return;
		}
		if (assignedUsers.length < 1) {
			setFormError("Please assign at least to 1 user");
			return;
		}

		const createdBy = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			id: user.uid,
		};

		const assignedUsersList = assignedUsers.map(u => {
			return {
				displayName: u.value.displayName,
				photoURL: u.value.photoURL,
				id: u.value.id,
			};
		});

		const project = {
			name,
			details,
			dueDate: timestamp.fromDate(new Date(dueDate)),
			category: category.value,
			comments: [],
			createdBy,
			assignedUsersList,
		};

		// console.log(project);
		await addDocument(project);
		if (!response.error) {
			navigate("/");
		}
	};

	return (
		<div className="create-form">
			<h2 className="page-title">Create a new Project</h2>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Project name:</span>
					<input
						required
						type="text"
						onChange={e => setName(e.target.value)}
						value={name}
					/>
				</label>
				<label>
					<span>Project Details:</span>
					<textarea
						required
						onChange={e => setDetails(e.target.value)}
						value={details}
					></textarea>
				</label>
				<label>
					<span>Set due date:</span>
					<input
						required
						type="date"
						onChange={e => setDueDate(e.target.value)}
						value={dueDate}
					/>
				</label>
				<label>
					<span>Project category:</span>
					<Select
						options={categories}
						onChange={option => setCategory(option)}
					/>
				</label>
				<label>
					<span>Assign to:</span>
					<Select
						options={users}
						onChange={option => setAssignedUsers(option)}
						maxMenuHeight={100}
						isMulti
					/>
				</label>

				<button className="btn">Add Project</button>

				{formError && <p className="error">{formError}</p>}
			</form>
		</div>
	);
};

export default Create;
