import { useAuth } from "@/context/AuthContext";
import { CheckIcon } from "@primer/octicons-react";
import { ActionList, ActionMenu, Box } from "@primer/react";
import { useMemo } from "react";
import styles from "./ActionSelect.module.scss";

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
  const filteredOptionList = useMemo(() => {
    const optionBlacklist = new Map(
      Object.entries({
        "Artificial Intelligence": ["Artificial Intelligence Specialization"],
        Biomechanics: [],
        "Computer Engineering": [
          "Computing Option",
          "Software Engineering Option",
        ],
        Computing: [
          "Computer Engineering",
          "Computer Engineering Option",
          "Software Engineering",
          "Software Engineering Option",
        ],
        Entrepreneurship: [],
        "Management Science": ["Management Engineering"],
        Mechatronics: [],
        "Software Engineering": [],
        Statistics: [],
      })
    );

    if (!userInfo?.program) {
      return optionList;
    }

    const filtered = optionList.filter((option) => {
      return !(optionBlacklist.get(option) || []).includes(userInfo.program);
    });
    return filtered;
  }, [optionList, userInfo]);

  return (
    <ActionMenu>
      <ActionMenu.Button>
        <Box className={styles.button}>
          {selected === -1 ? "Choose an option" : optionList[selected]}
        </Box>
      </ActionMenu.Button>
      <ActionMenu.Overlay side="inside-center">
        <Box className={styles.overlay}>
          <ActionList>
            {filteredOptionList.map((option, index) => (
              <ActionList.LinkItem
                key={`courseList-${index}`}
                className={styles.linkItem}
                onClick={() => handleSetSelected(index)}
              >
                <span>{option}</span>
                <ActionList.LeadingVisual>
                  {index === selected ? (
                    <CheckIcon />
                  ) : (
                    <span className={styles.hidden}>
                      <CheckIcon />
                    </span>
                  )}
                </ActionList.LeadingVisual>
              </ActionList.LinkItem>
            ))}
          </ActionList>
        </Box>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
}
