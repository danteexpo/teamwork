import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Create from "./pages/Create/Create";
import Project from "./pages/Project/Project";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import OnlineUsers from "./components/OnlineUsers/OnlineUsers";
import { useAuthContext } from "./hooks/useAuthContext";
import "./App.css";

function App() {
	const { user, authIsReady } = useAuthContext();

	return (
		<div className="App">
			{authIsReady && (
				<BrowserRouter>
					{user && <Sidebar />}
					<div className="container">
						<Navbar />
						<Routes>
							{user && <Route path="/" element={<Dashboard />} />}
							{!user && <Route path="/" element={<Navigate to="/login" />} />}

							{user && <Route path="/login" element={<Navigate to="/" />} />}
							{!user && <Route path="/login" element={<Login />} />}

							{user && <Route path="/signup" element={<Navigate to="/" />} />}
							{!user && <Route path="/signup" element={<Signup />} />}

							{user && <Route path="/create" element={<Create />} />}
							{!user && (
								<Route path="/create" element={<Navigate to="/login" />} />
							)}

							{user && <Route path="/project/:id" element={<Project />} />}
							{!user && (
								<Route path="/project/:id" element={<Navigate to="/login" />} />
							)}
						</Routes>
					</div>
					{user && <OnlineUsers />}
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;
