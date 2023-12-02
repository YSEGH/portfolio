import React, { useEffect, useRef } from "react";
import style from "../style/Item.module.css";
import cx from "classnames";
import gsap from "gsap";
import { getTargetedPos } from "../utils";
import ButtonMagnetic from "../../ButtonMagnetic";
import { styleBtnGo, styleBtnShow, styleBtnShowSVG } from "./Item";

type Props = {
  element: any;
  show: boolean;
  callback: Function;
};
const Screen: React.FC<Props> = ({ element, show, callback }) => {
  const tl: any = useRef(null);
  const screen = useRef(null);
  const backgroundRef = useRef(null);
  const descriptionRef = useRef(null);
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const moreBackButtonRef = useRef(null);
  const moreBackButtonInnerRef = useRef(null);
  const goToButtonRef = useRef(null);
  const detailsRef = useRef(null);

  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (tl.current) {
      (tl.current as gsap.TimelineVars).reverse().then(() => callback());
      tl.current = null;
    }
  };

  useEffect(() => {
    if (show) {
      if (screen.current) {
        const screenPos = getTargetedPos(screen.current);

        tl.current = gsap
          .timeline()
          .to(screen.current, {
            display: "block",
            opacity: 1,
          })
          /*  .to(".grid_item__front", {
            display: "none",
            duration: 0,
          }) */
          .to(backgroundRef.current, {
            scale: screenPos.scale + 0.2,
            duration: 0.6,
            ease: "power4.out",
          })
          .to(
            screen.current,
            { width: window.innerWidth * 0.7, ease: "power1.inOut" },
            "<"
          )
          .to([subtitleRef.current, titleRef.current], {
            y: -(
              ((descriptionRef.current! as HTMLElement).offsetHeight + 8) / 2 +
              16
            ),
            stagger: 0.15,
            ease: "power1.inOut",
          })
          .to(
            buttonContainerRef.current,
            {
              y:
                ((descriptionRef.current! as HTMLElement).offsetHeight + 8) /
                  2 -
                16,
              ease: "power1.inOut",
            },
            "<"
          )
          .to(descriptionRef.current, {
            opacity: 1,
            duration: 0.15,
            ease: "power1.inOut",
          });
        /* .to(
            "#button__go_to__screen",
            {
              scale: 1,
              display: "block",
              duration: 0.15,
              ease: "power1.out",
            },
            "<"
          ); */
      }
    }

    return () => {};
  }, [show]);

  return (
    <div
      ref={screen}
      className={cx(
        `grid_item`,
        `grid_item__screen`,
        style.grid_item,
        style.grid_item__screen,
        {
          [style.showed]: show,
        }
      )}
    >
      <div ref={backgroundRef} className={cx(style.grid_item__background)}>
        <div className={cx(style.grid_item__overlay)}></div>
        <div className={cx(style.grid_item__image)}>
          <img src={`${element?.imgURI}`} alt="alt" />
        </div>
      </div>
      <div
        ref={detailsRef}
        className={cx(style.grid_item__details, style.item_details)}
      >
        <h5 ref={subtitleRef} className={cx(style.item__subtitle)}>
          {element?.title}
        </h5>
        <h3 ref={titleRef} className={cx(style.item__title)}>
          {element?.title}
        </h3>
        <p
          ref={descriptionRef}
          className={cx("item__description", style.item__description)}
        >
          {element?.description}
        </p>
        <div
          ref={buttonContainerRef}
          className={cx("button__container", style.button__container)}
        >
          <ButtonMagnetic
            id={`button__go_to__screen`}
            callback={() => {}}
            customClass="button__go_to"
            style={styleBtnGo}
          >
            Voir
          </ButtonMagnetic>
          <ButtonMagnetic
            id={`button__show__screen`}
            callback={onClickHandler}
            customClass="button__show"
            style={styleBtnShow}
          >
            <svg
              style={styleBtnShowSVG}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 9L12 15L6 9" stroke="white" />
            </svg>
          </ButtonMagnetic>
        </div>
      </div>
    </div>
  );
};

export default Screen;
