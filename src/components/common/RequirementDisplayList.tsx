import RequirementToggleDisplay from "./RequirementToggleDisplay";

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

export type CourseResult = {
  courseCode: string;
  courseName: string;
  grade: number | string;
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
          <RequirementToggleDisplay
            index={index}
            requirementInfo={requirement}
            key={`requirementIndex${index}`}
          />
        );
      })}
    </>
  );
}
