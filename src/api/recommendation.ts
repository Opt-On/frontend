const BASE_URL = "http://localhost:8080";

export const getRecommendation = async (email: string, optionName: string) => {
  const formData = new FormData();
  formData.append("option", optionName);
  formData.append("email", email);

  console.log("option", optionName);
  console.log("email", email);

  const response = await fetch(`${BASE_URL}/recommendation/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("failed to get recommendation");

  return response.text();
};
