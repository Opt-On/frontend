import { useAuth } from "@/context";
import { Dialog } from "@primer/react";

type LogInModalProps = {
  handleClose: (gesture: "close-button" | "escape") => void;
};

export const LogInModal: React.FC<LogInModalProps> = ({ handleClose }) => {
  const { loginWithGoogle } = useAuth();

  return (
    <Dialog onClose={handleClose} title="Log in or sign up">
      <button onClick={loginWithGoogle}>Log in with Google</button>
    </Dialog>
  );
};
