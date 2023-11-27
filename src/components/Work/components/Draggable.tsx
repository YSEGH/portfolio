import React, {
  useRef,
  useState,
  MouseEvent,
  ReactNode,
  useEffect,
  TouchEvent,
} from "react";

interface DraggableDivProps {
  rootClass?: string;
  pauseAnimation: boolean;
  children: ReactNode;
}

const DRAG_SPEED = 0.75;

const DraggableDiv: React.FC<DraggableDivProps> = ({
  rootClass = "",
  pauseAnimation = false,
  children,
}) => {
  const ourRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const touchCoords = useRef({
    startX: 0,
    scrollLeft: 0,
  });

  const handleDragStart = (e: MouseEvent | TouchEvent) => {
    if (!ourRef.current) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;

    const slider = ourRef.current.children[0] as HTMLElement;
    const startX = clientX - slider.offsetLeft;
    const scrollLeft = slider.scrollLeft;
    touchCoords.current = { startX, scrollLeft };
    setIsMouseDown(true);
  };

  const handleDragEnd = () => {
    setIsMouseDown(false);
  };

  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (pauseAnimation || !isMouseDown || !ourRef.current) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;

    const slider = ourRef.current.children[0] as HTMLElement;
    const x = clientX - slider.offsetLeft;
    const walkX = (x - touchCoords.current.startX) * DRAG_SPEED;
    slider.scrollLeft = touchCoords.current.scrollLeft - walkX;
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchend", handleDragEnd);

    return () => {
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, []);

  return (
    <div
      ref={ourRef}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onTouchStart={handleDragStart}
      onTouchMove={handleDrag}
      className={rootClass}
      style={{ overflowX: "auto" }}
    >
      {children}
    </div>
  );
};

export default DraggableDiv;
