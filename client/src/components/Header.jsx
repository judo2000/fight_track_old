import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/sign-up");
    } catch (err) {
      console.log(err);
    }
  };

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
          {userInfo ? (
            <>
              <img
                src={userInfo.data.avatar}
                alt="Profile"
                className="rounded-full h-7 w-7 object-cover"
              />
              <li
                onClick={logoutHandler}
                className="bg-slate-600 text-slate-300 hover:bg-slate-400 hover:text-slate-800 p-2 cursor-pointer"
              >
                Logout
              </li>
            </>
          ) : (
            <Link to="/login">
              <li className="bg-slate-600 text-slate-300 hover:bg-slate-400 hover:text-slate-800 p-2">
                Sign In
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
