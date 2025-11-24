import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import React from "react";
import { FieldError, Merge } from "react-hook-form";

type FormErrorsParamType =
  | Merge<FieldError, (FieldError | undefined)[]>
  | undefined;
type CustomFormErrorsParamsType = (Record<string, Partial<{
  type: string | number;
  message: string;
}>> & Partial<{
  type: string | number;
  message: string;
}>) | undefined

export default function useFormErrors(
  errors: FormErrorsParamType | CustomFormErrorsParamsType,
  alert: boolean = false
): React.ReactNode {
  // if single error
  if (!Array.isArray(errors?.message)) {
    console.log("the error")
    const message = errors?.message;
    if(!message) return undefined
    const renderAlert = (
      <Alert variant="destructive">
        <AlertDescription>{message} </AlertDescription>
      </Alert>
    );
    const renderText = <small className="text-destructive text-xs">{message}</small>;
    const renderMessage = !alert ? renderText : renderAlert;
    return <div className="min-h-11">{renderMessage}</div>;
  }
  const messages = errors?.message.map((error) => error);
  if(messages?.length === 0) return undefined
  const uniqueMsgs = [...new Set(messages)];
  console.log("form error response", uniqueMsgs)
  const renderAlert = (
    <Alert variant="destructive" className="bg-destructive/5">
      {uniqueMsgs.map((msg, idx) => (
        <AlertDescription key={idx} className="text-destructive text-xs">{msg.msg} </AlertDescription>
      ))}
    </Alert>
  );
  const renderText = uniqueMsgs.map((msg) => (
    <small key={msg.msg} className="text-destructive text-xs">
      {msg.msg}
    </small>
  ));
  const renderMessages = !alert? renderText: renderAlert
  return <div className="min-h-11">{renderMessages}</div>;
}
