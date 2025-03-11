import { Box, Text } from "@primer/react";
import { IssueLabel } from "@primer/react/experimental";
import { completedCourseInfo } from "./OptionProgressDetailed";
import { RequirementStatus } from "./RequirementDisplayList";
import { getVariant } from "./RequirementToggleDisplay";

function getCourseCompletionString(completionStatus: RequirementStatus, term: string) {
  if (completionStatus == RequirementStatus.COMPLETE) {
    return `Completed ${term}`;
  } else if (completionStatus == RequirementStatus.PROVISIONALLY_COMPLETE) {
    return `In progress ${term}`;
  }
  return `Incomplete`;
}

export default function CourseCompletionProgress({
  courseInfo,
}: {
  courseInfo: completedCourseInfo;
}) {
  return (
    <Box
      display='flex'
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      width='100%'
      padding='0.5rem 1rem'
      height='69px'
      sx={{
        border: "1px solid #656d76",
        borderWidth: 1,
        borderColor: "border.default",
        borderRadius: "1rem",
      }}
    >
      <Box>
        <Text as='h3' weight='medium'>
          {courseInfo.name}
        </Text>
        <Text as='h5' weight='light' color='#656d76'>
          {courseInfo.description}
        </Text>
      </Box>
      <Box display='flex' justifyContent='flex-end' style={{ flex: 1 }} paddingRight='1rem'>
        <IssueLabel
          text={getCourseCompletionString(courseInfo.status, courseInfo.term)}
          variant={getVariant(courseInfo.status)}
        ></IssueLabel>
      </Box>
    </Box>
  );
}
