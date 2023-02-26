import Header from "@/components/Header";

interface Props {}

const BaseLayout = ({ children }: React.PropsWithChildren<Props>) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default BaseLayout;
