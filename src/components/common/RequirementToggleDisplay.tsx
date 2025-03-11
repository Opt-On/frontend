import { Box, Text } from "@primer/react";
import { IssueLabel } from "@primer/react/experimental";
import { useState } from "react";
import {
  CourseResult,
  RequirementInfo,
  RequirementStatus,
} from "./RequirementDisplayList";

export const getVariant = (status: string) => {
  switch (status) {
    case RequirementStatus.COMPLETE:
      return "green";
    case RequirementStatus.PROVISIONALLY_COMPLETE:
      return "yellow";
    case RequirementStatus.INCOMPLETE:
      return "red";
    default:
      return "plum";
  }
};

export default function RequirementToggleDisplay({
  index,
  requirementInfo,
}: {
  index: number;
  requirementInfo: RequirementInfo;
}) {
  const [showCourses, setShowCourses] = useState(false);

  const toggleShowCourses = () => {
    setShowCourses(!showCourses);
  };
  const courses: CourseResult[] = [
    {
      courseCode: "MSE 121",
      courseName: "intro to programming",
      grade: 77,
    },
    {
      courseCode: "MSE 212",
      courseName: "intro to bfa",
      grade: 69,
    },
    {
      courseCode: "MATH 116",
      courseName: "intro to calc",
      grade: 90,
    },
    {
      courseCode: "CHE 102",
      courseName: "intro to breaking bad",
      grade: 100,
    },
  ];

  return (
    <Box
      key={`term${index}`}
      display="flex"
      flexDirection="column"
      padding="0.75rem"
      margin="0.5rem"
      justifyContent="space-between"
      sx={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "border.default",
        borderRadius: "1rem",
        cursor: "pointer",
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        onClick={toggleShowCourses}
      >
        <Box
          paddingLeft="1rem"
          display="flex"
          flexDirection="row"
          alignItems="center"
          sx={{ flex: 1 }}
        >
          <h3>{requirementInfo.requirementName}</h3>
          {requirementInfo.date && (
            <Text
              weight="light"
              color="#656d76"
              style={{ flex: 1, paddingLeft: "0.5rem" }}
            >
              {requirementInfo.date}
            </Text>
          )}
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          style={{ flex: 1 }}
          paddingRight="1rem"
        >
          {/* TODO: Make this label look better */}
          <IssueLabel
            text={requirementInfo.status}
            variant={getVariant(requirementInfo.status)}
          ></IssueLabel>
        </Box>
      </Box>
      {showCourses && (
        <Box
          padding="0 1rem"
          display="flex"
          flexDirection="column"
          alignItems="center"
          paddingTop="0.5rem"
          marginTop="0.25rem"
          sx={{
            borderTopWidth: 1,
            borderTopStyle: "solid",
            borderTopColor: "border.default",
            cursor: "pointer",
            flex: 1,
          }}
        >
          {courses.map((course, index) => {
            return (
              <Box
                key={`${index}`}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Box>
                  <Text weight="semibold">{course.courseCode}</Text>
                  <Text marginLeft="0.5rem" weight="light">
                    {course.courseName}
                  </Text>
                </Box>
                <Box>
                  <Text weight="light">{course.grade}</Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
