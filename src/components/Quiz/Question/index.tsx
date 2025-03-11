import { Button, Text } from "@primer/react";
import styles from "@/components/Quiz/Question/Question.module.scss";

export interface Answer {
  label: string;
  src?: string | null;
  points: { [key: string]: number };
}

interface QuestionProps {
  question: string;
  answers: Answer[];
  onSelect: (optionIndex: number) => void;
  selectedAnswer: number | null;
}

export default function Question({ question, answers, onSelect, selectedAnswer }: QuestionProps) {
  return (
    <div className={styles.container}>
      <div className={styles.questionContainer}>
        <Text fontSize={20} fontWeight='semibold'>
          {question}
        </Text>
      </div>
      <div className={styles.optionsContainer}>
        {answers.map((answer, index) => (
          <Button
            key={index}
            onClick={() => onSelect(index)}
            className={`${styles.button} ${selectedAnswer === index ? styles.selected : ""}`}
            variant='invisible'
          >
            {answer.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
