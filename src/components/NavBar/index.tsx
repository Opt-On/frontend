import { LogInModal } from "@/components/LogInModal";
import SliderButton from "@/components/SliderButton";
import { useAuth } from "@/context";
import { Avatar, Button } from "@primer/react";
import { useState } from "react";

export default function NavBar() {
  const { user } = useAuth();
  const [displayLogInModal, setDisplayLogInModal] = useState<boolean>(false);

  const toggleLogInModal = () => {
    setDisplayLogInModal(!displayLogInModal);
    console.log(displayLogInModal);
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
            }}
          >
            <Avatar
              size={32}
              src={
                user.photoURL ||
                "https://avatars.githubusercontent.com/u/7143434?v=4"
              }
              onClick={toggleLogInModal}
            />
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Button onClick={toggleLogInModal}>Log in</Button>
          {displayLogInModal && <LogInModal handleClose={hideLogInModal} />}
        </div>
      )}
    </nav>
  );
}
