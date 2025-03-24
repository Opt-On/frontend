"use client";

import { motion } from "motion/react";
import styles from "@/components/HorizontalScroll/HorizontalScroll.module.scss";
import { OptionInfoCard } from "@/components/OptionInfoCard";

export interface OptionDetails {
  name: string;
  description: string;
  url: string;
}

const optionDetails: OptionDetails[] = [
  {
    name: "Computer Engineering Option",
    description:
      "Develop skills in the areas of logic, digital hardware, operating systems, computing systems, databases, networks, and security and privacy.",
    url: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/ByCkJ0Ain?group=Options%3A%20Faculty%20of%20Engineering&bc=true&bcCurrent=Computer%20Engineering%20Option&bcGroup=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs",
  },
  {
    name: "Management Science Option",
    description:
      "Solve management problems using social sciences and mathematical models.",
    url: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/SyAJ1A0sn?group=Options%3A%20Faculty%20of%20Engineering&bc=true&bcCurrent=Management%20Science%20Option&bcGroup=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs",
  },
  {
    name: "Biomechanics Option",
    description:
      "Study solutions to health-care problems, birth defect prevention, medical imaging, prosthesis design, and ergonomics.",
    url: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/SkWRJkR0sh?group=Options%3A%20Faculty%20of%20Engineering&bc=true&bcCurrent=Biomechanics%20Option&bcGroup=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs",
  },
  {
    name: "Software Engineering Option",
    description:
      "Learn about the design, implementation, and maintenance of large-scale software systems.",
    url: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/H1eRkJ0Cjh/none?group=Options%3A%20Faculty%20of%20Engineering&bc=true&bcCurrent=Software%20Engineering%20Option&bcGroup=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs",
  },
  {
    name: "Entrepreneurship Option",
    description:
      "Pursue an innovative pathway in engineering, and enrich your studies with courses in venture creation and corporate entrepreneurship.",
    url: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/rJl0Jy0Aj2?group=Options%3A%20Faculty%20of%20Engineering&bc=true&bcCurrent=Entrepreneurship%20Option&bcGroup=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs",
  },
  {
    name: "Quantum Engineering Option",
    description:
      "Focus on foundations, design methodologies and experimental skills to analyze and implement technological platforms using quantum devices, systems and algorithms.",
    url: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/SykqVPcop/none?group=Options%3A%20Faculty%20of%20Engineering&bc=true&bcCurrent=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs&bc=true&bcCurrent=Quantum%20Engineering%20Option&bcGroup=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs",
  },
  {
    name: "Artificial Intelligence Option",
    description:
      "Study and advance ever-greater degrees of efficacy, reliability, and safety, the ways in which machines and systems perceive, see, speak, decide, respond, act, and plan.",
    url: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/Hye0Jk00ih?group=Options%3A%20Faculty%20of%20Engineering&bc=true&bcCurrent=Artificial%20Intelligence%20Option&bcGroup=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs",
  },
  {
    name: "Computing Option",
    description:
      "Enrich your studies with knowledge in programming, data structures and algorithms, digital systems, human-computer interaction, and more.",
    url: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/HklAkk00j2?group=Options%3A%20Faculty%20of%20Engineering&bc=true&bcCurrent=Computing%20Option&bcGroup=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs",
  },
  {
    name: "Statistics Option",
    description:
      "Gain a broad background in applied statistics, including multiple regression, quality control, experimental design, and applied probability.",
    url: "https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/SJRJyAAih?group=Options%3A%20Faculty%20of%20Engineering&bc=true&bcCurrent=Statistics%20Option&bcGroup=Options%3A%20Faculty%20of%20Engineering&bcItemType=programs",
  },
  {
    name: "Mechatronics Option",
    description:
      "Design and develop 'thinking' machines and devices.",
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
