import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main>
      <section className="sticky top-0">
        <Navbar className="bg-gray-600 shadow-lg text-white"/>
      </section>
      <section className="mx-auto mt-8 text-center">
        <Outlet />
      </section>
    </main>
  );
}

export default App;
