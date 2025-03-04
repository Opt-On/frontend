import { Box, Text } from "@primer/react";
import {
  RequirementDisplayList,
  RequirementInfo,
  RequirementStatus,
} from "./RequirementDisplayList";

export type RequirementDisplayInfo = {
  requirementInfo: RequirementInfo[];
  date?: string;
  completionStatus: RequirementStatus;
  name: string;
};

// todo: consolidate colors
export const getVariant = (status: string) => {
  switch (status) {
    case RequirementStatus.COMPLETE:
      return "#1a7f37";
    case RequirementStatus.PROVISIONALLY_COMPLETE:
      return "#9a6700";
    case RequirementStatus.INCOMPLETE:
      return "#cf222e";
    default:
      // Error only
      return "#8250df";
  }
};

export function RequirementDisplay({
  requirementDisplayInfo,
}: {
  requirementDisplayInfo: RequirementDisplayInfo;
}) {
  return (
    <Box
      display="grid"
      gridTemplateColumns="10rem 1fr"
      width="100%"
      padding="8rem"
      paddingTop="3rem"
    >
      <Box display="flex" flexDirection="column" marginTop="0.5rem">
        <h3>{requirementDisplayInfo.name}</h3>
        <Text weight="light">{"Fall 2020"}</Text>
        {/* todo: dynamic colors, consolidate colors somewhere */}
        <Text
          marginTop="1.5rem"
          color={getVariant(requirementDisplayInfo.completionStatus)}
          weight="light"
        >
          {requirementDisplayInfo.completionStatus}
        </Text>
      </Box>
      <Box display="flex" flexDirection="column">
        <RequirementDisplayList
          requirementInfo={requirementDisplayInfo.requirementInfo}
        />
      </Box>
    </Box>
  );
}
