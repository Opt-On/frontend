import { SyncIcon } from "@primer/octicons-react";
import { ActionList, ActionMenu, Box } from "@primer/react";
import styles from "./ActionSelect.module.scss";
import { RecommendedCourse } from "./OptionProgressDetailed";

export default function SwitchCourseSelect({
  handleSetSelected,
  courseList,
}: {
  handleSetSelected: (course: string) => void;
  courseList: RecommendedCourse[];
}) {
  return (
    <ActionMenu>
      <ActionMenu.Button leadingVisual={SyncIcon}>
        <Box className={styles.button}>Switch</Box>
      </ActionMenu.Button>
      <ActionMenu.Overlay side="inside-center">
        <Box className={styles.overlay}>
          <ActionList>
            {courseList.map((course, index) => (
              <ActionList.LinkItem
                key={`courseList-${index}`}
                className={styles.linkItem}
                onClick={() => handleSetSelected(course.name)}
              >
                <span>
                  <b>{course.name} </b>
                </span>
                - {course.description}
              </ActionList.LinkItem>
            ))}
          </ActionList>
        </Box>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
}
