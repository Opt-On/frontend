import { Box, Text } from "@primer/react";
import { motion, AnimatePresence } from "motion/react";
import styles from "@/components/OptionInfoCard/OptionInfoCard.module.scss";
import { OptionDetails } from "../HorizontalScroll";
import Link from "next/link";
import { useState } from "react";

interface OptionInfoCardProps {
  details: OptionDetails;
}

export function OptionInfoCard({ details }: OptionInfoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a href={details.url} target='_blank' style={{ textDecoration: "none" }}>
      <Box
        className={styles.card}
        style={{ cursor: "pointer" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box className={styles.inner}>
          <AnimatePresence mode='wait'>
            {isHovered ? (
              <motion.div
                key='description'
                initial={{ opacity: 0.5, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.5, scale: 0 }}
                transition={{ duration: 0.2 }}
                className={styles.description}
              >
                <Text as='p'>{details.description}</Text>
              </motion.div>
            ) : (
              <motion.div
                key='title'
                initial={{ opacity: 0.5, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.5, scale: 0 }}
                transition={{ duration: 0.2 }}
                className={styles.title}
              >
                <Text as='p'>{details.name}</Text>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </a>
  );
}
