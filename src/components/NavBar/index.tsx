"use client";

import styles from "./NavBar.module.scss";
import SliderButton from "@/components/SliderButton";
import { useAuth } from "@/context/AuthContext";
import { Avatar, Box, Button } from "@primer/react";
import { useState } from "react";
import { Login } from "../modals/Login";
import { Profile } from "../modals/Profile";
import { SignUp } from "../modals/SignUp";
import Image from "next/image";

export default function NavBar() {
  const { user, avatar } = useAuth();
  const [displayLogin, setDisplayLogin] = useState<boolean>(false);
  const [displaySignUp, setDisplaySignUp] = useState<boolean>(false);
  const [displayProfile, setDisplayProfile] = useState<boolean>(false);

  const emojis = ["🐱", "🐶", "🐰", "🐻", "🐻‍❄️", "🦊", "🐮"];
  const bgColors = ["#fbefff", "#ffeff7", "#ddf4ff", "#dafbe1", "#fff8c5", "#fff1e5", "#ffebe9"];

  const toggleProfile = () => setDisplayProfile(!displayProfile && !!user);
  const hideProfile = () => setDisplayProfile(false);
  const toggleLogin = () => setDisplayLogin(!displayLogin && !user);
  const hideLogin = () => setDisplayLogin(false);
  const toggleSignUp = () => setDisplaySignUp(!displaySignUp && !user);
  const hideSignUp = () => setDisplaySignUp(false);

  return (
    <nav className={styles.navBar}>
      <div className={styles.leftContent}>
        <Image src='/logo.svg' height={100} width={100} alt='logo' />
      </div>

      <div className={styles.centerContent}>{user && <SliderButton />}</div>

      <div className={styles.rightContent}>
        {user ? (
          avatar[0] === -1 ? (
            <Avatar
              size={32}
              src={user.photoURL || "https://avatars.githubusercontent.com/u/7143434?v=4"}
              onClick={toggleProfile}
            />
          ) : (
            <Box
              className={styles.avatarBox}
              bg={bgColors[avatar[1]]}
              onClick={toggleProfile}
            >
              {emojis[avatar[0]]}
            </Box>
          )
        ) : (
          <Box className={styles.authButtons}>
            <Button onClick={toggleLogin}>Log in</Button>
            {displayLogin && <Login toggleSignUp={toggleSignUp} handleClose={hideLogin} />}
            <Button variant='primary' style={{ background: "#8466b4" }} onClick={toggleSignUp} className={styles.signUpButton}>
              Sign up
            </Button>
            {displaySignUp && <SignUp toggleLogin={toggleLogin} handleClose={hideSignUp} />}
          </Box>
        )}
      </div>

      {displayProfile && <Profile handleClose={hideProfile} />}
    </nav>
  );
}
