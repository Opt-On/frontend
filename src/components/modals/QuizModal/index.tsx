import { useState } from "react";
import { Box, Button, Dialog, Text } from "@primer/react";
import { PlayIcon } from "@primer/octicons-react";
import styles from "@/components/modals/QuizModal/QuizModal.module.scss";
import { questions } from "./questionData";
import Header from "./Header";
import Footer from "./Footer";
import Question from "./Question";

export default function QuizModal() {
  const [displayQuizModal, setDisplayQuizModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );

  const toggleModal = () => {
    setDisplayQuizModal(!displayQuizModal);
  };

  const handleClose = () => {
    setDisplayQuizModal(false);
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(questions.length).fill(null));
  };

  const handleSelect = (optionIndex: number) => {
    if (
      currentQuestionIndex >= questions.length ||
      optionIndex >= questions[currentQuestionIndex].options.length
    ) {
      return;
    }

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newUserAnswers);
  };

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
          renderFooter={() => (
            <Footer
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              hasAnswered={userAnswers[currentQuestionIndex] !== null}
            />
          )}
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
