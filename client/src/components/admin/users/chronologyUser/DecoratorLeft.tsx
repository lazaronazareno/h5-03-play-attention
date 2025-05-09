interface Props {
    fist: boolean;
    last: boolean;
}
const margenTopLines = "1";
const VerticalLine = ({ fist, last }: Props) => {
    if (fist) {
        return <div className={`absolute left-0 -bottom-${margenTopLines} h-1/3 w-1 bg-violet-main`}></div>;
    }
    if (last) {
        return <div className="absolute left-0 bottom-1/3 h-[120%] w-1 bg-violet-main transform translate-y-1"></div>;
    }
    return <div className={`absolute left-0 bottom-1/3 h-[120%] w-1 bg-violet-main transform translate-y-1`}></div>;
} 
export const DecoratorLeft = ({ fist=false, last=false }: Props) => {
	return (
		<div className="absolute right-[101%] top-0 h-full w-12 flex items-center justify-center">
			{/* Línea vertical */}
			<VerticalLine fist={fist} last={last} />

			{/* Punto */}
			<div className="absolute right-0 top-2/3 h-3 w-3 rounded-full bg-violet-main"></div>
			{/* Línea horizontal */}
			<div className={`absolute left-0 top-2/3 h-1 w-full bg-violet-main mt-${margenTopLines}	`}></div>
		</div>
	);
};
