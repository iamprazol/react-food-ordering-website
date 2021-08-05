// Import Libraries.
import React, { useState } from "react";

// Import SCSS.
import "./Popup.scss";

const Popup = (props) => {
  const [closePopup, setClosePopup] = useState(true);
  const { content, onClick, popupClass } = props;

  return (
    <div>
      {closePopup ? (
        <div className="popup">
          <div className={`popup__body ${popupClass}`}>
            <span
              className="popup__close"
              onClick={() => {
                onClick(closePopup);
                setClosePopup(!closePopup);
              }}
            >
              &times;
            </span>
            <div className="popup__card">
              <div className="popup__card-holder">{content}</div>
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
