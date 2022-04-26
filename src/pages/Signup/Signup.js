import React, { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import "./Signup.css";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [thumbnail, setThumbnail] = useState(null);
	const [thumbnailError, setThumbnailError] = useState(null);
	const { signup, error, isPending } = useSignup();

	const handleFileChange = e => {
		setThumbnail(null);
		let selected = e.target.files[0];

		if (!selected) {
			setThumbnailError("Please select a file");
			return;
		}
		if (!selected.type.includes("image")) {
			setThumbnailError("Selected file must be an image");
			return;
		}
		if (selected.size > 100000) {
			setThumbnailError("Image file size mst be less than 100kb");
			return;
		}

		setThumbnailError(null);
		setThumbnail(selected);
	};

	const handleSubmit = e => {
		e.preventDefault();
		// console.log({ email, password, displayName, thumbnail });
		signup(email, password, displayName, thumbnail);
	};

	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<h2>Sign Up</h2>
			<label>
				<span>Email:</span>
				<input
					type="email"
					onChange={e => setEmail(e.target.value)}
					value={email}
					required
				/>
			</label>
			<label>
				<span>Password:</span>
				<input
					type="password"
					onChange={e => setPassword(e.target.value)}
					value={password}
					required
				/>
			</label>
			<label>
				<span>Username:</span>
				<input
					type="text"
					onChange={e => setDisplayName(e.target.value)}
					value={displayName}
					required
				/>
			</label>
			<label>
				<span>Picture:</span>
				<input type="file" required onChange={handleFileChange} />
				{thumbnailError && <div className="error">{thumbnailError}</div>}
			</label>
			{!isPending && <button className="btn">Sign Up</button>}
			{isPending && (
				<button className="btn" disabled>
					Loading
				</button>
			)}
			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default Signup;
