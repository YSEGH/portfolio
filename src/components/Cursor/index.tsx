import React, { useEffect, useRef } from "react";
import style from "./style/Cursor.module.css";
import throttle from "lodash.throttle";
import ButtonMagneticHandler from "./src/ButtonMagneticHandler";

const Cursor: React.FC = () => {
  const buttonMagneticHandler = useRef<any>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const onMouseMove = throttle((e: any) => {
    /*     console.log(e.pageX, e.pageY);
     */
    buttonMagneticHandler.current.update(e.pageX, e.pageY);
  }, 30);

  useEffect(() => {
    buttonMagneticHandler.current = new ButtonMagneticHandler("#cursor");
    window.addEventListener("mousemove", onMouseMove);
    return () => {};
  }, []);

  return (
    <div className={style.cursor__container}>
      <div id="cursor" ref={cursorRef} className={style.cursor}></div>
    </div>
  );
};

export default Cursor;

/*     const { clientX, clientY } = e;
    const x = clientX / window.innerWidth;
    const y = clientY / window.innerHeight;

    
    gsap.to(cursorRef.current, {
      "--x": `${x * window.innerWidth}px`,
      "--y": `${y * window.innerHeight}px`,
      duration: 0.3,
      ease: "sine.out",
    }); */
