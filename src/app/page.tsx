import Navigation from "./components/navigation/page";
import Hero from "./components/hero/page";
import AddNewTask from "./components/task_form/page";

export default function Home() {
  return (
    <main className="lg:flex min-h-screenp-24 bg-dark-blue-bg">
      <div className="flex-none">
      <Navigation />
      </div>
      <div className="w-full lg:mx-10 lg:px-5 px-10 lg:my-10 py-5">
        <h1 className="text-white text-4xl font-semibold py-5">Dashboard</h1>
        <Hero />
        </div>
    </main>
  );
}
