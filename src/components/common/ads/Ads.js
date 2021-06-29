import React from "react";
import Button from "../button/Button";
import "./Ads.css";

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
