"use client";

interface CustomLabelProps {
  sidebar?: boolean;
  labelText: string;
}

export const CustomLabel = ({ labelText, sidebar }: CustomLabelProps) => {
  return (
    <kbd
      className={`pointer-events-none inline-flex h-5 select-none
        items-center gap-1 rounded border bg-muted px-1.5 font-mono
        text-[10px] font-medium text-muted-foreground ${
          sidebar ? "border-indigo-500 animate-pulse" : "ml-auto"
        }`}
    >
      <span className="text-xs">{labelText}</span>
    </kbd>
  );
};
