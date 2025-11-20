import React, { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type InputType = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;
type Props = {
  title: string;
  description?: string;
  error?: string;
  disableError?: boolean;
} & InputType;

const TextareaKit = forwardRef<HTMLTextAreaElement, Props>(
  (props: Props, ref) => {
    const {
      title,
      description,
      error,
      disableError,
      name,
      className,
      ...rest
    } = props;
    return (
      <div className={cn("flex flex-col", className)}>
        <Label className="h-[15px]" htmlFor={name}>
          {title}
        </Label>
        <div className="h-2" />
        <Textarea {...rest} ref={ref} id={name} />
        <small
          className="min-h-4 text-xs mt-1 text-primary/60"
          hidden={!description}
        >
          {description}
        </small>
        <small
          className="min-h-4 text-xs mt-1 text-destructive"
          hidden={disableError}
        >
          {error}
        </small>
      </div>
    );
  }
);

export default TextareaKit;
