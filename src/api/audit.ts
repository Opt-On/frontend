// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
const AUDIT_DECLARED_URL =
  process.env.NEXT_PUBLIC_AUDIT_DECLARED_URL || "http://localhost:8080";

// function processString(str: string) {
//   return str.split(" ").slice(0, -1).join("_").toLowerCase();
// }

function parseKeyValue(str: string) {
  const match = str.match(/^\{([^,]+),\[(.+)\]\}$/);
  if (!match) return null; // Invalid format

  const key = match[1]; // Extract the key (e.g., "1A")
  const values = match[2].split(","); // Split courses into an array

  return { name: key, courses: values };
}

export type ListRequirement = {
  name: string;
  required: number;
  completedCourses: string[];
  completionStatus: string;
};

export interface OptionProgress {
  name: string;
  completedRequirements: number;
  totalRequirements: number;
}

// degree audit
export const auditDeclared = async (email: string) => {
  const formData = new FormData();
  formData.append("email", email);

  // const response = await fetch(`${BASE_URL}/audit/declared`, {
  const response = await fetch(AUDIT_DECLARED_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: email,
    },
    body: JSON.stringify({}),
    cache: "no-store",
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Request failed");
  }

  const json = await response.json();
  const allRequirementLists = [];
  const degreeAuditResult = json[0];
  const requirementListKeys = Object.keys(degreeAuditResult.categoryStatusMap);
  const requirementLists: ListRequirement[] = [];
  for (const key of requirementListKeys) {
    const parsedList = parseKeyValue(key);
    requirementLists.push({
      name: parsedList?.name || "List",
      completedCourses: parsedList?.courses || [],
      required: 0,
      completionStatus: degreeAuditResult.categoryStatusMap[key],
    });
  }
  allRequirementLists.push({
    requirementLists: requirementLists,
    name: degreeAuditResult.plan.name,
    overallStatus: degreeAuditResult.overallStatus,
  });

  for (const auditResult of json.splice(1)) {
    const requirementListKeys = Object.keys(auditResult.categoryStatusMap);
    const courseMap: { [key: string]: string[] } = {};

    const listCourseKeys = Object.keys(auditResult.requirementCourseListMap);
    for (const key of listCourseKeys) {
      const list = auditResult.requirementCourseListMap[key];
      for (const courseInfo of list) {
        const courseCode = courseInfo.sbj_list + " " + courseInfo.cnbr_name;
        if (key in courseMap) {
          courseMap[key].push(courseCode);
        } else {
          courseMap[key] = [courseCode];
        }
      }
    }

    const requirementLists: ListRequirement[] = [];
    for (const key of requirementListKeys) {
      const parsedList = parseKeyValue(key);

      const courseList = parsedList?.courses || [];
      for (const i in courseList) {
        const requirement = courseList[i];
        if (requirement in courseMap && courseMap[requirement].length > 0) {
          courseList[i] = courseMap[requirement][0];
          courseMap[requirement].shift();
        }
      }

      requirementLists.push({
        name: parsedList?.name || "List",
        completedCourses: courseList,
        required: 0,
        completionStatus: auditResult.categoryStatusMap[key],
      });
    }
    allRequirementLists.push({
      requirementLists: requirementLists,
      name: auditResult.plan.name,
      overallStatus: auditResult.overallStatus,
    });
  }

  return allRequirementLists;
};
