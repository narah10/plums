import Navigation from "./components/navigation/page";
import Hero from "./components/hero/page";
import SearchBar from "./components/SearchBar";
import DashFavorite from "./components/Dash-Favorite";
import Recents from "./components/Recents";
import DashCalendar from "./components/Dash-Calendar";

export default function Home() {
  return (
    <main className="lg:flex min-h-screenp-24 bg-dark-blue-bg">
      <div className="flex-none">
      <Navigation />
      </div>
      <div className="w-full lg:mx-10 lg:px-5 px-10 lg:my-10 py-5">
        <div className="flex lg:flex-row pb-10 flex-col justify-between lg:items-center">
          <h1 className="text-white text-4xl font-semibold py-5 w-full">Dashboard</h1>
          <SearchBar />
        </div>
        <Hero />
          <div className="flex justify-between align-center">
            <div className="w-full">
            <DashFavorite />
            <Recents />
            </div>
            <div className="w-full ml-10 mt-5">
            <DashCalendar />
            </div>
          </div>
        </div>
    </main>
  );
}
