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
      <ActionMenu.Overlay side="outside-bottom">
        <Box className={styles.overlay}>
          <ActionList>
            {courseList.length ? (
              courseList.map((course, index) => (
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
              ))
            ) : (
              <ActionList.LinkItem className={styles.linkItem}>
                <span>
                  <b>No alternative courses to recommend :{"("}</b>
                </span>
              </ActionList.LinkItem>
            )}
          </ActionList>
        </Box>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
}
