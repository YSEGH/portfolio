import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import style from "../style/Grid.module.css";
import gsap from "gsap";
import Item from "./Item";
import DraggableDiv from "./Draggable";
import { getTargetedPos } from "../utils";
import Screen from "./Screen";
import { ScrollToPlugin } from "gsap/all";

const elements = [
  {
    title: "Apple Air Watch 0",
    imgURI: "/assets/p6.jpg",
    key: "0",
    description:
      "Libero aspernatur laborum ab veniam nobis cumque, magnam maiores, sunt beatae sapiente quaerat quo vitae dolorum. Ut corrupti iure eius perspiciatis sed.",
  },
  {
    title: "Apple Air Watch 1",
    imgURI: "/assets/p1.jpg",
    key: "1",
    description:
      "Magnam maiores, sunt beatae sapiente quaerat quo vitae dolorum. Ut corrupti iure eius perspiciatis sed.",
  },
  {
    title: "Apple Air Watch 2",
    imgURI: "/assets/p7.jpg",
    key: "2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero aspernatur laborum ab veniam nobis cumque, magnam maiores, sunt beatae sapiente quaerat quo vitae dolorum. Ut corrupti iure eius perspiciatis sed.",
  },
  {
    title: "Apple Air Watch 3",
    imgURI: "/assets/p3.jpg",
    key: "3",
    description:
      "Lonsectetur adipisicing elit. Libero aspernatur laborum ab veniam nobis cumque, magnam maiores, sunt beatae sapiente quaerat quo vitae dolorum. Ut corrupti iure eius perspiciatis sed.",
  },
  {
    title: "Apple Air Watch 4",
    imgURI: "/assets/p4.jpg",
    key: "4",
    description:
      "Lmet consectetur adipisicing elit. Libero aspernatur laborum ab veniam nobis cumque, magnam maiores, sunt beatae sapiente quaerat quo vitae dolorum. Ut corrupti iure eius perspiciatis sed.",
  },
  {
    title: "Apple Air Watch 5",
    imgURI: "/assets/p5.jpg",
    key: "5",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero aspernatur laborum ab veniam nobis cumque, magnam maiores, sunt beatae sapiente quaerat quo vitae dolorum. Ut corrupti iure eius perspiciatis sed.",
  },
];

const Grid: React.FC = () => {
  gsap.registerPlugin(ScrollToPlugin);

  const tlTranslateAnimation: any = useRef();
  const gridFrontRef: any = useRef();
  const gridFrontMarkerRef: any = useRef();
  const gridScreen: any = useRef();
  const [currentTarget, setCurrentTarget] = useState<any>(null);
  const [key, setKey] = useState<string | null>(null);
  const [pauseAnimation, setPauseAnimation] = useState(false);
  const [show, setShow] = useState(false);

  const translateAnimationHandler = (htmlElement: HTMLElement, item: any) => {
    /* Set current target */
    setCurrentTarget({ html: htmlElement, item: item });

    /* Stop drag animation on grid */
    setPauseAnimation(!pauseAnimation);

    /* Get the datakey */
    let currentKey = item.key;

    if (key === currentKey) {
      setKey(null);
    } else {
      setKey(currentKey);
    }

    if (tlTranslateAnimation.current) {
      setShow(false);
      setCurrentTarget(null);

      /* If tlTranslateAnimation is set, reverse it. */
      (tlTranslateAnimation.current as gsap.TimelineVars).reverse();
      tlTranslateAnimation.current = null;
      return;
    }

    /* List of others items. Without the one selected. */
    let items: NodeListOf<HTMLElement> = document.querySelectorAll(
      `.grid_item:not([data-key='${currentKey}']):not(.grid_item__screen)`
    );

    let targetPos = getTargetedPos(htmlElement);

    tlTranslateAnimation.current = gsap
      .timeline()
      .to(items, {
        x: function (index, target, list) {
          return target.getBoundingClientRect().left >
            htmlElement!.getBoundingClientRect().left
            ? "100vw"
            : "-100vw";
        },
        duration: 0.6,
        ease: "power4.inOut",
      })
      .to(htmlElement, {
        x: targetPos.translateX,
        y: targetPos.translateY,
        duration: 0.6,
        ease: "power1.inOut",
      })
      .to(gridScreen.current, { zIndex: 2, duration: 0 })
      .call(() => setShow(true));
  };

  const onClickHandler = (
    htmlElement: HTMLElement = currentTarget.html,
    item: any = currentTarget.item
  ) => {
    var offsetY =
      (window.innerHeight -
        (gridFrontMarkerRef.current as HTMLElement).offsetHeight) /
      2;

    gsap
      .to(window, {
        duration: 1,
        scrollTo: { y: gridFrontMarkerRef.current, offsetY: offsetY },
        ease: "power2.inOut",
      })
      .then(() => translateAnimationHandler(htmlElement, item));
  };

  useEffect(() => {
    /*     const getScrollPosition = () => {
      (gridFrontRef.current as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    };

    getScrollPosition(); */

    return () => {};
  }, []);

  return (
    <div className={cx(style.grid)}>
      <div ref={gridFrontRef} className={style.grid__front}>
        <div
          ref={gridFrontMarkerRef}
          className={style.grid__front__marker}
        ></div>
        {elements.map((element, i) => (
          <Item
            key={i}
            isSelected={key === element.key}
            element={element}
            callback={onClickHandler}
          />
        ))}
      </div>
      <div className={style.grid__screen} ref={gridScreen}>
        <Screen
          show={show}
          element={currentTarget?.item}
          callback={onClickHandler}
        />
      </div>
    </div>
  );
};

export default Grid;

/* 
        <img
          className={cx("border_top_left", style.border, style.border_top_left)}
          src="/assets/border_top_left.svg"
          alt="border"
        />
<img
          className={cx(
            "border_top_right",
            style.border,
            style.border_top_right
          )}
          src="/assets/border_top_right.svg"
          alt="border"
        />
        <img
          className={cx(
            "border_bottom_left",
            style.border,
            style.border_bottom_left
          )}
          src="/assets/border_bottom_left.svg"
          alt="border"
        />
        <img
          className={cx(
            "border_bottom_right",
            style.border,
            style.border_bottom_right
          )}
          src="/assets/border_bottom_right.svg"
          alt="border"
        /> */

/*
        .to(".border_top_left", {
          display: "block",
          x: -(itemWidth / 2) - gap,
          y: -(itemHeight / 2) - gap,
          duration: 0.6,
          ease: "back.out(1.1)",
        })
         .to(
          ".border_top_right",
          {
            display: "block",
            x: itemWidth / 2 + gap,
            y: -(itemHeight / 2) - gap,
            duration: 0.6,
            ease: "back.out(1.1)",
          },
          "<"
        )
        .to(
          ".border_bottom_left",
          {
            display: "block",
            x: -(itemWidth / 2) - gap,
            y: itemHeight / 2 + gap,
            duration: 0.6,
            ease: "back.out(1.1)",
          },
          "<"
        )
        .to(
          ".border_bottom_right",
          {
            display: "block",
            x: itemWidth / 2 + gap,
            y: itemHeight / 2 + gap,
            duration: 0.6,
            ease: "back.out(1.1)",
          },
          "<"
        ) */
