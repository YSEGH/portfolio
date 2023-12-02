import React, { useEffect, useRef } from "react";
import style from "../style/Item.module.css";
import cx from "classnames";
import ButtonMagnetic from "../../ButtonMagnetic";

export const styleBtnShow: React.CSSProperties = {
  width: 80,
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: "#fff",
  backgroundColor: "transparent",
};

export const styleBtnGo: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  transform: "scale(0)",
  fontFamily: "Poligon",
  fontWeight: 500,
  borderColor: "var(--red)",
  backgroundColor: "var(--red)",
  color: "#fff",
  display: "none",
};

export const styleBtnShowSVG: React.CSSProperties = {
  transform: "rotate(-90deg)",
  pointerEvents: "none",
  width: 40,
  height: 40,
};

type Props = {
  element: any;
  isSelected: boolean;
  callback: Function;
};

const Item: React.FC<Props> = ({ element, isSelected, callback }) => {
  const item = useRef(null);

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
      className={cx(`grid_item`, `grid_item__front`, style.grid_item, {
        [style.selected]: isSelected,
      })}
    >
      <div className={cx(style.grid_item__background)}>
        <div className={cx(style.grid_item__overlay)}></div>
        <div className={cx(style.grid_item__image)}>
          <img src={`${element?.imgURI}`} alt="alt" />
        </div>
      </div>
      <div className={cx(style.grid_item__details, style.item_details)}>
        <h5 className={cx(style.item__subtitle)}>{element?.title}</h5>
        <h3 className={cx(style.item__title)}>{element?.title}</h3>
        <p className={cx("item__description", style.item__description)}>
          {element?.description}
        </p>
        <div className={cx("button__container", style.button__container)}>
          <ButtonMagnetic
            id={`button__go_to__${element.key}`}
            callback={() => {}}
            customClass="button__go_to"
            style={styleBtnGo}
          >
            Voir
          </ButtonMagnetic>
          <ButtonMagnetic
            id={`button__show__${element.key}`}
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

export default Item;
