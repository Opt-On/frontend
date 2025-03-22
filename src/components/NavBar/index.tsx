"use client";

import { LogInModal } from "@/components/modals/LogInModal";
import SliderButton from "@/components/SliderButton";
import { useAuth } from "@/context";
import { Avatar, Button } from "@primer/react";
import { useState } from "react";
import { Profile } from "../modals/Profile";

export default function NavBar() {
  const { user } = useAuth();
  const [displayLogInModal, setDisplayLogInModal] = useState<boolean>(false);
  const [displayProfile, setDisplayProfile] = useState<boolean>(false);

  const toggleProfile = () => {
    setDisplayProfile(!displayProfile && !!user);
  };

  const hideProfile = () => {
    setDisplayProfile(false);
  };

  const toggleLogInModal = () => {
    setDisplayLogInModal(!displayLogInModal && !user);
  };

  const hideLogInModal = () => {
    setDisplayLogInModal(false);
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
              cursor: "pointer",
            }}
          >
            <Avatar
              size={32}
              src={user.photoURL || "https://avatars.githubusercontent.com/u/7143434?v=4"}
              onClick={toggleProfile}
            />
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
          }}
        >
          <Button onClick={toggleLogInModal}>Log in</Button>
          {displayLogInModal && <LogInModal handleClose={hideLogInModal} />}
        </div>
      )}
    </nav>
  );
}
