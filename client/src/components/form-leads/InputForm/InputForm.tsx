import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  label: string;
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  required?: boolean;
  error?: string;
  type?: "text" | "email" | "password";
};

const Input = <T extends FieldValues>({ label, placeholder, type = "text", name, register, required = false, error, }: InputProps<T>) => {
  return (
    <div className="relative flex w-full flex-col">
      <label
        htmlFor={name}
        className="px-2 py-0.5 font-poppins text-[14px] font-semibold text-green-500"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, { required: required ? `${label} es obligatorio` : false, })}
        className={`w-full h-[58px] rounded-[6px] mx border-2 font-poppins text-[14px] font-normal align-middle bg-neutral-white2 pl-4 ${error ? "border-red-500 ring-red-500 text-red-600" : "border-violet-main text-blackNeutral-300"
          }`}
      /> {error && (
        <p className="mt-1 rounded px-2 py-1 align-middle font-poppins text-[10px] leading-[10px] text-[red]">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
