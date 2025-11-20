import React, { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type InputType = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type Props = {
  title: string,
  description?: string,
  error?: string,
  disableError?: boolean,
  
} & InputType;

const InputKit = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {title, description, error, disableError, name, className, ...rest } = props
  return (
    <div className={cn("flex flex-col", className)}>
      <Label className="h-[15px]" htmlFor={name}>{title}</Label>
      <div className="h-2" />
      <Input {...ref} id={name} {...rest}/>
      <small className="min-h-4 text-xs mt-1 text-primary/60" hidden={!description}>
        {description}
      </small>
      <small className="min-h-4 text-xs mt-1 text-destructive" hidden={disableError}>
        {error}
      </small>
    </div>
  );
});

InputKit.displayName= "InputKit"
export default InputKit

