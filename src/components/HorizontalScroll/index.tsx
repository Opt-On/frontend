"use client";

import { motion } from "motion/react";
import styles from "@/components/HorizontalScroll/HorizontalScroll.module.scss";
import { OptionInfoCard } from "../common/OptionInfoCard";
import { useState } from "react";

export default function HorizontalScroll() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={styles.container}>
      <motion.div className={styles.wrapper} drag='x' dragConstraints={{ left: -500, right: 500 }}>
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)} 
            onMouseLeave={() => setHoveredIndex(null)} 
          >
            <OptionInfoCard isHovered={hoveredIndex === index} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
