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

  // console.log(response.json());
  console.log(typeof response);
  // console.log(response);
  return response;
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
