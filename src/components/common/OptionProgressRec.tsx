/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { ArrowUpRightIcon } from "@primer/octicons-react";
import { Box, Text } from "@primer/react";
import CourseCompletionProgress from "./CourseProgressCard";
import { getColor } from "./OptionProgressDetailed";
import RecommendedCourseCard from "./RecommendedCourseCard";

export default function OptionProgressRec({
  recommendationCourses,
  filterPrereqs,
  switchCourse,
  optionRequirementsRecommendation,
  recommendationCourseLists,
  courseUsageMap,
}) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      sx={{ gap: "2rem" }}
    >
      {optionRequirementsRecommendation.map((optionRequirement, index) => {
        return (
          <Box
            key={`optionRequirement${index}`}
            display="flex"
            flexDirection="row"
            gridTemplateColumns="12rem auto"
            alignItems="stretch"
            sx={{ gap: "1rem" }}
          >
            <Box display="flex" flexDirection="column">
              <Text
                as="h3"
                weight="medium"
                whiteSpace="nowrap"
                style={{ width: "7rem" }}
              >
                {optionRequirement.displayName} <ArrowUpRightIcon size={24} />
              </Text>
              {/* we may want to map this to the exact copy, too lazy rn */}
              <Text
                as="h4"
                weight="light"
                color={getColor(optionRequirement.completionStatus)}
              >
                {optionRequirement.completionStatus}
              </Text>
            </Box>
            <Box
              width="100%"
              display="flex"
              flexDirection="column"
              alignItems="stretch"
              sx={{ gap: "0.5rem" }}
            >
              {optionRequirement.completedCourses.map(
                (completedCourse, courseIndex) => {
                  return (
                    <CourseCompletionProgress
                      key={`courseProgressCard${index}-${courseIndex}`}
                      courseInfo={completedCourse}
                      courseUsageMap={courseUsageMap}
                    />
                  );
                }
              )}
              {optionRequirement.recommendedCourses
                .slice(
                  0,
                  optionRequirement.courseCount -
                    optionRequirement.completedCourses.length
                )
                .map((recommendedCourse, recommendationIndex) => {
                  return (
                    <RecommendedCourseCard
                      key={`recommendation${index}-${recommendationIndex}`}
                      courseInfo={recommendedCourse}
                      altCourses={
                        recommendedCourse.sublistName in
                        recommendationCourseLists
                          ? recommendationCourseLists[
                              recommendedCourse.sublistName
                            ]
                          : []
                      }
                      altCourseInfo={recommendationCourses}
                      filterPrereqs={filterPrereqs}
                      handleSwitchCourse={switchCourse}
                      courseUsageMap={courseUsageMap}
                    />
                  );
                })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
