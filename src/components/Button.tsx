import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";

interface Props {
	full?: boolean;
	border?: boolean;
	onClick?: VoidFunction;
}

const Button = ({
	children,
	full = false,
	border = false,
	onClick,
}: React.PropsWithChildren<Props>) => {
	const theme = useTheme();
	const width = full ? "100%" : "auto";
	const backgroundColor = border ? theme.button.backgroundColor : "transparent";
	const borderColor = border ? theme.button.borderColor : backgroundColor;

	return (
		<StyledButton
			width={width}
			backgroundColor={backgroundColor}
			borderColor={borderColor}
			textColor={theme.button.textColor}
			onClick={onClick}
		>
			{children}
		</StyledButton>
	);
};

const StyledButton = styled.button<{
	width: string;
	backgroundColor: string;
	borderColor: string;
	textColor: string;
}>(
	({ width, backgroundColor, borderColor, textColor }) => `
	width: ${width};
	background-color: ${backgroundColor};
	padding: 9px 14px;

	color: ${textColor};
	font-weight: bold;
	font-size: 14px;

	border: 1px solid ${borderColor};
	border-radius: 4px;

	cursor: pointer;
`,
);

export default Button;
