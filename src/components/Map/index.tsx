import React from "react";
import style from "./style/index.module.css";

const Map: React.FC = () => {
  return (
    <div className={style.map}>
      <div className={style.map__content}>
        <h2>
          Saint-Genis-Pouilly,
          <br />
          <span> 01630, France.</span>
        </h2>
        <button className={style.button__map}>Open the map</button>
      </div>
    </div>
  );
};

export default Map;
