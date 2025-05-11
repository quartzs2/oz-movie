import { cn } from "@utils/cn";

const Button = ({ children, className, onClick, tag = "button", type = "button" }) => {
  const Tag = tag;

  return (
    <Tag
      className={cn(
        "flex p-2 items-center justify-center bg-black text-white rounded-xl",
        className
      )}
      onClick={onClick}
      type={tag === "button" ? type : undefined}
    >
      {children}
    </Tag>
  );
};
export default Button;
