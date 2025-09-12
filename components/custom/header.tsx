import Hero from "./hero";
import Nav from "./nav";

export default function Header() {
  return (
    <div className="h-[calc(100dvh-100px)] box-border flex flex-col">
      <Hero />
    </div>
  );
}
