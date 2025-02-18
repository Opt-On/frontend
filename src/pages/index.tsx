import { Text } from "@primer/react";
import NavBar from "@/components/NavBar";

export default function Home() {
    return (
        <main>
            <section>
                <NavBar />
                <div style={{ padding: "6rem", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Text as="h1" style={{ fontWeight: 600, fontSize: 32, lineHeight: "150%" }}>
                        This is our super cool headline.
                    </Text>
                    <Text as="h2" style={{ color: "#57606A", fontWeight: 400, fontSize: 20 }}>
                        Making your option planning easier or whatever
                    </Text>
                </div>
            </section>
        </main>
    )
}