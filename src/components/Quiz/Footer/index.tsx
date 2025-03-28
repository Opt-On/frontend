import { ChevronLeftIcon, ChevronRightIcon } from "@primer/octicons-react";
import { IconButton } from "@primer/react";
import styles from "@/components/Quiz/Footer/Footer.module.scss";

interface FooterProps {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (_: number) => void;
  hasAnswered: boolean;
}

export default function Footer({ currentQuestionIndex, setCurrentQuestionIndex, hasAnswered }: FooterProps) {
  return (
    <>
      {currentQuestionIndex < 10 && (
        <div className={styles.container}>
          <IconButton
            icon={ChevronLeftIcon}
            aria-labelledby='next'
            size='large'
            disabled={currentQuestionIndex < 1}
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
          >
            Back
          </IconButton>
          <IconButton
            icon={ChevronRightIcon}
            aria-labelledby='next'
            size='large'
            className={styles.next}
            disabled={!hasAnswered}
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
          >
            Back
          </IconButton>
        </div>
      )}
    </>
  );
}
