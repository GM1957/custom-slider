import { Slider } from "@/components";
import "./App.css";

function App() {
  return (
    <div className="app-body">
      <h1>Custom Slider</h1>
      <div>
        <Slider
          steps={50}
          value={20}
          min={20}
          max={35}
          activeTrackClass="custom-active-step"
          circleClass="custom-circle"
          trackClass="custom-track"
          wrapperClass="custom-wrapper"
          onCircleClick={() => console.log("Circle clicked")}
          onValueChange={(value) => console.log("Value changed:", value)}
        />
      </div>
    </div>
  );
}

export default App;
