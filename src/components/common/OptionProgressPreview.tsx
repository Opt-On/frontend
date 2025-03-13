import { Box, Label, ProgressBar, Text } from "@primer/react";

export type OptionProgressPreviewProps = {
  isDeclared: boolean;
};

export default function OptionProgressPreview({
  isDeclared,
}: OptionProgressPreviewProps) {
  const name = "Management Sciences option";
  const totalRequirements = 6;
  const completedRequirements = 3;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      width="100%"
      height="100%"
      minHeight="160px"
      padding="1rem"
      sx={{
        border: "2px solid #d0d7de",
        borderRadius: "1rem",
        aspectRatio: "368/156",
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ gap: "1rem" }}
      >
        <Text fontWeight="semibold" style={{ flexWrap: "nowrap" }} as="h4">
          {name}
        </Text>
        {isDeclared && (
          <Label variant="success" size="large">
            Declared
          </Label>
        )}
      </Box>
      <Box>
        <Text paddingBottom="0.5rem">
          {completedRequirements} / {totalRequirements} requirements met
        </Text>
        <ProgressBar
          style={{
            marginTop: "0.25rem",
            color: "#d4a72c",
            borderRadius: "1rem",
            opacity: 0.8,
          }}
          // colors r fucked, have to use primers
          bg="attention.emphasis"
          barSize="large"
          progress={(completedRequirements / totalRequirements) * 100}
        />
        <ProgressBar.Item></ProgressBar.Item>
      </Box>
    </Box>
  );
}
