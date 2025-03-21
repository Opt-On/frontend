import { useAuth } from "@/context";
import { Dialog } from "@primer/react";
import { useState } from "react";

type LogInModalProps = {
  handleClose: (gesture: "close-button" | "escape") => void;
};

export const LogInModal: React.FC<LogInModalProps> = ({ handleClose }) => {
  const { loginWithGoogle, loginWithEmail, signUpWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleEmailAuth = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    if (isSignUp) {
      await signUpWithEmail(email, password);
    } else {
      await loginWithEmail(email, password);
    }
  };

  return (
    <Dialog onClose={handleClose} title="Log in or sign up">
      <button onClick={loginWithGoogle}>Log in with Google</button>

      <div>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handleEmailAuth}>
          {isSignUp ? "Sign Up" : "Log In"} with Email
        </button>
      </div>

      <p>
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Log In" : "Sign Up"}
        </button>
      </p>
    </Dialog>
  );
};
