import React, { useEffect, useRef } from "react";
import style from "../style/Item.module.css";
import cx from "classnames";
import gsap from "gsap";
import { getTargetedPos } from "../utils";

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
            zIndex: 10,
            opacity: 1,
          })
          .to(".work__grid", { zIndex: 12 }, "<")
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
          })
          .to(
            moreBackButtonRef.current,
            {
              x:
                (buttonContainerRef.current! as HTMLElement).offsetWidth -
                (moreBackButtonRef.current! as HTMLElement).offsetWidth,
              duration: 0.3,
              ease: "power1.inOut",
            },
            "<"
          )
          .to(moreBackButtonRef.current, {
            borderColor: "#fff",
            duration: 0.15,
            ease: "power1.out",
          })
          .to(
            moreBackButtonInnerRef.current,
            {
              y: 32,
              duration: 0.15,
              ease: "power1.inOut",
            },
            "<"
          )
          .to(
            goToButtonRef.current,
            {
              scale: 1,
              duration: 0.15,
              ease: "power1.out",
            },
            "<"
          );
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
          <button
            className={cx("button__go_to", style.button__go_to)}
            ref={goToButtonRef}
          >
            Voir
          </button>
          <button
            className={cx("button__more_back", style.button__more_back)}
            ref={moreBackButtonRef}
            data-key={element?.key}
            onClick={onClickHandler}
          >
            <div
              ref={moreBackButtonInnerRef}
              className={cx(
                "button__more_back__inner",
                style.button__more_back__inner
              )}
            >
              <p className={style.link__back}>Retour</p>
              <p className={style.link__more}>+ d'infos</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Screen;
