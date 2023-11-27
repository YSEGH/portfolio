import React from "react";
import style from "../style/item.module.css";

type Props = {
  item: any;
};

const Item: React.FC<Props> = ({ item }) => {
  return (
    <div className={style.testimony__item}>
      <img src={item.image} alt="" />
      <div className={style.testimony__content}>
        <p className={style.testimony}>{item.testimony}</p>
        <div className={style.author}>
          <h6 className={style.author__name}>{item.name}</h6>
          <p className={style.author__job}>{item.job}</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
