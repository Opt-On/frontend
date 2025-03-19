"use client";
import { Box, Text } from "@primer/react";
import { useCallback, useEffect, useState } from "react";
import ActionSelect from "@/components/ActionSelect";
import OptionProgressDetailed from "@/components/common/OptionProgressDetailed";
import OptionProgressPreview from "../OptionProgressPreview";
import { useAuth } from "@/context";
import { auditOptions, OptionProgress } from "@/api/audit";


export default function OptionProgressOverview() {
  const [selected, setSelected] = useState(-1);
  // const [isMainPage, setIsMainPage] = useState(true);
  const [optionSelected, setOptionSelected] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optionList = [
    "Artificial Intelligence",
    "Biomechanics",
    "Computer Engineering",
    "Computing",
    "Entrepreneurship",
    "Environmental Engineering",
    "Life Sciences",
    "Management Science",
    "Mechatronics",
    "Physical Sciences",
    "Quantum Engineering",
    "Software Engineering",
    "Statistics",
  ];

  const handleSelectChange = useCallback(
    (index: number) => {
      setSelected(index);
      setOptionSelected(optionList[index]);
    },
    [optionList]
  );

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
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
      // marginTop="1rem"
    >
      <Text
        as='h1'
        marginTop={selected == -1 ? "6rem" : "2rem"}
        weight='light'
        style={{ fontWeight: 600, fontSize: 32, lineHeight: "150%" }}
      >
        What option are you interested in?
      </Text>
      <Text as='h3' weight='light' marginTop='0.25rem'>
        Select from available options to see more details
      </Text>
      {/* primers select buggy mess, will deal with later*/}
      <Box marginTop='1rem'>
        <ActionSelect
          optionList={optionList}
          selected={selected}
          handleSetSelected={handleSelectChange}
        />
      </Box>

      {optionSelected ? (
        <OptionProgressDetailed />
      ) : (
        <>
          <Text weight='light' marginTop='8rem' as='h4'>
            Options you&lsquo;ve made progress towards{" "}
          </Text>
          <Box display='flex' flexDirection='row' sx={{ gap: "2rem" }} marginTop='3rem'>
            <OptionProgressPreview optionProgress={optionProgress[0]} isDeclared />
            <OptionProgressPreview optionProgress={optionProgress[1]} />
            <OptionProgressPreview optionProgress={optionProgress[2]} />
          </Box>
        </>
      )}
    </Box>
  );
}
