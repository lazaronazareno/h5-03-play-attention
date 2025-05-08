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
		<fieldset className="shadow-main relative flex flex-col rounded-md border-2 border-violet-main bg-white">
			<Typography text={title} variant="p" color="green" size="sm" weight="semibold" className="py-3 text-center" />
			<div className="grid grid-cols-2 gap-x-[24px] gap-y-[12px] px-4 py-3">
				{options.map((opt) => (
					<label key={opt.value} className="flex items-center gap-2 font-poppins text-[14px]">
						<input
							type="radio"
							value={opt.value}
							{...register(name)}
							className="h-[20px] w-[20px] appearance-none rounded-md border-[2px] border-violet-main checked:bg-violet-main"
							required={true}
						/>
						{opt.label}
					</label>
				))}
			</div>
			{error?.message && (
				<p className="mt-1 rounded px-2 py-1 font-poppins text-[10px] text-red-500">{error.message}</p>
			)}
		</fieldset>
	);
};

export default RadioGroup;
