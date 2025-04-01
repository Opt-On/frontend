function processString(str: string) {
  return str.split(" ").slice(0, -1).join("_").toLowerCase();
}

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
  const response = await fetch(process.env.NEXT_PUBLIC_AUDIT || "http://localhost:8080/audit/declared", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: email,
      "req-url": "declared",
    },
    body: JSON.stringify({}),
    cache: "no-store",
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Request failed");
  }

  const json = await response.json();
  console.log("success", json)
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

// Audit an option
export const auditWhatIf = async (email: string, plan: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_AUDIT || "http://localhost:8080/audit/whatif", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: email,
      option: plan,
      "req-url": "whatIf",
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Request failed");
  }

  const json = await response.json();

  const completedRequirements = json.requirementCourseListMap;
  const completedKeys = Object.keys(completedRequirements); // the course lists with at least 1 completed course

  const listRequirements: { [key: string]: ListRequirement } = {};

  for (const listRequirement of json.plan.categoryIterator) {
    // removing this gives a webpack error lmao im not debuggin ts
    if (true) {
      for (const requirement of listRequirement["requirementList"]) {
        if (requirement.cnbr_name in listRequirements) {
          listRequirements[requirement.cnbr_name].required += 1;
        } else {
          listRequirements[requirement.cnbr_name] = {
            name: requirement.cnbr_name,
            required: 1,
            completedCourses: [],
            completionStatus: "Incomplete",
          };
        }
      }
    }
  }

  for (const listKey of completedKeys) {
    const formattedKey = processString(listKey);
    const completedCourses = completedRequirements[listKey];
    for (const completedCourse of completedCourses) {
      const courseCode =
        completedCourse.sbj_list + " " + completedCourse.cnbr_name;
      listRequirements[formattedKey].completedCourses.push(courseCode);
    }
  }

  return listRequirements;
};

export const auditDeclaredDegree = async (email: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_AUDIT || "http://localhost:8080/audit/declared/degree", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: email,
      "req-url": "declared/degree",
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Request failed");
  }

  const json = await response.json();

  const courseUsageMap = json.courseUsageMap || {};

  const completedRequirements = json.requirementCourseListMap;
  const completedKeys = Object.keys(completedRequirements);
  const listRequirements: { [key: string]: ListRequirement } = {};

  for (const listRequirement of json.plan.categoryIterator) {
    for (const requirement of listRequirement["requirementList"]) {
      if (requirement.cnbr_name in listRequirements) {
        listRequirements[requirement.cnbr_name].required += 1;
      } else {
        listRequirements[requirement.cnbr_name] = {
          name: requirement.cnbr_name,
          required: 1,
          completedCourses: [],
          completionStatus: "Incomplete",
        };
      }
    }
  }

  for (const listKey of completedKeys) {
    const formattedKey = processString(listKey);
    const completedCourses = completedRequirements[listKey];
    for (const completedCourse of completedCourses) {
      const courseCode =
        completedCourse.sbj_list + " " + completedCourse.cnbr_name;
      if (listRequirements[formattedKey]) {
        listRequirements[formattedKey].completedCourses.push(courseCode);
      }
    }
  }

  return {
    listRequirements,
    courseUsageMap
  };
};

export const auditOptions = async (email: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_AUDIT || "http://localhost:8080/audit/options", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: email,
      "req-url": "options",
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) throw new Error("Request failed");

  return response.json();
};
