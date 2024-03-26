import { width } from "@fortawesome/free-regular-svg-icons/faAddressBook";
import { coding, skills, languages, certificates } from "./skills";
import {
  faFileSignature,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const sectionClass = "w-full lg:w-1/2 lg:px-[10%]";
  const titleClass = "uppercase text-xl font-bold mb-2";

  return (
    <main className="flex min-h-screen lg:h-screen flex-col items-center justify-between pb-32 lg:pb-4 pt-40 lg:pt-24 2xl:pt-48 px-[20%] lg:px-[15%] overflow-hidden">
      <div className="divider hidden lg:block fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] rounded-full h-[60%] w-1 bg-zinc-200" />
      <div className="flex flex-col flex-wrap w-full gap-y-16 text-md h-full items-center">
        <div className={sectionClass + " coding"}>
          <h3 className={titleClass}>Coding</h3>
          {coding.map((item) => (
            <div
              key={item.name}
              className="flex items-baseline gap-2 justify-between mb-2"
            >
              <p>{item.name}</p>
              <div className="score flex items-end justify-end h-6 gap-1 w-[60%] lg:w-full">
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
            </div>
          ))}
        </div>
        <div className={sectionClass + " skills"}>
          <h3 className={titleClass}>Other skills</h3>
          {skills.map((item) => (
            <div key={item.name} className="mb-3">
              <FontAwesomeIcon
                icon={faCircleCheck}
                size="xs"
                className="mr-2"
                color="#8685a7"
              />
              {item.name}
            </div>
          ))}
        </div>
        <div className="basis-full hidden lg:block" />
        <div className="filler hidden lg:block h-4" />
        <div className={sectionClass + " languages break-before-column	"}>
          <h3 className={titleClass}>Languages</h3>
          {languages.map((item) => (
            <div key={item.name} className="mb-2">
              {item.flag}
              <span className="ml-2">{item.name}</span>
              <span className="font-extralight"> - {item.level}</span>
            </div>
          ))}
        </div>
        <div className={sectionClass + " certificates"}>
          <h3 className={titleClass}>Certificates</h3>
          {certificates.map((item) => (
            <div key={item.name} className="flex gap-x-2">
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
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
