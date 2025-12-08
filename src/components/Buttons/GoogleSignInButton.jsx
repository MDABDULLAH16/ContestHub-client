import axios from "axios";
import { auth } from "./../../firebase/firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLocation } from "react-router";
 

const GoogleSignInButton = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosSecure = useAxiosSecure();
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google signed in user:", result.user);
      const newUser = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };
      axiosSecure.post("/users", newUser);
      // Redirect or perform other actions after successful sign-in
      window.location.replace(from);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        style={{
          width: "100%",
          padding: "10px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleSignInButton;
