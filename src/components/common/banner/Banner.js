// Import Libraries.
import React from "react";

// Import SCSS.
import "./Banner.scss";

function Banner(props) {
  let { bannerImage, bannerHeight, bannerContent } = props;

  return (
    <section
      className="rfow-banner rfow-bottom-line"
      style={{
        height: `${
          "large" === bannerHeight
            ? "650px"
            : "medium" === bannerHeight
            ? "300px"
            : "150px"
        }`,
      }}
    >
      <div
        className="rfow-banner__body"
        style={
          bannerImage
            ? {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${bannerImage})`,
              }
            : { backgroundColor: `floralwhite` }
        }
      >
        {bannerContent ? bannerContent : ""}
      </div>
    </section>
  );
}

export default Banner;
