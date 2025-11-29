import React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

type Props = {
  title: string;
  children: React.ReactNode;
  description?: string;
  className?: string;
  childrenClassName?: string;
  variant?: "default" | "container";
};

/**
 * Render a styled fieldset that optionally shows a header and separator.
 *
 * @param title - Header text displayed when `variant` is `"default"`.
 * @param variant - Controls layout: `"default"` renders the title, optional description, and a separator; `"container"` omits the header and separator.
 * @param description - Optional descriptive text shown under the title when `variant` is `"default"`.
 * @param className - Additional class names applied to the root fieldset element.
 * @param childrenClassName - Additional class names applied to the inner children container.
 * @returns The rendered fieldset element containing the optional header and the children container.
 */
export default function FieldSet({
  title,
  variant = "default",
  children,
  description,
  className,
  childrenClassName,
}: Props) {
  return (
    <fieldset className={cn("border rounded-lg w-full", className)}>
      {variant === "default" && (
        <div className="p-4 flex flex-col gap-1">
          <h3 className="text-md font-semibold text-primary">{title}</h3>
          {description && (
            <p className="text-[13px] text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {variant === "default" && <Separator />}
      <div className={cn("p-4 w-full", childrenClassName)}>{children}</div>
    </fieldset>
  );
}