import { auditWhatIf } from "@/api/audit";
import { getRecommendations } from "@/api/recommendation";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowUpRightIcon,
  SparkleFillIcon,
  UndoIcon,
} from "@primer/octicons-react";
import {
  Box,
  Button,
  ProgressBar,
  Stack,
  Text,
  ToggleSwitch,
} from "@primer/react";
import { useEffect, useState } from "react";
import { optionMap } from "../option/OptionProgressOverview";
import CourseCompletionProgress from "./CourseProgressCard";
import IncompleteRequirementCard from "./IncompleteRequirementCard";
import RecommendedCourseCard from "./RecommendedCourseCard";
import { RequirementStatus } from "./RequirementDisplayList";
import "./styles.css";

export type completedCourseInfo = {
  name: string;
  term: string;
  description: string;
  status: RequirementStatus;
};

export type recommendedCourseInfo = {
  name: string;
  description: string;
  sublistName: string;
};

export type OptionRequirement = {
  name: string;
  courseCount: number;
  completionStatus: RequirementStatus;
  completedCourses: completedCourseInfo[];
  recommendedCourses: recommendedCourseInfo[];
};

export const getColor = (status: string) => {
  switch (status.split("_").join(" ").toLowerCase()) {
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

export type RecommendedCourse = {
  name: string;
  score: number;
  prereqFlag: number;
  programFlag: [number, number];
  termFlag: number;
  missingPrereq: boolean;
  isUsed: boolean;
  description: string;
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
  // list -> courses
  const [recommendationCourseLists, setRecommendationCourseLists] = useState<{
    [key: string]: string[];
  }>({});
  // course -> used
  const [recommendationCourses, setRecommendationCourses] = useState<{
    [key: string]: RecommendedCourse;
  }>({});
  const [filterPrereqs, setFilterPrereqs] = useState<boolean>(false);

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

  const updateRecommendationData = async () => {
    if (user && user.email) {
      const optionName =
        option in optionMap ? `${optionMap[option]} Option` : "womp womp";
      try {
        const recommendations = await getRecommendations(
          user?.email,
          optionName
        );

        // programFlag: [1, 0] - NEVER, [0, 1] - missing prereq, [0, 0] - chilling

        const newOptionRequirements = [...optionRequirements];

        const requirementsNeeded: { [key: string]: number } = {};
        const totalRequirementsNeeded: { [key: string]: number } = {};

        // calc number of requirements we need
        for (const optionRequirement of optionRequirements) {
          const listRequirementsNeeded =
            optionRequirement.courseCount -
            optionRequirement.completedCourses.length;
          requirementsNeeded[optionRequirement.name] = listRequirementsNeeded;
          totalRequirementsNeeded[optionRequirement.name] =
            optionRequirement.courseCount;
        }

        const newRecommendationCourseLists: { [key: string]: string[] } = {};
        const newRecommendationCourses: { [key: string]: RecommendedCourse } =
          {};

        for (const course of recommendations) {
          const courseSublists = JSON.parse(
            course.option_sublist.replace(/'/g, '"')
          ); // json str to array

          let courseUsed = false;

          // keep track of all rec courses
          for (const courseSublist of courseSublists) {
            if (courseSublist in newRecommendationCourseLists) {
              newRecommendationCourseLists[courseSublist].push(
                course.courseName
              );
            } else {
              newRecommendationCourseLists[courseSublist] = [course.courseName];
            }
          }

          const isMissingPrereq =
            course.prereqFlag +
              course.programFlag[0] +
              course.programFlag[1] +
              course.termFlag >
            0;

          for (const courseSublist of courseSublists) {
            if (
              courseSublist in requirementsNeeded &&
              requirementsNeeded[courseSublist] > 0
            ) {
              // add to recs, decrement counter
              for (const optionRequirement of newOptionRequirements) {
                if (
                  optionRequirement.name == courseSublist &&
                  optionRequirement.recommendedCourses.length <
                    totalRequirementsNeeded[courseSublist] &&
                  (!filterPrereqs || !isMissingPrereq)
                ) {
                  optionRequirement.recommendedCourses.push({
                    name: course.courseName,
                    description:
                      course.courseName in courseNameMap
                        ? courseNameMap[course.courseName]
                        : "Missing course name",
                    sublistName: courseSublist, // sublist that this course is counted towards
                  });
                  courseUsed = true;
                  requirementsNeeded[courseSublist] -= 1;

                  break;
                }
              }

              break; // only use courses once
            }
          }

          newRecommendationCourses[course.courseName] = {
            name: course.courseName,
            score: course.Score,
            prereqFlag: course.prereqFlag,
            programFlag: course.programFlag, // i think object ref but its ok since we dont change
            termFlag: course.termFlag,
            missingPrereq: isMissingPrereq,
            isUsed: courseUsed,
            description: courseNameMap[course.courseName],
          };
        }
        setOptionRequirementsRecommendation(newOptionRequirements);
        setRecommendationCourses(newRecommendationCourses);
        setRecommendationCourseLists(newRecommendationCourseLists);
      } catch (e) {
        console.error("failed", e);
      }
    } else {
      console.error("missing user");
    }
  };

  const togglePrereq = async () => {
    await updateRecommendationData();
    setFilterPrereqs(!filterPrereqs);
  };

  const toggleShowRecommendations = async () => {
    if (!showRecommendations) {
      updateRecommendationData();
    }
    setShowRecommendations(!showRecommendations);
  };

  const switchCourse = (originalCourse: string, switchCourse: string) => {
    // im assuming these are valid, ass u and me wtv
    // update optionRequirementsRecommendation[list].recommendedCourses (display)
    let listIndex = -1;
    let recIndex = -1;
    for (const i in optionRequirementsRecommendation) {
      const list = optionRequirementsRecommendation[i];
      for (const j in list.recommendedCourses) {
        const rec = list.recommendedCourses[j];
        if (rec.name == originalCourse) {
          // @ts-expect-error  TS IS SCHIZOING OUT ON ME
          listIndex = i;
          // @ts-expect-error TS IS SCHIZOING OUT ON ME
          recIndex = j;
        }
      }
    }

    if (listIndex == -1 || recIndex == -1) {
      console.log("u fukedc up ");
      return;
    }

    const newOptionRequirementsRecommendation = JSON.parse(
      JSON.stringify(optionRequirementsRecommendation)
    );

    newOptionRequirementsRecommendation[listIndex].recommendedCourses[
      recIndex
    ].name = switchCourse;
    newOptionRequirementsRecommendation[listIndex].recommendedCourses[
      recIndex
    ].description = courseNameMap[switchCourse] || ""; // todo: use actual names

    setOptionRequirementsRecommendation(newOptionRequirementsRecommendation);

    // update used
    const newRecommendationCourses = { ...recommendationCourses };
    newRecommendationCourses[originalCourse].isUsed = false;
    newRecommendationCourses[switchCourse].isUsed = true;
    setRecommendationCourses(newRecommendationCourses);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      marginTop="1rem"
      alignItems="center"
      width="50rem"
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
              You need to complete 1 course from List 2, and 2 courses from List
              3 You need to complete 1 course from List 2, and 2 courses from
              List 3 {/*TODO FIX THIS TEXT */}
            </Text>
          </Box>
          <Stack
            direction="horizontal"
            align="center"
            marginTop="0.5rem"
            marginBottom="2.75rem"
            justify="space-between"
            width="100%"
            minHeight="2rem"
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
                          altCourses={
                            recommendedCourse.sublistName in
                            recommendationCourseLists
                              ? recommendationCourseLists[
                                  recommendedCourse.sublistName
                                ]
                              : []
                          }
                          altCourseInfo={recommendationCourses}
                          filterPrereqs={filterPrereqs}
                          handleSwitchCourse={switchCourse}
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
                          incompleteIndex
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
