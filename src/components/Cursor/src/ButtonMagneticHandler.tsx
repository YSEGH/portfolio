import gsap from "gsap";
import throttle from "lodash.throttle";

type Position = {
  x: number;
  y: number;
};

type Lerping = {
  x: { current: number; target: number };
  y: { current: number; target: number };
};

type CursorPosition = {
  client: { x: number; y: number };
  page: { x: number; y: number };
};

type FocusedButton = {
  el: HTMLElement;
  x: { current: number; target: number };
  y: { current: number; target: number };
};

export default class ButtonMagneticHandler {
  private cursorSize: number = 48;
  private cursorPosition: CursorPosition;
  private cursor: HTMLDivElement | null;
  private focusedButton: FocusedButton | null = null;
  private triggerArea: number;
  private targetHolder: Position | any;
  private lerpingData: Lerping | any;
  private interpolationFactor: number = 0.8;
  private buttonList: any;

  constructor(cursorId: string) {
    this.cursorPosition = {
      client: { x: 0, y: 0 },
      page: { x: 0, y: 0 },
    };
    this.cursor = document.querySelector(cursorId);
    this.buttonList = this.getButtonList();
    this.triggerArea = 150;
    this.targetHolder = { x: 0, y: 0 };
    this.lerpingData = {
      x: { current: 0, target: 0 },
      y: { current: 0, target: 0 },
    };
    window.addEventListener("mousemove", this.onMouseMoveHandler);
    window.addEventListener("scroll", this.onScrollHandler);
  }

  private onMouseMoveHandler = throttle((e: any) => {
    this.cursorPosition = {
      client: { x: e.clientX, y: e.clientY },
      page: { x: e.pageX, y: e.pageY },
    };
    this.update();
  }, 10);

  private onScrollHandler = throttle(() => {
    this.cursorPosition.page = {
      x: window.scrollX + this.cursorPosition.client.x,
      y: window.scrollY + this.cursorPosition.client.y,
    };
    this.update();
  }, 10);

  public update = () => {
    let focusedButton = this.searchFocusedButton() as any;

    if (focusedButton) {
      this.focusedButton = focusedButton;
      this.updateCursorPositionOnButton();
      this.updateButtonPosition();
      this.updateMouseScale();
      return;
    }
    this.resetMouseScale();
    this.resetButtonPosition();
    this.updateCursorPosition();
    this.focusedButton = null;
  };

  private updateCursorPosition = () => {
    if (this.cursor) {
      gsap.to(this.cursor, {
        "--x": `${this.cursorPosition.page.x}px`,
        "--y": `${this.cursorPosition.page.y}px`,
        ease: "power1.out",
        duration: 0.6,
      });
    }
  };

  private updateCursorPositionOnButton = () => {
    if (this.cursor && this.focusedButton) {
      const cursorX = this.focusedButton.x.current - this.cursorSize / 2;
      const cursorY = this.focusedButton.y.current - this.cursorSize / 2;

      gsap.to(this.cursor, {
        "--x": `${cursorX}px`,
        "--y": `${cursorY}px`,
        ease: "power1.out",
        duration: 0.6,
      });
    }
  };

  private resetButtonPosition = () => {
    if (this.focusedButton) {
      this.focusedButton.x.current = this.focusedButton.x.target;
      this.focusedButton.y.current = this.focusedButton.y.target;

      gsap.to(this.focusedButton.el, {
        "--x": `${0}px`,
        "--y": `${0}px`,
        duration: 0.6,
        ease: "sine.out",
      });
    }
  };

  private updateMouseScale = () => {
    if (this.focusedButton && this.cursor) {
      const scaleX = this.focusedButton.el.offsetWidth / this.cursorSize;

      gsap.to(this.cursor, {
        "--scale": scaleX,
        duration: 0.3,
        ease: "sine.out",
      });
    }
  };

  private resetMouseScale = () => {
    if (this.cursor) {
      gsap.to(this.cursor, {
        "--scale": 1,
        duration: 0.1,
        ease: "sine.out",
      });
    }
  };

  private updateButtonPosition = () => {
    if (this.focusedButton) {
      this.targetHolder.x =
        (this.cursorPosition.page.x - this.focusedButton.x.target) * 0.2;
      this.targetHolder.y =
        (this.cursorPosition.page.y - this.focusedButton.y.target) * 0.2;

      this.lerpingData.x.target = this.targetHolder.x;
      this.lerpingData.y.target = this.targetHolder.y;

      for (const item in this.lerpingData) {
        this.lerpingData[item].current = this.lerp(
          this.lerpingData[item].current,
          this.lerpingData[item].target,
          this.interpolationFactor
        );
      }

      this.focusedButton.x.current =
        this.focusedButton.x.target + this.lerpingData.x.current;

      this.focusedButton.y.current =
        this.focusedButton.y.target + this.lerpingData.y.current;

      gsap.to(this.focusedButton.el, {
        "--x": `${this.lerpingData.x.current}px`,
        "--y": `${this.lerpingData.y.current}px`,
        duration: 0.6,
        ease: "sine.out",
      });
    }
  };

  private getButtonList = () => {
    return Array.from(document.querySelectorAll(".button__magnetic")).map(
      (button: any) => {
        const buttonX =
          button.getBoundingClientRect().left + button.offsetWidth / 2;
        const buttonY =
          button.getBoundingClientRect().top + button.offsetHeight / 2;

        return {
          el: button,
          x: { target: buttonX, current: buttonX },
          y: { target: buttonY, current: buttonY },
        };
      }
    );
  };

  private searchFocusedButton = () => {
    const focusedButton: any = Array.from(this.buttonList).find(
      (button: any) => {
        const distanceFromMouseToCenter = this.calculateDistance(
          this.cursorPosition.page.x,
          this.cursorPosition.page.y,
          button.x.target,
          button.y.target
        );
        return distanceFromMouseToCenter < this.triggerArea;
      }
    );
    return focusedButton;
  };

  private lerp = (current: any, target: any, factor: any) =>
    current * (1 - factor) + target * factor;

  private calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    return Math.hypot(x1 - x2, y1 - y2);
  };
}
