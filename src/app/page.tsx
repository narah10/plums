import Navigation from "./components/navigation/page";
import Hero from "./components/hero/page";

export default function Home() {
  return (
    <main className="flex min-h-screenp-24 bg-dark-blue-bg">
      <Navigation />
      <div className="max-w-75 flex justify-center flex-col m-auto h-screen">
        <div>
        <h1>Dashboard</h1>
        <Hero />
        </div>
      </div>
    </main>
  );
}
