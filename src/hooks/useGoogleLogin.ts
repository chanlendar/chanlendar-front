import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import useStores from "@/hooks/useStore";

export default function () {
	const { firebaseStore } = useStores();
	const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(
		firebaseStore.getAuth,
	);
	return { signInWithGoogle, user, loading, error };
}
