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
import { useEffect, useState } from "react";

export default function OptionHeader({
  completedRequirements,
  totalRequirements,
  filterPrereqs,
  togglePrereq,
  showRecommendations,
  toggleShowRecommendations,
  missingRequirementsList,
}) {
  const [courseReqStr, setCourseReqStr] = useState<string>("");

  useEffect(() => {
    let firstMissing = true;
    let missingString = "You need to complete ";
    for (const i in missingRequirementsList) {
      if (missingRequirementsList[i] > 0) {
        if (firstMissing) {
          firstMissing = false;
          missingString += `${missingRequirementsList[i]} course${
            missingRequirementsList[i] > 1 ? "s" : ""
          } from list ${parseInt(i) + 1}`;
        } else {
          missingString += `, ${missingRequirementsList[i]} course${
            missingRequirementsList[i] > 1 ? "s" : ""
          } from list ${parseInt(i) + 1}`;
        }
      }
    }
    const split = missingString.split(",");
    if (split.length > 1) {
      split[split.length - 1] = " and" + split[split.length - 1];
      missingString = split.join(",");
    }
    setCourseReqStr(missingString);
  }, [missingRequirementsList]);

  return (
    <Box
      padding="1.5rem"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      sx={{
        border: "1px solid #656d76",
        borderWidth: 1,
        borderColor: "border.default",
        borderRadius: "1rem",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Box minWidth="12rem" paddingRight={2}>
        <Text as="h1" weight="medium" style={{ fontSize: "2.5rem" }}>
          {completedRequirements}/{totalRequirements}
        </Text>
        <Text weight="light">option requirements met</Text>
        <ProgressBar
          style={{
            marginTop: "3rem",
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
        style={{ width: "1px", background: "#dee3e8", margin: "0 0.5rem" }}
      />

      <Box
        direction={"vertical"}
        paddingX={16}
      >
        <Box display="flex" flexDirection="column">
          <Text weight="semibold">TLDR;</Text>
          <Text>{courseReqStr}</Text>
        </Box>
        <Box padding="1rem 0">
          <Stack direction="horizontal" align="center" justify="space-between">
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
            style={{ padding: '8px 16px' }}            
            onClick={toggleShowRecommendations}
            background="6260AD"
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
