import { cn } from "@/lib/utils";

interface ChevronDividerProps {
  color?: string;
  className?: string;
}

export default function ChevronDivider({
  color = "#8B0000",
  className,
}: ChevronDividerProps) {
  return (
    <svg
      viewBox="0 0 120 40"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("w-24 h-8", className)}
      fill="none"
    >
      <polyline
        points="4,4 60,36 116,4"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
