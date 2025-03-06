import {
  Box,
  Button,
  Dialog,
  IconButton,
  ProgressBar,
  Text,
} from "@primer/react";
import { PlayIcon, XIcon } from "@primer/octicons-react";
import styles from "@/components/modals/QuizModal/QuizModal.module.scss";
import { useState } from "react";

type HeaderProps = {
  handleClose: () => void;
  progress: number;
};

function Header({ handleClose, progress }: HeaderProps) {
  return (
    <>
      <Box className={styles.wrapper}>
        <Box className={styles.header}>
            <IconButton
                onClick={handleClose}
                size="large"
                icon={XIcon}
                variant="invisible"
                aria-labelledby="close"
            />
        </Box>
        
        <ProgressBar width="40vw" style={{ margin: "auto", gap: "4px", background: "transparent" }}> 
            {new Array(10).fill(null).map((_, index) => (
                <ProgressBar.Item key={index} progress={10} sx={{ bg: "#BF8700" }} />
            ))}
        </ProgressBar>
        <Text className={styles.title}>Import course history</Text>
      </Box>
    </>
  );
}

export default function QuizModal() {
  const [displayQuizModal, setDisplayQuizModal] = useState(false);

  const toggleModal = () => {
    setDisplayQuizModal(!displayQuizModal);
  };

  const handleClose = () => {
    setDisplayQuizModal(false);
  };

  return (
    <>
      <Button
        leadingVisual={() => (
          <span className={styles.icon}>
            <PlayIcon />
          </span>
        )}
        className={styles.button}
        onClick={toggleModal}
      >
        Take our quiz!
      </Button>
      {displayQuizModal && (
        <Dialog
          onClose={handleClose}
          title="Quiz"
          renderHeader={() => (
            <Header handleClose={handleClose} progress={5} />
          )}
          className={styles.dialog}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
           <></>
          </div>
        </Dialog>
      )}
    </>
  );
}
