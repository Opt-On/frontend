import { Avatar } from "@primer/react";
import SliderButton from "@/components/SliderButton";

export default function NavBar() {
    return (
        <nav style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr auto 1fr", 
            alignItems: "center", 
            paddingTop: "24px", 
            paddingBottom: "24px", 
            paddingRight: "64px", 
            paddingLeft: "64px" 
        }}>
            <h1 style={{ fontWeight: 600, fontSize: "20px", lineHeight: "160%" }}>OPT'ON</h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <SliderButton />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Avatar size={32} src="https://avatars.githubusercontent.com/u/7143434?v=4" />
            </div>
        </nav>
    )
}