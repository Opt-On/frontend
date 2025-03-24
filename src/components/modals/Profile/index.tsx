import { Dialog, Box, IconButton, Text, Button, TextInput } from "@primer/react";
import { CheckIcon, XIcon } from "@primer/octicons-react";
import styles from "./Profile.module.scss";
import FileUpload from "@/components/FileUpload";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useState } from "react";
import { useFile } from "@/context/FileContext";

type ProfileProps = {
  handleClose: (gesture: "close-button" | "escape") => void;
};

export const Profile: React.FC<ProfileProps> = ({ handleClose }) => {
  const { user, userInfo, logout, avatar, updateAvatar } = useAuth();
  const { file, setFile, submitTranscript } = useFile();

  const [indexA, setIndexA] = useState(avatar[0]);
  const [indexB, setIndexB] = useState(avatar[1]);

  const handleSetA = (index: number) => {
    if (indexA === index) {
      setIndexA(-1);
      setIndexB(-1);
    } else {
      setIndexA(index);
      if (indexB === -1) {
        setIndexB(0);
      }
    }
  };

  const handleSetB = (index: number) => {
    if (indexB === index) {
      setIndexA(-1);
      setIndexB(-1);
    } else {
      setIndexB(index);
      if (indexA === -1) {
        setIndexA(0);
      }
    }
  };

  const emojis = ["🐱", "🐶", "🐰", "🐻", "🐻‍❄️", "🦊", "🐮"];
  const bgColors = ["#fbefff", "#ffeff7", "#ddf4ff", "#dafbe1", "#fff8c5", "#fff1e5", "#ffebe9"];
  const inactiveColors = [
    "rgba(130, 80, 223, 0.5)",
    "rgba(191, 57, 137, 0.5)",
    "rgba(9, 105, 218, 0.5)",
    "rgba(26, 127, 55, 0.5)",
    "rgba(154, 103, 0, 0.5)",
    "rgba(188, 76, 0, 0.5)",
    "rgba(207, 34, 46, 0.5)",
  ];
  const activeColors = [
    "#8250df",
    "#bf3989",
    "#0969da",
    "#1a7f37",
    "#9a6700",
    "#bc4c00",
    "#cf222e",
  ];

  const handleSave = () => {
    updateAvatar(indexA, indexB);
    if (file) {
      submitTranscript();
    }
    handleClose("escape");
  };

  const handleLogout = () => {
    handleClose("escape");
    logout();
  };

  const Header = () => (
    <Box className={styles.header}>
      <Box display='flex' justifyContent='space-between'>
        <Text as='h1' className={styles.title}>
          Profile
        </Text>
        <IconButton
          onClick={() => handleClose("close-button")}
          size='large'
          icon={() => <XIcon size={20} />}
          variant='invisible'
          aria-label='close'
        />
      </Box>
    </Box>
  );

  const Body = () => (
    <Box className={styles.body}>
      <Box display='flex' flexDirection='column'>
        <Text fontSize={16} fontWeight='semibold'>
          Avatar
        </Text>
        <Box style={{ display: "flex", marginTop: 16 }}>
          {indexA === -1 ? (
            <Image
              src={user?.photoURL || "https://avatars.githubusercontent.com/u/7143434?v=4"}
              width={115}
              height={115}
              alt='avatar'
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <Box
              width={115}
              height={115}
              borderRadius='50%'
              bg={bgColors[indexB]}
              display='flex'
              alignItems='center'
              justifyContent='center'
              fontSize='80px'
            >
              {emojis[indexA]}
            </Box>
          )}
          <Box
            display='grid'
            gridTemplateColumns='repeat(7, 1fr)'
            gridTemplateRows='repeat(2, 1fr)'
            width='75%'
            margin='0 auto'
            alignItems='center'
            justifyItems='center'
          >
            {Array.from({ length: 7 }).map((_, index) => (
              <Box
                key={index}
                width={36}
                height={36}
                borderRadius='50%'
                bg='#f6f8fa'
                display='flex'
                alignItems='center'
                justifyContent='center'
                fontSize='20px'
                paddingTop='2px'
                style={{ cursor: "pointer" }}
                border='solid 2px'
                borderColor={indexA === index ? "rgba(110, 119, 129, 0.5)" : "transparent"}
                onClick={() => handleSetA(index)}
              >
                {emojis[index]}
              </Box>
            ))}
            {Array.from({ length: 7 }).map((_, index) => (
              <Box
                key={index}
                width={36}
                height={36}
                borderRadius='50%'
                bg={bgColors[index]}
                display='flex'
                alignItems='center'
                justifyContent='center'
                fontSize='20px'
                paddingTop='2px'
                style={{ cursor: "pointer" }}
                color={indexB === index ? activeColors[index] : inactiveColors[index]}
                border='solid 2px'
                borderColor={indexB === index ? inactiveColors[index] : "transparent"}
                onClick={() => handleSetB(index)}
              >
                <CheckIcon size={20} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box display='flex' flexDirection='column'>
        <Text fontSize={16} fontWeight='semibold'>
          Basic Information
        </Text>
        <Text fontSize={14} color='#656d76'>
          To update basic information please re-upload your transcript.
        </Text>
        <Box display='grid' gridTemplateColumns='repeat(2, 1fr)' mt={3} sx={{ gap: 2 }}>
          <Box className={styles.flexColumn}>
            <Text fontSize={14} fontWeight='semibold'>
              First Name
            </Text>
            <TextInput
              value={userInfo?.firstName || ""}
              disabled
              block
              style={{ cursor: "auto" }}
            />
          </Box>
          <Box className={styles.flexColumn}>
            <Text fontSize={14} fontWeight='semibold'>
              Last Name
            </Text>
            <TextInput value={userInfo?.lastName || ""} disabled block style={{ cursor: "auto" }} />
          </Box>
          <Box className={styles.flexColumn}>
            <Text fontSize={14} fontWeight='semibold'>
              Program
            </Text>
            <TextInput value={userInfo?.program || ""} disabled block style={{ cursor: "auto" }} />
          </Box>
          <Box className={styles.flexColumn}>
            <Text fontSize={14} fontWeight='semibold'>
              Email
            </Text>
            <TextInput value={user?.email || ""} disabled block style={{ cursor: "auto" }} />
          </Box>
        </Box>
      </Box>
      <Box display='flex' flexDirection='column'>
        <Text fontSize={16} fontWeight='semibold'>
          Upload Transcript
        </Text>
        {userInfo?.uploadDate && (
          <Text fontSize={14} color='#656d76'>
            Last uploaded on {userInfo.uploadDate}
          </Text>
        )}
        <FileUpload file={file} setFile={setFile} />
      </Box>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleLogout} variant='danger' style={{ width: 76 }}>
          Logout
        </Button>
        <Button onClick={handleSave} variant='primary' style={{ background: "#8466b4", width: 76 }}>
          Save
        </Button>
      </Box>
    </Box>
  );

  return (
    <Dialog
      width='xlarge'
      onClose={handleClose}
      title='Profile'
      renderHeader={Header}
      renderBody={Body}
    />
  );
};
