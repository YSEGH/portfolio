import React, { useEffect, useRef } from "react";
import style from "./style/Cursor.module.css";
import throttle from "lodash.throttle";
import ButtonMagneticHandler from "./src/ButtonMagneticHandler";

const Cursor: React.FC = () => {
  const buttonMagneticHandler = useRef<any>(null);
  const cursorPos = useRef<any>({
    client: { x: 0, y: 0 },
    page: { x: 0, y: 0 },
  });
  const cursorRef = useRef<HTMLDivElement>(null);

  /* const onMouseMove = throttle((e: any) => {
    cursorPos.current = {
      client: { x: e.clientX, y: e.clientY },
      page: { x: e.pageX, y: e.pageY },
    };
    buttonMagneticHandler.current.update(
      cursorPos.current.page.x,
      cursorPos.current.page.y
    );
  }, 10);

  const onScroll = throttle(() => {
    buttonMagneticHandler.current.onScrollHandler(cursorPos.current);
  }, 10); */

  useEffect(() => {
    buttonMagneticHandler.current = new ButtonMagneticHandler("#cursor");
    /*     window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll); */
    return () => {};
  }, []);

  return (
    <div className={style.cursor__container}>
      <div id="cursor" ref={cursorRef} className={style.cursor}></div>
    </div>
  );
};

export default Cursor;
