"use client";

import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { animated, useSpring, easings } from "@react-spring/web";
import { useEffect } from "react";
import Background from "@/components/Background";

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Background />
      <animated.div
        className="fixed overflow-hidden top-12 right-[20%] w-[35%] lg:top-32 lg:w-[15%]"
        style={imageStyle}
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
        style={textStyle}
      >
        <span className="text-5xl lg:text-8xl leading-none lg:leading-[3rem] font-light">
          Robin
        </span>
        <span className="text-4xl lg:text-6xl leading-none lg:leading-[4.5rem] tracking-wide font-normal">
          Esposito
        </span>
        <span className="uppercase text-sm lg:text-base mb-3 tracking-wider font-extralight text-lg">
          software engineer
        </span>
        <span className="w-2/3 text-xs lg:w-2/5 lg:text-base font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In bibendum
          nunc a turpis vulputate sodales. Maecenas euismod sodales lectus, a
          vestibulum enim placerat sed. Maecenas hendrerit in velit non
          vehicula. Mauris non consectetur nulla, ac fermentum diam.
        </span>
      </animated.div>
      <animated.div
        className="fixed bottom-24 lg:bottom-24 left-[40%] lg:left-1/2"
        style={linksStyle}
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
