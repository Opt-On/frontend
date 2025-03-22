import { useState } from "react";
import { useAuth } from "@/context";
import { Dialog, Box, IconButton, Text, TextInput, FormControl, Button } from "@primer/react";
import { EyeClosedIcon, EyeIcon, XIcon } from "@primer/octicons-react";
import styles from "./Login.module.scss";
import Image from "next/image";

type LoginProps = {
  toggleSignUp: () => void;
  handleClose: (gesture: "close-button" | "escape") => void;
};

export const Login: React.FC<LoginProps> = ({ toggleSignUp, handleClose }) => {
  const { loginWithGoogle, loginWithGitHub, loginWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleToggleSignUp = () => {
    handleClose("escape");
    toggleSignUp();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleEmailLogin = async () => {
    setSubmitted(true);
    setError("");

    if (!email || !password) {
      return;
    }

    try {
      const result = await loginWithEmail(email, password);
      if (result) {
        setEmail("");
        setPassword("");
        handleClose("close-button");
      } else {
        setError("Incorrect email or password. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const Header = () => (
    <Box className={styles.header}>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Text as='h1' className={styles.title}>
          Log in
        </Text>
        <IconButton
          onClick={() => handleClose("close-button")}
          size='large'
          icon={() => <XIcon size={24} />}
          variant='invisible'
          aria-labelledby='close'
        />
      </Box>
      <Text as='p' className={styles.subtitle}>
        Welcome back!
      </Text>
    </Box>
  );

  const Body = () => (
    <Box className={styles.body}>
      {error && (
        <Box className={styles.errorBox}>
          <Text as='p' className={styles.errorText}>
            {error}
          </Text>
        </Box>
      )}

      <FormControl required>
        <FormControl.Label>Email</FormControl.Label>
        <TextInput
          type='email'
          value={email}
          block
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: "8px" }}
        />
        {submitted && !email && (
          <FormControl.Validation variant='error'>Email is required</FormControl.Validation>
        )}
      </FormControl>
      <FormControl required>
        <FormControl.Label>Password</FormControl.Label>
        <TextInput
          type={passwordVisibility ? "text" : "password"}
          value={password}
          block
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: "8px" }}
          trailingAction={
            <TextInput.Action
              onClick={togglePasswordVisibility}
              icon={passwordVisibility ? EyeIcon : EyeClosedIcon}
              aria-label={passwordVisibility ? "Hide password" : "Show password"}
            />
          }
        />
        {submitted && !password && (
          <FormControl.Validation variant='error'>Password is required</FormControl.Validation>
        )}
      </FormControl>

      <Button variant='primary' size='large' onClick={handleEmailLogin}>
        Log in
      </Button>

      <Box className={styles.divider}>
        <hr />
        <Text as='p' className={styles.dividerText}>
          or continue with
        </Text>
        <hr />
      </Box>

      <Box className={styles.socialButtons}>
        <IconButton
          aria-labelledby=''
          onClick={loginWithGoogle}
          variant='invisible'
          icon={() => <Image src='/google.svg' alt='Google Icon' width={40} height={40} />}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        />
        <IconButton
          aria-labelledby=''
          onClick={loginWithGitHub}
          variant='invisible'
          icon={() => <Image src='/github.svg' alt='Github Icon' width={38} height={38} />}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        />
      </Box>
      <Box className={styles.toggleSignUp}>
        <Text as='p' className={styles.toggleText}>
          Don&#39;t have an account?{" "}
          <span onClick={handleToggleSignUp} className={styles.link}>
            Sign up
          </span>
        </Text>
      </Box>
    </Box>
  );

  return (
    <Dialog
      width='large'
      onClose={handleClose}
      title='Login or Sign Up'
      renderHeader={Header}
      renderBody={Body}
    />
  );
};