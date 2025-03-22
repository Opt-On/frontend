"use client";
import HorizontalScroll from "@/components/HorizontalScroll";
import NavBar from "@/components/NavBar";
import Quiz from "@/components/Quiz";
// import { useAuth } from "@/context";
import { Box, Text } from "@primer/react";

export default function Home() {
  // const { user } = useAuth();
  return (
    <main>
      <section>
        <NavBar />
        <Box display='flex' padding='6rem 0' width='100%' flexDirection='column' alignItems='center'>
          <Text as='h1' style={{ fontWeight: 500, fontSize: 40, lineHeight: "140%" }}>
            Get more out of your degree
          </Text>
          <Text as='h2' style={{ color: "#57606A", fontWeight: 400, fontSize: 20 }}>
            We got you - we&#39;re making options planning easier ✌️
          </Text>
          <Box paddingTop='2rem'>
            <Quiz />
          </Box>
          <Box paddingTop='2rem' height="25vw" display="flex" flexDirection="column" justifyContent="space-around">
            <HorizontalScroll />
          </Box>
        </Box>
      </section>
    </main>
  );
}
