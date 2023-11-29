import React from "react";
import style from "./style/index.module.css";
import ButtonMagnetic from "../ButtonMagnetic";

const Test: React.FC = () => {
  return (
    <div className={style.test}>
      <ButtonMagnetic
        id="target_1"
        title="1"
        callback={() => console.log("test 1")}
      />
      <ButtonMagnetic
        id="target_2"
        title="Target 2 tegrbT"
        callback={() => console.log("test 2")}
      />
    </div>
  );
};

export default Test;
