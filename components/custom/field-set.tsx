import React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

type Props = {
  title: string;
  children: React.ReactNode;
  legendClassName?: string;
  description?: string;
  className?: string;
  childrenClassName?: string;
};

export default function FieldSet({
  title,
  children,
  legendClassName,
  description,
  className,
  childrenClassName,
}: Props) {
  return (
    <fieldset className={cn("border rounded-lg w-full", className)}>
      <div className="p-4 flex flex-col gap-1">
        <h3 className="text-md font-semibold text-primary">{title}</h3>
        {description && (
          <p className="text-[13px] text-muted-foreground">{description}</p>
        )}
      </div>
      <Separator className="mb-" />
      <div className={cn("p-4 w-full", childrenClassName)}>{children}</div>
    </fieldset>
  );
}
