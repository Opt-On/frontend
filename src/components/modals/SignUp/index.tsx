import { useState } from "react";
import { useAuth } from "@/context";
import { Dialog, Box, IconButton, Text, TextInput, FormControl, Button } from "@primer/react";
import { EyeClosedIcon, EyeIcon, XIcon } from "@primer/octicons-react";

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

    if (!email || !password || confirmPassword !== password) {
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
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    }
  };

  const Header = () => (
    <Box
      style={{
        paddingTop: "32px",
        paddingLeft: "32px",
        paddingRight: "32px",
        paddingBottom: "16px",
      }}
    >
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Text as='h1' style={{ fontWeight: 600, fontSize: 32, lineHeight: "160%" }}>
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
      <Text as='p' style={{ fontSize: 20, color: "#656d76" }}>
        Make your life easier next time.
      </Text>
    </Box>
  );

  const Body = () => (
    <Box
      style={{
        paddingBottom: "64px",
        paddingLeft: "32px",
        paddingRight: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      {error && (
        <Box
          style={{
            padding: "12px 16px 4px 16px",
            backgroundColor: "#ffebe9",
            border: "1px solid #ff7b72",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          <Text as='p' style={{ color: "#cf222e", fontSize: "14px" }}>
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
        {submitted && password !== confirmPassword && (
          <FormControl.Validation variant='error'>Passwords must match</FormControl.Validation>
        )}
      </FormControl>
      <FormControl required>
        <FormControl.Label>Confirm Password</FormControl.Label>
        <TextInput
          type={passwordVisibility ? "text" : "password"}
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

      <Box style={{ display: "flex", alignItems: "center", gap: "16px", width: "100%" }}>
        <hr style={{ flex: 1, borderWidth: "2px", borderColor: "#d0d7d3", marginTop: "8px" }} />
        <Text as='p' style={{ color: "#656d76", fontSize: "14px" }}>
          or continue with
        </Text>
        <hr style={{ flex: 1, borderWidth: "2px", borderColor: "#d0d7d3", marginTop: "8px" }} />
      </Box>

      <Box style={{ display: "flex", justifyContent: "center", gap: "32px" }}>
        <IconButton
          aria-labelledby=''
          onClick={loginWithGoogle}
          variant='invisible'
          icon={() => <img src='/google.svg' alt='Google Icon' width={40} height={40} />}
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
          icon={() => <img src='/github.svg' alt='Github Icon' width={38} height={38} />}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        />
      </Box>
      <Box style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
        <Text as='p' style={{ color: "#656d76", fontSize: "14px" }}>
          Don't have an account?{" "}
          <span onClick={handleToggleLogin} style={{ cursor: "pointer" }}>
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
