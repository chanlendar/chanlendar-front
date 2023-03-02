import styled from "@emotion/styled";

interface Props {
	alert?: boolean;
	onClick?: VoidFunction;
}

const ContextMenuItem = ({
	children,
	alert = false,
	onClick,
}: React.PropsWithChildren<Props>) => {
	return (
		<Item alert={alert} onClick={onClick}>
			{children}
		</Item>
	);
};

const Item = styled.div<{ alert: boolean }>`
	padding: 10px;
	font-weight: bold;
	font-size: 14px;
	color: ${({ alert, theme }) => (alert ? "#E53935" : theme.contextMenu.color)};
`;

export default ContextMenuItem;
