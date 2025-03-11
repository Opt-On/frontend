import { CheckIcon } from "@primer/octicons-react";
import { ActionList, ActionMenu, Button, Heading, Popover, Text, Tooltip } from "@primer/react";
import { useState } from "react";

export default function ActionSelect() {
  const [selected, setSelected] = useState(-1);

  const courses = ["MSCI 121", "MSCI 342", "MSCI 240", "MSCI 245", "MSCI 433"];

  return (
    <ActionMenu>
      <ActionMenu.Button>{selected === -1 ? "Select Course" : courses[selected]}</ActionMenu.Button>
      <ActionMenu.Overlay width='auto'>
        <ActionList>
          {courses.map((course, index) => (
            <ActionList.LinkItem onClick={() => setSelected(index)}>
              {course}
              <ActionList.LeadingVisual>
                {index === selected ? (
                  <CheckIcon />
                ) : (
                  <span style={{ visibility: "hidden" }}>
                    <CheckIcon />
                  </span>
                )}
              </ActionList.LeadingVisual>
              <ActionList.Description>{course}</ActionList.Description>
            </ActionList.LinkItem>
          ))}
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
}
