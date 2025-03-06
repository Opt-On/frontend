import { useState } from "react";
import { Box, Button, Dialog, IconButton, Text } from "@primer/react";
import { PlayIcon, XIcon } from "@primer/octicons-react";
import styles from "@/components/modals/QuizModal/QuizModal.module.scss";
import { questions } from "./questionData";
import ProgressBar from "./ProgressBar";
import Header from "./Header";

// Define the type for a question option
export type Option = {
  label: string;
  points: { [key: string]: number };
};

// Define the props for the Question component
type QuestionProps = {
  question: string;
  options: Option[];
  onSelect: (points: { [key: string]: number }, optionIndex: number) => void;
  selectedAnswer: number | null; // Track the selected answer
};

// Question Component
function Question({ question, options, onSelect, selectedAnswer }: QuestionProps) {
  return (
    <Box>
      <Text fontSize={24} fontWeight='bold' mb={3}>
        {question}
      </Text>
      {options.map((option, index) => (
        <Button
          key={index}
          onClick={() => onSelect(option.points, index)}
          sx={{ display: "block", width: "100%", mb: 2 }}
          variant={selectedAnswer === index ? "primary" : "default"} // Highlight selected answer
        >
          {option.label}
        </Button>
      ))}
    </Box>
  );
}

// QuizModal Component
export default function QuizModal() {
  const [displayQuizModal, setDisplayQuizModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  ); // Track user answers

  const toggleModal = () => {
    setDisplayQuizModal(!displayQuizModal);
  };

  const handleClose = () => {
    setDisplayQuizModal(false);
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(questions.length).fill(null));
  };

  const handleSelect = (points: { [key: string]: number }, optionIndex: number) => {
    // Validate currentQuestionIndex and optionIndex
    if (
      currentQuestionIndex >= questions.length ||
      optionIndex >= questions[currentQuestionIndex].options.length
    ) {
      console.error("Invalid question or option index");
      return;
    }

    // Update the user's answer for the current question
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newUserAnswers);

    // Move to the next question if not on the last question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Calculate scores dynamically based on userAnswers
  const calculateScores = () => {
    const newScores: { [key: string]: number } = {};
    userAnswers.forEach((answerIndex, questionIndex) => {
      if (
        answerIndex !== null &&
        questions[questionIndex] &&
        questions[questionIndex].options[answerIndex]
      ) {
        const selectedOption = questions[questionIndex].options[answerIndex];
        for (const key in selectedOption.points) {
          newScores[key] = (newScores[key] || 0) + selectedOption.points[key];
        }
      }
    });
    return newScores;
  };

  const scores = calculateScores();
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <Button
        leadingVisual={() => (
          <span className={styles.icon}>
            <PlayIcon />
          </span>
        )}
        className={styles.button}
        onClick={toggleModal}
      >
        Take our quiz!
      </Button>
      {displayQuizModal && (
        <Dialog
          onClose={handleClose}
          title='Quiz'
          renderHeader={() => <Header handleClose={handleClose} progress={currentQuestionIndex} />}
          className={styles.dialog}
        >
          <Box width='75%' margin='auto'>
            {currentQuestionIndex < questions.length ? (
              <>
                <Question
                  question={currentQuestion.question}
                  options={currentQuestion.options}
                  onSelect={handleSelect}
                  selectedAnswer={userAnswers[currentQuestionIndex]}
                />
                {currentQuestionIndex > 0 && (
                  <Button onClick={handleBack} sx={{ mt: 2 }}>
                    Back
                  </Button>
                )}
              </>
            ) : (
              <Text fontSize={24} fontWeight='bold'>
                {Object.entries(scores).reduce(
                  (max, x) => (x[1] > scores[max] ? x[0] : max),
                  Object.keys(scores)[0]
                )}
              </Text>
            )}
          </Box>
        </Dialog>
      )}
    </>
  );
}
