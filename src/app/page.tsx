import Navigation from "./components/navigation/page";
import Hero from "./components/hero/page";
import AddNewTask from "./components/task_form/page";
import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <main className="lg:flex min-h-screenp-24 bg-dark-blue-bg">
      <div className="flex-none">
      <Navigation />
      </div>
      <div className="w-full lg:mx-10 lg:px-5 px-10 lg:my-10 py-5">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-white text-4xl font-semibold py-5 w-full">Dashboard</h1>
          <SearchBar />
        </div>
        <Hero />
        </div>
      {/* <AddNewTask /> */}
    </main>
  );
}
