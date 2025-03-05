import OptionProgressOverview from "@/components/common/OptionProgressOverview";
import NavBar from "@/components/NavBar";
import { Text } from "@primer/react";

export default function Option() {
  return (
    <main>
      <section>
        <NavBar />
        <div
          style={{
            padding: "2rem",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text
            as="h1"
            marginTop="12rem"
            weight="light"
            style={{ fontWeight: 600, fontSize: 32, lineHeight: "150%" }}
          >
            What option are you interested in?
          </Text>
          <Text as="h3" weight="light" marginTop="0.25rem">
            Select from available options to see more details
          </Text>
          <OptionProgressOverview />
        </div>
      </section>
    </main>
  );
}
