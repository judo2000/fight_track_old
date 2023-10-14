import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/sign-up");
      menu();
    } catch (err) {
      console.log(err);
    }
  };

  const menu = () => {
    let list = document.querySelector("ul");

    if (showMenu === false) {
      setShowMenu(true);
      list.classList.add("top-[80px]"), list.classList.add("opacity-100");
    } else {
      setShowMenu(false);
      list.classList.remove("top-[80px]"), list.classList.remove("opacity-100");
    }
  };

  return (
    <nav className="p-7 md:p5 bg-slate-900 shadow-md md:flex md:items-center md:justify-between">
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap cursor-pointer">
            <span className="text-slate-100">Fight</span>
            <span className="text-slate-400">Track</span>
          </h1>
        </Link>

        <span className="text-white text-3xl cursor-pointer mx-2 md:hidden block">
          {!showMenu ? (
            <GiHamburgerMenu onClick={menu} />
          ) : (
            <FaTimes onClick={menu} />
          )}
        </span>
      </div>
      <ul className="md:flex md:items-center md:justify-between z-[1] md:z-auto md:static absolute bg-slate-900 w-full left-0 md:w-auto md:py-0  py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
        <Link to="/" onClick={menu}>
          <li className="text-white text-xl hover:text-slate-300 hover:underline duration-500 mx-4 my-6 md:my-0 cursor-pointer">
            Home
          </li>
        </Link>

        <Link to="/about" onClick={menu}>
          <li className="text-white text-xl hover:text-slate-300 hover:underline duration-500 mx-4 my-6 md:my-0">
            About
          </li>
        </Link>

        {userInfo ? (
          <>
            <img
              src={userInfo.data.avatar}
              alt="Profile"
              className="rounded-full h-7 w-7 object-cover"
            />
            <li
              onClick={logoutHandler}
              className="text-white text-xl hover:text-slate-300 hover:underline duration-500 mx-4 my-6 md:my-0 cursor-pointer"
            >
              Log out
            </li>
          </>
        ) : (
          <Link to="/login" onClick={menu}>
            <button className="bg-slate-500 text-white font-[Poppins] duration-500 px-6 py-2 mx-4 hover:bg-slate-700 rounded-full">
              Get Started
            </button>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Header;
