import { useEffect, useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch, user } = useAuthContext();

	const logout = async () => {
		setError(null);
		setIsPending(true);

		try {
			// update status online to false
			await projectFirestore
				.collection("users")
				.doc(user.uid)
				.update({ online: false });

			// sign the user out
			await projectAuth.signOut();

			// dispatch logout action
			dispatch({ type: "LOGOUT" });

			// update state
			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			} else {
				setIsPending(false);
			}
		} catch (err) {
			if (!isCancelled) {
				setError(err.message);
				setIsPending(false);
			} else {
				setIsPending(false);
			}
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { logout, error, isPending };
};
