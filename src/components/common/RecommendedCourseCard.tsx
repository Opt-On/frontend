import { SyncIcon } from "@primer/octicons-react";
import { Box, Button, Text } from "@primer/react";
import { recommendedCourseInfo } from "./OptionProgressDetailed";

export default function RecommendedCourseCard({
  courseInfo,
}: {
  courseInfo: recommendedCourseInfo;
}) {
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
          deez nuts
        </Text>
      </Box>
      {/* TODO: replace this shit with a select menu */}
      <Button leadingVisual={SyncIcon}>Change</Button>
    </Box>
  );
}
