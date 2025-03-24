"use client";
import FileUpload from "@/components/FileUpload";
import HorizontalScroll from "@/components/HorizontalScroll";
import NavBar from "@/components/NavBar";
import Quiz from "@/components/Quiz";
import { useAuth } from "@/context/AuthContext";
import { useFile } from "@/context/FileContext";
import { Box, Text } from "@primer/react";

export default function Home() {
  const { userInfo } = useAuth();
  const { file, setFile } = useFile();
  return (
    <main>
      <section>
        <NavBar />
        <Box
          display='flex'
          width='100%'
          flexDirection='column'
          alignItems='center'
          overflow='hidden'
          paddingTop='32px'
        >
          <Text as='h1' style={{ fontWeight: 500, fontSize: 40, lineHeight: "140%" }}>
            Get more out of your degree
          </Text>
          <Text as='h2' style={{ color: "#57606A", fontWeight: 400, fontSize: 20 }}>
            We got you - we&#39;re making options planning easier ✌️
          </Text>
          {!userInfo?.program && (
            <Box
              style={{
                width: "600px",
                height: "auto",
                padding: "24px 32px",
                borderRadius: "16px",
                background: "linear-gradient(to right, #E1EAF8, #DBC4E9)",
                marginTop: "32px",
              }}
            >
              <Text as='h2'>Let&#39;s get started 📣</Text>
              <Text as='p'>Upload your transcript for personalized recommendations</Text>
              <FileUpload file={file} setFile={setFile} />
            </Box>
          )}
          <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "32px" }}>
            <Text
              as='h3'
              style={{ color: "#57606A", fontWeight: 400, fontSize: 16, padding: "16px" }}
            >
              Unsure which option is right for you?
            </Text>
            <Quiz />
          </Box>
          <Box
            padding='128px 0'
            display='flex'
            flexDirection='column'
            justifyContent='space-around'
          >
            <HorizontalScroll />
          </Box>
        </Box>
      </section>
    </main>
  );
}
