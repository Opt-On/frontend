import { Text } from "@primer/react";
import styles from "@/components/Quiz/Question/Question.module.scss";

export interface Answer {
  label: string;
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
      <div className={styles.question}>
        <Text fontSize={20} fontWeight='semibold'>
          {question}
        </Text>
      </div>
      <div className={styles.textAnswers}>
        {answers.map((answer, index) => (
          <div
            key={index}
            onClick={() => onSelect(index)}
            className={`${styles.button} ${selectedAnswer === index ? styles.selected : ""}`}
          >
            <span className={styles.text}>{answer.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
