import shapes from "./background_shapes";
import { animated, useSpring, easings } from "@react-spring/web";
import Image from "next/image";

export default function Background() {
  const slideInSettings = {
    to: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    config: {
      duration: 1000,
      easing: easings.easeOutBack,
    },
  };

  const fullRotationStyle = useSpring({
    from: { rotate: "0deg" },
    to: { rotate: "360deg" },
    loop: true,
    config: { duration: 5000 },
  });

  const positionStyles = shapes.map((shape) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSpring({
      from: { x: shape.originX, y: shape.originY, opacity: 0 },
      ...slideInSettings,
    })
  );

  const rotationStyles = shapes.map((shape) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSpring({
      from: { rotate: "0deg" },
      to: { rotate: 15 + Math.random() * 10 + "deg" },
      delay: Math.random() * 1000,
      loop: { reverse: true },
      config: { duration: 10000 + Math.random() * 10000 },
    })
  );

  return (
    <div id="background_shapes" className="opacity-60 select-none">
      {shapes.map((shape, ix) => (
        <animated.div
          key={ix}
          className={shape.className}
          style={{
            ...positionStyles[ix],
            ...(shape.fullRotation ? fullRotationStyle : rotationStyles[ix]),
          }}
        >
          <Image
            priority
            className={shape.rotation}
            src={"/shapes/" + shape.filename}
            alt="background_shape"
            width={1000}
            height={1000}
          />
        </animated.div>
      ))}
    </div>
  );
}
