import ReactModal from "react-modal";

export default function () {
	ReactModal.setAppElement("#root");
	ReactModal.defaultStyles = {
		overlay: {
			position: "fixed",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: "rgba(0, 0, 0, 0.85)",
			// Overlay의 자식이 children이라 flex로 위치 조정 가능
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
	};
}
