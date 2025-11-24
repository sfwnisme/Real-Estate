import React from "react";
import InputWrapper from "./input-wrapper";
import { Input } from "../ui/input";

type Props = {};

export default function InputUrlPreView({}: Props) {
  return (
    <InputWrapper
      title="Slug"
      description={"new slug: " + origin + "/properties/"}
      childrenClassName="flex flex-row"
    >
      <div className="cursor-not-allowed border-r-0 rounded-r-none rounded-l-md border flex items-center justify-center px-2 text-muted-foreground text-sm">
        {origin + "/properties/"}
      </div>
      <Input type="text" className="rounded-l-none w-full grow" />
    </InputWrapper>
  );
}
