import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

import Page from "@/components/Page";
import Google from "@/icons/Google";

interface Props {}

const Login: React.FC<Props> = () => {
	const theme = useTheme();
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
