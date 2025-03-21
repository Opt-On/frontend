const BASE_URL = "http://localhost:8080";

// export const auditDeclared = async (email: string) => {
//   const formData = new FormData();
//   formData.append("email", email);

//   const response = await fetch(`${BASE_URL}/transcript/upload`, {
//     method: "POST",
//     body: formData,
//   });

//   if (!response.ok) throw new Error("File upload failed");

//   return response.text();
// };

// const parseCategoryMap = (input: string) => {
//   const match = input.match(/^\{([^,]+),\[(.+)]\}$/);

//   if (match) {
//     const key = match[1]; // "Optn"
//     const values = match[2].split(",").map((item) => item.trim()); // Split values

//     return {
//       listName: key,
//       lists: values,
//     };
//   } else {
//     console.log("Invalid format");
//   }
// };

function processString(str: string) {
  return str
    .split(" ") // Split by space
    .slice(0, -1) // Remove last element
    .join("_") // Join with "_"
    .toLowerCase(); // Convert to lowercase
}

export type ListRequirement = {
  name: string;
  required: number;
  completedCourses: string[];
  completionStatus: "Incomplete";
};

// type ListInfo = {
//   totalRequired: number;
//   completedCourses: string[];
//   completionStatus: string;
// };

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
    if (true) {
      // removing this gives a webpack error lmao
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

  console.log(listRequirements);

  return listRequirements;
};

export interface OptionProgress {
  name: string;
  completedRequirements: number;
  totalRequirements: number;
}

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
