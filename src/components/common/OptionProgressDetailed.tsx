import { auditDeclaredDegree, auditWhatIf } from "@/api/audit";
import { getRecommendations } from "@/api/recommendation";
import { useAuth } from "@/context/AuthContext";
import { MortarBoardIcon } from "@primer/octicons-react";
import { Box, Text } from "@primer/react";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { optionMap } from "../option/OptionProgressOverview";
import OptionHeader from "./OptionHeader";
import OptionInfoSubheader from "./OptionInfoSubheader";
import OptionProgressNoRec from "./OptionProgressNoRec";
import OptionProgressRec from "./OptionProgressRec";
import { RequirementStatus } from "./RequirementDisplayList";
import "./styles.css";

export type completedCourseInfo = {
  name: string;
  term: string;
  description: string;
  status: RequirementStatus;
};

export type RecommendedCourseInfo = {
  name: string;
  description: string;
  sublistName: string;
};

export type OptionRequirement = {
  name: string;
  displayName: string;
  courseCount: number;
  completionStatus: RequirementStatus;
  completedCourses: completedCourseInfo[];
  recommendedCourses: RecommendedCourseInfo[];
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

export type OptionSubheaderInfo = {
  minGrade: string;
  coordinator: string;
  email: string;
};
const optionInfo: { [key: string]: OptionSubheaderInfo } = {
  "Artificial Intelligence": {
    minGrade: "Minimum cumulative option average of 60%",
    coordinator: "Otman Basir, Electrical and Computer Engineering",
    email: "obasir@uwaterloo.ca",
  },
  Biomechanics: {
    minGrade: "Minimum cumulative option average of 60%",
    coordinator:
      "Naveen Chandrashekar, Mechanical and Mechatronics Engineering",
    email: "nchandra@uwaterloo.ca",
  },
  Computing: {
    minGrade: "Minimum cumulative option average of 75%",
    coordinator: "Wojciech Golab, Electrical and Computer Engineering",
    email: "wgolab@uwaterloo.ca",
  },
  "Computer Engineering": {
    minGrade: "ENG Minimum cumulative option average of 75%",
    coordinator: "Wojciech Golab, Electrical and Computer Engineering",
    email: "wgolab@uwaterloo.ca",
  },
  Entrepreneurship: {
    minGrade: "Minimum cumulative option average of 60%",
    coordinator: "Nada Basir, Conrad School of Business and Entrepreneurship",
    email: "nbasir@uwaterloo.ca",
  },
  Mechatronics: {
    minGrade: "Minimum cumulative option average of 60%",
    coordinator: "John McPhee, Systems Design Engineering",
    email: "mcphee@uwaterloo.ca",
  },
  "Management Sciences": {
    minGrade: "Minimum cumulative option average of 60%",
    coordinator: "Fatih Safa Erenay, Management Science and Engineering",
    email: "ferenay@uwaterloo.ca",
  },
  Statistics: {
    minGrade: "Minimum cumulative option average of 60%",
    coordinator: "Riley Metzger, Statistics and Actuarial Science",
    email: "rametzger@uwaterloo.ca",
  },
  "Software Engineering": {
    minGrade: "Minimum cumulative option average of 75%",
    coordinator: "Wojciech Golab, Electrical and Computer Engineering",
    email: "wgolab@uwaterloo.ca",
  },
};

export default function OptionProgressDetailed({
  option,
  optionName,
}: {
  option: string;
  optionName: string;
}) {
  const { user, courseTerms, courseNameMap } = useAuth();

  const [completedRequirements, setCompletedRequirements] = useState<number>(0);
  const [totalRequirements, setTotalRequirements] = useState<number>(1);
  const [missingRequirementsList, setMissingRequirementsList] =
    useState<number[]>();
  const [courseUsageMap, setCourseUsageMap] = useState<Map<string, number>>(
    new Map()
  );

  // static no recs
  const [optionRequirements, setOptionRequirements] = useState<
    OptionRequirement[]
  >([]);

  // optionRequirements with recs
  const [
    optionRequirementsRecommendation,
    setOptionRequirementsRecommendation,
  ] = useState<OptionRequirement[]>([]);

  // course -> used for rec
  const [recommendationCourses, setRecommendationCourses] = useState<{
    [key: string]: RecommendedCourse;
  }>({});

  const [showRecommendations, setShowRecommendations] = useState(false);
  const [filterPrereqs, setFilterPrereqs] = useState<boolean>(false);

  // list -> courses (static-ish)
  const [recommendationCourseLists, setRecommendationCourseLists] = useState<{
    [key: string]: string[];
  }>({});

  // cache this value i forgot the hook name
  useEffect(() => {
    const getOptionProgress = async () => {
      if (user && user.email) {
        try {
          const { courseUsageMap } = await auditDeclaredDegree(user.email);
          setCourseUsageMap(new Map(Object.entries(courseUsageMap)));
          const data = await auditWhatIf(user.email, option);
          const formattedData = [];
          let currCompletedRequirements = 0;
          let currTotalRequirements = 0;
          const newMissingRequirementsList: number[] = [];
          const keys = Object.keys(data);
          for (const keyIndex in keys) {
            const key = keys[keyIndex];
            const optionRequirement = data[key];

            const formattedRequirementInfo: OptionRequirement = {
              name: optionRequirement.name,
              displayName: `List ${parseInt(keyIndex) + 1}`,
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
            newMissingRequirementsList.push(
              optionRequirement.required -
                optionRequirement.completedCourses.length
            );
            formattedData.push(formattedRequirementInfo);
          }
          setMissingRequirementsList(newMissingRequirementsList);
          setCompletedRequirements(currCompletedRequirements);
          setTotalRequirements(currTotalRequirements);
          setOptionRequirements(formattedData);
          console.log(formattedData);
        } catch (e: unknown) {
          console.error(e);
        }
      }
    };
    getOptionProgress();
  }, [option, user]); // updating user updates course terms

  useEffect(() => {
    setShowRecommendations(false);
  }, [option, user]);

  const updateRecommendationData = async (
    shouldFilterPrereqs = filterPrereqs
  ) => {
    if (user && user.email) {
      const optionName =
        option in optionMap ? `${optionMap[option]} Option` : "womp womp";
      try {
        const recommendations = await getRecommendations(
          user?.email,
          optionName
        );

        const newOptionRequirements = [...optionRequirements];
        for (const optionRequirements of newOptionRequirements) {
          optionRequirements.recommendedCourses = [];
        }
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

          const isMissingPrereq =
            course.prereqFlag +
              course.programFlag[0] +
              course.programFlag[1] +
              course.termFlag >
            0;

          if (isMissingPrereq && shouldFilterPrereqs) {
            continue;
          }

          // keep track of all rec courses per sublist
          for (const courseSublist of courseSublists) {
            if (courseSublist in newRecommendationCourseLists) {
              newRecommendationCourseLists[courseSublist].push(
                course.courseName
              );
            } else {
              newRecommendationCourseLists[courseSublist] = [course.courseName];
            }
          }

          // matching algo
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
                  (!isMissingPrereq || !shouldFilterPrereqs)
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

        flushSync(() => {
          setOptionRequirementsRecommendation(newOptionRequirements); // contains list to display
          setRecommendationCourses(newRecommendationCourses);
          setRecommendationCourseLists(newRecommendationCourseLists);
        });
      } catch (e) {
        console.error("failed", e);
      }
    } else {
      console.error("missing user");
    }
  };

  const togglePrereq = async () => {
    await updateRecommendationData(!filterPrereqs);
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
      <OptionHeader
        completedRequirements={completedRequirements}
        totalRequirements={totalRequirements}
        filterPrereqs={filterPrereqs}
        togglePrereq={togglePrereq}
        showRecommendations={showRecommendations}
        toggleShowRecommendations={toggleShowRecommendations}
        missingRequirementsList={missingRequirementsList}
      />
      <OptionInfoSubheader
        optionName={optionName}
        optionInfo={optionInfo[optionName]}
      />
      {showRecommendations ? (
        <OptionProgressRec
          recommendationCourses={recommendationCourses}
          filterPrereqs={filterPrereqs}
          switchCourse={switchCourse}
          optionRequirementsRecommendation={optionRequirementsRecommendation}
          recommendationCourseLists={recommendationCourseLists}
          courseUsageMap={courseUsageMap}
        />
      ) : (
        <OptionProgressNoRec
          optionRequirements={optionRequirements}
          courseUsageMap={courseUsageMap}
        />
      )}
      {optionRequirements.length != 0 && (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-start",
            padding: "16px 0",
            gap: "8px",
          }}
        >
          <MortarBoardIcon size={16} />
          <Text as="h5" weight="light" color="#656d76">
            Counts towards degree requirements
          </Text>
        </Box>
      )}
    </Box>
  );
}
