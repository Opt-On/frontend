import { useState } from "react";
import styles from "./Accordion.module.scss";
import { ChevronDownIcon, ChevronRightIcon } from "@primer/octicons-react";

interface AccordionProps {
  title: string;
  content: string;
}

export default function Accordion({ title, content }: AccordionProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles.accordion}>
      <div className={styles.item}>
        <div className={styles.title} onClick={() => toggleAccordion()}>
          {isActive ? <ChevronDownIcon size={32} /> : <ChevronRightIcon size={32} />}
          {title}
        </div>
        {isActive && <div className={styles.content}>{content}</div>}
      </div>
    </div>
  );
}
