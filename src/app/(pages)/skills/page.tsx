"use client";

import { coding, skills, languages, certificates } from "./skills";
import {
  faFileSignature,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { easings, useTrail, animated, useSpring } from "@react-spring/web";

const getColorFromGradient = (weight: number, opacity: number) => {
  const color2 = [190, 243, 246];
  const color1 = [124, 122, 223];
  const w1 = weight / 10;
  const w2 = 1 - w1;
  const rgb = [
    Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2),
  ];
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
};

export default function Skills() {
  const sectionTrail = useTrail(4, {
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: -50 },
    config: {
      duration: 200,
      easing: easings.easeOutCubic,
    },
  });

  const listTrail = useTrail(20, {
    opacity: 1,
    y: 0,
    width: "100%",
    from: { opacity: 0, y: -50, width: "0" },
    config: {
      duration: 300,
      easing: easings.easeOutExpo,
    },
  });

  const dividerStyle = useSpring({
    from: { opacity: 0, height: "0" },
    to: { opacity: 1, height: "60%" },
    config: {
      duration: 1000,
      easing: easings.easeOutExpo,
    },
  });

  const sectionClass = "w-full lg:w-1/2 lg:px-[5%] xl:px-[10%] 2xl:px-[13%]";
  const titleClass = "uppercase text-xl font-bold mb-2";

  return (
    <main className="flex min-h-screen lg:h-screen flex-col items-center justify-between pb-32 lg:pb-4 pt-40 lg:pt-24 2xl:pt-48 px-[17%] lg:px-[15%] overflow-hidden">
      <animated.div
        className="divider hidden lg:block fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] rounded-full h-[60%] w-1 bg-zinc-200"
        style={dividerStyle}
      />
      <div className="flex flex-col flex-wrap w-full gap-y-16 text-md h-full items-center">
        <animated.div
          className={sectionClass + " coding"}
          style={sectionTrail[0]}
        >
          <h3 className={titleClass}>Coding</h3>
          {coding.map((item, i) => (
            <animated.div
              key={item.name}
              className="flex items-baseline gap-2 justify-between mb-2 overflow-hidden"
              style={listTrail[i]}
            >
              <p className="w-[35%]">{item.name}</p>
              <div className="score flex items-end justify-end h-6 gap-[2px] w-[60%] lg:w-full min-w-[60%]">
                {[...Array(10)].map((_, ix) => (
                  <div
                    className="column w-4"
                    key={ix}
                    style={{
                      height: (ix + 1) * 10 + "%",
                      border: "1px solid " + getColorFromGradient(ix, 0.4),
                      backgroundColor:
                        ix / 10 < item.score
                          ? getColorFromGradient(ix, 1)
                          : "transparent",
                    }}
                  />
                ))}
              </div>
            </animated.div>
          ))}
        </animated.div>
        <animated.div
          className={sectionClass + " skills"}
          style={sectionTrail[1]}
        >
          <h3 className={titleClass}>Other skills</h3>
          {skills.map((item, i) => (
            <animated.div
              key={item.name}
              className="mb-3 overflow-hidden text-nowrap"
              style={listTrail[5 + i]}
            >
              <FontAwesomeIcon
                icon={faCircleCheck}
                size="xs"
                className="mr-2"
                color="#8685a7"
              />
              {item.name}
            </animated.div>
          ))}
        </animated.div>
        <div className="basis-full hidden lg:block" />
        <div className="filler hidden lg:block h-4" />
        <animated.div
          className={sectionClass + " languages break-before-column	"}
          style={sectionTrail[2]}
        >
          <h3 className={titleClass}>Languages</h3>
          {languages.map((item, i) => (
            <animated.div
              key={item.name}
              className="mb-2 overflow-hidden text-nowrap"
              style={listTrail[10 + i]}
            >
              {item.flag}
              <span className="ml-2">{item.name}</span>
              <span className="font-extralight"> - {item.level}</span>
            </animated.div>
          ))}
        </animated.div>
        <animated.div
          className={sectionClass + " certificates"}
          style={sectionTrail[3]}
        >
          <h3 className={titleClass}>Certificates</h3>
          {certificates.map((item, i) => (
            <animated.div
              key={item.name}
              className="flex gap-x-2 overflow-hidden lg:text-nowrap"
              style={listTrail[15 + i]}
            >
              <FontAwesomeIcon
                icon={faFileSignature}
                size="xs"
                className="pt-2"
                color="#8685a7"
              />
              <div>
                <p>{item.name}</p>
                <p className="font-extralight mb-3">
                  {item.istitute} - {item.date}
                </p>
              </div>
            </animated.div>
          ))}
        </animated.div>
      </div>
    </main>
  );
}
