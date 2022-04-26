import React from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from "../../assets/dashboard.svg";
import AddIcon from "../../assets/add.svg";
import Avatar from "../Avatar/Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Sidebar.css";

const Sidebar = () => {
	const { user } = useAuthContext();

	return (
		<div className="sidebar">
			<div className="sidebar-content">
				<div className="user">
					<Avatar src={user.photoURL} />
					<p>Hey {user.displayName}</p>
				</div>
				<nav className="links">
					<ul>
						<li>
							<NavLink to="/">
								<img src={DashboardIcon} alt="dashboard" />
								<span>Dashboard</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/create">
								<img src={AddIcon} alt="add project" />
								<span>New Project</span>
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Sidebar;
