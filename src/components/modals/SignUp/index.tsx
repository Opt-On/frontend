import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Dialog, Box, IconButton, Text, TextInput, FormControl, Button } from "@primer/react";
import { CheckIcon, EyeClosedIcon, EyeIcon, XIcon } from "@primer/octicons-react";
import styles from "./SignUp.module.scss";
import Image from "next/image";

type SignUpProps = {
  toggleLogin: () => void;
  handleClose: (gesture: "close-button" | "escape") => void;
};

export const SignUp: React.FC<SignUpProps> = ({ toggleLogin, handleClose }) => {
  const { loginWithGoogle, loginWithGitHub, signUpWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setconfirmPasswordVisibility] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateLength = (): boolean => {
    const lengthRegex = /^.{8,16}$/;
    return lengthRegex.test(password);
  };

  const validateUppercase = (): boolean => {
    const uppercaseRegex = /[A-Z]/;
    return uppercaseRegex.test(password);
  };

  const validateLowercase = (): boolean => {
    const lowercaseRegex = /[a-z]/;
    return lowercaseRegex.test(password);
  };

  const validateNumber = (): boolean => {
    const numberRegex = /\d/;
    return numberRegex.test(password);
  };

  const validateSpecialChar = (): boolean => {
    const specialCharRegex = /[!@#$%^&*()_+\-=]/;
    return specialCharRegex.test(password);
  };

  const validatePassword = (): boolean => {
    return (
      validateLength() &&
      validateUppercase() &&
      validateLowercase() &&
      validateNumber() &&
      validateSpecialChar()
    );
  };

  const validateEmail = (): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleToggleLogin = () => {
    handleClose("escape");
    toggleLogin();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const toggleConfirmPasswordVisibility = () => {
    setconfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  const handleEmailSignUp = async () => {
    setSubmitted(true);
    setError("");

    if (!email || validatePassword() || validateEmail() || confirmPassword !== password) {
      return;
    }

    try {
      const result = await signUpWithEmail(email, password);
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
          Create an account
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
        Make your life easier next time.
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
        {submitted && !validateEmail() && (
          <FormControl.Validation variant='error'>Please input an email</FormControl.Validation>
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
        {submitted && password !== confirmPassword && (
          <FormControl.Validation variant='error'>Passwords must match</FormControl.Validation>
        )}
        {submitted && !validatePassword() && (
          <FormControl.Validation variant='error'>
            Password must must meet all requirements
          </FormControl.Validation>
        )}
      </FormControl>
      <Box className={styles.passwordRequirements}>
        <Text
          as='p'
          className={validateLength() ? styles.valid : submitted && !validatePassword() ? styles.invalid : ""}
        >
          {validateLength() ? <CheckIcon /> : <XIcon />}
          Length (8-16 characters)
        </Text>
        <Text
          as='p'
          className={validateUppercase() ? styles.valid : submitted && !validatePassword() ? styles.invalid : ""}
        >
          {validateUppercase() ? <CheckIcon /> : <XIcon />}
          At least one uppercase letter
        </Text>
        <Text
          as='p'
          className={validateLowercase() ? styles.valid : submitted && !validatePassword() ? styles.invalid : ""}
        >
          {validateLowercase() ? <CheckIcon /> : <XIcon />}
          At least one lowercase letter
        </Text>
        <Text
          as='p'
          className={validateNumber() ? styles.valid : submitted && !validatePassword() ? styles.invalid : ""}
        >
          {validateNumber() ? <CheckIcon /> : <XIcon />}
          At least one number
        </Text>
        <Text
          as='p'
          className={validateSpecialChar() ? styles.valid : submitted && !validatePassword() ? styles.invalid : ""}
        >
          {validateSpecialChar() ? <CheckIcon /> : <XIcon />}
          At least one special character
        </Text>
      </Box>
      <FormControl required>
        <FormControl.Label>Confirm Password</FormControl.Label>
        <TextInput
          type={confirmPasswordVisibility ? "text" : "password"}
          value={confirmPassword}
          block
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ margin: "8px" }}
          trailingAction={
            <TextInput.Action
              onClick={toggleConfirmPasswordVisibility}
              icon={confirmPasswordVisibility ? EyeIcon : EyeClosedIcon}
              aria-label={confirmPasswordVisibility ? "Hide password" : "Show password"}
            />
          }
        />
        {submitted && !confirmPassword && (
          <FormControl.Validation variant='error'>
            Please confirm your password
          </FormControl.Validation>
        )}
        {submitted && password !== confirmPassword && (
          <FormControl.Validation variant='error'>Passwords must match</FormControl.Validation>
        )}
      </FormControl>

      <Button variant='primary' size='large' onClick={handleEmailSignUp}>
        Sign up
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
      <Box className={styles.toggleLogin}>
        <Text as='p' className={styles.toggleText}>
          Already have an account?{" "}
          <span onClick={handleToggleLogin} className={styles.link}>
            Log in
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