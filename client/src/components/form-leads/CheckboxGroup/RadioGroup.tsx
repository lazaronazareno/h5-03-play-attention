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
		<fieldset className="relative overflow-hidden border-none rounded-md bg-white mb-[24px] shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A]">
			<legend className="absolute top-[8px] left-1/2 -translate-x-1/2 text-[14px] text-center font-poppins w-full text-green-main">
				{title}
			</legend>
			<div className="mt-[42px] grid grid-cols-2 gap-x-[24px] gap-y-[12px] p-4">
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
