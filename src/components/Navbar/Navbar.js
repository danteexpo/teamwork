import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import Teamwork from "../../assets/team.svg";
import "./Navbar.css";

const Navbar = () => {
	const { logout, isPending } = useLogout();
	const { user } = useAuthContext();

	return (
		<div className="navbar">
			<ul>
				<li className="logo">
					<img src={Teamwork} alt="" />
					<span>Team Work</span>
				</li>
				{!user && (
					<>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/signup">Signup</Link>
						</li>
					</>
				)}
				{user && (
					<li>
						{isPending && (
							<button className="btn" disabled>
								Loading
							</button>
						)}
						{!isPending && (
							<button className="btn" onClick={logout}>
								Logout
							</button>
						)}
					</li>
				)}
			</ul>
		</div>
	);
};

export default Navbar;
