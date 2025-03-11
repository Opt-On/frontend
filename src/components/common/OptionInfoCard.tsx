import { Box, Text } from "@primer/react";

// export type OptionInfoCardProps = {};

// export function OptionInfoCard({
//   optionInfo,
// }: {
//   optionInfo: OptionInfoCardProps;
// }) {

export function OptionInfoCard() {
  return (
    <Box
      padding="1.25rem"
      color="#0969da"
      //   minHeight="20vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      sx={{
        border: "2px solid rgba(9, 107, 218, 0.25)",
        borderRadius: "1rem",
        aspectRatio: "323/281",
      }}
    >
      <Text as="h5" weight="medium">
        Computing Option
      </Text>
      <h6>
        <span style={{ color: "#0969da", opacity: 0.5 }}>
          easy peasy lemon squeezy.
        </span>
      </h6>
    </Box>
  );
}
