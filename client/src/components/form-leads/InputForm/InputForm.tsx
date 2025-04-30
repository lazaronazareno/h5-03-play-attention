import {  FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<T extends FieldValues> = {
    label: string;
    placeholder: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    required?: boolean;
    error?: string;
    type?: "text" | "email" | "password";
  };  

const Input = <T extends FieldValues> ({ label, placeholder, type = "text", name, register, required = false , error, }: InputProps<T>) => {
  return (
    <div className="w-full relative h-[101px] p-3">
      <label 
        htmlFor={name} 
        className="absolute left-2 top-[-18px] text-green-500 font-semibold text-[14px] px-2 py-0.5 font-poppins"
      >
       {label}
      </label>
      <input
      id={name}
      type={type}
      placeholder={placeholder}
      {...register(name, { required: required ? `${label} es obligatorio` : false,  })}
      className={`w-full h-[58px] rounded-[6px] mx border-2 font-poppins text-[14px] font-normal align-middle bg-neutral-white2 pl-4 ${
        error ? "border-red-500 ring-red-500 text-red-600" : "border-violet-main text-blackNeutral-300"
      }`}
      /> {error && (
        <p className="mt-1 font-poppins text-[10px] leading-[10px] align-middle text-[red] px-2 py-1 rounded">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;