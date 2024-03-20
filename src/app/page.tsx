"use client";

import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { animated, useSpring, easings } from "@react-spring/web";
import { useEffect } from "react";

export default function Home() {
  const duration = 100;

  const [imageStyle, imageApi] = useSpring(() => ({
    y: -50,
    opacity: 0,
    config: {
      duration,
    },
  }));

  const [textStyle, textApi] = useSpring(() => ({
    y: -50,
    opacity: 0,
    lineHeight: 0,
    config: {
      duration,
    },
  }));

  const [linksStyle, linksApi] = useSpring(() => ({
    y: -50,
    opacity: 0,
    gap: 1,
    config: {
      duration,
    },
  }));

  const backgroundSettings = {
    to: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    config: {
      duration: 2000,
      easing: easings.easeOutBack,
    },
  };

  const shape1Style = useSpring({
    from: { x: 100, y: 40, opacity: 0 },
    ...backgroundSettings,
  });
  const shape2Style = useSpring({
    from: { x: -20, y: -100, opacity: 0 },
    ...backgroundSettings,
  });
  const shape3Style = useSpring({
    from: { x: -150, y: -20, opacity: 0 },
    ...backgroundSettings,
  });
  const shape4Style = useSpring({
    from: { x: -20, y: 100, opacity: 0 },
    ...backgroundSettings,
  });

  const partialRotationStyle = useSpring({
    from: { rotate: "0deg" },
    to: { rotate: "20deg" },
    loop: { reverse: true },
    config: { duration: 5000 },
  });

  const fullRotationStyle = useSpring({
    from: { rotate: "0deg" },
    to: { rotate: "360deg" },
    loop: true,
    config: { duration: 10000 },
  });

  useEffect(() => {
    const bounceConfig = {
      easing: easings.easeOutBack,
      duration: 500,
    };

    // profile pic animations
    imageApi.start({
      to: {
        opacity: 1,
      },
    });
    imageApi.start({
      config: bounceConfig,
      to: {
        y: 0,
      },
    });

    // text animations
    setTimeout(() => {
      textApi.start({
        to: {
          opacity: 1,
          lineHeight: 1.2,
        },
      });
      textApi.start({
        config: bounceConfig,
        to: {
          y: 0,
        },
      });
    }, 250);

    // links animations
    setTimeout(() => {
      linksApi.start({
        to: {
          opacity: 1,
        },
      });
      linksApi.start({
        config: bounceConfig,
        to: {
          y: 0,
          gap: 0.5,
        },
      });
    }, 500);
  }, [imageApi, textApi, linksApi]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-[#2e2e2e]">
      <div id="background_shapes">
        <animated.div
          className="fixed top-32 right-[8%] z-[-2] w-[30%] rotate-[60deg]"
          style={{ ...shape1Style, ...fullRotationStyle }}
        >
          <Image
            src="/shapes/shape_1.svg"
            alt="background_shape"
            width={1000}
            height={1000}
          />
        </animated.div>
        <animated.div
          className="fixed top-16 right-[25%] z-[-1] w-[15%] rotate-[90deg]"
          style={{ ...shape2Style, ...partialRotationStyle }}
        >
          <Image
            src="/shapes/shape_4.svg"
            alt="background_shape"
            width={1000}
            height={1000}
          />
        </animated.div>
        <animated.div
          className="fixed bottom-[-55%] left-[-10%] z-[-2] w-[45%] rotate-[90deg]"
          style={{ ...shape3Style, ...fullRotationStyle }}
        >
          <Image
            src="/shapes/shape_3.svg"
            alt="background_shape"
            width={1000}
            height={1000}
          />
        </animated.div>
        <animated.div
          className="fixed bottom-[-10%] left-[15%] z-[-1] w-[25%] rotate-[150deg]"
          style={{ ...shape4Style, ...partialRotationStyle }}
        >
          <Image
            src="/shapes/shape_7.svg"
            alt="background_shape"
            width={1000}
            height={1000}
          />
        </animated.div>
      </div>
      <animated.div
        className="fixed top-32 right-[20%] overflow-hidden"
        style={imageStyle}
      >
        <Image
          className="rounded-[60px]"
          src="/profile.jpg"
          alt="Profile picture"
          width={200}
          height={200}
          priority
        />
      </animated.div>
      <animated.div
        id="title"
        className="fixed top-32 left-[10%] flex flex-col"
        style={textStyle}
      >
        <span className="text-8xl leading-[3rem] font-light">Robin</span>
        <span className="text-6xl leading-[4.5rem] tracking-wide font-normal">
          Esposito
        </span>
        <span className="uppercase mb-3 tracking-wider font-extralight text-lg">
          software engineer
        </span>
        <span className="w-2/5 font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In bibendum
          nunc a turpis vulputate sodales. Maecenas euismod sodales lectus, a
          vestibulum enim placerat sed. Maecenas hendrerit in velit non
          vehicula. Mauris non consectetur nulla, ac fermentum diam.
        </span>
      </animated.div>
      <animated.div className="fixed bottom-24 left-1/2" style={linksStyle}>
        <nav className="flex flex-col text-3xl gap-2">
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
