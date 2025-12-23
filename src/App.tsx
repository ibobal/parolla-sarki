import { Outlet } from "react-router";
import "./App.css";
import Header from "./components/Header";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="grid grid-cols-1 md:grid-cols-[1fr_minmax(480px,1.5fr)_1fr] min-h-screen md:divide-x">
        <section className="hidden md:flex items-center justify-center text-gray-500">
          AD
        </section>
        <section className="flex flex-col">
          <Header />
          <Outlet />
        </section>
        <section className="hidden md:flex items-center justify-center text-gray-500">
          AD
        </section>
      </main>
    </ThemeProvider>
  );
}

export default App;
