/* eslint-disable @next/next/no-img-element */
import { useAuth } from "@/context";
import { Box, Button, Dialog, Text, TextInput } from "@primer/react";
import { useRouter } from "next/router";
import FileUpload from "../common/FileUpload";

type ProfileModalProps = {
  handleClose: () => void;
};

export const ProfileModal: React.FC<ProfileModalProps> = ({ handleClose }) => {
  const { user, logout, userInfo } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    handleClose();
    router.push("/");
  }

  return (
    <Dialog onDismiss={handleClose} title="Profile">
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Box display="flex" flexDirection="column">
          <Text fontSize="large" fontWeight="semibold">
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
          <Text fontSize="large" fontWeight="semibold">
            Basic Information
          </Text>
          <Text fontSize="medium" fontWeight="light">
            To update basic information please re-upload your transcript.
          </Text>
          <Box
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            marginTop="0.75rem"
            sx={{ columnGap: "1rem", rowGap: "0.25rem" }}
          >
            <div>
              <Text fontSize="medium" fontWeight="semibold">
                First Name
              </Text>
              <TextInput
                value={userInfo?.firstName || "john"}
                disabled
                block
              ></TextInput>
            </div>
            <div>
              <Text fontSize="medium" fontWeight="semibold">
                Last Name
              </Text>
              <TextInput
                value={userInfo?.lastName || "pork"}
                disabled
                block
              ></TextInput>
            </div>
            <div>
              <Text fontSize="medium" fontWeight="semibold">
                Program
              </Text>
              <TextInput
                value={userInfo?.program || "porkin ur mom"}
                disabled
                block
              ></TextInput>
            </div>
            <div>
              <Text fontSize="medium" fontWeight="semibold">
                Graduation Year
              </Text>
              <TextInput
                value={userInfo?.graduationYear || "2069"}
                disabled
                block
              ></TextInput>
            </div>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
          <Text fontSize="large" fontWeight="semibold">
            Upload Transcript
          </Text>
          <Text fontSize="medium" fontWeight="light">
            Last uploaded on {userInfo?.uploadDate || "04/20/2024"}:{" "}
            {
              <Box as="span" sx={{ textDecoration: "underline" }}>
                {user?.displayName}.pdf
              </Box>
            }
          </Text>
          <FileUpload></FileUpload>
        </Box>
        <Button onClick={() => handleLogout()}>Sign Out</Button>
      </div>
    </Dialog>
  );
};
