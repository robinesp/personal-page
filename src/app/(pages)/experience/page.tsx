"use client";

import Image from "next/image";
import items from "./items";
import { animated, easings, useTrail } from "@react-spring/web";

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

  return (
    <main className="flex min-h-screen flex-col justify-between pt-32">
      <div id="timeline" className="flex flex-col justify-start gap-8 pb-32">
        {items.map((item, ix) => (
          <animated.div
            className="flex min-h-44"
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
            <div className="middle relative w-[15%] lg:w-[10%]">
              <div className="absolute z-[-1] top-[-24px] left-[50%] translate-x-[-50%] h-[400px] lg:h-[250px] w-[10px] bg-zinc-200	rounded-3xl" />
              <Image
                className="absolute top-2 left-[50%] translate-x-[-50%] bg-white rounded-full"
                src={item.companyLogo}
                alt={item.companyName}
                width={35}
                height={35}
              />
            </div>
            <div className="right-side flex flex-col w-[40%] lg:w-1/3">
              <span className="uppercase font-semibold text-lg lg:text-2xl">
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
