"use client";

import { Login } from "../modals/Login";
import SliderButton from "@/components/SliderButton";
import { useAuth } from "@/context";
import { Avatar, Button } from "@primer/react";
import { useState } from "react";
import { ProfileModal } from "../modals/ProfileModal";
import { SignUp } from "../modals/SignUp";

export default function NavBar() {
  const { user } = useAuth();
  const [displayLogin, setDisplayLogin] = useState<boolean>(false);
  const [displaySignUp, setDisplaySignUp] = useState<boolean>(false);
  const [displayProfileModal, setDisplayProfileModal] = useState<boolean>(false);

  const toggleProfileModal = () => {
    setDisplayProfileModal(!displayProfileModal && !!user);
  };

  const hideProfileModal = () => {
    setDisplayProfileModal(false);
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
      <h1 style={{ fontWeight: 600, fontSize: "20px", lineHeight: "160%" }}>OPT&apos;ON</h1>
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
            }}
          >
            <Avatar
              size={32}
              src={user.photoURL || "https://avatars.githubusercontent.com/u/7143434?v=4"}
              onClick={toggleProfileModal}
            />
          </div>
          {displayProfileModal && <ProfileModal handleClose={hideProfileModal} />}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            height: "100%",
            alignItems: "center",
            gap: "16px"
          }}
        >
          <Button onClick={toggleLogin}>Log in</Button>
          {displayLogin && <Login handleClose={hideLogin} />}
          <Button variant="primary" onClick={toggleSignUp}>Sign up</Button>
          {displaySignUp && <SignUp handleClose={hideSignUp} />}
        </div>
      )}
    </nav>
  );
}
