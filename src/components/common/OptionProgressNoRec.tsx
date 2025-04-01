/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { ArrowUpRightIcon } from "@primer/octicons-react";
import { Box, Text } from "@primer/react";
import CourseCompletionProgress from "./CourseProgressCard";
import IncompleteRequirementCard from "./IncompleteRequirementCard";
import { getColor } from "./OptionProgressDetailed";

export default function OptionProgressNoRec({ optionRequirements, courseUsageMap }) {
  return (
    <Box display='flex' flexDirection='column' width='100%' sx={{ gap: "2rem" }}>
      {optionRequirements.map((optionRequirement, index) => {
        return (
          <Box
            key={`optionRequirement${index}`}
            display='flex'
            flexDirection='row'
            gridTemplateColumns='12rem auto'
            alignItems='stretch'
            sx={{ gap: "1rem" }}
          >
            <Box display='flex' flexDirection='column'>
              <Text as='h3' weight='medium' whiteSpace='nowrap' style={{ width: "7rem" }}>
                {optionRequirement.displayName} <ArrowUpRightIcon size={24} />
              </Text>
              {/* we may want to map this to the exact copy, too lazy rn */}
              <Text as='h4' weight='light' color={getColor(optionRequirement.completionStatus)}>
                {optionRequirement.completionStatus}
              </Text>
            </Box>
            <Box
              width='100%'
              display='flex'
              flexDirection='column'
              alignItems='stretch'
              sx={{ gap: "0.5rem" }}
            >
              {optionRequirement.completedCourses.map((completedCourse, courseIndex) => {
                return (
                  <CourseCompletionProgress
                    key={`courseProgressCard${index}-${courseIndex}`}
                    courseInfo={completedCourse}
                    courseUsageMap={courseUsageMap}
                  />
                );
              })}
              {[
                ...Array(optionRequirement.courseCount - optionRequirement.completedCourses.length),
              ].map((_, incompleteIndex) => {
                return (
                  <IncompleteRequirementCard
                    key={`courseProgressCard${index}-${incompleteIndex}}`}
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
