import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

type Property = {
  title: string;
  price: number;
  image: string;
  url: string;
};
export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="relative flex flex-col gap-4 rounded-3xl overflow-hidden w-full">
      <div className="h-[350px]">
        <Image
          src={property.image}
          height={200}
          width={600}
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white w-[90%] p-4 rounded-3xl flex items-center justify-between">
        <div className="flex-1 flex-col gap-2">
          <p className="text-sm text-gray-500 pb-1">{property.title}</p>
          <span className="text-xl text-gray-700 font-semibold">{property.price.toLocaleString()}</span>
        </div>
        <Button variant="ghost" size="lg">
          View <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
