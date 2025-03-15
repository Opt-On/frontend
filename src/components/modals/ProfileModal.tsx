/* eslint-disable @next/next/no-img-element */
import { useAuth } from "@/context";
import { Box, Button, Dialog, Text, TextInput } from "@primer/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FileUpload from "../common/FileUpload";

type ProfileModalProps = {
  handleClose: (gesture: "close-button" | "escape") => void;
};

export const ProfileModal: React.FC<ProfileModalProps> = ({ handleClose }) => {
  const { user, logout, userInfo } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  async function handleLogout() {
    await logout();
    handleClose("close-button");

    if (isMounted) {
      router.replace("/");
    }
  }

  return (
    <Dialog onClose={handleClose} title='Profile'>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Box display='flex' flexDirection='column'>
          <Text size='large' weight='semibold'>
            Avatar
          </Text>
          <div>
            <img
              src='https://content.imageresizer.com/images/memes/Avatar-guy-meme-7bv2j9.jpg'
              height={200}
              width={200}
              alt='Profile Avatar'
            />
          </div>
        </Box>
        <Box display='flex' flexDirection='column'>
          <Text size='large' weight='semibold'>
            Basic Information
          </Text>
          <Text size='medium' weight='light'>
            To update basic information please re-upload your transcript.
          </Text>
          <Box
            display='grid'
            gridTemplateColumns='repeat(2, 1fr)'
            marginTop='0.75rem'
            sx={{ columnGap: "1rem", rowGap: "0.25rem" }}
          >
            <div>
              <Text size='medium' weight='semibold'>
                First Name
              </Text>
              <TextInput value={userInfo?.firstName || "John"} disabled block />
            </div>
            <div>
              <Text size='medium' weight='semibold'>
                Last Name
              </Text>
              <TextInput value={userInfo?.lastName || "Doe"} disabled block />
            </div>
            <div>
              <Text size='medium' weight='semibold'>
                Program
              </Text>
              <TextInput value={userInfo?.program || "Software Engineering"} disabled block />
            </div>
            <div>
              <Text size='medium' weight='semibold'>
                Graduation Year
              </Text>
              <TextInput value={userInfo?.graduationYear || "2024"} disabled block />
            </div>
          </Box>
        </Box>
        <Box display='flex' flexDirection='column'>
          <Text size='large' weight='semibold'>
            Upload Transcript
          </Text>
          <Text size='medium' weight='light'>
            Last uploaded on {userInfo?.uploadDate || "04/20/2024"}:{" "}
            <Box as='span' sx={{ textDecoration: "underline" }}>
              {user?.displayName}.pdf
            </Box>
          </Text>
          <FileUpload />
        </Box>
        <Button onClick={handleLogout}>Sign Out</Button>
      </div>
    </Dialog>
  );
};
