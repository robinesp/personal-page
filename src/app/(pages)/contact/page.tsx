"use client";

import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTrail, animated, easings, useSpring } from "@react-spring/web";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  const trail = useTrail(4, {
    opacity: 1,
    x: 0,
    from: { opacity: 0, x: 30 },
    config: {
      duration: 500,
      easing: easings.easeOutBack,
    },
  });

  const shapeInStyle = useSpring({
    from: { opacity: 0, scale: 0.8 },
    to: { scale: 1, opacity: 0.6 },
    config: {
      duration: 1000,
      easing: easings.easeOutExpo,
    },
  });

  const shapeRotateStyle = useSpring({
    from: { rotate: "0deg" },
    to: { rotate: "360deg" },
    loop: true,
    config: { duration: 5000 },
  });

  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center">
      <animated.div
        className="fixed top-[-3rem] lg:top-[4rem] left-[5%] z-[-1] w-[70%] lg:w-[70%]"
        style={{ ...shapeInStyle, ...shapeRotateStyle }}
      >
        <Image
          priority
          src="/shapes/shape_1.svg"
          alt="background_shape"
          width={1500}
          height={1500}
        />
      </animated.div>
      <div className="text-3xl flex flex-col justify-center items-start gap-3 pl-72 pt-36">
        <animated.span
          className="uppercase text-4xl font-bold"
          style={trail[3]}
        >
          Get in touch
        </animated.span>
        {[
          ["linkedin", "https://www.linkedin.com/in/robin-esposito/"],
          ["email", "mailto:robin.esposito1995@gmail.com"],
          ["download cv", ""],
        ].map(([title, href], ix) => (
          <animated.div key={title} style={trail[3 - ix]}>
            <Link
              href={href}
              target="_blank"
              className="flex items-center gap-2 mr-auto
              relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
              before:bottom-0 before:left-0 before:bg-[#2e2e2e]
              before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
              before:transition before:ease-in-out before:duration-500"
            >
              <FontAwesomeIcon icon={faArrowRightLong} size="xs" />
              {title}
            </Link>
          </animated.div>
        ))}
      </div>
    </div>
  );
}
