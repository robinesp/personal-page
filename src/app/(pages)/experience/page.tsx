"use client";

import Image from "next/image";
import items from "./items";
import {
  animated,
  easings,
  useScroll,
  useSpring,
  useTrail,
} from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

export default function Experience() {
  const trail = useTrail(items.length, {
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: -50 },
    config: {
      duration: 1000,
      easing: easings.easeOutExpo,
    },
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const logoRefs = useRef<Array<HTMLDivElement | null>>([]);
  const logoSize = 35;
  const [pointerPositionX, setPointerPositionX] = useState(0);
  const pointerPositionY = 300;
  const pointerSize = 8;

  const logoAnimations = items.map(() =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSpring(() => ({
      scale: 1,
      y: 0,
    }))
  );

  const [pointerStyle, pointerApi] = useSpring(() => ({
    scale: 1,
    top: pointerPositionY,
    backgroundColor: "#2e2e2e",
    config: { mass: 2, tension: 1000, friction: 200 },
  }));

  useScroll({
    onChange: ({ value: { scrollYProgress } }) => {
      let entering = false;
      let enteringTop = 0;

      logoRefs.current.map((logo, ix) => {
        const logoStart = logo?.getBoundingClientRect().top as number;
        const logoEnd = logoStart + logoSize * 2;
        const currentPointer = scrollYProgress + pointerPositionY;
        const bias = 25;

        if (
          currentPointer > logoStart - bias &&
          currentPointer <= logoEnd + bias
        ) {
          logoAnimations[ix][1].start({ scale: 2, y: logoSize / 2 });
          entering = true;
          enteringTop = logoStart + logoSize;
        } else {
          logoAnimations[ix][1].start({ scale: 1, y: 0 });
        }
      });

      pointerApi.start(
        entering
          ? { scale: 8, top: enteringTop, backgroundColor: "#e4e4e7" }
          : { scale: 1, top: pointerPositionY, backgroundColor: "#2e2e2e" }
      );
    },
  });

  useEffect(() => {
    const updatePointerX = () => {
      const firstLogo = logoRefs.current[0]?.getBoundingClientRect() as DOMRect;
      setPointerPositionX(
        firstLogo.left + firstLogo.width / 2 - pointerSize / 2
      );
    };
    window.addEventListener("resize", updatePointerX);
    updatePointerX();
    setTimeout(() => setIsLoaded(true), 1000);
    return () => window.removeEventListener("resize", updatePointerX);
  }, []);

  return (
    <main className="flex min-h-screen flex-col justify-between mt-64 lg:mt-72 mb-[32rem]">
      {isLoaded && (
        <animated.div
          id="pointer"
          className="fixed rounded-full"
          style={{
            ...pointerStyle,
            width: pointerSize + "px",
            height: pointerSize + "px",
            left: pointerPositionX,
            zIndex: 1,
          }}
        />
      )}
      <div id="timeline" className="flex flex-col justify-start gap-8">
        {items.map((item, ix) => (
          <animated.div
            className="flex mb-4 lg:min-h-44"
            key={item.companyName}
            style={trail[ix]}
          >
            <div className="left-side flex flex-col items-end w-[23%] lg:w-1/3">
              <span className="text-sm lg:text-2xl text-right">
                {item.time}
              </span>
              <span className="text-xs lg:text-base text-right">
                {item.place}
              </span>
            </div>
            <div className="middle relative w-[25%] lg:w-[10%]">
              <div className="absolute z-[0] top-[-24px] left-[50%] translate-x-[-50%] h-[300px] lg:h-[250px] w-[10px] bg-zinc-200	rounded-3xl" />
              <div
                ref={(el) => (logoRefs.current[ix] = el)}
                className="logo-container z-[2] absolute flex justify-center items-center lg:top-2 left-[50%] translate-x-[-50%] w-full"
              >
                <animated.div
                  className="flex items-center overflow-hidden lg:top-2 w-[35px] h-[35px] bg-white rounded-full"
                  style={logoAnimations[ix][0]}
                >
                  <Image
                    src={item.companyLogo}
                    alt={item.companyName}
                    width={150}
                    height={150}
                  />
                </animated.div>
              </div>
            </div>
            <div className="right-side flex flex-col w-[50%] lg:w-1/3">
              <span className="uppercase font-semibold text-base lg:text-2xl">
                {item.companyName}
              </span>
              <span className="lowercase text-base lg:text-lg font-light mb-2">
                {item.title}
              </span>
              <span className="text-xs lg:text-sm font-extralight">
                {item.description}
              </span>
              <span className="text-xs lowercase flex flex-wrap gap-x-2">
                {item.tags.map((t) => (
                  <span key={t} className="rounded bg-zinc-200 px-1.5 mt-2">
                    {t}
                  </span>
                ))}
              </span>
            </div>
          </animated.div>
        ))}
      </div>
    </main>
  );
}
