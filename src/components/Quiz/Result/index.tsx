import { Box, Button, Text } from "@primer/react";
import styles from "@/components/Quiz/Result/Result.module.scss";
import Image from "next/image";

interface ResultProps {
  program: string;
  handleClose: () => void;
}

export default function Result({ program, handleClose }: ResultProps) {
  return (
    <div className={styles.container}>
      <div>
        <Text as='p' className={styles.text}>
          Oh wow! You&#39;d be a great fit for the
        </Text>
        <Text as='h1' className={styles.heading}>
          {program} Option
        </Text>
      </div>
      <Box className={styles.image}>
        <Box className={styles.inner}>
          <div className={styles.imageWrapper}>
            <Image
              src={`/quiz/${program}.png`}
              alt={`${program} option illustration`}
              layout='fill'
              objectFit='contain'
              className={styles.responsiveImage}
            />
          </div>
        </Box>
      </Box>
      <Button className={styles.button} onClick={handleClose} variant='primary' style={{ background: "#8466b4" }}>
        Nice, that&#39;s all :&#41;
      </Button>
    </div>
  );
}
