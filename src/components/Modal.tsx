import ReactModal from "react-modal";
import { useTheme, css } from "@emotion/react";

interface Props {
	isOpen: boolean;
	onRequestClose: VoidFunction;
	title: string;
	yesButtonText: string;
	yesButtonFunction: VoidFunction;
	cancelButtonFunction: VoidFunction;
}

const Modal = ({
	children,
	isOpen,
	onRequestClose,
	title,
	yesButtonText,
	yesButtonFunction,
	cancelButtonFunction,
}: React.PropsWithChildren<Props>) => {
	const theme = useTheme();

	return (
		<ReactModal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			shouldCloseOnOverlayClick
			shouldCloseOnEsc
		>
			<div
				css={css`
					padding: 20px;
					background-color: ${theme.modal.backgroundColor};
					border-radius: 5px;
					border: 1px solid ${theme.modal.borderColor};

					&:focus {
						outline: none;
					}
				`}
			>
				<div
					css={css`
						color: ${theme.modal.titleColor};
						font-size: 24px;
						font-weight: bold;
						margin-bottom: 30px;
					`}
				>
					{title}
				</div>
				{children}
				<div
					css={css`
						margin-top: 5px;
						display: flex;

						& > button:not(:first-of-type) {
							margin-left: 4px;
						}
					`}
				>
					<button
						css={css`
							padding: 8px 10px;
							font-size: 10px;
							border-radius: 4px;
							border: none;
							background-color: ${theme.modal.cancelButtonBackgroundColor};
							color: ${theme.modal.cancelButtonColor};
							cursor: pointer;
						`}
						onClick={cancelButtonFunction}
					>
						취소
					</button>
					<button
						css={css`
							padding: 8px 10px;
							font-size: 10px;
							border-radius: 4px;
							border: none;
							background-color: ${theme.modal.yesButtonBackgroundColor};
							color: ${theme.modal.yesButtonColor};
							cursor: pointer;
						`}
						onClick={yesButtonFunction}
					>
						{yesButtonText}
					</button>
				</div>
			</div>
		</ReactModal>
	);
};

export default Modal;
