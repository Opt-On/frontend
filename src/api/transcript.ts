export const submitTranscript = async (transcript: File, email: string) => {
  const formData = new FormData();
  formData.append("file", transcript);
  formData.append("email", email);

  const response = await fetch(process.env.NEXT_PUBLIC_TRANSCRIPT_URL || "http://localhost:443/transcript/upload", {
    method: "POST",
    body: formData,
    headers: {
      "req-url": "upload",
    },
  });

  if (!response.ok) throw new Error("File upload failed");

  return response.text();
};
