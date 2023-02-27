import Subject from "./Subject";

interface Props {
	onClick: VoidFunction;
}

const CreateButton: React.FC<Props> = ({ onClick }) => {
	return <Subject onClick={onClick}>+</Subject>;
};

export default CreateButton;
