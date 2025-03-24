import { AlertIcon } from "@primer/octicons-react";
import { Box, Link, Text } from "@primer/react";
import { useState } from "react";
import MissingPrereqHover from "./MissingPrereqHover";
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
  const [showDetails, setShowDetails] = useState(false);

  const filteredAltCourses = altCourses.filter(
    (altCourse) => altCourseInfo[altCourse].isUsed === false
  );

  const currCourseData = altCourseInfo[courseInfo.name];

  const enrichedAltCourses = filteredAltCourses.map(
    (altCourse) => altCourseInfo[altCourse]
  );

  enrichedAltCourses.sort((a, b) => -a.score + b.score);
  const courses = enrichedAltCourses;

  const handleSetSelected = (switchCourse: string) => {
    handleSwitchCourse(courseInfo.name, switchCourse);
  };

  const uwFlowLink = () => {
    return `https://uwflow.com/course/${courseInfo.name
      .split(" ")
      .join("")
      .toLowerCase()}`;
  };

  const setShowDetailss = () => {
    setShowDetails(true);
  };

  const missingTermPrereq =
    currCourseData.termFlag + currCourseData.programFlag[1];

  const missingCoursePrereq = currCourseData.prereqFlag;

  const missingPrereqs = [];
  if (missingTermPrereq > 0) {
    missingPrereqs.push("Term");
  }
  if (missingCoursePrereq > 0) {
    missingPrereqs.push("Course");
  }

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
        <Box>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Link href={uwFlowLink()} target="_blank">
              {" "}
              <Text as="h3" weight="medium">
                {courseInfo.name}
              </Text>
            </Link>
            {missingPrereqs.length > 0 && (
              <Box
                display="flex"
                flexDirection="row"
                paddingLeft="0.8rem"
                color="#9a6700" // yellow
                alignItems="center"
                onMouseEnter={() => setShowDetailss()}
                onMouseLeave={() => setShowDetails(false)}
              >
                <Text
                  as="p"
                  marginBottom="0"
                  marginRight="0.25rem"
                  weight="light"
                >
                  Prequisites not met
                </Text>

                <AlertIcon size={16} />
                {showDetails && (
                  <MissingPrereqHover missingPrereqs={missingPrereqs} />
                )}
              </Box>
            )}
          </Box>
        </Box>

        <Text as="h5" weight="light">
          {courseInfo.description}
        </Text>
      </Box>
      <SwitchCourseSelect
        courseList={courses}
        handleSetSelected={handleSetSelected}
      />
    </Box>
  );
}
