import React, { ReactNode } from "react";
import style from "./style/index.module.css";

interface Props {
  title: string | null;
  children: ReactNode;
}

const Content: React.FC<Props> = ({ title, children }) => {
  return (
    <div className={style.content}>
      {title && <h4 className={style.content__title}>{title}</h4>}
      <div className={style.content__inner}>{children}</div>
    </div>
  );
};

export default Content;
