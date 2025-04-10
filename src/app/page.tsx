"use client";

import Accordion from "@/components/Accordion";
import FileUpload from "@/components/FileUpload";
import Footer from "@/components/Footer";
import HorizontalScroll from "@/components/HorizontalScroll";
import { Login } from "@/components/modals/Login";
import { SignUp } from "@/components/modals/SignUp";
import NavBar from "@/components/NavBar";
import Quiz from "@/components/Quiz";
import { useAuth } from "@/context/AuthContext";
import { useFile } from "@/context/FileContext";
import { ArrowRightIcon } from "@primer/octicons-react";
import { Box, IconButton, Text } from "@primer/react";
import { useState } from "react";

const faqData = [
  {
    title: "How do I complete an option?",
    content:
      "You complete an option once you have fulfilled all the course requirements for an option and declared the option with your academic advisor.",
  },
  {
    title: "How do I declare an option?",
    content:
      "Declare the option by completing all 3 sections of the Plan Modification Form, and email it to your academic advisor with your name, student number, and the name of the option.",
  },
  {
    title: "When should I declare an option?",
    content:
      "There is no set limit on when you can declare an option. If you happen to be taking courses that meet an option's requirements, you can declare that option as late as 4B. However, it is recommended that you begin taking courses that fulfill a desired option's requirements as early as 2A or 2B.",
  },
  {
    title: "What requirements do I need to complete an option?",
    content:
      "Each option has a predefined list of required and elective courses. You can find this information on the University of Waterloo's official website, or you can use Opt'On to explore eligible courses based on your current transcript.",
  },
  {
    title: "Can I complete more than one option?",
    content:
      "Yes, but you may need to overload your terms or choose options with overlapping course requirements.",
  },
  {
    title: "Can I have a course outside the options list count towards completion?",
    content:
      "Yes, you can! To do so, your proposed overridden course(s) must share at least 70% similarity with MSE material. Relevant research with the University may also count towards an option. Afterwards, you must contact your options coordinator and include your proposed courses, the matching MSE courses, and an outline/description for all courses.",
  },
];

export default function Home() {
  const { user, userInfo } = useAuth();
  const { file, setFile } = useFile();

  const [displayLogin, setDisplayLogin] = useState<boolean>(false);
  const [displaySignUp, setDisplaySignUp] = useState<boolean>(false);

  const toggleLogin = () => setDisplayLogin(!displayLogin && !user);
  const hideLogin = () => setDisplayLogin(false);
  const toggleSignUp = () => setDisplaySignUp(!displaySignUp && !user);
  const hideSignUp = () => setDisplaySignUp(false);

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
          <Text
            as='h1'
            style={{
              fontWeight: 500,
              fontSize: 40,
              lineHeight: "140%",
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            Get more out of your degree
          </Text>
          <Text
            as='h2'
            style={{ color: "#57606A", fontWeight: 400, fontSize: 20, textAlign: "center" }}
          >
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
              <Box style={{ display: "flex", justifyContent: "space-between", minHeight: "40px" }}>
                <Text as='h2'>Let&#39;s get started 📣</Text>
                {file !== null && (
                  <IconButton
                    onClick={toggleSignUp}
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#fff",
                      borderColor: "#fff",
                    }}
                    icon={ArrowRightIcon}
                    aria-labelledby='next'
                  />
                )}
                {displaySignUp && <SignUp toggleLogin={toggleLogin} handleClose={hideSignUp} />}
                {displayLogin && <Login toggleSignUp={toggleSignUp} handleClose={hideLogin} />}
              </Box>
              <Text as='p'>Upload your transcript for personalized recommendations</Text>
              <FileUpload file={file} setFile={setFile} />
            </Box>
          )}
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "32px",
            }}
          >
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
          <Box style={{ paddingBottom: "50px", width: "100%", margin: "auto" }}>
            <Text as='h2' style={{ fontSize: "32px", textAlign: "center", marginBottom: "32px" }}>
              Frequently asked questions
            </Text>
            {faqData.map((faq, index) => (
              <div key={index}>
                <Accordion title={faq.title} content={faq.content} />
                {index < faqData.length - 1 && (
                  <hr
                    style={{
                      borderColor: "#d8dee4",
                      borderWidth: "1px",
                      maxWidth: "600px",
                      margin: "auto",
                    }}
                  />
                )}
              </div>
            ))}
          </Box>
        </Box>
      </section>
      <Footer />
    </main>
  );
}
