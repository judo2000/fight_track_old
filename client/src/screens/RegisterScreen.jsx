import { useEffect, useState } from "react";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import OAuth from "../components/OAuth";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isAthlete, setIsAthlete] = useState("");
  const [isCoach, setIsCoach] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        const res = await register({
          firstName,
          lastName,
          email,
          isAthlete,
          isCoach,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/profile");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <input
          type="text"
          id="firstName"
          value={firstName}
          placeholder="First Name"
          className="border p-3 rounded-lg"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          id="lastName"
          value={lastName}
          placeholder="Last Name"
          className="border p-3 rounded-lg"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Email"
          className="border p-3 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex">
          <span className="text-bold pr-2">I am an athlete </span>
          <input
            type="checkbox"
            id="isAthlete"
            value={true}
            className="border p-3 rounded-lg"
            onChange={(e) => setIsAthlete(e.target.value)}
          />
        </div>
        <div className="flex">
          <span className="text-bold pr-2">I am a coach </span>
          <input
            type="checkbox"
            id="isCoach"
            value={true}
            className="border p-3 rounded-lg"
            onChange={(e) => setIsCoach(e.target.value)}
          />
        </div>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          className="border p-3 rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm Password"
          className="border p-3 rounded-lg"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-70"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>{"Don't have an account?"}</p>
        <Link to="/login">
          <span className="text-blue-700">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default RegisterScreen;
