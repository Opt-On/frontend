import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Box, Text } from "@primer/react";

export default function Privacy() {
  return (
    <main>
      <section>
        <NavBar />
        <Box maxWidth='600px' margin='auto' marginY='64px'>
          <Text as='h1' style={{ textAlign: "center", margin: "32px 0" }}>
            Privacy Policy
          </Text>
          <Text as='p'>
            At <strong>Opt’On</strong>, accessible from <a href='https://opton.ca'>opton.ca</a>, one
            of our main priorities is the privacy of our visitors. This Privacy Policy document
            outlines the information we collect and how we use it. If you have additional requests
            or require more information about our Privacy Policy, please contact us via email at
            <a href='mailto:w25.opton@gmail.com'>w25.opton@gmail.com</a>.
          </Text>

          <Text as='h2' fontSize={3} fontWeight='bold' marginTop='24px'>
            Personal Data We Collect
          </Text>
          <Text as='p'>The following personal data about you is collected:</Text>
          <ul style={{ margin: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <li>
              <Text as='span' fontWeight='bold'>
                Account Information:
              </Text>
              When you create an account with us, we will collect information including your name
              and email.
            </li>
            <li>
              <Text as='span' fontWeight='bold'>
                User Content:
              </Text>
              We collect Personal Data you input into our services, such as personal transcripts and
              your responses to our quizzes.
            </li>
            <li>
              <Text as='span' fontWeight='bold'>
                Log Data:
              </Text>
              We collect information automatically sent via your browser or device when you use
              Opt’On. Log data may include your Internet Protocol address, browser type and
              settings, the date of time and your request, and how you interact with Opt’On.
            </li>
            <li>
              <Text as='span' fontWeight='bold'>
                Cookies:
              </Text>
              We use cookies that store information including your preferences, and the pages on the
              website that you accessed or visited. The data is used to optimize your experience by
              customizing our web page content based on your browser type and/or other
              information.We use cookies that store information including your preferences, and the
              pages on the website that you accessed or visited. The data is used to optimize your
              experience by customizing our web page content based on your browser type and/or other
              information.
            </li>
            <li>
              <Text as='span' fontWeight='bold'>
                Third-Party Services:
              </Text>
              Opt’On’s Privacy Policy does not apply to other software used. If you have any
              concerns, please consult the Privacy Policies of these third parties.
            </li>
          </ul>

          <Text as='h2' fontSize={3} fontWeight='bold' marginTop='24px'>
            How We Use Personal Data
          </Text>
          <Text as='p'>
            Currently, we do not use your Personal Data in the development of Opt’On or our
            services. In the future, we may use Personal Data to train our recommendation models and
            develop new product features.
          </Text>

          <Text as='h2' fontSize={3} fontWeight='bold' marginTop='24px'>
            Data Deletion
          </Text>
          <Text as='p'>
            Your account and associated data may be deleted upon request at
            <a href='mailto:e52ho@uwaterloo.ca'>e52ho@uwaterloo.ca</a>.
          </Text>

          <Text as='h2' fontSize={3} fontWeight='bold' marginTop='24px'>
            Consent
          </Text>
          <Text as='p'>By using our website, you hereby consent to our Privacy Policy.</Text>
        </Box>
      </section>
      <Footer />
    </main>
  );
}
