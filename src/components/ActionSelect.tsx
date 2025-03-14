import { useAuth } from "@/context";
import { CheckIcon } from "@primer/octicons-react";
import { ActionList, ActionMenu, Box } from "@primer/react";
import { useMemo } from "react";

export default function ActionSelect({
  selected,
  handleSetSelected,
  optionList,
}: {
  selected: number;
  handleSetSelected: (index: number) => void;
  optionList: string[];
}) {
  const { userInfo } = useAuth();
  const optionBlacklist = {
    "Artificial Intelligence Option": [
      "Artificial Intelligence Specialization",
    ],
    "Biomechanics Option": [],
    "Computer Engineering Option": [
      "Computing Option",
      "Software Engineering Option",
    ],
    "Computing Option": [
      "Computer Engineering",
      "Computer Engineering Option",
      "Software Engineering",
      "Software Engineering Option",
    ],
    "Entrepreneurship Option": [],
    "Management Science Option": ["Management Engineering"],
    "Mechatronics Option": [],
    "Software Engineering": [],
    "Statistics Option": [],
  };

  const filteredOptionList = useMemo(() => {
    if (!userInfo?.program) return optionList;
    return optionList.filter((option) => {
      return (
        !optionBlacklist[option]?.includes(userInfo.program) &&
        userInfo.options.every(option)
      );
    });
  }, [optionList, userInfo]);

  return (
    <ActionMenu>
      <ActionMenu.Button>
        <Box width="25rem">
          {selected === -1 ? "Choose an option" : optionList[selected]}
        </Box>
      </ActionMenu.Button>
      <ActionMenu.Overlay width="auto" side="inside-center">
        <ActionList>
          {optionList.map((option, index) => (
            <ActionList.LinkItem
              key={`courseList-${index}`}
              onClick={() => handleSetSelected(index)}
            >
              <span>{option}</span>
              <ActionList.LeadingVisual>
                {index === selected ? (
                  <CheckIcon />
                ) : (
                  <span style={{ visibility: "hidden" }}>
                    <CheckIcon />
                  </span>
                )}
              </ActionList.LeadingVisual>
            </ActionList.LinkItem>
          ))}
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
}
