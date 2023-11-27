import React from "react";
import style from "./style/index.module.css";

const themes = [
  {
    title: "Frontend",
    skills: ["HTML", "CSS", "Javascript", "React", "Bootstrap", "Sass"],
  },
  {
    title: "Backend",
    skills: ["PHP", "Symfony", "Node.js", "Express.js"],
  },
  {
    title: "Database",
    skills: ["SQL", "NoSQL"],
  },
  {
    title: "CMS",
    skills: ["Drupal", "Keystone", "Strapi", "Payload", "Wordpress"],
  },
  {
    title: "UX/UI",
    skills: ["Figma", "Photoshop", "Adobe XD"],
  },
];

const Skills: React.FC = () => {
  return (
    <div className={style.skills}>
      <div className={style.skills__grid}>
        {themes.map((theme, i) => (
          <div key={`${theme.title}-${i}`} className={style.skill__container}>
            <h2 className={style.skill__title}>{theme.title}</h2>
            <ul className={style.skill__list}>
              {theme.skills.map((skill, k) => (
                <li key={`${skill}-${k}`} className={style.skill}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
