const BASE_URL = "http://localhost:8080";

export const submitTranscript = async (transcript: File) => {
  const formData = new FormData();
  formData.append("file", transcript);

  const response = await fetch(`${BASE_URL}/transcript/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("File upload failed");

  return response.json();
};
