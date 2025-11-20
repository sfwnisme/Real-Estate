import React, { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  title: string,
  description?: string,
  error?: string,
  disableError?: boolean,
  name?: string,
  className?: string,
  children: React.ReactNode
};

export default function InputWrapper (props: Props) {
  const {title, description, error, disableError, name, className, children} = props
  return (
    <div className={cn("flex flex-col w-full", className)}>
      <Label className="h-[15px]" htmlFor={name}>{title}</Label>
      <div className="h-2" />
      {children}
      <small className="min-h-4 text-xs mt-1 text-primary/60" hidden={!description}>
        {description}
      </small>
      <small className="min-h-4 text-xs mt-1 text-destructive" hidden={disableError}>
        {error}
      </small>
    </div>
  );
}



