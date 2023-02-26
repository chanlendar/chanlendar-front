import { Beforeunload } from "react-beforeunload";
import { useCookies } from "react-cookie";

interface Props {}

const UpdateUserCookieWhenExit: React.FC<Props> = () => {
	const [cookies, setCookie] = useCookies(["user"]);

	const onBeforeUnload = () => {
		if (cookies["user"]) {
			const user = cookies["user"];

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
