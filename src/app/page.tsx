"use client";

import Navigation from "./components/navigation/page";
import Hero from "./components/hero/page";

export default function Home() {
  return (
    <main className="flex min-h-screenp-24 bg-dark-blue-bg">
      <Navigation />
      <div className="md:w-full md:mx-10 justify-center">
        <div>
        <h1 className="text-white md:text-4xl font-bold md:py-5">Dashboard</h1>
        <Hero />
        </div>
      </div>
    </main>
  );
}
