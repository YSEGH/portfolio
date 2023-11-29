import React, { ReactNode, useEffect } from "react";
import styles from "./style/index.module.css";
import "./style/style.css";
import cx from "classnames";

type Props = {
  id: string;
  style?: React.CSSProperties;
  customClass?: string;
  title?: string;
  callback: Function;
  children?: ReactNode;
};

const ButtonMagnetic: React.FC<Props> = ({
  id,
  style,
  customClass,
  callback,
  title,
  children,
}) => {
  const onClickHandler = () => callback();

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <button
      style={style}
      id={id}
      className={cx("button__magnetic", customClass, styles.button__magnetic)}
      onClick={onClickHandler}
    >
      {children ?? title}
    </button>
  );
};

export default ButtonMagnetic;
