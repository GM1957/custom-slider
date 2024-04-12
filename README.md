# React Slider Component

This is a customizable slider component built using React. It allows users to select a value within a specified range by dragging a circle along a track or by clicking on individual steps.

## Installation

You can check the component using pnpm:

```bash
pnpm install
```

run the app

```bash
pnpm dev
```

## Tradeoffs

Initially, I created this component using useState and encountered several issues such as re-rendering and improper mouse movements. These issues have been resolved in this version. Now, I am utilizing refs instead of states and employing event listeners to track mouse movements. The greatest challenge I faced during its development was achieving proper positioning of the circle handler. This was resolved by adjusting the position of the circle using calculated ratios.   

## Usage

```javascript
import React from "react";
import Slider from "@/components";

import React from "react";
import { Slider } from "@your-package-name/slider";

const MyComponent = () => {
  // Define callback functions for event handling
  const handleCircleClick = () => {
    // Logic for handling circle click event
  };

  const handleStepClick = (stepIndex) => {
    // Logic for handling step click event
  };

  const handleValueChange = (newValue) => {
    // Logic for handling value change event
  };

  return (
    <Slider
      steps={50} // Total steps in the slider
      value={20} // Initial value of the slider
      min={20} // Minimum value of the slider
      max={35} // Maximum value of the slider
      activeTrackClass="active-step" // CSS class for active track
      circleClass="custom-circle" // CSS class for circle handle
      trackClass="custom-track" // CSS class for slider track
      wrapperClass="custom-wrapper" // CSS class for slider wrapper
      onCircleClick={handleCircleClick} // Callback function for circle click event
      onStepClick={handleStepClick} // Callback function for step click event
      onValueChange={handleValueChange} // Callback function for value change event
    />
  );
};

export default MyComponent;
```

## Props

- **steps**: (Optional) The number of steps in the slider. Default is 30.
- **value**: (Optional) The initial value of the slider. Default is 15.
- **min**: (Optional) The minimum value of the slider.
- **max**: (Optional) The maximum value of the slider.
- **circleClass**: (Optional) Additional class name for the circle element.
- **trackClass**: (Optional) Additional class name for the track element.
- **activeTrackClass**: (Optional) Additional class name for the active track element.
- **onCircleClick**: (Optional) Callback function triggered when the circle is clicked. Receives the current value as an argument.
- **onStepClick**: (Optional) Callback function triggered when a step is clicked. Receives the step index as an argument.
- **wrapperClass**: (Optional) wrapperClass is used to add classes to the wrapper of slider component.
- **onValueChange**: (Optional) Callback function triggered when value is changing.

## Styling

You can customize the appearance of the slider by sending the class names throuh prop.
