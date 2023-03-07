import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={14}
		height={14}
		viewBox="0 0 24 24"
		{...props}
	>
		<path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
	</svg>
);
export default SVGComponent;
