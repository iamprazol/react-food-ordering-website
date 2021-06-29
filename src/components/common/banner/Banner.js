import React from "react";
import Button from "../button/Button";
import "./Banner.css";

function Banner(props) {
  let {
    bannerImage,
    bannerHeight,
    bannerLargeText,
    bannerSmallText,
    button,
    buttonClass,
    buttonHref,
    buttonText,
  } = props;
  return (
    <section
      className="rfow-banner-container rfow-bottom-line"
      style={{ height: `${"large" === bannerHeight ? "650px" : "300px"}` }}
    >
      <div
        className="rfow-banner"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${bannerImage})`,
        }}
      >
        <div className="rfow-banner-text">
          {bannerLargeText ? ` <h1>${bannerLargeText}</h1>` : ""}
          {bannerSmallText ? ` <h3>${bannerSmallText}</h3>` : ""}
          {button
            ? `${(
                <Button
                  buttonClass={buttonClass}
                  buttonHref={buttonHref}
                  text={buttonText}
                />
              )}`
            : ""}
        </div>
      </div>
    </section>
  );
}

export default Banner;
