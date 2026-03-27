import { cn } from "@/lib/utils";

export function IconWithText({
  icon,
  text,
  style,
}: {
  icon: React.ReactNode;
  text: string | React.ReactNode;
  style?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div className={cn("text-[16px]", style)}>{text}</div>
    </div>
  );
}
