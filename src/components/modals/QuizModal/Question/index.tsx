import { Box, Button, Text } from "@primer/react";
import styles from "@/components/modals/QuizModal/Question/Question.module.scss";

interface Option {
  label: string;
  points: { [key: string]: number };
}

interface QuestionProps {
  question: string;
  options: Option[];
  onSelect: (optionIndex: number) => void;
  selectedAnswer: number | null;
}

export default function Question({ question, options, onSelect, selectedAnswer }: QuestionProps) {
  return (
    <div style={{ width: "756px" }}>
      <div
        style={{
          textAlign: "center",
          width: "500px",
          paddingTop: "1rem",
          paddingBottom: "2rem",
          margin: "auto",
        }}
      >
        <Text fontSize={20} fontWeight='semibold'>
          {question}
        </Text>
      </div>
      {options.map((option, index) => (
        <Button
          key={index}
          onClick={() => onSelect(index)}
          className={`${styles.button} ${selectedAnswer === index ? styles.selected : ""}`}
          variant='invisible'
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
