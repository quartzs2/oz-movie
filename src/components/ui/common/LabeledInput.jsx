import { cn } from "@utils/cn";

const LabeledInput = ({ className, error, onChange, placeholder, title, type = "text", value }) => {
  return (
    <div className={cn("flex flex-col w-[300px]", className)}>
      <label className="text-sm relative left-2" htmlFor={title}>
        {title}
      </label>
      <input
        className="border-2 border-gray-200 p-2 rounded-xl text-sm"
        id={title}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      <div className="text-sm text-red-600 relative left-2">{error}</div>
    </div>
  );
};

export default LabeledInput;
