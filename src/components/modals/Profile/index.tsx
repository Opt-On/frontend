import { Dialog, Box, IconButton, Text, Button, TextInput } from "@primer/react";
import { XIcon } from "@primer/octicons-react";
import styles from "./Profile.module.scss";
import FileUpload from "@/components/FileUpload";
import { useAuth } from "@/context";

type ProfileProps = {
  handleClose: (gesture: "close-button" | "escape") => void;
};

export const Profile: React.FC<ProfileProps> = ({ handleClose }) => {
  const { user, userInfo } = useAuth();

  const Header = () => (
    <Box className={styles.header}>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Text as='h1' className={styles.title}>
          Profile
        </Text>
        <IconButton
          onClick={() => handleClose("close-button")}
          size='large'
          icon={() => <XIcon size={20} />}
          variant='invisible'
          aria-labelledby='close'
        />
      </Box>
    </Box>
  );

  const Body = () => (
    <Box className={styles.body}>
      <Box display='flex' flexDirection='column'>
        <Text fontSize='16px' weight='semibold'>
          Avatar
        </Text>
        {user?.photoURL && (
          <div>
            <img
              src={user.photoURL}
              height={115}
              width={115}
              style={{ borderRadius: "50%", marginTop: "16px" }}
              alt='avatar'
            />
          </div>
        )}
      </Box>
      <Box display='flex' flexDirection='column'>
        <Text fontSize='16px' weight='semibold'>
          Basic Information
        </Text>
        <Text fontSize='14px' color='#656d76'>
          To update basic information please re-upload your transcript.
        </Text>
        <Box
          display='grid'
          gridTemplateColumns='repeat(2, 1fr)'
          marginTop='0.75rem'
          sx={{ columnGap: "1rem", rowGap: "0.25rem", gap: "16px" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <Text fontSize='14px' weight='semibold'>
              First Name
            </Text>
            <TextInput
              style={{ cursor: "auto" }}
              value={userInfo?.firstName || ""}
              disabled
              block
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <Text fontSize='14px' weight='semibold'>
              Last Name
            </Text>
            <TextInput style={{ cursor: "auto" }} value={userInfo?.lastName || ""} disabled block />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <Text fontSize='14px' weight='semibold'>
              Program
            </Text>
            <TextInput style={{ cursor: "auto" }} value={userInfo?.program || ""} disabled block />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <Text fontSize='14px' weight='semibold'>
              Email
            </Text>
            <TextInput style={{ cursor: "auto" }} value={user?.email || ""} disabled block />
          </div>
        </Box>
      </Box>
      <Box display='flex' flexDirection='column'>
        <Text size='large' weight='semibold'>
          Upload Transcript
        </Text>
        {userInfo?.uploadDate && (
          <Text fontSize='14px' color='#656d76'>
            Last uploaded on {userInfo.uploadDate}
          </Text>
        )}
        <FileUpload />
      </Box>
    </Box>
  );

  return (
    <Dialog
      width='xlarge'
      onClose={handleClose}
      title='Login or Sign Up'
      renderHeader={Header}
      renderBody={Body}
    />
  );
};
