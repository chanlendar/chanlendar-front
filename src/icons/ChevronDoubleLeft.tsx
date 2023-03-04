import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={14}
		height={14}
		viewBox="0 0 14 14"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
		css={{
			transform: "rotate(0.5turn)",
		}}
	>
		<g clipPath="url(#clip0_10_434)">
			<path
				d="M0 2.21375L1.74708 0.475422L8.24075 7L1.74708 13.5252L0 11.7863L4.76408 7L0 2.21375ZM10.5233 7L5.75925 11.7863L7.50633 13.5246L14 7L7.50633 0.474838L5.75925 2.21317L10.5233 7Z"
				fill="#beaaaa"
			/>
		</g>
		<defs>
			<clipPath id="clip0_10_434">
				<path
					d="M0 6C0 2.68629 2.68629 0 6 0H8C11.3137 0 14 2.68629 14 6V8C14 11.3137 11.3137 14 8 14H6C2.68629 14 0 11.3137 0 8V6Z"
					fill="white"
				/>
			</clipPath>
		</defs>
	</svg>
);
export default SVGComponent;
