import "./App.css";
import Header from "./components/Header";
import Game from "./pages/Game";

function App() {
  return (
    <>
      <header></header>
      <main className="grid grid-cols-1 md:grid-cols-[1fr_minmax(480px,1.5fr)_1fr] min-h-screen md:divide-x divide-y md:divide-y-0">
        <section className="text-center">AD</section>
        <section>
          <div>
            <Header />
            <Game />
          </div>
        </section>
        <section className="text-center">AD</section>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
