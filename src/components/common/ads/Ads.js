import React from "react";
import Button from "../button/Button";
import "./Ads.css";

const Ads = (props) => {
    let { adsText, image, link, buttonText } = props;

	return (
        <div className="rfb-ads-container section-margin">
            <div className="rfb-ads" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${image})` }}>
                <div className="rfb-ads-text">
                    <h3>{adsText}</h3>
                    <Button buttonClass="btn-submit btn-primary" buttonHref={link} text={buttonText} />
                </div>
            </div>
		</div>
	);
}

export default Ads;
