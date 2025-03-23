import { Box, Text } from "@primer/react";

export default function OptionInfoSubheader() {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      width="100%"
      padding="1rem 3rem"
    >
      <Box>
        <Text as="h5" weight="semibold">
          Status
        </Text>
        <Text as="h5" weight="light">
          Declared in 3A (F23)
        </Text>
      </Box>
      <Box>
        <Text as="h5" weight="semibold">
          grade requirements
        </Text>
        <Text as="h5" weight="light">
          minimum 70% average
        </Text>
      </Box>
      <Box>
        <Text as="h5" weight="semibold">
          coordinator
        </Text>
        <Text as="h5" weight="light">
          Fatih Safa Erenay, Management Science and Engineering
        </Text>
      </Box>
    </Box>
  );
}
