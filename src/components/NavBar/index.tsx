"use client";

import SliderButton from "@/components/SliderButton";
import { useAuth } from "@/context";
import { Avatar, Box, Button } from "@primer/react";
import { useState } from "react";
import { Login } from "../modals/Login";
import { Profile } from "../modals/Profile";
import { SignUp } from "../modals/SignUp";

export default function NavBar() {
  const { user, avatar } = useAuth();
  const [displayLogin, setDisplayLogin] = useState<boolean>(false);
  const [displaySignUp, setDisplaySignUp] = useState<boolean>(false);
  const [displayProfile, setDisplayProfile] = useState<boolean>(false);

  const emojis = ["🐱", "🐶", "🐰", "🐻", "🐻‍❄️", "🦊", "🐮"];
  const bgColors = [
    "#fbefff",
    "#ffeff7",
    "#ddf4ff",
    "#dafbe1",
    "#fff8c5",
    "#fff1e5",
    "#ffebe9",
  ];

  const toggleProfile = () => {
    setDisplayProfile(!displayProfile && !!user);
  };

  const hideProfile = () => {
    setDisplayProfile(false);
  };

  const toggleLogin = () => {
    setDisplayLogin(!displayLogin && !user);
  };

  const hideLogin = () => {
    setDisplayLogin(false);
  };

  const toggleSignUp = () => {
    setDisplaySignUp(!displaySignUp && !user);
  };

  const hideSignUp = () => {
    setDisplaySignUp(false);
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "24px",
        paddingBottom: "24px",
        paddingRight: "64px",
        paddingLeft: "64px",
        height: "6rem",
      }}
    >
      <h1 style={{ fontWeight: 600, fontSize: "20px", lineHeight: "160%" }}>
        OPT&apos;ON
      </h1>
      {user ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SliderButton />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              height: "100%",
              cursor: "pointer",
            }}
          >
            {avatar[0] === -1 ? (
              <Avatar
                size={32}
                src={
                  user.photoURL ||
                  "https://avatars.githubusercontent.com/u/7143434?v=4"
                }
                onClick={toggleProfile}
              />
            ) : (
              <Box
                width={36}
                height={36}
                borderRadius="50%"
                bg={bgColors[avatar[1]]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="20px"
                paddingTop="2px"
                style={{ cursor: "pointer" }}
                onClick={toggleProfile}
              >
                {emojis[avatar[0]]}
              </Box>
            )}
          </div>
          {displayProfile && <Profile handleClose={hideProfile} />}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            height: "100%",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <Button onClick={toggleLogin}>Log in</Button>
          {displayLogin && (
            <Login toggleSignUp={toggleSignUp} handleClose={hideLogin} />
          )}
          <Button variant="primary" onClick={toggleSignUp}>
            Sign up
          </Button>
          {displaySignUp && (
            <SignUp toggleLogin={toggleLogin} handleClose={hideSignUp} />
          )}
        </div>
      )}
    </nav>
  );
}
