import React, { useEffect, useState } from "react";
import style from "./style/index.module.css";
import Item from "./components/Item";
import cx from "classnames";

const items = [
  {
    id: 1,
    name: "Jordan BETTIN",
    job: "Lead Tech - Capgemini",
    image: "/assets/p3.jpg",
    testimony:
      "Lorem, ipsum dolor sit amet consect adipisicing elit. Aut ducimus vero, eius nam eaque pariatur. Porro esse ullam.",
  },
  {
    id: 2,
    name: "Guillaume CAROUX",
    job: "Lead Tech - Capgemini",
    image: "/assets/p5.jpg",
    testimony:
      "Lorem, ipsum dolor sit amet consect adipisicing elit. Aut ducimus vero, eius nam eaque pariatur. Porro esse ullam.",
  },
  {
    id: 3,
    name: "Pierre SAPIN",
    job: "Lead Tech - Capgemini",
    image: "/assets/p6.jpg",
    testimony:
      "Lorem, ipsum dolor sit amet consect adipisicing elit. Aut ducimus vero, eius nam eaque pariatur. Porro esse ullam.",
  },
  {
    id: 4,
    name: "Mohamed SEFRAOUI",
    job: "Lead Tech - Capgemini",
    image: "/assets/p7.jpg",
    testimony:
      "Lorem, ipsum dolor sit amet consect adipisicing elit. Aut ducimus vero, eius nam eaque pariatur. Porro esse ullam.",
  },
];

const Testimony: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  /*   useEffect(() => {
    const updateTestimony = setInterval(nextSlide, 8000);

    return () => {
      () => clearInterval(updateTestimony);
    };
  }, []); */

  return (
    <div className={cx(style.testimony)}>
      <div className={style.testimony__inner}>
        <div className={style.testimony__list}>
          <Item key={items[currentIndex].id} item={items[currentIndex]} />
        </div>
        <button className={style.testimony__down} onClick={nextSlide}></button>
      </div>
    </div>
  );
};

export default Testimony;
