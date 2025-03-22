import { Box, Text } from "@primer/react";
import {
  RecommendedCourse,
  recommendedCourseInfo,
} from "./OptionProgressDetailed";
import SwitchCourseSelect from "./SwitchCourseSelect";

export default function RecommendedCourseCard({
  courseInfo,
  altCourses,
  altCourseInfo,
  handleSwitchCourse,
}: {
  courseInfo: recommendedCourseInfo;
  altCourses: string[];
  altCourseInfo: { [key: string]: RecommendedCourse };
  handleSwitchCourse: (a: string, b: string) => void;
}) {
  const filteredAltCourses = altCourses.filter(
    (altCourse) => altCourseInfo[altCourse].isUsed === false
  );

  const enrichedAltCourses = filteredAltCourses.map(
    (altCourse) => altCourseInfo[altCourse]
  );

  enrichedAltCourses.sort((a, b) => -a.score + b.score);
  const courses = enrichedAltCourses;

  const handleSetSelected = (switchCourse: string) => {
    handleSwitchCourse(courseInfo.name, switchCourse);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      padding="0.5rem 1rem"
      height="69px"
      backgroundColor="rgba(9, 107, 218, 0.1)"
      sx={{
        // todo: color is off need to add gradient
        border: "1px solid rgba(84, 174, 255, 0.4)",
        borderWidth: 1,
        borderRadius: "1rem",
      }}
    >
      <Box>
        <Text as="h3" weight="medium" color="#0969DA">
          {courseInfo.name}
        </Text>
        <Text as="h5" weight="light">
          {courseInfo.description}
        </Text>
      </Box>
      {/* TODO: replace this shit with a select menu */}
      {/* <Button leadingVisual={SyncIcon}>Change</Button> */}
      <SwitchCourseSelect
        courseList={courses}
        handleSetSelected={handleSetSelected}
      />
    </Box>
  );
}
