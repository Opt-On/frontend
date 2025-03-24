import { Box, Text } from "@primer/react";

export default function MissingPrereqHover({
  missingPrereqs,
}: {
  missingPrereqs: string[];
}) {
  const missingPrereqText = missingPrereqs.join("/ ") + " requirement not met.";
  return (
    <Box position="relative">
      <Box
        top="-2.5rem"
        left="0.5rem"
        position="absolute"
        background="white"
        padding="1rem"
        sx={{
          border: "1px solid #656d76",
          borderWidth: 1,
          borderColor: "border.default",
          borderRadius: "1rem",
        }}
        color="black"
        display="flex"
        flexDirection="column"
      >
        <Text whiteSpace="nowrap">
          <span>
            <b>Missing prerequisite:</b>
          </span>
        </Text>
        <Text>{missingPrereqText}</Text>
      </Box>
    </Box>
  );
}
