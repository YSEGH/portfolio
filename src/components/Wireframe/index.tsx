import React from "react";
import Divider from "./components/Divider";

const wireframes = [
  { id: "wireframe_banner", height: "100vh", details: "Banner" },
  {
    id: "wireframe_photo",
    height: "100vh",
    details: "Fait apparaitre l'images (mask)",
  },
  { id: "wireframe_work", height: "200vh", details: "Work page" },
  { id: "wireframe_skill", height: "200vh", details: "" },
  { id: "wireframe_about", height: "200vh", details: "" },
];

const Wireframe: React.FC = () => {
  return (
    <div id="wireframes">
      {wireframes.map((wireframe, i) => (
        <Divider
          key={`${wireframe.id}-${i}`}
          id={wireframe.id}
          height={wireframe.height}
        />
      ))}
    </div>
  );
};

export default Wireframe;
