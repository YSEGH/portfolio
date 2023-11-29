import React, { useEffect, useRef } from "react";
import styles from "./style/index.module.css";
import { displayWorkHandler } from "../animations";
import cx from "classnames";
import gsap from "gsap";
import ButtonMagnetic from "../ButtonMagnetic";

const Banner: React.FC = () => {
  const style = {
    height: "100px",
    width: "100px",
    border: "2px solid #000",
    borderRadius: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  };
  const bannerButtonRef = useRef(null);
  const onClickHandler = () => {
    displayWorkHandler();
  };

  useEffect(() => {
    /*     gsap.timeline().to(bannerButtonRef.current, { scale: 1 });
     */ return () => {};
  }, []);

  return (
    <div className={styles.banner}>
      <div className={styles.banner__inner}>
        <ButtonMagnetic
          id="banner_magnetic"
          title="Cliquez ici"
          style={style}
          callback={onClickHandler}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 9L12 15L6 9" stroke="black" />
          </svg>
        </ButtonMagnetic>
        {/*  <button
          ref={bannerButtonRef}
          className={cx("banner__button", style.banner__button)}
          onClick={onClickHandler}
        >
         
        </button> */}
        <div className={styles.banner__photo}>
          <img src="/assets/me-photo.jpg" alt="youssef seghrouchni" />
        </div>
        <div className={styles.banner__text}>
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
