import { useState } from "react";
import { Box, Button, Dialog } from "@primer/react";
import styles from "@/components/Quiz/Quiz.module.scss";
import { questions } from "./questionData";
import Header from "./Header";
import Footer from "./Footer";
import Question from "./Question";
import Result from "./Result";

interface BodyProps {
  currentQuestionIndex: number;
  userAnswers: (number | null)[];
  handleSelect: (answerIndex: number) => void;
  scores: { [key: string]: number };
  handleClose: () => void;
}

function Body({ currentQuestionIndex, userAnswers, handleSelect, scores, handleClose }: BodyProps) {
  const currentQuestion = questions[currentQuestionIndex];
  return (
    <Box width='100%' margin='auto' height='100%'>
      {currentQuestionIndex < questions.length ? (
        <Question
          question={currentQuestion.question}
          answers={currentQuestion.answers}
          onSelect={handleSelect}
          selectedAnswer={userAnswers[currentQuestionIndex]}
        />
      ) : (
        <Result
          program={Object.entries(scores).reduce(
            (max, x) => (x[1] > scores[max] ? x[0] : max),
            Object.keys(scores)[0]
          )}
          handleClose={handleClose}
        />
      )}
    </Box>
  );
}

export default function Quiz() {
  const [displayQuiz, setDisplayQuiz] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );

  const toggleModal = () => setDisplayQuiz(!displayQuiz);

  const handleClose = () => {
    setDisplayQuiz(false);
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(questions.length).fill(null));
  };

  const handleSelect = (answerIndex: number) => {
    if (
      currentQuestionIndex >= questions.length ||
      answerIndex >= questions[currentQuestionIndex].answers.length
    ) {
      return;
    }

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newUserAnswers);
  };

  const calculateScores = (): { [key: string]: number } => {
    const newScores: { [key: string]: number } = {};
    userAnswers.forEach((answerIndex, questionIndex) => {
      if (
        answerIndex !== null &&
        questions[questionIndex] &&
        questions[questionIndex].answers[answerIndex]
      ) {
        const selectedOption = questions[questionIndex].answers[answerIndex];
        for (const key in selectedOption.points) {
          newScores[key] = (newScores[key] || 0) + selectedOption.points[key];
        }
      }
    });
    return newScores;
  };

  const scores = calculateScores();

  return (
    <>
      <Box className={styles.button} onClick={toggleModal}>
        <Box className={styles.inner}>Take a short and fun quiz 🎁</Box>
      </Box>
      {displayQuiz && (
        <Dialog
          onClose={handleClose}
          title='Quiz'
          renderHeader={() => <Header handleClose={handleClose} progress={currentQuestionIndex} />}
          renderBody={() => (
            <Body
              currentQuestionIndex={currentQuestionIndex}
              userAnswers={userAnswers}
              handleSelect={handleSelect}
              scores={scores}
              handleClose={handleClose}
            />
          )}
          renderFooter={() => (
            <Footer
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              hasAnswered={userAnswers[currentQuestionIndex] !== null}
            />
          )}
          className={`${styles.dialog} ${currentQuestionIndex > 9 ? styles.result : ""}`}
        />
      )}
    </>
  );
}
