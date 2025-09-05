import React from "react";
import { ArrowDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

type Props = {};

export default function Hero({}: Props) {
  return (
      <header
        className="relative h-full bg-red-500 bg-center bg-cover bg-no-repeat rounded-4xl"
        style={{ backgroundImage: "url('/hero-bg.webp" }}
      >
        {/* botton */}
        <Button
          variant="outline"
          size="lg"
          className="absolute bg-transparent backdrop-blur-sm bottom-4 left-1/2 -translate-x-1/2 text-white"
        >
          Explore homes <ArrowDown />
        </Button>
        {/* experts box */}
        <div className="flex flex-col items-center gap-4 bg-gray-100 rounded-3xl py-8 px-6 absolute md:bottom-4 md:top-auto top-1/2 md:right-4 right-1/2 md:translate-y-0 -translate-y-1/2 md:translate-x-0 translate-x-1/2 text-center">
          <h1 className="text-7xl font-medium">70+</h1>
          <p className="text-sm w-40">Experts working on your success</p>
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
  );
}
