import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const scrollWorkHandler = () => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#container__work",
        start: "top -10%",
        end: "bottom 10%",
        scrub: true,
      },
    })
    .to(".grid_item", {
      x: function (index, target, list) {
        return target.getBoundingClientRect().left > window.innerWidth / 2
          ? "100vw"
          : "-100vw";
      },
    });
};

let bannerWorkTimeline: GSAPTimeline | null = null;
export const displayWorkHandler = () => {
  if (bannerWorkTimeline) {
    bannerWorkTimeline.reverse();
    bannerWorkTimeline = null;
    return;
  }
  return;
  bannerWorkTimeline = gsap
    .timeline()
    .to(".banner__button", {
      scale: 0,
      opacity: 0,
      pointerEvents: "none",
      duration: 0.8,
      ease: "power1.inOut",
    })
    .to(
      ".banner__text__element",
      {
        y: -window.innerHeight,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power4.inOut",
      },
      "<"
    )
    .to("#container__work", { display: "block" })
    .to(".grid_item", {
      scale: 1,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(1.01)",
    })
    .to(
      ".work__button_back",
      {
        scale: 1,
        opacity: 1,
        pointerEvents: "all",
        duration: 0.6,
        ease: "power1.inOut",
      },
      "<"
    );
};
