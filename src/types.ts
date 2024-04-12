export type SliderProps = {
  steps?: number;
  value?: number;
  min?: number;
  max?: number;
  circleClass?: string;
  trackClass?: string;
  wrapperClass?: string;
  activeTrackClass?: string;
  onCircleClick?: () => void;
  onStepClick?: (stepNumber: number) => void;
  onValueChange?: (currVal: number) => void;
};
