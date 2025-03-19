import { CheckIcon } from "@primer/octicons-react";
import { ActionList, ActionMenu, Box } from "@primer/react";
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
  return (
    <ActionMenu>
      <ActionMenu.Button>
        <Box className={styles.button}>
          {selected === -1 ? "Choose an option" : optionList[selected]}
        </Box>
      </ActionMenu.Button>
      <ActionMenu.Overlay side='inside-center'>
        <Box className={styles.overlay}>
          <ActionList>
            {optionList.map((option, index) => (
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
