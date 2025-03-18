import { motion } from "framer-motion";
import styles from "./ProgressBar.module.scss";

interface ProgressBarProps {
  currentIndex: number;
}

export default function ProgressBar({ currentIndex }: ProgressBarProps) {
  return (
    <div className={styles.container}>
      {Array.from({ length: 10 }).map((_, index) => {
        const isActive = currentIndex === index || (currentIndex === 10 && index === 9);

        return (
          <motion.div
            key={index}
            className={`${styles.dot} ${isActive ? styles.active : styles.inactive}`}
            initial={index !== 0 ? { opacity: 0.25, width: 10 } : { opacity: 0.5, width: 30 }}
            animate={{ opacity: isActive ? 0.5 : 0.25, width: isActive ? 30 : 10 }}
            transition={{ duration: 0.3 }}
          />
        );
      })}
    </div>
  );
}
