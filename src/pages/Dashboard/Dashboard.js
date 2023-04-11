import React, { useState } from "react";
import ProjectList from "../../components/ProjectList/ProjectList";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import ProjectFilter from "./ProjectFilter";
import "./Dashboard.css";

const Dashboard = () => {
	const { documents, error } = useCollection("projects");
	const [currentFilter, setCurrentFilter] = useState("all");
	const { user } = useAuthContext();

	const changeFilter = newFilter => {
		setCurrentFilter(newFilter);
	};

	const projects = documents
		? documents.filter(document => {
				switch (currentFilter) {
					case "All":
						return true;
					case "Mine":
						let assignedToMe = false;
						document.assignedUsersList.forEach(u => {
							if (user.uid === u.id) {
								assignedToMe = true;
							}
						});
						return assignedToMe;
					case "Development":
					case "Design":
					case "Sales":
					case "Marketing":
						return document.category === currentFilter;
					default:
						return true;
				}
		  })
		: null;

	return (
		<div>
			<h2 className="page-title">Dashboard</h2>
			{error && <div className="error">{error}</div>}
			{documents && (
				<ProjectFilter
					currentFilter={currentFilter}
					changeFilter={changeFilter}
				/>
			)}
			{documents && <ProjectList projects={projects} />}
		</div>
	);
};

export default Dashboard;
