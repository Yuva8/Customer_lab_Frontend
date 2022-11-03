import "./App.css";
import { useState } from "react";
import Segment from "./Customerlab";
import Button from "react-bootstrap/Button";

function App() {
  const [Popup, setPopup] = useState(false);
  const openmodel = () => {
    setPopup(!Popup);
  };
  return (
    <div>
      <div>
        {Popup ? <Segment setTrigger={() => openmodel()} /> : null}
        <h2 className="heading">View Audience</h2>
        <div>
          <Button
            className="save-seg"
            onClick={() => {
              setPopup(true);
            }}
          >
            Save Segment
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
