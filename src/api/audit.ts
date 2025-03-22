const BASE_URL = "http://localhost:8080";

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
  const formData = new FormData();
  formData.append("email", email);

  console.log("querying with ", email);

  const response = await fetch(`${BASE_URL}/audit/declared`, {
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
  const requirementListKeys = Object.keys(json.categoryStatusMap);
  console.log(json);
  const requirementLists: ListRequirement[] = [];
  for (const key of requirementListKeys) {
    const parsedList = parseKeyValue(key);
    requirementLists.push({
      name: parsedList?.name || "List",
      completedCourses: parsedList?.courses || [],
      required: 0,
      completionStatus: json.categoryStatusMap[key],
    });
  }

  return requirementLists;
};

// Audit an option
export const auditWhatIf = async (email: string, plan: string) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("option", plan);

  const response = await fetch(`${BASE_URL}/audit/whatif`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: email,
      option: plan,
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

export const auditOptions = async (email: string) => {
  const response = await fetch(`${BASE_URL}/audit/options`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: email,
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) throw new Error("Request failed");

  return response.json();
};
