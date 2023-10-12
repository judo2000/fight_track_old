import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [google] = useGoogleMutation();

  const handleGoogleClick = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await google({
        firstName: result._tokenResponse.firstName,
        lastName: result._tokenResponse.lastName,
        email: result._tokenResponse.email,
        photo: result.user.photoURL,
      });
      dispatch(setCredentials({ ...res }));
      navigate("/profile");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="btn"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90"
    >
      Continue With Google
    </button>
  );
};

export default OAuth;
