import { Button, Text } from "@primer/react";
import styles from "@/components/Quiz/Result/Result.module.scss";

interface ResultProps {
  program: string;
  handleClose: () => void;
}

export default function Result({ program, handleClose }: ResultProps) {
  const imageSrc = `/quiz_results/${program.toLowerCase().replace(/\s+/g, "_")}.png`;

  return (
    <div className={styles.container}>
      <div>
        <Text as="p" className={styles.text}>
          Oh wow! You&#39;d be a great fit for the
        </Text>
        <Text as="h1" className={styles.heading}>
          {program} Option
        </Text>
      </div>
      {/* Image Element */}
      <img src={imageSrc} alt={`${program} Option`} className={styles.image} />
      <Button className={styles.button} onClick={handleClose} variant="primary">
        Nice, that&#39;s all :)
      </Button>
    </div>
  );
}
