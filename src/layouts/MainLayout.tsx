import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function MainLayout() {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <header>
          <Header />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
