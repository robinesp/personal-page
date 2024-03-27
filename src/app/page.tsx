"use client";

import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { animated, useSpring, easings, useTrail } from "@react-spring/web";
import Background from "@/components/Background";

export default function Home() {
  const opacityTrail = useTrail(3, {
    opacity: 1,
    maxHeight: "100%",
    overflow: "hidden",
    from: { opacity: 0, maxHeight: "0" },
    config: {
      duration: 1000,
      easing: easings.easeOutExpo,
    },
  });

  const slideInTrail = useTrail(3, {
    y: 0,
    from: { y: -50 },
    config: {
      duration: 500,
      easing: easings.easeOutBack,
    },
  });

  return (
    <main className="flex h-full flex-col items-center justify-between p-24">
      <Background />
      <animated.div
        className="fixed overflow-hidden top-12 right-[20%] w-[35%] lg:top-32 lg:w-[15%]"
        style={{ ...slideInTrail[0], ...opacityTrail[0] }}
      >
        <Image
          className="rounded-[30px] lg:rounded-[60px]"
          src="/profile.jpg"
          alt="Profile picture"
          width={500}
          height={500}
          priority
        />
      </animated.div>
      <animated.div
        id="title"
        className="fixed top-56 lg:top-40 left-[10%] flex flex-col"
        style={{ ...slideInTrail[1], ...opacityTrail[1] }}
      >
        <span className="text-3xl lg:text-5xl leading-none lg:leading-[4.5rem] tracking-wide font-bold uppercase">
          Robin Esposito
        </span>
        <span className="uppercase text-sm lg:text-base mb-3 tracking-wider font-extralight text-lg">
          software engineer
        </span>
        <span className="w-2/3 lg:w-2/5 text-[4vw] lg:text-base leading-[5vw] font-light">
          Hey! I’m a software engineer based in the Netherlands. After some
          detours into data science, artificial intelligence and augmented
          reality I found my path in frontend development, focusing on building
          pretty, snappy things and intuitive interfaces.
        </span>
      </animated.div>
      <animated.div
        className="fixed top-[75%] lg:top-[70%] left-[40%] lg:left-1/2"
        style={{ ...slideInTrail[2], ...opacityTrail[2] }}
      >
        <nav className="flex flex-col text-2xl lg:text-3xl gap-2">
          {["experience", "skills", "contact"].map((link) => (
            <Link
              href={"/" + link}
              key={link}
              className="flex items-center gap-2 mr-auto
              relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
              before:bottom-0 before:left-0 before:bg-[#2e2e2e]
              before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
              before:transition before:ease-in-out before:duration-500"
            >
              <FontAwesomeIcon icon={faArrowRightLong} size="xs" />
              {link}
            </Link>
          ))}
        </nav>
      </animated.div>
    </main>
  );
}
