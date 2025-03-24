import { Box, IconButton, Text } from "@primer/react";
import React, { useState } from "react";
import styles from "@/components/FileUpload/FileUpload.module.scss";
import { SmileyIcon, XIcon } from "@primer/octicons-react";

const MAX_FILE_SIZE = 200 * 1024; // 200KB

interface FileUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export default function FileUpload({ file, setFile }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File | undefined) => {
    if (file && file.size <= MAX_FILE_SIZE && file.type === "application/pdf") {
      setFile(file);
    }
  };

  const handleClose = () => {
    setFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleFile(e.target.files?.[0]);
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0]);
    setIsDragging(false);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);

  const handleDivClick = () => document.getElementById("file-upload")?.click();

  return (
    <Box sx={{ py: 3 }}>
      <Box
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleDivClick}
        style={{ cursor: file ? "auto" : "pointer" }}
        className={`${styles.container} ${isDragging ? styles.dragging : ""}`}
      >
        {isDragging ? (
          <>
            <Text as='h4' className={styles.dropText}>
              Drop here \^o^/
            </Text>
          </>
        ) : file ? (
          <>
            <Box
              style={{
                display: "flex",
                borderRadius: "8px",
                padding: "16px",
                margin: "8px auto",
                border: "1px solid #d0d7de",
                gap: "16px",
                alignItems: "center",
                fontWeight: 600,
              }}
            >
              <IconButton
                icon={SmileyIcon}
                style={{ cursor: "auto", color: "#1f883d", background: "#dafbe1" }}
                disabled
                aria-labelledby='smile'
              />
              {file.name}
              <IconButton
                onClick={handleClose}
                icon={XIcon}
                variant='invisible'
                aria-labelledby='close'
              />
            </Box>
            <Text as='p'>We&#39;ll use this upload!</Text>
          </>
        ) : (
          <>
            <Text as='h4' className={styles.text}>
              Drag and drop files or <span>Choose file</span>
            </Text>

            <input
              type='file'
              accept='application/pdf'
              onChange={handleFileChange}
              style={{ display: "none" }}
              id='file-upload'
            />
            <Text as='p' className={styles.info}>
              Max file size: 200KB | PDF only
            </Text>
          </>
        )}
      </Box>
    </Box>
  );
}
