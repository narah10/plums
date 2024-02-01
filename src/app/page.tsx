import Image from "next/image";
import Navigation from "./components/navigation/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navigation />
      <h1>Dashboard</h1>
    </main>
  );
}
