import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <>
      <header></header>
      <main className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr] min-h-screen md:divide-x divide-y md:divide-y-0">
        <section className="p-4"></section>
        <section className="p-4">
          <Header />
          <div className="flex flex-row">
            <Home />
          </div>
        </section>
        <section className="p-4"></section>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
