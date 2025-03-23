/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { SparkleFillIcon, UndoIcon } from "@primer/octicons-react";
import {
  Box,
  Button,
  ProgressBar,
  Stack,
  Text,
  ToggleSwitch,
} from "@primer/react";

export default function OptionHeader({
  completedRequirements,
  totalRequirements,
  filterPrereqs,
  togglePrereq,
  showRecommendations,
  toggleShowRecommendations,
}) {
  return (
    <Box
      padding="0.5rem"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      sx={{
        border: "1px solid #656d76",
        borderWidth: 1,
        borderColor: "border.default",
        borderRadius: "1rem",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        // height: 500,
      }}
    >
      <Box padding="0.5rem" minWidth="12rem">
        <Text as="h1" weight="medium" style={{ fontSize: "2.5rem" }}>
          {completedRequirements}/{totalRequirements}
        </Text>
        <Text weight="light">option requirements met</Text>
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
      </Box>
      <div
        style={{ width: "1px", backgroundColor: "gray", margin: "0 0.5rem" }}
      />

      <Box
        display="flex"
        flexDirection="column"
        padding="0.5rem"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="column">
          <Text weight="semibold">TLDR;</Text>
          <Text>
            You need to complete 1 course from List 2, and 2 courses from List 3
            You need to complete 1 course from List 2, and 2 courses from List 3{" "}
            {/*TODO FIX THIS TEXT */}
          </Text>
        </Box>
        <Box padding="0.25rem 0">
          <Stack
            direction="horizontal"
            align="center"
            marginTop="0.5rem"
            marginBottom="2.75rem"
            justify="space-between"
          >
            <Text as="p" weight="light" marginBottom="0">
              Recommend only courses with fulfiled prerequisites
            </Text>
            <ToggleSwitch
              size="small"
              className="hide-text"
              checked={filterPrereqs}
              onClick={togglePrereq}
            />
          </Stack>
        </Box>
        {!showRecommendations ? (
          <Button
            variant="primary"
            trailingVisual={SparkleFillIcon}
            block={false}
            onClick={toggleShowRecommendations}
          >
            Get Recommendations
          </Button>
        ) : (
          <Button
            trailingVisual={UndoIcon}
            block={false}
            onClick={toggleShowRecommendations}
          >
            Reset Recommendations
          </Button>
        )}
      </Box>
    </Box>
  );
}
