import { useAuth } from "@/context";
import { Dialog } from "@primer/react";

type LogInModalProps = {
  handleClose: (gesture: "close-button" | "escape") => void;
};

export const LogInModal: React.FC<LogInModalProps> = ({ handleClose }) => {
  const { user, loginWithGoogle, logout } = useAuth();

  console.log(user);
  return (
    <Dialog onClose={handleClose} title="Log in or sign up">
      {!user ? (
        <>
          <button onClick={loginWithGoogle}>Log in with Google</button>
        </>
      ) : (
        <>
          <h3>{user!.displayName}</h3>
          <button onClick={logout}>log out</button>
        </>
      )}
    </Dialog>
  );
};
