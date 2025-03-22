"use client"
import {
  RequirementDisplay,
  RequirementDisplayInfo,
} from "@/components/common/RequirementDisplay";
import {
  RequirementInfo,
  RequirementStatus,
} from "@/components/common/RequirementDisplayList";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/context";
import { Box, Text } from "@primer/react";

export default function Degree() {
  const { userInfo } = useAuth();
  const degreeType = "Bachelors of BOFA"; // need to parse this field
  const degreeName = userInfo?.program || "NUTS Engineering";

  const degreeRequirementList: RequirementInfo[] = [
    {
      requirementName: "1A",
      date: "Fall 2020",
      status: RequirementStatus.COMPLETE,
    },
    {
      requirementName: "1B",
      date: "Winter 2021",
      status: RequirementStatus.COMPLETE,
    },
    {
      requirementName: "2A",
      date: "Fall 2021",
      status: RequirementStatus.COMPLETE,
    },
    {
      requirementName: "2B",
      date: "Spring 2022",
      status: RequirementStatus.COMPLETE,
    },
    {
      requirementName: "3A",
      date: "Winter 2023",
      status: RequirementStatus.COMPLETE,
    },
    {
      requirementName: "3B",
      date: "Fall 2023",
      status: RequirementStatus.COMPLETE,
    },
    {
      requirementName: "4A",
      date: "Spring 2024",
      status: RequirementStatus.PROVISIONALLY_COMPLETE,
    },
    {
      requirementName: "4B",
      date: "Winter 2025",
      status: RequirementStatus.PROVISIONALLY_COMPLETE,
    },
    {
      requirementName: "Free Elective",
      status: RequirementStatus.PROVISIONALLY_COMPLETE,
    },
  ];

  const degreeRequirements: RequirementDisplayInfo = {
    requirementInfo: degreeRequirementList,
    name: "MGTE",
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
            {degreeName}
          </Text>
          <RequirementDisplay requirementDisplayInfo={degreeRequirements} />
          {optionsRequirements.map((optionRequirements, index) => (
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
