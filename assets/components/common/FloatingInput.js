function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function FloatingInput({name, type, value, onChange, placeholder}) {
    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={name}
                className="text-slate-400 text-sm transition-all duration-300 ease-in-out peer-placeholder-shown:text-slate-400 peer-placeholder-shown:text-sm peer-focus:text-slate-700 peer-focus:text-xs"
            >
                {placeholder}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder=" "
                className="peer w-full bg-transparent placeholder-transparent text-slate-700 text-sm border border-slate-200 rounded-md pl-5 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            />
        </div>
    );
}