"use client";
import { auditDeclared } from "@/api/audit";
import {
  RequirementDisplay,
  RequirementDisplayInfo,
} from "@/components/common/RequirementDisplay";
import {
  CourseResult,
  RequirementInfo,
} from "@/components/common/RequirementDisplayList";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/context/AuthContext";
import { Box, Text } from "@primer/react";
import { useEffect, useState } from "react";

function splitAtFirstNumber(str: string) {
  return str.replace(/(\D+)(\d+)/, "$1 $2");
}

export default function Degree() {
  const { userInfo, user, courseResultMap, courseNameMap } = useAuth();
  const [degreeRequirementInfo, setDegreeRequirementInfo] =
    useState<RequirementDisplayInfo>();
  const [optionsRequirementInfo, setOptionsRequirementInfo] = useState<
    RequirementDisplayInfo[]
  >([]);
  const degreeType = "Bachelors of BOFA"; // need to parse this field or some shit idk
  const degreeName = userInfo?.program || "NUTS Engineering";

  useEffect(() => {
    const getDeclaredAuditResult = async () => {
      try {
        if (user && user.email) {
          // degree audit
          const data = await auditDeclared(user.email);
          const degreeRequirementList: RequirementInfo[] = [];

          const degreeRequirement = data[0];
          for (const requirement of degreeRequirement.requirementLists) {
            // ignore coops
            if (requirement.name == "WKTRM") {
              continue;
            }
            const courseResults: CourseResult[] = [];
            for (const courseName of requirement.completedCourses) {
              const formattedCourseName = splitAtFirstNumber(courseName);
              courseResults.push({
                courseCode: formattedCourseName,
                courseName:
                  formattedCourseName in courseNameMap
                    ? courseNameMap[formattedCourseName]
                    : "",
                grade:
                  formattedCourseName in courseResultMap
                    ? courseResultMap[formattedCourseName]
                    : "-",
              });
            }
            degreeRequirementList.push({
              requirementName: requirement.name,
              status: requirement.completionStatus,
              courses: courseResults,
            });
          }

          const degreeRequirements: RequirementDisplayInfo = {
            requirementInfo: degreeRequirementList,
            name: degreeRequirement.name || "fix me bozo",
            date: "Parse me daddy", // PARSE THIS
            completionStatus: degreeRequirement.overallStatus,
          };

          setDegreeRequirementInfo(degreeRequirements);

          // options audit
          const optionRequirements: RequirementDisplayInfo[] = [];

          const rawOptionData = data.slice(1);
          for (const optionRequirementIndex in rawOptionData) {
            const optionRequirement = rawOptionData[optionRequirementIndex];
            const optionRequirementList: RequirementInfo[] = [];
            for (const requirement of optionRequirement.requirementLists) {
              const courseResults: CourseResult[] = [];
              for (const courseName of requirement.completedCourses) {
                courseResults.push({
                  courseCode: courseName,
                  courseName:
                    courseName in courseNameMap
                      ? courseNameMap[courseName]
                      : "",
                  grade:
                    courseName in courseResultMap
                      ? courseResultMap[courseName]
                      : "-",
                });
              }
              optionRequirementList.push({
                requirementName: requirement.name,
                status: requirement.completionStatus,
                courses: courseResults,
              });
            }
            const optionRequirementInfo: RequirementDisplayInfo = {
              requirementInfo: optionRequirementList,
              // name: optionRequirement.name,
              name: `List ${parseInt(optionRequirementIndex) + 1}`,
              completionStatus: optionRequirement.overallStatus,
            };
            optionRequirements.push(optionRequirementInfo);
          }
          setOptionsRequirementInfo(optionRequirements);
        }
      } catch (e) {
        console.error("failed to get declared audit result", e);
      }
    };

    getDeclaredAuditResult();
  }, [courseResultMap, courseNameMap, userInfo]); // courseResultMap is updated when user is updated so we dont need an extra rerender

  return (
    <main>
      <section>
        <NavBar />
        <Box
          padding="2rem"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <h1>Track your degree</h1>
          <Text>See how you&apos;re tracking towards a {degreeType}</Text>
          <Text weight="semibold" marginTop="2rem">
            {degreeName}
          </Text>
          {degreeRequirementInfo && (
            <RequirementDisplay
              requirementDisplayInfo={degreeRequirementInfo}
            />
          )}
          {optionsRequirementInfo.map((optionRequirements, index) => (
            <RequirementDisplay
              requirementDisplayInfo={optionRequirements}
              key={`optionRequirement${index}`}
            />
          ))}
        </Box>
      </section>
    </main>
  );
}
