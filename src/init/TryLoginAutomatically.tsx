import { useEffect } from "react";
import { useCookies } from "react-cookie";

import useStores from "@/hooks/useStore";

interface Props {}

const TryLoginAutomatically: React.FC<Props> = () => {
	const [cookies, setCookie] = useCookies(["user"]);
	const { profileStore } = useStores();

	useEffect(() => {
		if (cookies["user"]) {
			const { email, name, uid } = cookies["user"];
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
