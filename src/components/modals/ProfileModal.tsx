/* eslint-disable @next/next/no-img-element */
import { useAuth } from "@/context";
import { Box, Button, Dialog, Text } from "@primer/react";

type ProfileModalProps = {
  handleClose: (gesture: "close-button" | "escape") => void;
};

export const ProfileModal: React.FC<ProfileModalProps> = ({ handleClose }) => {
  const { user, logout } = useAuth();

  return (
    <Dialog onClose={handleClose} title="Profile">
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Box display="flex" flexDirection="column">
          <Text size="large" weight="semibold">
            Avatar
          </Text>
          <div>
            <img
              src="https://content.imageresizer.com/images/memes/Avatar-guy-meme-7bv2j9.jpg"
              height={200}
              width={200}
              alt="deez nuts"
            ></img>
          </div>
        </Box>
        <Box display="flex" flexDirection="column">
          <Text size="large" weight="semibold">
            Basic Information
          </Text>
          <Text size="medium" weight="light">
            To update basic information please re-upload your transcript.
          </Text>
          <Box
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            marginTop="0.75rem"
          >
            <div>
              <Text size="medium" weight="semibold">
                First Name
              </Text>
              <div>
                <Text>john</Text>
              </div>
            </div>
            <div>
              <Text size="medium" weight="semibold">
                Last Name
              </Text>
              <div>
                <Text>pork</Text>
              </div>
            </div>
            <div>
              <Text size="medium" weight="semibold">
                Program
              </Text>
              <div>
                <Text>porkin ur mom</Text>
              </div>
            </div>
            <div>
              <Text size="medium" weight="semibold">
                Graduation Year
              </Text>
              <div>
                <Text>2069</Text>
              </div>
            </div>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
          <Text size="large" weight="semibold">
            Upload Transcript
          </Text>
          <Text size="medium" weight="light">
            Last uploaded on 04/20/2024:{" "}
            {
              <Box as="span" sx={{ textDecoration: "underline" }}>
                {user?.displayName}.pdf
              </Box>
            }
          </Text>
        </Box>
        <Button onClick={logout}>Sign Out</Button>
      </div>
    </Dialog>
  );
};
