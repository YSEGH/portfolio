/* import gsap from "gsap";

type Position = {
  x: number;
  y: number;
};

type Lerping = {
  x: { current: number; target: number };
  y: { current: number; target: number };
};

export default class ButtonMagneticHandler {
  private cursorSize: number = 48;
  private cursor: HTMLDivElement | null;
  private focusedButton: HTMLDivElement | null = null;
  private focusedButtonPos: DOMRect | null = null;
  private triggerArea: number;
  private targetHolder: Position = { x: 0, y: 0 };
  private lerpingData: Lerping = {
    x: { current: 0, target: 0 },
    y: { current: 0, target: 0 },
  };
  private interpolationFactor: number = 0.8;
  private buttonList: NodeListOf<HTMLDivElement>;

  constructor(cursorId: string) {
    this.cursor = document.querySelector(cursorId);
    this.buttonList = document.querySelectorAll(".button__magnetic");
    this.triggerArea = 150;
  }

  public update = (mouseX: number, mouseY: number) => {
    const focusedButton = this.getFocusedButton(mouseX, mouseY);
    if (focusedButton) {
      this.handleFocusedButton(focusedButton, mouseX, mouseY);
    } else {
      this.handleUnfocusedButton(mouseX, mouseY);
    }
  };

  private handleFocusedButton = (
    focusedButton: HTMLDivElement,
    mouseX: number,
    mouseY: number
  ) => {
    this.updateCursorPositionOnButton(focusedButton);
    this.updateButtonPosition(mouseX, mouseY);

    if (this.focusedButton?.id === focusedButton.id) return;

    this.resetButtonPosition();
    this.removeFocusClass();

    this.focusedButton = focusedButton;
    this.updateMouseScale();
    this.setFocusClass();
  };

  private handleUnfocusedButton = (mouseX: number, mouseY: number) => {
    if (this.focusedButton) {
      this.removeFocusClass();
      this.resetMouseScale();
    }

    this.resetButtonPosition();
    this.focusedButton = null;
    this.updateCursorPosition(mouseX, mouseY);
  };

  private setFocusClass = () => {
    this.focusedButton?.classList.add("focus");
  };

  private removeFocusClass = () => {
    this.focusedButton?.classList.remove("focus");
  };

  private updateMouseScale = () => {
    if (this.focusedButton && this.cursor) {
      const scaleX =
        this.focusedButton.getBoundingClientRect().width /
        this.cursor?.getBoundingClientRect().width;

      this.animateCursor("--scale", scaleX, 0.3, "sine.out");
    }
  };

  private resetMouseScale = () => {
    if (this.focusedButton && this.cursor) {
      this.animateCursor("--scale", 1, 0.3, "sine.out");
    }
  };

  private resetButtonPosition = () => {
    if (this.focusedButton && this.lerpingData) {
      this.targetHolder = { x: 0, y: 0 };
      this.setLerpingDataTarget(this.targetHolder.x, this.targetHolder.y);

      this.animateButtonPosition(
        this.focusedButton,
        "--x",
        this.lerpingData.x.current,
        0.6,
        "sine.out"
      );

      this.animateButtonPosition(
        this.focusedButton,
        "--y",
        this.lerpingData.y.current,
        0.6,
        "sine.out"
      );
    }
  };

  private updateButtonPosition = (mouseX: number, mouseY: number) => {
    if (this.focusedButton && this.focusedButtonPos) {
      this.targetHolder.x =
        (mouseX -
          (this.focusedButtonPos.left + this.focusedButtonPos.width / 2)) *
        0.2;
      this.targetHolder.y =
        (mouseY -
          (this.focusedButtonPos.top + this.focusedButtonPos.height / 2)) *
        0.2;

      this.setLerpingDataTarget(this.targetHolder.x, this.targetHolder.y);

      this.animateButtonPosition(
        this.focusedButton,
        "--x",
        this.lerpingData.x.current,
        0.6,
        "sine.out"
      );

      this.animateButtonPosition(
        this.focusedButton,
        "--y",
        this.lerpingData.y.current,
        0.6,
        "sine.out"
      );
    }
  };

  private updateCursorPosition = (mouseX: number, mouseY: number) => {
    if (this.cursor) {
      this.animateCursor(
        "--x",
        `${mouseX + this.cursor.getBoundingClientRect().width / 2}px`,
        0.6,
        "power1.out"
      );

      this.animateCursor(
        "--y",
        `${mouseY + this.cursor.getBoundingClientRect().width / 2}px`,
        0.6,
        "power1.out"
      );
    }
  };

  private updateCursorPositionOnButton = (focusedButton: HTMLDivElement) => {
    if (this.cursor) {
      const scaleX =
        focusedButton.getBoundingClientRect().width / this.cursorSize / 10;

      this.focusedButtonPos = focusedButton.getBoundingClientRect();
      const buttonX =
        this.focusedButtonPos.left + this.focusedButtonPos.width / 2;
      const buttonY =
        this.focusedButtonPos.top + this.focusedButtonPos.height / 2;

      const cursorX =
        buttonX - (this.cursor.getBoundingClientRect().width * scaleX) / 2;
      const cursorY =
        buttonY - (this.cursor.getBoundingClientRect().height * scaleX) / 2;

      this.animateCursor("--x", `${cursorX}px`, 0.6, "power1.out");
      this.animateCursor("--y", `${cursorY}px`, 0.6, "power1.out");
    }
  };

  private getFocusedButton = (mouseX: number, mouseY: number) => {
    return Array.from(this.buttonList).find((button: HTMLDivElement) => {
      const buttonRect = button.getBoundingClientRect();
      const buttonX = buttonRect.left + buttonRect.width / 2;
      const buttonY = buttonRect.top + buttonRect.height / 2;
      const distanceFromMouseToCenter = this.calculateDistance(
        mouseX,
        mouseY,
        buttonX,
        buttonY
      );
      return distanceFromMouseToCenter < this.triggerArea;
    });
  };

  private setLerpingDataTarget = (x: number, y: number) => {
    this.lerpingData.x.target = x;
    this.lerpingData.y.target = y;
  };

  private animateCursor = (
    property: string,
    value: string | number,
    duration: number,
    ease: string
  ) => {
    gsap.to(this.cursor, {
      background: property === "--x" ? "green" : "red", // Adjust background based on x or y animation
      [property]: value,
      ease: ease,
      duration: duration,
    });
  };

  private animateButtonPosition = (
    button: HTMLDivElement,
    property: string,
    value: number,
    duration: number,
    ease: string
  ) => {
    gsap.to(button, {
      [property]: `${value}px`,
      ease: ease,
      duration: duration,
    });
  };

  private calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    return Math.hypot(x1 - x2, y1 - y2);
  };
} */

import gsap from "gsap";

type Position = {
  x: number;
  y: number;
};

type Lerping = {
  x: { current: number; target: number };
  y: { current: number; target: number };
};

export default class ButtonMagneticHandler {
  private cursorTop: number = 0;
  private cursorSize: number = 48;
  private cursor: HTMLDivElement | null;
  private focusedButton: HTMLDivElement | null = null;
  private triggerArea: number;
  private targetHolder: Position | any;
  private lerpingData: Lerping | any;
  private interpolationFactor: number = 0.8;
  private buttonList: NodeListOf<any>;

  constructor(cursorId: string) {
    window.addEventListener("scroll", this.onScrollHandler);
    this.cursor = document.querySelector(cursorId);
    this.buttonList = document.querySelectorAll(".button__magnetic");
    this.triggerArea = 150;
    this.targetHolder = { x: 0, y: 0 };
    this.lerpingData = {
      x: { current: 0, target: 0 },
      y: { current: 0, target: 0 },
    };
  }

  private onScrollHandler = (e: Event) => {
    let cursorY = window.scrollY + this.cursorTop;
    gsap.to(this.cursor, {
      background: "red",
      "--y": `${cursorY}px`,
      ease: "power1.out",
      duration: 0.6,
    });
  };

  public update = (mouseX: number, mouseY: number) => {
    let focusedButton = this.getFocusedButton(mouseX, mouseY) as HTMLDivElement;
    if (focusedButton) {
      this.updateCursorPositionOnButton(focusedButton);
      this.updateButtonPosition(mouseX, mouseY);

      if (this.focusedButton?.id === focusedButton.id) return;
      this.focusedButton = focusedButton;
      this.resetButtonPosition();
      this.removeFocusClass();
      this.updateMouseScale();
      this.setFocusClass();
      return;
    }
    if (this.focusedButton) {
      this.removeFocusClass();
      this.resetMouseScale();
    }
    this.resetButtonPosition();
    this.focusedButton = null;
    this.updateCursorPosition(mouseX, mouseY);
  };

  private updateCursorPosition = (mouseX: number, mouseY: number) => {
    if (this.cursor) {
      gsap.to(this.cursor, {
        background: "red",
        "--x": `${mouseX}px`,
        "--y": `${mouseY}px`,
        ease: "power1.out",
        duration: 0.6,
      });
      this.cursorTop = this.cursor.getBoundingClientRect().top;
    }
  };

  private updateCursorPositionOnButton = (el: HTMLElement) => {
    if (this.cursor) {
      let buttonRect = el.getBoundingClientRect();
      const scale = el.offsetWidth / this.cursorSize;
      const buttonX = buttonRect.left + el.offsetWidth / 2;
      const buttonY = buttonRect.top + el.offsetHeight / 2;

      // Ajustez les coordonnées du curseur en fonction de sa taille
      const cursorX = buttonX - el.offsetWidth / scale / 2 + window.scrollX;
      const cursorY = buttonY - el.offsetWidth / scale / 2 + window.scrollY;

      gsap.to(this.cursor, {
        background: "green",
        "--x": `${cursorX}px`,
        "--y": `${cursorY}px`,
        ease: "power1.out",
        duration: 0.6,
      });
      this.cursorTop = this.cursor.getBoundingClientRect().top;
    }
  };

  private setFocusClass = () => {
    this.focusedButton?.classList.add("focus");
  };

  private removeFocusClass = () => {
    this.focusedButton?.classList.remove("focus");
  };

  private updateMouseScale = () => {
    if (this.focusedButton && this.cursor) {
      const scaleX = this.focusedButton.offsetWidth / this.cursorSize;

      gsap.to(this.cursor, {
        "--scale": scaleX,
        duration: 0.3,
        ease: "sine.out",
      });
    }
  };

  private resetMouseScale = () => {
    if (this.focusedButton && this.cursor) {
      gsap.to(this.cursor, {
        "--scale": 1,
        duration: 0.1,
        ease: "sine.out",
      });
    }
  };

  private resetButtonPosition = () => {
    if (this.focusedButton && this.targetHolder && this.lerpingData) {
      this.targetHolder = { x: 0, y: 0 };
      this.lerpingData.x.target = this.targetHolder.x;
      this.lerpingData.y.target = this.targetHolder.y;

      for (const item in this.lerpingData) {
        this.lerpingData[item].current = this.lerp(
          this.lerpingData[item].current,
          this.lerpingData[item].target,
          this.interpolationFactor
        );
      }
      gsap.to(this.focusedButton, {
        "--x": `${this.lerpingData.x.current}px`,
        "--y": `${this.lerpingData.y.current}px`,
        duration: 0.6,
        ease: "sine.out",
      });
    }
  };

  private updateButtonPosition = (mouseX: number, mouseY: number) => {
    if (this.focusedButton) {
      this.targetHolder.x =
        (mouseX -
          (this.focusedButton.offsetLeft +
            this.focusedButton.offsetWidth / 2)) *
        0.2;
      this.targetHolder.y =
        (mouseY -
          (this.focusedButton.offsetTop +
            this.focusedButton.offsetHeight / 2)) *
        0.2;
      this.lerpingData.x.target = this.targetHolder.x;
      this.lerpingData.y.target = this.targetHolder.y;

      for (const item in this.lerpingData) {
        this.lerpingData[item].current = this.lerp(
          this.lerpingData[item].current,
          this.lerpingData[item].target,
          this.interpolationFactor
        );
      }
      gsap.to(this.focusedButton, {
        "--x": `${this.lerpingData.x.current}px`,
        "--y": `${this.lerpingData.y.current}px`,
        duration: 0.6,
        ease: "sine.out",
      });
    }
  };

  private getFocusedButton = (mouseX: number, mouseY: number) => {
    const focusedButton = Array.from(this.buttonList).find(
      (button: HTMLButtonElement) => {
        const buttonX = button.offsetLeft + button.offsetWidth / 2;
        const buttonY = button.offsetTop + button.offsetHeight / 2;
        const distanceFromMouseToCenter = this.calculateDistance(
          mouseX,
          mouseY,
          buttonX,
          buttonY
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
