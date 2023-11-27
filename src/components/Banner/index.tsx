import React, { useEffect, useRef } from "react";
import style from "./style/index.module.css";
import { displayWorkHandler } from "../animations";
import cx from "classnames";
import gsap from "gsap";
import ButtonMagnetic from "../ButtonMagnetic";

const Banner: React.FC = () => {
  const bannerButtonRef = useRef(null);
  const onClickHandler = () => {
    displayWorkHandler();
  };

  useEffect(() => {
    /*     gsap.timeline().to(bannerButtonRef.current, { scale: 1 });
     */ return () => {};
  }, []);

  return (
    <div className={style.banner}>
      <div className={style.banner__inner}>
        <ButtonMagnetic
          id="banner_magnetic"
          title="Cliquez ici"
          callback={onClickHandler}
        />
        {/*  <button
          ref={bannerButtonRef}
          className={cx("banner__button", style.banner__button)}
          onClick={onClickHandler}
        >
          <div className={style.banner__button__inner}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 9L12 15L6 9" />
            </svg>
          </div>
        </button> */}
        <div className={style.banner__photo}>
          <img src="/assets/me-photo.jpg" alt="youssef seghrouchni" />
        </div>
        <div className={style.banner__text}>
          <h2 className="banner__text__element">
            Hi, I’m <span className="color--red">Youssef</span>.
          </h2>
          <h2 className="banner__text__element">
            <span className="font-weight--thin">Full Stack Web Developer</span>.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Banner;
