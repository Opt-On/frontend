import { CheckIcon, StopIcon, XIcon } from "@primer/octicons-react";
import { Box, IconButton, Text } from "@primer/react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  status?: "success" | "error";
}

export default function Toast({ message, status = "success" }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            bottom: "32px",
            right: "32px",
            display: "flex",
            borderRadius: "8px",
            border: "1px solid #d0d7de",
            background: "#fff",
            alignItems: "center",
            fontWeight: 600,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: 0,
            height: "auto",
            maxWidth: "90vw",
            zIndex: 2,
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "auto",
              background: status === "success" ? "#1f883d" : "#cf222e",
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
              padding: "12px",
              marginRight: "16px",
            }}
          >
            {status === "success" ? (
              <IconButton
                icon={() => <CheckIcon size={20} />}
                style={{
                  cursor: "auto",
                  color: "#fff",
                  background: "transparent",
                  border: "none",
                }}
                disabled
                aria-labelledby=''
              />
            ) : (
              <IconButton
                icon={() => <StopIcon size={20} />}
                style={{
                  cursor: "auto",
                  color: "#fff",
                  background: "transparent",
                  border: "none",
                }}
                disabled
                aria-labelledby=''
              />
            )}
          </Box>
          <Box
            style={{
              display: "flex",
              padding: "0 8px",
              height: "100%",
              flex: 1,
            }}
          >
            <Text
              as='p'
              style={{
                margin: "auto",
                textAlign: "center",
                flex: 1,
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "140%",
              }}
            >
              {message}
            </Text>
            <IconButton
              onClick={handleClose}
              icon={XIcon}
              variant='invisible'
              aria-labelledby='close'
              style={{ color: "#6c757d", marginLeft: "16px" }}
            />
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
