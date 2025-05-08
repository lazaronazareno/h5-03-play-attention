import Typography from "@/components/ui/Typography";
import { FieldValues, Path, UseFormRegister, FieldError } from "react-hook-form";

type CheckboxGroupProps<T extends FieldValues> = {
	title: string;
	name: Path<T>;
	options: { label: string; value: string }[];
	register: UseFormRegister<T>;
	errors?: Partial<Record<Path<T>, FieldError>>;
};

const RadioGroup = <T extends FieldValues>({ title, name, options, register, errors }: CheckboxGroupProps<T>) => {
	const error = errors?.[name];

	return (
		<fieldset className="flex flex-col border-2 border-violet-main relative rounded-md bg-white shadow-main">
			<Typography text={title} variant="p" color="green" size="sm" weight="semibold" className="py-3 text-center" />
			<div className="grid grid-cols-2 gap-x-[24px] gap-y-[12px] px-4 py-3">
				{options.map((opt) => (
					<label key={opt.value} className="flex items-center gap-2 font-poppins text-[14px]">
						<input
							type="radio"
							value={opt.value}
							{...register(name)}
							className="w-[20px] h-[20px] border-[2px] border-violet-main rounded-md appearance-none checked:bg-violet-main"
							required={true}
						/>
						{opt.label}
					</label>
				))}
			</div>
			{error?.message && (
				<p className="text-[10px] font-poppins text-red-500 mt-1 px-2 py-1 rounded">{error.message}</p>
			)}
		</fieldset>
	);
};

export default RadioGroup;
