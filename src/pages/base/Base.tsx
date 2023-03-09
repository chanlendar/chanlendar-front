import { Navigate } from "react-router-dom";

interface Props {}

const Base: React.FC<Props> = () => {
	return <Navigate to="/daily" replace />;
};

export default Base;
