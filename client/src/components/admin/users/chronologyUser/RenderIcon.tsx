interface Props {
	iconColor: "bg-teal-500 text-white" | "bg-red-500 text-white" | "bg-purple-500 text-white";
	children?: React.ReactNode;
}
const BoxIconChronologyUser = ({ iconColor, children }: Props) => {
	return (
		<div className={`flex items-center justify-center rounded-full ${iconColor}`}>
			<svg className="w-5" viewBox="0 0 20 20" fill="currentColor">
				{children}
			</svg>
		</div>
	);
};
export const RenderIcon = (icon: "check" | "x" | "dots") => {
	return {
		check: (
			<BoxIconChronologyUser iconColor="bg-teal-500 text-white">
				<path
					fillRule="evenodd"
					d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
					clipRule="evenodd"
				/>
			</BoxIconChronologyUser>
		),
		x: (
			<BoxIconChronologyUser iconColor="bg-red-500 text-white">
				<path
					fillRule="evenodd"
					d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
					clipRule="evenodd"
				/>
			</BoxIconChronologyUser>
		),
		dots: (
			<BoxIconChronologyUser iconColor="bg-purple-500 text-white">
				<path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
			</BoxIconChronologyUser>
		),
	}[icon];
};
