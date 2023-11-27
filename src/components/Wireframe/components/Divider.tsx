import React from "react";
import style from "../style/divider.module.css";

type Props = {
  id: string;
  height: string;
};

const Divider: React.FC<Props> = ({ id, height }) => {
  return (
    <div className={style.divider} id={id} style={{ height: height }}></div>
  );
};

export default Divider;
