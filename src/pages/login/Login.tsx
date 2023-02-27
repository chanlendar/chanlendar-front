import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { hasNull } from "@/utils";
import { updateMyProfile } from "@/apis/users";
import useStores from "@/hooks/useStore";
import Page from "@/components/Page";
import Google from "@/icons/Google";

interface Props {}

const Login: React.FC<Props> = () => {
	const theme = useTheme();
	const { firebaseStore, profileStore } = useStores();
	const [_, setCookie] = useCookies(["user"]);
	const navigate = useNavigate();

	const onClick = async () => {
		const provider = new GoogleAuthProvider();
		const {
			user: { email, displayName, uid },
		} = await signInWithPopup(firebaseStore.getAuth, provider);

		if (!hasNull(email, displayName, uid)) {
			await updateMyProfile(email!, displayName!, uid);
			profileStore.setProfile(email!, displayName!, uid);
			setCookie(
				"user",
				{
					email,
					name: displayName,
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

		navigate("/daily", {
			replace: true,
		});
	};

	return (
		<LoginPage>
			<div
				css={{
					padding: "30px",
					backgroundColor: theme.login.backgroundColor,
					borderRadius: "6px",
					boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
				}}
			>
				<div
					css={{
						color: theme.login.welcomTextColor,
						userSelect: "none",
						marginBottom: "30px",
					}}
				>
					<h1
						css={{
							fontSize: "28px",
							marginBottom: "6px",
						}}
					>
						어서오세요!
					</h1>
					<span
						css={{
							fontSize: "12px",
							fontWeight: "lighter",
						}}
					>
						성공하려는 당신을 응원해요
					</span>
				</div>
				<div
					css={{
						width: "100%",
						border: `1px solid ${theme.login.buttonBorderColor}`,
						borderRadius: "6px",
						padding: "10px 15px",
						display: "flex",
						alignItems: "center",
						cursor: "pointer",
					}}
					onClick={onClick}
				>
					<Google />
					<span
						css={{
							marginLeft: "10px",
							fontSize: "12px",
							color: theme.login.buttonTextColor,
						}}
					>
						Google 계정으로 시작하기
					</span>
				</div>
			</div>
		</LoginPage>
	);
};

const LoginPage = styled(Page)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default Login;
