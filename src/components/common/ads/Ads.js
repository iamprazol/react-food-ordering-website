// Import Libraries.
import React from "react";

// Import CSS.
import "./Ads.css";

// Import Components.
import Button from "../button/Button";

const Ads = (props) => {
  let { adsText, image, link, buttonText } = props;

  return (
    <div className="rfow-ads-container section-margin">
      <div
        className="rfow-ads"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${image})`,
        }}
      >
        <div className="rfow-ads-text">
          <h3>{adsText}</h3>
          <Button
            buttonClass="btn-submit btn-primary"
            buttonHref={link}
            text={buttonText}
          />
        </div>
      </div>
    </div>
  );
};

export default Ads;
