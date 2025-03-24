"use client";
import { useState } from "react";

// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
const TRANSCRIPT_URL =
  process.env.NEXT_PUBLIC_TRANSCRIPT_URL || "http://localhost:8080";

export default function UploadTranscript() {
  const [file, setFile] = useState<File>();
  const [summary, setSummary] = useState<object>();
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // const response = await fetch(`${BASE_URL}/transcript/upload`, {
      const response = await fetch(TRANSCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      console.log(result);
      setSummary(result);
    } catch (error) {
      console.error("Upload failed:", error);
      setError("Upload failed");
    }
  };

  return (
    <div>
      <h2>Upload Transcript</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {summary && (
        <div>
          <h3>Summary:</h3>
          <pre>{JSON.stringify(summary, null, 2)}</pre>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
