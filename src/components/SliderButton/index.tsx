"use client";
import { HomeIcon } from "@primer/octicons-react";
import Link from "next/link";
import styles from "@/components/SliderButton/SliderButton.module.scss";
import { usePathname } from "next/navigation";

export default function SliderButton() {
  const pathname = usePathname();

  if (!pathname) {
    return null;
  }

  const isActive = (path: string) => {
    return `${styles.link} ${pathname === path ? styles.selected : ""} `;
  };

  return (
    <div className={styles.container}>
      <Link href='/option' className={isActive("/option")} style={{ textDecoration: "none" }}>
        Explore Options
      </Link>
      <Link href='/' className={isActive("/") + styles.iconLink}>
        <HomeIcon size={18} />
      </Link>
      <Link href='/degree' className={isActive("/degree")} style={{ textDecoration: "none" }}>
        Track your Degree
      </Link>
    </div>
  );
}
