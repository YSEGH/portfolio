import React, { MouseEvent, useEffect } from "react";
import style from "./style/index.module.css";
import Grid from "./components/Grid";
import cx from "classnames";
import { displayWorkHandler } from "../animations";

const Work: React.FC = () => {
  const onClickHandler = (e: MouseEvent) => {
    displayWorkHandler();
  };

  useEffect(() => {
    /*     displayWorkHandler();
     */
    return () => {};
  }, []);

  return (
    <div id="work" className={style.work}>
      <Grid />
      <button
        className={cx("work__button_back", style.work__button_back)}
        onClick={onClickHandler}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 9L12 15L6 9" />
        </svg>
      </button>
    </div>
  );
};

export default Work;
