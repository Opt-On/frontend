import { useRouter } from "next/router";
import { HomeIcon } from "@primer/octicons-react";
import Link from "next/link";
import styles from "@/components/SliderButton/SliderButton.module.scss";

export default function SliderButton() {
  const { pathname } = useRouter();

  if (!pathname) {
    return null; 
  }

  return (
    <div className={styles.container}>
      <Link href="/option" className={`${styles.link} ${pathname === "/option" ? styles.selected : ""}`} style={{ textDecoration: "none" }}>
        Option
      </Link>
      <Link href="/" className={`${styles.link} ${styles.iconLink} ${pathname === "/" ? styles.selected : ""}`}>
        <HomeIcon size={18} />
      </Link>
      <Link href="/degree" className={`${styles.link} ${pathname === "/degree" ? styles.selected : ""}`} style={{ textDecoration: "none" }}>
        Degree
      </Link>
    </div>
  );
}
