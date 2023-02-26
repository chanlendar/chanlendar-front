import { useEffect } from "react";
import { useCookies } from "react-cookie";

import useStores from "@/hooks/useStore";

interface Props {}

const TryLoginAutomatically: React.FC<Props> = () => {
	const [cookies] = useCookies(["user"]);
	const { profileStore } = useStores();

	useEffect(() => {
		if (cookies["user"]) {
			const { email, name, uid } = cookies["user"];
			profileStore.setProfile(email, name, uid);
		}
	}, []);

	return null;
};

export default TryLoginAutomatically;
