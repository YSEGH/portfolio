import React from "react";
import style from "./style/index.module.css";
import "./style/style.css";
import cx from "classnames";

type Props = {
  id: string;
  title: string;
  callback: Function;
};

const ButtonMagnetic: React.FC<Props> = ({ id, callback, title }) => {
  const onClickHandler = () => callback();
  return (
    <button
      id={id}
      className={cx("button__magnetic", style.button__magnetic)}
      onClick={onClickHandler}
    >
      {title}
    </button>
  );
};

export default ButtonMagnetic;
