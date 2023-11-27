import React from "react";
import style from "./style/index.module.css";

const Contact: React.FC = () => {
  return (
    <div className={style.contact}>
      <div className={style.contact__form}>
        <h2 className={style.form__title}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto.
        </h2>
        <div className={style.form}>
          <div className={style.form__group}>
            <div className={style.form__input}>
              <label htmlFor="">Name</label>
              <input type="text" />
            </div>
          </div>
          <div className={style.form__group}>
            <div className={style.form__input}>
              <label htmlFor="">Email</label>
              <input type="text" />
            </div>
          </div>
          <div className={style.form__group}>
            <div className={style.form__input}>
              <label htmlFor="">Topic</label>
              <select name="" id=""></select>
            </div>
          </div>
          <div className={style.form__group}>
            <div className={style.form__input}>
              <label htmlFor="">Message</label>
              <input type="textarea" />
            </div>
          </div>
          <div className={style.form__group}>
            <button className={style.form__button_submit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
