import { css, useTheme } from "@emotion/react";

interface Props {
	full?: boolean;
	border?: boolean;
}

const Button = ({
	children,
	full = false,
	border = false,
}: React.PropsWithChildren<Props>) => {
	const theme = useTheme();
	const width = full ? "100%" : "auto";
	const backgroundColor = border ? theme.button.backgroundColor : "transparent";
	const borderColor = border ? theme.button.borderColor : backgroundColor;

	return (
		<button
			css={css`
				width: ${width};
				background-color: ${backgroundColor};
				padding: 9px 14px;

				color: ${theme.button.textColor};
				font-weight: bold;
				font-size: 14px;

				border: 1px solid ${borderColor};
				border-radius: 4px;

				cursor: pointer;
			`}
		>
			{children}
		</button>
	);
};

export default Button;
