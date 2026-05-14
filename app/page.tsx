import HomeComponent from "./components/home";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1 w-full bg-transparent">
        <HomeComponent />
      </main>
    </div>
  );
}
