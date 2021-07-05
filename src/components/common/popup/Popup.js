import React, { useState } from "react";
import "./Popup.css";

const Popup = (props) => {
  const [closePopup, setClosePopup] = useState(true);
  const { content } = props;

  return (
    <div>
      {closePopup ? (
        <div className="popup-overlay">
          <div className="popup">
            <span
              className="popup-close"
              onClick={() => {
                setClosePopup(!closePopup);
              }}
            >
              &times;
            </span>
            <div className="popup-events">
              <div className="popup-card-holder">{content}</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Popup;
