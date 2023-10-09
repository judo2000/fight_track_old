import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";
const Header = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <header className="bg-slate-800 shadow-md">
      <div className="flex justify-between max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-100">Fight</span>
            <span className="text-slate-400">Track</span>
          </h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="bg-slate-600 text-slate-300 hover:bg-slate-400 hover:text-slate-800 p-2">
              Home
            </li>
          </Link>
          <Link to="/">
            <li className="bg-slate-600 text-slate-300 hover:bg-slate-400 hover:text-slate-800 p-2">
              About
            </li>
          </Link>
          <Link to="/sign-up">
            <li className="bg-slate-600 text-slate-300 hover:bg-slate-400 hover:text-slate-800 p-2">
              Sign Up
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
