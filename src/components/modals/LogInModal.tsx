import { useState } from "react";
import { useAuth } from "@/context";
import { Dialog } from "@primer/react";

type LogInModalProps = {
  handleClose: (gesture: "close-button" | "escape") => void;
};

export const LogInModal: React.FC<LogInModalProps> = ({ handleClose }) => {
  const { loginWithGoogle, loginWithGitHub, loginWithEmail, signUpWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async () => {
    if (email && password) {
      await loginWithEmail(email, password);
      setEmail("");
      setPassword("");
      handleClose("close-button");
    }
  };

  const handleEmailSignUp = async () => {
    if (email && password) {
      await signUpWithEmail(email, password);
      setEmail("");
      setPassword("");
      handleClose("close-button");
    }
  };

  return (
    <Dialog onClose={handleClose} title="Log in or Sign up">
      <button onClick={loginWithGoogle}>Log in with Google</button>
      <button onClick={loginWithGitHub}>Log in with GitHub</button>
      
      <hr />

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
      <button onClick={handleEmailLogin}>Log in with Email</button>
      <button onClick={handleEmailSignUp}>Sign up with Email</button>
    </Dialog>
  );
};
