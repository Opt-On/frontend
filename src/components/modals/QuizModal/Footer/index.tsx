import { ChevronLeftIcon, ChevronRightIcon } from "@primer/octicons-react";
import { IconButton } from "@primer/react";
import styles from "@/components/modals/QuizModal/Footer/Footer.module.scss";

interface FooterProps {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (_: number) => void;
  hasAnswered: boolean;
}

export default function Footer({ currentQuestionIndex, setCurrentQuestionIndex, hasAnswered }: FooterProps) {
  return (
    <>
      {currentQuestionIndex < 10 && (
        <div style={{ padding: "48px", display: "flex", justifyContent: "center", gap: "16px" }}>
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
