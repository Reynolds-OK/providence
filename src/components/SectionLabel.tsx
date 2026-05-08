import { cn } from "@/lib/utils";

interface SectionLabelProps {
  label: string;
  className?: string;
}

export default function SectionLabel({ label, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "block text-xs font-semibold uppercase tracking-widest text-[#808080]",
        className
      )}
    >
      {label}
    </span>
  );
}
