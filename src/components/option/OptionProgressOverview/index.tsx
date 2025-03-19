"use client";
import { Box, Text } from "@primer/react";
import { useCallback, useEffect, useState } from "react";
import ActionSelect from "@/components/option/ActionSelect";
import OptionProgressDetailed from "@/components/common/OptionProgressDetailed";
import OptionProgressPreview from "../OptionProgressPreview";
import { useAuth } from "@/context";
import { auditOptions, OptionProgress } from "@/api/audit";
import styles from "@/components/option/OptionProgressOverview/OptionProgressOverview.module.scss";

export const optionMap: { [key: string]: string } = {
  COGSCOPT: "Cognitive Science",
  COMPENGOPT: "Computer Engineering",
  MSCIOPT: "Management Science",
  BIOMECHOPT: "Biomechanics",
  BUSOPT: "Business",
  SWENGOPT: "Software Engineering",
  ENTROPT: "Entrepreneurship",
  AIENGOPT: "Artificial Intelligence",
  COMPUOPT: "Computing",
  STATOPT: "Statistics",
  MATHOPT: "Mathematics",
  MECTROPT: "Mechatronics",
};

export default function OptionProgressOverview() {
  const [selected, setSelected] = useState(-1);
  const [optionSelected, setOptionSelected] = useState<string | null>(null);

  const optionIds = Object.keys(optionMap);
  const optionNames = Object.values(optionMap);

  const handleSelectChange = useCallback(
    (index: number) => {
      setSelected(index);
      setOptionSelected(optionIds[index]);
    },
    [optionIds]
  );

  const handlePreviewClick = (optionName: string) => {
    const index = optionNames.indexOf(optionMap[optionName]);
    if (index !== -1) {
      setSelected(index);
      setOptionSelected(optionIds[index]);
    }
  };

  const { user } = useAuth();
  const [optionProgress, setOptionProgress] = useState<OptionProgress[]>([]);

  const fetchAudit = async (email: string) => {
    try {
      const plans: { [key: string]: [number, number] }[] = await auditOptions(email);

      const progress: OptionProgress[] = plans.map((item: { [key: string]: [number, number] }) => {
        const name = Object.keys(item)[0];
        const [completedRequirements, totalRequirements] = Object.values(item)[0];
        return {
          name,
          completedRequirements,
          totalRequirements,
        };
      });
      setOptionProgress(progress);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAudit("owen.sellner@gmail.com");
  }, [user]);

  return (
    <Box className={styles.wrapper}>
      <Text as='h1' className={`${styles.header} ${selected !== -1 ? styles.selected : ""}`}>
        What option are you interested in?
      </Text>
      <Text as='h3' className={styles.subtitle}>
        Select from available options to see more details
      </Text>
      <Box className={styles.actionSelectContainer}>
        <ActionSelect
          optionList={optionNames}
          selected={selected}
          handleSetSelected={handleSelectChange}
        />
      </Box>

      {optionSelected ? (
        <OptionProgressDetailed />
      ) : (
        <>
          <Text as='h4' className={styles.text}>
            Options you&lsquo;ve made progress towards
          </Text>
          <Box className={styles.progressPreviewContainer}>
            <OptionProgressPreview
              optionProgress={optionProgress[0]}
              isDeclared
              onClick={() => handlePreviewClick(optionProgress[0].name)}
            />
            <OptionProgressPreview
              optionProgress={optionProgress[1]}
              onClick={() => handlePreviewClick(optionProgress[1].name)}
            />
            <OptionProgressPreview
              optionProgress={optionProgress[2]}
              onClick={() => handlePreviewClick(optionProgress[2].name)}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
