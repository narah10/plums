import Image from "next/image";
import Navigation from "./components/navigation/page";
import Hero from "./components/hero/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-dark-blue-bg">
      <Navigation />
      <Hero />
      <h1>Dashboard</h1>
    </main>
  );
}
