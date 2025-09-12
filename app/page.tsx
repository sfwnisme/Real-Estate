import Nav from "@/components/custom/nav";
import Hero from "@/components/custom/hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "@/components/custom/header";
import ProprtiesGrid from "@/components/custom/propertiesGrid";
import Banner from "@/components/custom/banner";
import Blog from "@/components/custom/blog";
import Faq from "@/components/custom/faq";
import Title from "@/components/custom/title";
import Services from "@/components/custom/services";

export default function Home() {
  return (
    <div className="min-h-screen px-4 grid gap-16 md:gap-40">
      <Header />
      <ProprtiesGrid />
      <Blog />
      <Faq />
      <Services />
    </div>
  );
}
