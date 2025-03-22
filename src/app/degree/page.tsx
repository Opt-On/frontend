"use client";
import { auditDeclared } from "@/api/audit";
import {
  RequirementDisplay,
  RequirementDisplayInfo,
} from "@/components/common/RequirementDisplay";
import {
  CourseResult,
  RequirementInfo,
  RequirementStatus,
} from "@/components/common/RequirementDisplayList";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/context";
import { Box, Text } from "@primer/react";
import { useEffect, useState } from "react";

function splitAtFirstNumber(str: string) {
  return str.replace(/(\D+)(\d+)/, "$1 $2");
}

export default function Degree() {
  const { userInfo, user, courseResultMap, courseNameMap } = useAuth();
  const [degreeRequirementList, setDegreeRequirementList] = useState<
    RequirementInfo[]
  >([]);
  const degreeType = "Bachelors of BOFA"; // need to parse this field
  const degreeName = userInfo?.program || "NUTS Engineering";
  const graduationYear = userInfo?.graduationYear || "2025";

  useEffect(() => {
    const getDeclaredAuditResult = async () => {
      try {
        if (user && user.email) {
          const data = await auditDeclared(user.email);
          const newDegreeRequirementInfo: RequirementInfo[] = [];

          for (const requirement of data) {
            // ignore coops
            if (requirement.name == "WKTRM") {
              continue;
            }
            const courseResults: CourseResult[] = [];
            for (const courseName of requirement.completedCourses) {
              const formattedCourseName = splitAtFirstNumber(courseName);
              if (courseName.split(" ")[-1] == "list") {
                console.log(formattedCourseName, "is a list");
              }
              courseResults.push({
                courseCode: formattedCourseName,
                courseName:
                  formattedCourseName in courseNameMap
                    ? courseNameMap[formattedCourseName]
                    : "",
                grade:
                  formattedCourseName in courseResultMap
                    ? courseResultMap[formattedCourseName]
                    : "Not taken",
              });
            }
            newDegreeRequirementInfo.push({
              requirementName: requirement.name,
              status: requirement.completionStatus,
              courses: courseResults,
            });
          }
          console.log(newDegreeRequirementInfo);
          console.log(courseResultMap);
          console.log(userInfo?.firstName);
          setDegreeRequirementList(newDegreeRequirementInfo);
        }
      } catch {
        console.error("failed to get declared audit result");
      }
    };

    getDeclaredAuditResult();
  }, [courseResultMap, courseNameMap, userInfo]); // courseResultMap is updated when user is updated so we dont need an extra rerender

  const degreeRequirements: RequirementDisplayInfo = {
    requirementInfo: degreeRequirementList,
    name: userInfo?.program || "A",
    date: "Winter 2025",
    completionStatus: RequirementStatus.PROVISIONALLY_COMPLETE,
  };

  const optionsRequirements: RequirementDisplayInfo[] = [
    {
      requirementInfo: [
        {
          requirementName: "List 1",
          status: RequirementStatus.PROVISIONALLY_COMPLETE,
        },
        {
          requirementName: "List 2",
          status: RequirementStatus.INCOMPLETE,
        },
        {
          requirementName: "List 3",
          status: RequirementStatus.COMPLETE,
        },
      ],
      name: "computing option",
      completionStatus: RequirementStatus.INCOMPLETE,
    },
  ];

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
            {degreeName} {graduationYear}
          </Text>
          <RequirementDisplay requirementDisplayInfo={degreeRequirements} />
          {/* {optionsRequirements.map((optionRequirements, index) => (
            <RequirementDisplay
              requirementDisplayInfo={optionRequirements}
              key={`optionRequirement${index}`}
            />
          ))} */}
        </Box>
      </section>
    </main>
  );
}
