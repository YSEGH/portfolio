import React, { ReactNode, useEffect } from "react";
import style from "./style/index.module.css";

type props = {
  id: string;
  animation: Function;
  children: ReactNode;
};
const Container: React.FC<props> = ({ id, animation, children }) => {
  const animationHandler = () => animation();

  useEffect(() => {
    animationHandler();
    return () => {};
  }, []);

  return (
    <div id={id} className={style.container}>
      {children}
    </div>
  );
};

export default Container;
