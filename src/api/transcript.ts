const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export const submitTranscript = async (transcript: File, email: string) => {
  const formData = new FormData();
  formData.append("file", transcript);
  formData.append("email", email);

  const response = await fetch(`${BASE_URL}/transcript/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("File upload failed");

  return response.text();
};
