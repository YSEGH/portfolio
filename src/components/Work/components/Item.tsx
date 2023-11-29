import React, { useEffect, useRef } from "react";
import style from "../style/Item.module.css";
import cx from "classnames";
import ButtonMagnetic from "../../ButtonMagnetic";

const styleBtnShow: React.CSSProperties = {
  width: 80,
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: "#fff",
  backgroundColor: "transparent",
  position: "relative",
  zIndex: 101,
};

type Props = {
  element: any;
  isSelected: boolean;
  callback: Function;
};
const Item: React.FC<Props> = ({ element, isSelected, callback }) => {
  const item = useRef(null);
  const backgroundRef = useRef(null);
  const descriptionRef = useRef(null);
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const goToButtonRef = useRef(null);
  const detailsRef = useRef(null);

  const onClickHandler = () => {
    callback(item.current, element);
  };

  useEffect(() => {
    return () => {};
  }, [isSelected]);

  return (
    <div
      data-key={element?.key}
      ref={item}
      className={cx(`grid_item`, style.grid_item, {
        [style.selected]: isSelected,
      })}
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
        <div className={cx("button__container", style.button__container)}>
          <button
            className={cx("button__go_to", style.button__go_to)}
            ref={goToButtonRef}
          >
            Voir
          </button>
          <ButtonMagnetic
            id={`button__show__${element.key}`}
            callback={onClickHandler}
            style={styleBtnShow}
          >
            <svg
              style={{ pointerEvents: "none" }}
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

export default Item;
