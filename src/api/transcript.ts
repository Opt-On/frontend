// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
const TRANSCRIPT_URL =
  process.env.NEXT_PUBLIC_TRANSCRIPT_URL || "http://localhost:8080";

export const submitTranscript = async (transcript: File, email: string) => {
  const formData = new FormData();
  formData.append("file", transcript);
  formData.append("email", email);

  // const response = await fetch(`${BASE_URL}/transcript/upload`, {
  const response = await fetch(`${TRANSCRIPT_URL}/transcript/upload`, {
    method: "POST",
    body: formData,
    headers: {
      "req-url": "upload",
    },
  });

  if (!response.ok) throw new Error("File upload failed");

  return response.text();
};
