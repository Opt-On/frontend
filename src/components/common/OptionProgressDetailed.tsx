import { auditWhatIf } from "@/api/audit";
import { getRecommendations } from "@/api/recommendation";
import { useAuth } from "@/context";
import {
  ArrowUpRightIcon,
  SparkleFillIcon,
  UndoIcon,
} from "@primer/octicons-react";
import { Box, Button, ProgressBar, Text } from "@primer/react";
import { useEffect, useState } from "react";
import { optionMap } from "../option/OptionProgressOverview";
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
  recommendedCourses: recommendedCourseInfo[];
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

export default function OptionProgressDetailed({ option }: { option: string }) {
  const { user, courseTerms, courseNameMap } = useAuth();

  const [showRecommendations, setShowRecommendations] = useState(false);
  const [optionRequirements, setOptionRequirements] = useState<
    OptionRequirement[]
  >([]);
  const [
    optionRequirementsRecommendation,
    setOptionRequirementsRecommendation,
  ] = useState<OptionRequirement[]>([]);
  const [completedRequirements, setCompletedRequirements] = useState<number>(3);
  const [totalRequirements, setTotalRequirements] = useState<number>(6);

  // cache this value i forgot the hook name
  useEffect(() => {
    const getOptionProgress = async () => {
      if (user && user.email) {
        try {
          const data = await auditWhatIf(user.email, option);
          const formattedData = [];
          let currCompletedRequirements = 0;
          let currTotalRequirements = 0;
          for (const key of Object.keys(data)) {
            const optionRequirement = data[key];

            const formattedRequirementInfo: OptionRequirement = {
              name: optionRequirement.name,
              courseCount: optionRequirement.required,
              completionStatus:
                optionRequirement.completedCourses.length ==
                optionRequirement.required
                  ? RequirementStatus.COMPLETE
                  : RequirementStatus.INCOMPLETE,
              completedCourses: [],
              recommendedCourses: [],
            };

            for (const courseName of optionRequirement.completedCourses) {
              formattedRequirementInfo.completedCourses.push({
                name: courseName,
                term: courseName in courseTerms ? courseTerms[courseName] : "",
                description:
                  courseName in courseNameMap
                    ? courseNameMap[courseName]
                    : "Missing course name",
                status: RequirementStatus.COMPLETE,
              });
            }

            currCompletedRequirements +=
              optionRequirement.completedCourses.length;
            currTotalRequirements += optionRequirement.required;
            formattedData.push(formattedRequirementInfo);
          }
          setCompletedRequirements(currCompletedRequirements);
          setTotalRequirements(currTotalRequirements);
          setOptionRequirements(formattedData);
        } catch (e: unknown) {
          console.log(e);
        }
      }
    };
    getOptionProgress();
  }, [option, user]); // updating user updates course terms

  const toggleShowRecommendations = async () => {
    if (user && user.email) {
      const optionName =
        option in optionMap ? `${optionMap[option]} Option` : "womp womp";
      try {
        if (!showRecommendations) {
          const recommendations = await getRecommendations(
            user?.email,
            optionName
          );

          const newOptionRequirements = [...optionRequirements];

          const requirementsNeeded: { [key: string]: number } = {};

          // calc number of requirements we need
          for (const optionRequirement of optionRequirements) {
            const listRequirementsNeeded =
              optionRequirement.courseCount -
              optionRequirement.completedCourses.length;
            requirementsNeeded[optionRequirement.name] = listRequirementsNeeded;
          }

          for (const course of recommendations) {
            const courseSublists = JSON.parse(
              course.option_sublist.replace(/'/g, '"')
            ); // json str to array

            for (const courseSublist of courseSublists) {
              if (
                courseSublist in requirementsNeeded &&
                requirementsNeeded[courseSublist] > 0
              ) {
                // add to recs, remove
                for (const optionRequirement of newOptionRequirements) {
                  if (optionRequirement.name == courseSublist) {
                    optionRequirement.recommendedCourses.push({
                      name: course.courseName,
                      description:
                        course.courseName in courseNameMap
                          ? courseNameMap[course.courseName]
                          : "Missing course name",
                    });
                    break;
                  }
                }

                requirementsNeeded[courseSublist] -= 1;
                break;
              }
            }
          }
          setOptionRequirementsRecommendation(newOptionRequirements);
        }
        setShowRecommendations(!showRecommendations);
      } catch (e) {
        console.error("failed", e);
      }
    } else {
      console.error("missing user");
    }
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
        {(showRecommendations
          ? optionRequirementsRecommendation
          : optionRequirements
        ).map((optionRequirement, index) => {
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
