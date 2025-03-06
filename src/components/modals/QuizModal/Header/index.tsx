import { Box, IconButton } from "@primer/react";
import { XIcon } from "@primer/octicons-react";
import ProgressBar from "../ProgressBar";
import styles from "@/components/modals/QuizModal/Header/Header.module.scss";

type HeaderProps = {
  handleClose: () => void;
  progress: number;
};

export default function Header({ handleClose, progress }: HeaderProps) {
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.header}>
        <IconButton
          onClick={handleClose}
          size='large'
          icon={() => <XIcon size={24} />}
          variant='invisible'
          aria-labelledby='close'
        />
      </Box>
      <ProgressBar currentIndex={progress} />
    </Box>
  );
}
