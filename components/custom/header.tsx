import Hero from "./hero";
import Nav from "./nav";

export default function Header() {
  return (
    <div className="h-dvh box-border p-4 flex flex-col">
      <Nav />
      <Hero />
    </div>
  );
}
