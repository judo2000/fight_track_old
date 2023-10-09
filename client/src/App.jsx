import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <div>
          <Outlet />
        </div>
      </main>
      <ToastContainer />
    </>
  );
}
