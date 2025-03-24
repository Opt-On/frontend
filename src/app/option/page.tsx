"use client";
import OptionProgressOverview from "@/components/option/OptionProgressOverview";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function Option() {
  const { user } = useAuth();

  if (!user) {
    return redirect("/");
  }

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
