import { Button, Text } from "@primer/react";
import styles from "@/components/Quiz/Result/Result.module.scss";

interface ResultProps {
  program: string;
  handleClose: () => void;
}

export default function Result({ program, handleClose }: ResultProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div>
        <Text as='p' className={styles.text}>
          Oh wow! You'd be a great fit for the
        </Text>
        <Text as='h1' className={styles.heading}>
          {program} Option
        </Text>
      </div>
      <div style={{ width: 500, height: 335, background: "#D9D9D9", borderRadius: "16px" }} />
      <Button onClick={handleClose} variant='primary'>
        Nice, that's all :&#41;
      </Button>
    </div>
  );
}
