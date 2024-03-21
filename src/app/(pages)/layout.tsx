import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Link href={"/"} className="fixed top-16 left-[5%]">
        <FontAwesomeIcon icon={faChevronLeft} size="3x" />
      </Link>
      {children}
    </main>
  );
}
