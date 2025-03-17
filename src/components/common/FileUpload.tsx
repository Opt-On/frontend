import { submitTranscript } from "@/api/transcript";
import { useAuth } from "@/context";
import { FileDirectoryIcon } from "@primer/octicons-react";
import { Box, Button, Text } from "@primer/react";
import React, { useState } from "react";

export default function FileUpload() {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  const MAX_FILE_SIZE = 200 * 1024; // 200KB in bytes

  const handleFile = (file: File | undefined) => {
    if (file?.size && file?.size > MAX_FILE_SIZE) {
      alert("File size exceeds 200KB. Please upload a smaller file.");
      return;
    }

    if (file?.type === "application/pdf") {
      setFile(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0]);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleSubmitTranscript = async () => {
    if (!file) return alert("Please select a file");

    try {
      if (!user!.email) {
        console.error("missing email");
        return;
      }
      const response = await submitTranscript(file, user!.email);
      console.log(`Success: ${response}`);
      flashSuccessMessage();
    } catch (error) {
      console.log("Upload failed");
      flashFailureMessage();
      console.error(error);
    }
  };

  const flashSuccessMessage = async () => {
    setFile(null);
    setShowSuccessMessage(true);
    setShowFailureMessage(false);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  const flashFailureMessage = async () => {
    setFile(null);
    setShowFailureMessage(true);
    setShowSuccessMessage(false);
    setTimeout(() => {
      setShowFailureMessage(false);
    }, 5000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        as="div"
        p={6}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          border: "2px dashed",
          borderColor: isDragging ? "#91a1b2" : "#d0d7de",
          borderRadius: 16,
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: isDragging ? "#f6f7f8" : "#ffffff",
        }}
      >
        <Text as="h4">Drag and drop a file to upload</Text>
        <Text as="p">or</Text>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-upload"
        />
        <Button
          leadingVisual={FileDirectoryIcon}
          style={{ fontWeight: 600, margin: "auto" }}
          as="label"
          htmlFor="file-upload"
        >
          Browse Files
        </Button>

        <Text as="p" sx={{ pt: "1rem", color: "#656d76" }}>
          Max file size: 200KB | PDF file type only
        </Text>
      </Box>

      {file && (
        <Box
          mt={3}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Text as="p">
            <strong>Uploaded File:</strong> {file.name}
          </Text>
          {/* maybe temp */}
          <Button onClick={handleSubmitTranscript}>Save</Button>
        </Box>
      )}
      {showSuccessMessage && <Text color="green">Success </Text>}
      {showFailureMessage && <Text color="red">WOmp womp </Text>}
    </Box>
  );
}
