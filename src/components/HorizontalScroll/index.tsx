"use client";

import { motion } from "motion/react";
import styles from "@/components/HorizontalScroll/HorizontalScroll.module.scss";
import { useState } from "react";
import { OptionInfoCard } from "@/components/OptionInfoCard";

export interface OptionDetails {
  name: string;
  description: string;
  url: string;
}

const optionDetails: OptionDetails[] = [
  {
    name: "Computer Engineering Option",
    description: "Description for Computer Engineering",
    url: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/ByCkJ0Ain?group=Options%3A%20Faculty%20of%20Engineering&bc=true&bcCurrent=Computer%20Engineering%20Option&bcGroup=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs",
  },
  {
    name: "Management Science Option",
    description: "Description for Management Science",
    url: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/SyAJ1A0sn?group=Options%3A%20Faculty%20of%20Engineering&bc=true&bcCurrent=Management%20Science%20Option&bcGroup=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs",
  },
  {
    name: "Biomechanics Option",
    description: "Description for Biomechanics",
    url: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/SkWRJkR0sh?group=Options%3A%20Faculty%20of%20Engineering&bc=true&bcCurrent=Biomechanics%20Option&bcGroup=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs",
  },
  {
    name: "Software Engineering Option",
    description: "Description for Software Engineering",
    url: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/H1eRkJ0Cjh/none?group=Options%3A%20Faculty%20of%20Engineering&bc=true&bcCurrent=Software%20Engineering%20Option&bcGroup=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs",
  },
  {
    name: "Entrepreneurship Option",
    description: "Description for Entrepreneurship",
    url: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/rJl0Jy0Aj2?group=Options%3A%20Faculty%20of%20Engineering&bc=true&bcCurrent=Entrepreneurship%20Option&bcGroup=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs",
  },
  {
    name: "Quantum Engineering Option",
    description: "Description for Quantum Engineering",
    url: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/SykqVPcop/none?group=Options%3A%20Faculty%20of%20Engineering&bc=true&bcCurrent=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs&bc=true&bcCurrent=Quantum%20Engineering%20Option&bcGroup=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs",
  },
  {
    name: "Artificial Intelligence Option",
    description: "Description for Artificial Intelligence",
    url: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/Hye0Jk00ih?group=Options%3A%20Faculty%20of%20Engineering&bc=true&bcCurrent=Artificial%20Intelligence%20Option&bcGroup=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs",
  },
  {
    name: "Computing Option",
    description: "Description for Computing",
    url: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/HklAkk00j2?group=Options%3A%20Faculty%20of%20Engineering&bc=true&bcCurrent=Computing%20Option&bcGroup=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs",
  },
  {
    name: "Statistics Option",
    description: "Description for Statistics",
    url: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/SJRJyAAih?group=Options%3A%20Faculty%20of%20Engineering&bc=true&bcCurrent=Statistics%20Option&bcGroup=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs",
  },
  {
    name: "Mechatronics Option",
    description: "Description for Mechatronics",
    url: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/HJRJ1AAi3?group=Options%3A%20Faculty%20of%20Engineering&bc=true&bcCurrent=Mechatronics%20Option&bcGroup=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs",
  },
];

export default function HorizontalScroll() {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.wrapper}
        drag='x'
        dragConstraints={{ left: -1000, right: 1000 }}
      >
        {optionDetails.map((details, index) => (
          <OptionInfoCard key={index} details={details} />
        ))}
      </motion.div>
    </div>
  );
}
