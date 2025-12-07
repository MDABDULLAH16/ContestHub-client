 
import { auth } from './../../firebase/firebase.config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const GoogleSignInButton = () => {
      const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          console.log("Google signed in user:", result.user);
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