import { Button, Text } from "@primer/react";
import styles from "@/components/Quiz/Result/Result.module.scss";

interface ResultProps {
  program: string;
  handleClose: () => void;
}

export default function Result({ program, handleClose }: ResultProps) {
  return (
    <div className={styles.container}>
      <div>
        <Text as='p' className={styles.text}>
          Oh wow! You'd be a great fit for the
        </Text>
        <Text as='h1' className={styles.heading}>
          {program} Option
        </Text>
      </div>
      <div className={styles.imagePlaceholder} />
      <Button onClick={handleClose} variant='primary'>
        Nice, that's all :&#41;
      </Button>
    </div>
  );
}