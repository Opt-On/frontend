import {
  ArrowUpRightIcon,
  SparkleFillIcon,
  UndoIcon,
} from "@primer/octicons-react";
import { Box, Button, ProgressBar, Text } from "@primer/react";
import { useState } from "react";
import CourseCompletionProgress from "./CourseProgressCard";
import IncompleteRequirementCard from "./IncompleteRequirementCard";
import RecommendedCourseCard from "./RecommendedCourseCard";
import { RequirementStatus } from "./RequirementDisplayList";

export type completedCourseInfo = {
  name: string;
  term: string;
  description: string;
  status: RequirementStatus;
};

export type recommendedCourseInfo = {
  name: string;
  description: string;
};

export type OptionRequirement = {
  name: string;
  courseCount: number;
  completionStatus: RequirementStatus;
  completedCourses: completedCourseInfo[];
  recommendedCourses?: recommendedCourseInfo[];
};

export const getColor = (status: string) => {
  switch (status) {
    case RequirementStatus.COMPLETE:
      return "green";
    case RequirementStatus.PROVISIONALLY_COMPLETE:
      return "gray";
    case RequirementStatus.INCOMPLETE:
      return "gray";
    default:
      return "plum";
  }
};

export default function OptionProgressDetailed() {
  const [showRecommendations, setShowRecommendations] = useState(false);

  // from db/ model
  const completedRequirements = 3;
  const totalRequirements = 6;
  const optionRequirements: OptionRequirement[] = [
    {
      name: "List 1",
      courseCount: 1,
      completionStatus: RequirementStatus.COMPLETE,
      completedCourses: [
        {
          name: "MSE 121",
          term: "1A",
          description: "intro to programming",
          status: RequirementStatus.COMPLETE,
        },
      ],
      recommendedCourses: [
        {
          name: "MSE 121",
          description: "intro to programming",
        },
      ],
    },
    {
      name: "List 2",
      courseCount: 1,
      completionStatus: RequirementStatus.COMPLETE,
      completedCourses: [
        {
          name: "MSE 240",
          term: "2A",
          description: "dsa",
          status: RequirementStatus.COMPLETE,
        },
      ],
    },
    {
      name: "List 3",
      courseCount: 4,
      completionStatus: RequirementStatus.INCOMPLETE,
      completedCourses: [
        {
          name: "MSE 343",
          term: "3B",
          description: "human-computer interaction",
          status: RequirementStatus.PROVISIONALLY_COMPLETE,
        },
      ],
      recommendedCourses: [
        {
          name: "MSE 121",
          description: "intro to programming",
        },
        {
          name: "MSE 121",
          description: "intro to programming",
        },
        {
          name: "MSE 121",
          description: "intro to programming",
        },
      ],
    },
  ];

  const toggleShowRecommendations = () => {
    // api call here to run model maybe ? depends on a bunch of stuff
    setShowRecommendations(!showRecommendations);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      marginTop="1rem"
      alignItems="center"
      width="45rem"
    >
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
        }}
      >
        <Box padding="0.5rem">
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
            <Text whiteSpace="nowrap">
              You need to complete 1 course from List 2, and 2 courses from List
              3
            </Text>
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
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        sx={{ gap: "2rem" }}
      >
        {optionRequirements.map((optionRequirement, index) => {
          return (
            <Box
              key={`optionRequirement${index}`}
              display="flex"
              flexDirection="row"
              gridTemplateColumns="12rem auto"
              alignItems="stretch"
              sx={{ gap: "1rem" }}
            >
              <Box display="flex" flexDirection="column">
                <Text
                  as="h3"
                  weight="medium"
                  whiteSpace="nowrap"
                  style={{ width: "7rem" }}
                >
                  {optionRequirement.name} <ArrowUpRightIcon size={24} />
                </Text>
                {/* we may want to map this to the exact copy, too lazy rn */}
                <Text
                  as="h4"
                  weight="light"
                  color={getColor(optionRequirement.completionStatus)}
                >
                  {optionRequirement.completionStatus}
                </Text>
              </Box>
              <Box
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="stretch"
                sx={{ gap: "0.5rem" }}
              >
                {optionRequirement.completedCourses.map(
                  (completedCourse, courseIndex) => {
                    return (
                      <CourseCompletionProgress
                        key={`courseProgressCard${index}-${courseIndex}`}
                        courseInfo={completedCourse}
                      />
                    );
                  }
                )}
                {showRecommendations &&
                  optionRequirement.recommendedCourses &&
                  optionRequirement.recommendedCourses
                    .slice(
                      0,
                      optionRequirement.courseCount -
                        optionRequirement.completedCourses.length
                    )
                    .map((recommendedCourse, recommendationIndex) => {
                      return (
                        <RecommendedCourseCard
                          key={`recommendation${index}-${recommendationIndex}`}
                          courseInfo={recommendedCourse}
                        />
                      );
                    })}
                {!showRecommendations &&
                  [
                    ...Array(
                      optionRequirement.courseCount -
                        optionRequirement.completedCourses.length
                    ),
                  ].map((_, incompleteIndex) => {
                    return (
                      <IncompleteRequirementCard
                        key={`courseProgressCard${index}-${incompleteIndex}}`}
                        index={
                          optionRequirement.courseCount -
                          optionRequirement.completedCourses.length +
                          incompleteIndex -
                          1
                        }
                      />
                    );
                  })}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
