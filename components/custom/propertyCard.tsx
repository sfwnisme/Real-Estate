import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import ButtonLink from "./buttonLink";

type Property = {
  title: string;
  price: number;
  image: string;
  url: string;
};
export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl overflow-hidden w-full">
      <div className="h-[350px]">
        <Image
          src={property.image}
          height={200}
          width={600}
          alt={property.title}
          className="w-full h-full object-cover grid"
        />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 p-4 w-full text-white font-medium backdrop-blur-2xl bg-transparent group-hover:bg-white max-xl:bg-white group-hover:bottom-5 max-xl:bottom-5 group-hover:rounded-2xl max-xl:rounded-2xl group-hover:w-[90%] max-xl:w-[90%] transition-all group-hover:transition-all duration-500 group-hover:duration-500 flex items-center">
        <div className="flex-1">
          <p className="text-sm group-hover:text-gray-500 max-xl:text-gray-500 pb-1">{property.title}</p>
          <span className="text-xl text-gray-700 font-semibold hidden group-hover:block max-xl:block">{property.price.toLocaleString()}</span>
        </div>
        <div className="block xl:hidden group-hover:block text-black">
          <ButtonLink href={property.url}>
            View all
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
