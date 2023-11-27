import SplitType from "split-type";

export const getTargetedPos = (targetedElement: HTMLElement) => {
  // Largeur et hauteur de la fenêtre
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Largeur et hauteur de la div
  const divWidth = targetedElement.offsetWidth;
  const divHeight = targetedElement.offsetHeight;

  const rect = targetedElement.getBoundingClientRect();
  // Calcul des valeurs de translation
  const translateX = (windowWidth - divWidth) / 2 - rect.left;
  const translateY = (windowHeight - divHeight) / 2 - rect.top;

  const scaleX = windowWidth / divWidth;
  const scaleY = windowHeight / divHeight;

  return {
    scale: scaleX > scaleY ? scaleX : scaleY,
    position: rect,
    translateX: translateX,
    translateY: translateY,
  };
};

export const animateTextOut = (element: HTMLElement | null) => {
  if (!element) {
    return;
  }
  const ourText = new SplitType(element, { types: "chars" });
  const chars = ourText.chars;

  gsap.fromTo(
    chars,
    {
      y: 0,
    },
    {
      y: -200,
      stagger: 0.1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: "#bannerText",
        start: "top 90%",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
      },
    }
  );
};
