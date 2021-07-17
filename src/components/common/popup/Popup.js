// Import Libraries.
import React, { useState } from "react";

// Import CSS.
import "./Popup.css";

const Popup = (props) => {
  const [closePopup, setClosePopup] = useState(true);
  const { content, onClick, popupClass } = props;

  return (
    <div>
      {closePopup ? (
        <div className="popup-overlay">
          <div className={`popup ${popupClass}`}>
            <span
              className="popup-close"
              onClick={() => {
                onClick(closePopup);
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
      ) : (
        ""
      )}
    </div>
  );
};

export default Popup;
