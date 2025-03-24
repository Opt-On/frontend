import { Button, Text } from "@primer/react";
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
      <Image src={`/quiz/${program}.png`} alt="" width={300} height={300} />
      <Button className={styles.button} onClick={handleClose} variant='primary'>
        Nice, that&#39;s all :&#41;
      </Button>
    </div>
  );
}