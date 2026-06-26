import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Problem from "./components/Problem";

export default function page() {
  return (
    <main className="bg-[radial-gradient(circle,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-size-[7px_7px] scroll-smooth duration-300 transition-all">
      <nav className="fixed inset-0 p-7 sm:px-15 sm:py-10 h-fit">
        <Navbar/>
      </nav>
      <Hero/>
      <Problem/>
    </main>
  );
}
