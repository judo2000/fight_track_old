import { useEffect, useState } from "react";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
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
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
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
      </form>
    </div>
  );
};

export default RegisterScreen;
