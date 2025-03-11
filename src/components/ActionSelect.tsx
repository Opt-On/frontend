import { CheckIcon } from "@primer/octicons-react";
import { ActionList, ActionMenu, Box } from "@primer/react";

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
