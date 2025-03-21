const BASE_URL = "http://localhost:8080";

export const getRecommendations = async (email: string, option: string) => {
  const formData = new FormData();
  formData.append("option", option);
  formData.append("email", email);

  const response = await fetch(`${BASE_URL}/recommendation/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("failed to get option recommendations");

  return response.text();
};
