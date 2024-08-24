import { cn } from "@/lib/utils";

export interface CalloutProps {
  children?: React.ReactNode;
  type?: "default" | "warning" | "danger";
}

export function Callout({
  children,
  type = "default",
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn(
        "my-10 w-full max-w-3xl pr-5 font-medium text-sm flex items-start rounded-md  border-l-[5px] border-b-[5px] border-gray-500 p-3 bg-stone-50 dark:bg-stone-950",
        {
          "border-red-400 bg-red-50 dark:bg-red-900": type === "danger",
          "border-yellow-300 bg-yellow-100 dark:bg-yellow-900":
            type === "warning",
        }
      )}
      {...props}
    >
      {children}
    </div>
  );
}
