// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
const URL = process.env.NEXT_REC_URL || "http://18.119.110.137:443";

export const getRecommendations = async (email: string, option: string) => {
  // const response = await fetch(`${BASE_URL}/recommendation/`, {
  const response = await fetch(
    // URL + "/recommendation/",
    "http://3.143.22.149:443/recommendation/",
    {
      method: "POST",
      headers: {
        option: option,
        email: email,
      },
    }
  );

  if (!response.ok) {
    console.log(response.body);
    throw new Error("failed to get option recommendations");
  }

  const json = await response.json();
  console.log("rec json", json);
  return json;
};
