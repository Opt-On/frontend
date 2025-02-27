import { useRouter } from "next/router";
import { HomeIcon } from "@primer/octicons-react";
import Link from "next/link";
import styles from "@/components/SliderButton/SliderButton.module.scss";

export default function SliderButton() {
  const { pathname } = useRouter();

  if (!pathname) {
    return null; 
  }

  const isActive = (path: string) => {
    return `${styles.link} ${pathname === path ? styles.selected : ""} `;
  };

  return (
    <div className={styles.container}>
      <Link href="/option" className={isActive("/option")} style={{ textDecoration: "none" }}>
        Option
      </Link>
      <Link href="/" className={isActive("/") + styles.iconLink}>
        <HomeIcon size={18}/>
      </Link>
      <Link href="/degree" className={isActive("/degree")} style={{ textDecoration: "none" }}>
        Degree
      </Link>
    </div>
  );
}
