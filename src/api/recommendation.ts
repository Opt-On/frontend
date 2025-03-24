// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export const getRecommendations = async (email: string, option: string) => {
  // const response = await fetch(`${BASE_URL}/recommendation/`, {
  const response = await fetch(
    "https://dolj5cdchjb7ikn3nj74tn5ica0ipjlq.lambda-url.us-east-2.on.aws/",
    {
      method: "POST",
      headers: {
        option: option,
        email: email,
      },
    }
  );

  if (!response.ok) throw new Error("failed to get option recommendations");
  const json = await response.json();
  return json;
};
