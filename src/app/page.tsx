"use client";
import { OptionInfoCard } from "@/components/common/OptionInfoCard";
import NavBar from "@/components/NavBar";
// import { useAuth } from "@/context";
import { PlayIcon } from "@primer/octicons-react";
import { Box, Button, Text } from "@primer/react";

export default function Home() {
  // const { user } = useAuth();
  return (
    <main>
      <section>
        <NavBar />
        <Box display='flex' padding='6rem' width='100%' flexDirection='column' alignItems='center'>
          <Text as='h1' style={{ fontWeight: 600, fontSize: 32, lineHeight: "150%" }}>
            This is our super cool headline.
          </Text>
          <Text as='h2' style={{ color: "#57606A", fontWeight: 400, fontSize: 20 }}>
            Making your option planning easier or whatever
          </Text>
          <Box paddingTop='2rem'>
            <Button
              leadingVisual={() => (
                <span style={{ color: "#bf3989" }}>
                  <PlayIcon />
                </span>
              )}
              style={{
                color: "#bf3989",
                backgroundColor: "#ffeff7",
                borderColor: "rgba(255, 128, 200, 0.25)",
              }}
            >
              Take our quiz!
            </Button>
          </Box>
          <Box
            display='grid'
            gridTemplateColumns='repeat(4, 1fr)'
            paddingTop='2rem'
            width='60%'
            sx={{ gap: "1.25rem" }}
          >
            <OptionInfoCard />
            <OptionInfoCard />
            <OptionInfoCard />
            <OptionInfoCard />
            <OptionInfoCard />
            <OptionInfoCard />
            <OptionInfoCard />
            <OptionInfoCard />
            <OptionInfoCard />
            <OptionInfoCard />
            <OptionInfoCard />
            <OptionInfoCard />
          </Box>
        </Box>
      </section>
    </main>
  );
}
