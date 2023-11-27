import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef } from "react";
import SplitType from "split-type";
import style from "./style/index.module.css";

const animateTextOut = (
  element: HTMLElement | null,
  trigger: string,
  delay: number,
  start: string,
  end: string
) => {
  if (!element) {
    return;
  }
  const ourText = new SplitType(element, { types: "chars" });
  const chars = ourText.chars;

  gsap.fromTo(
    chars,
    {
      y: 0,
    },
    {
      y: -200,
      stagger: 0.1,
      ease: "expo.out",
      delay: delay,
      scrollTrigger: {
        trigger: `#${trigger}`,
        start: start,
        end: end,
        toggleActions: "play reverse play reverse",
      },
    }
  );
};

type Props = {
  element: any;
  trigger: string;
  delay: number;
  start: string;
  end: string;
  styleContainer: any;
  styleCustom: any;
};
const TranslationText: React.FC<Props> = ({
  element,
  trigger,
  delay,
  start,
  end,
  styleContainer,
  styleCustom,
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline();

    tl.call(animateTextOut, [textRef.current, trigger, delay, start, end]);

    return () => {};
  }, []);
  return (
    <div className={style.text__content} style={styleContainer}>
      <h2 ref={textRef} style={{ ...styleCustom }}>
        <span>{element}</span>
      </h2>
    </div>
  );
};

export default TranslationText;
