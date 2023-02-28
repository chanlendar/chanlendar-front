import { useEffect } from "react";

import useStores from "@/hooks/useStore";
import useCookie from "@/hooks/useCookie";

interface Props {}

const TryLoginAutomatically: React.FC<Props> = () => {
	const { profileStore } = useStores();
	const [getCookie, setCookie] = useCookie();

	useEffect(() => {
		if (getCookie("user")) {
			const { email, name, uid } = getCookie("user");
			profileStore.setProfile(email, name, uid);
			setCookie(
				"user",
				{
					email,
					name,
					uid,
				},
				{
					path: "/",
					sameSite: "strict",
					secure: true,
					maxAge: 3600 * 24,
				},
			);
		}
	}, []);

	return null;
};

export default TryLoginAutomatically;
