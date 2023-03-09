import { css, useTheme } from "@emotion/react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import useCookie from "@/hooks/useCookie";

interface Props {}

const LogOut: React.FC<Props> = () => {
	const theme = useTheme();
	const [_, __, deleteCookie] = useCookie();
	const navigate = useNavigate();

	const onClick = () => {
		(async () => {
			const auth = getAuth();
			await auth.signOut();
			deleteCookie("user");
			navigate("/login", {
				replace: true,
			});
		})();
	};

	return (
		<div
			onClick={onClick}
			css={css`
				margin-right: 20px;
				color: ${theme.header.title.color};
				cursor: pointer;
				line-height: 24px;
			`}
		>
			로그아웃
		</div>
	);
};

export default LogOut;
