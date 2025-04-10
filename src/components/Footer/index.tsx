import { Box, Text } from "@primer/react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ width: "100%", height: "80px" }}>
      <Box
        style={{
          maxWidth: "720px",
          height: "inherit",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/privacy" style={{ textDecoration: "none"}}><Text as="p" style={{ fontSize: "14px", color: "#6e7781", borderBottom: "1px solid #6e7781"}}>Privacy Policy</Text></Link>
        <Text as="p" style={{ fontSize: "14px", color: "#6e7781"}}>Built with MrOpton &copy; 2025</Text>
      </Box>
    </footer>
  );
}
