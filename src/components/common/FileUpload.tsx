import React, { useState } from "react";
import { Button, Dialog, Box, Text, IconButton } from "@primer/react";
import { FileDirectoryIcon, XIcon } from "@primer/octicons-react";

export default function FileUpload() {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const MAX_FILE_SIZE = 200 * 1024; // 200KB in bytes

  const handleClose = () => {
    setIsOpen(false);
    setFile(null);
  };

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

  const renderHeader = () => (
    <Box sx={{ pt: 2, pl: 3, pr: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Text sx={{ fontSize: 18, fontWeight: "bold", pt: "8px" }}>
          Import course history
        </Text>
        <IconButton
          onClick={handleClose}
          icon={XIcon}
          variant="invisible"
          aria-labelledby="close"
        />
      </Box>
      <Text sx={{ fontSize: 14, color: "#656d76", display: "block" }}>
        Upload your transcript below to import your course history.
      </Text>
    </Box>
  );

  const renderBody = () => (
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
        <Box mt={3}>
          <Text as="p">
            <strong>Uploaded File:</strong> {file.name}
          </Text>
        </Box>
      )}
    </Box>
  );

  const renderFooter = () => (
    <Box
      sx={{ pb: 3, px: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
    >
      <Button onClick={handleClose}>Cancel</Button>
      <Button
        variant="primary"
        onClick={() => {
          if (file) {
            console.log("Uploading file:", file.name);
          }
          handleClose();
        }}
      >
        Import
      </Button>
    </Box>
  );

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Upload
      </Button>

      {isOpen && (
        <Dialog
          title={
            <Text sx={{ fontSize: 18, fontWeight: "bold" }}>
              Import course history
            </Text>
          }
          subtitle="Upload your transcript below to import your course history."
          onClose={handleClose}
          renderHeader={renderHeader}
          renderBody={renderBody}
          renderFooter={renderFooter}
        />
      )}
    </>
  );
}
