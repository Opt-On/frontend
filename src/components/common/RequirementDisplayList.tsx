import { Box, Text } from "@primer/react";
import { IssueLabel } from "@primer/react/experimental";

// prob wanna move this to the api calls
export enum RequirementStatus {
  COMPLETE = "complete",
  PROVISIONALLY_COMPLETE = "provisionally complete",
  INCOMPLETE = "incomplete",
}

export type RequirementInfo = {
  requirementName: string;
  date?: string;
  status: RequirementStatus;
};

export const getVariant = (status: string) => {
  switch (status) {
    case RequirementStatus.COMPLETE:
      return "green";
    case RequirementStatus.PROVISIONALLY_COMPLETE:
      return "yellow";
    case RequirementStatus.INCOMPLETE:
      return "red";
    default:
      return "plum";
  }
};

export function RequirementDisplayList({
  requirementInfo,
}: {
  requirementInfo: RequirementInfo[];
}) {
  return (
    <>
      {requirementInfo.map((requirement, index) => {
        return (
          <Box
            key={`term${index}`}
            display="flex"
            flexDirection="row"
            padding="0.75rem"
            margin="0.5rem"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "border.default",
              borderRadius: "1rem",
            }}
          >
            <Box
              paddingLeft="1rem"
              display="flex"
              flexDirection="row"
              alignItems="center"
              sx={{ flex: 1 }}
            >
              <h3>{requirement.requirementName}</h3>
              {requirement.date && (
                <Text
                  weight="light"
                  color="#656d76"
                  style={{ flex: 1, paddingLeft: "0.5rem" }}
                >
                  {requirement.date}
                </Text>
              )}
            </Box>
            <Box
              display="flex"
              justifyContent="flex-end"
              style={{ flex: 1 }}
              paddingRight="1rem"
            >
              {/* TODO: Make this label look better */}
              <IssueLabel
                text={requirement.status}
                variant={getVariant(requirement.status)}
              ></IssueLabel>
            </Box>
          </Box>
        );
      })}
    </>
  );
}
