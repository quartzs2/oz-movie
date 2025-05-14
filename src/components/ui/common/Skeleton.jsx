import { cn } from "@utils/cn";

const Skeleton = ({ animation = "animate-pulse", className, height, isAnimate = true, width }) => {
  return (
    <div
      className={cn(
        width && height ? `w-[${width}] h-[${height}]` : "",
        "rounded-xl bg-gray-200",
        isAnimate ? animation : "",
        className
      )}
    ></div>
  );
};
export default Skeleton;
