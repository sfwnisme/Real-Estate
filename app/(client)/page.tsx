import Header from "@/components/custom/header";
import ProprtiesGrid from "@/components/custom/propertiesGrid";
import Blog from "@/components/custom/blog";
import Faq from "@/components/custom/faq";
import Services from "@/components/custom/services";
import { getProperties } from "@/firebase.conf";
import { Property } from "@/types/types";

export default async function Home() {
        
  const prop = await getProperties<Property[]>(5)
  console.log("sfwn data", prop)
  return (
    <div className="min-h-screen grid gap-16 md:gap-40">
      {/* <mark className="text-black">s{JSON.stringify(prop)}s</mark> */}
      <Header />
      <ProprtiesGrid />
      <Blog />
      <Faq />
      <Services />
    </div>
  );
}
