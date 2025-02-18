import { FormControl, Select, Text } from "@primer/react";
import { useState } from "react";
import NavBar from "@/components/NavBar";

export default function Option() {
    const [selectedOption, setSelectedOption] = useState('one'); // You can use state for the selected option

    return (
        <main>
            <section>
                <NavBar />
                <div style={{ padding: "2rem", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Text style={{ fontWeight: 600, fontSize: 32, lineHeight: "150%" }}>
                        What option are you interested in?
                    </Text>
                </div>
            </section>
        </main>
    );
}
