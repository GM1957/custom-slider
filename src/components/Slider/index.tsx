import { useEffect, useRef } from "react";
import { SliderProps } from "@/types";
import "./index.css";

function Slider({
  steps = 30,
  value = 15,
  min,
  max,
  activeTrackClass,
  circleClass = "",
  trackClass = "",
  wrapperClass = "",
  onCircleClick,
  onStepClick,
  onValueChange,
}: SliderProps) {
  const circleRef: any = useRef(null);
  const lineRef: any = useRef(null);

  const onInit = (initValue: number) => {
    const boundingCircleRect = circleRef?.current?.getBoundingClientRect();
    const stepW =
      lineRef?.current?.childNodes?.[0]?.getBoundingClientRect().width || 0;

    circleRef.current.style.left =
      stepW * initValue - boundingCircleRect.width / 2 + "px";

    for (let i = 0; i <= steps; i++) {
      if (i < initValue) {
        lineRef?.current?.childNodes?.[i]?.classList.add(
          activeTrackClass || "active-step"
        );
      } else {
        lineRef?.current?.childNodes?.[i]?.classList.remove(
          activeTrackClass || "active-step"
        );
      }
    }
  };

  useEffect(() => {
    onInit(value);
  }, [value]);

  const getCurrentValue = () => {
    const boundingCircleRect = circleRef?.current?.getBoundingClientRect();
    let currentVal = 0;

    const centerXCircle =
      boundingCircleRect.left + boundingCircleRect.width / 2;

    lineRef?.current?.childNodes?.forEach((node: any, i: number) => {
      const nodeBounding = node?.getBoundingClientRect();

      if (
        centerXCircle > nodeBounding.left &&
        centerXCircle < nodeBounding.right
      ) {
        currentVal = i;
      }
    });

    return currentVal;
  };

  const onMouseDownCircleHandler = () => {
    const boundingCircleRect = circleRef?.current?.getBoundingClientRect();
    const boundingLineRect = lineRef?.current?.getBoundingClientRect();
    const stepW =
      lineRef?.current?.childNodes?.[0]?.getBoundingClientRect().width || 0;
    const lineHalfW = boundingLineRect.width / 2;

    const handleMouseMove = (e: any) => {
      let newX = e.clientX - boundingLineRect.left;
      const maxLeft = min ? min * stepW : 0;
      const maxRight = max ? max * stepW : boundingLineRect.width;

      if (newX < maxLeft) newX = maxLeft;

      if (newX > maxRight) newX = maxRight;

      if (newX > lineHalfW) {
        const ratio = (newX - lineHalfW) / lineHalfW;
        newX -= boundingCircleRect.width * ratio;
      }

      circleRef.current.style.left = newX + "px";

      lineRef?.current?.childNodes?.forEach((node: any, i: number) => {
        const nodeBounding = node?.getBoundingClientRect();

        if (nodeBounding.left < e.clientX && i <= (max || steps)) {
          lineRef.current.children[i].classList.add(
            activeTrackClass || "active-step"
          );
        }
        if ((nodeBounding.left > e.clientX && i > (min || 0)) || newX < 0) {
          lineRef.current.children[i].classList.remove(
            activeTrackClass || "active-step"
          );
        }
      });
    };

    const handleMouseLeave = () => {
      if (onValueChange) {
        onValueChange(getCurrentValue());
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseLeave);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseLeave);
  };

  return (
    <div className={`slider-wrapper ${wrapperClass}`}>
      <div
        className={`circle ${circleClass}`}
        ref={circleRef}
        onMouseDown={onMouseDownCircleHandler}
        onClick={() => {
          if (onCircleClick) {
            onCircleClick();
          }
        }}
      ></div>
      <div className={`line ${trackClass}`} ref={lineRef}>
        {[...Array(steps + 1).keys()].map((i) => (
          <div
            key={i}
            className={`step`}
            onClick={() => {
              if (onStepClick) {
                onStepClick(i);
              } else {
                onInit(i);
              }
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export { Slider };
