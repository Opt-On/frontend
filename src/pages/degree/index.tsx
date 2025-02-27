import Link from "next/link";
import { Button } from "@primer/react";
import NavBar from "@/components/NavBar";

export default function Degree() {
    return (
        <main>
            <section>
                <NavBar />
                <div>
                    <h1>Degree</h1>
                    <Link style={{ textDecoration: "none", color: "inherit" }} href="/transcript">Transcript Page</Link>
                    <Button variant="primary">Button</Button>
                </div>
            </section>
        </main>
    )
}