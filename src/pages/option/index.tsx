import OptionProgressOverview from "@/components/common/OptionProgressOverview";
import NavBar from "@/components/NavBar";

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
          <OptionProgressOverview />
        </div>
      </section>
    </main>
  );
}
