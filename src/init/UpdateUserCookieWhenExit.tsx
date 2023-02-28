import useCookie from "@/hooks/useCookie";
import { Beforeunload } from "react-beforeunload";

interface Props {}

const UpdateUserCookieWhenExit: React.FC<Props> = () => {
	const [getCookie, setCookie] = useCookie();
	const onBeforeUnload = () => {
		if (getCookie("user")) {
			const user = getCookie("user");

			setCookie(
				"user",
				{
					...user,
				},
				{
					path: "/",
					sameSite: "strict",
					secure: true,
					maxAge: 3600 * 24,
				},
			);
		}
	};

	return <Beforeunload onBeforeunload={onBeforeUnload} />;
};

export default UpdateUserCookieWhenExit;
