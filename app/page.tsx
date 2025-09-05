import Nav from "@/components/custom/nav";
import Hero from "@/components/custom/hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "@/components/custom/header";
import ProprtiesGrid from "@/components/custom/propertiesGrid";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <ProprtiesGrid />
    </div>
  );
}
