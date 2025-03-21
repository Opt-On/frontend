const BASE_URL = "http://localhost:8080";

export const getRecommendations = async (email: string, option: string) => {
  const response = await fetch(`${BASE_URL}/recommendation/`, {
    method: "POST",
    headers: {
      option: option,
      email: email,
    },
  });

  if (!response.ok) throw new Error("failed to get option recommendations");
  const json = await response.json();
  return json;
};
