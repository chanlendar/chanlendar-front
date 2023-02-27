import { css, useTheme } from "@emotion/react";
import Subject from "./Subject";

interface Props {}

const CreateButton: React.FC<Props> = () => {
	const theme = useTheme();

	return <Subject>+</Subject>;
};

export default CreateButton;
