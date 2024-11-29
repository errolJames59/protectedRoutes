import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main>
      <section>
        <Navbar className="bg-gray-600 shadow-lg"/>
      </section>
      <section>
        <Outlet />
      </section>
    </main>
  );
}

export default App;
