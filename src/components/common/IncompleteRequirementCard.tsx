import { Box, Text } from "@primer/react";

export default function IncompleteRequirementCard({
  index,
}: {
  index: number;
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
      sx={{
        border: "1px dashed #656d76",
        borderWidth: 1,
        borderColor: "border.default",
        borderRadius: "1rem",
      }}
    >
      <Text as="h4" fontWeight="medium" color="#656d76">
        {`Course ${index} requirement`}
      </Text>
    </Box>
  );
}
