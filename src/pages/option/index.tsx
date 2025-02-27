import { Text } from "@primer/react";
import NavBar from "@/components/NavBar";

export default function Option() {
    return (
        <main>
            <section>
                <NavBar />
                <div style={{ padding: "2rem", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Text as="h1" style={{ fontWeight: 600, fontSize: 32, lineHeight: "150%" }}>
                        What option are you interested in?
                    </Text>
                </div>
            </section>
        </main>
    );
}
