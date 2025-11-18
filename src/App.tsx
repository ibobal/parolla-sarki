import "./App.css";
import Header from "./components/Header";
import Game from "./pages/Game";

function App() {
  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-[1fr_minmax(480px,1.5fr)_1fr] min-h-screen md:divide-x divide-gray-200">
        <section className="hidden md:flex items-center justify-center bg-gray-200 text-gray-500">AD</section>
        <section className="flex flex-col min-h-screen bg-white">
          <Header />
          <Game />
        </section>
        <section className="hidden md:flex items-center justify-center bg-gray-200 text-gray-500">AD</section>
      </main>
    </>
  );
}

export default App;
