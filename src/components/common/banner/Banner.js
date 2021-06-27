import React from "react";
import Button from "../button/Button";
import "./Banner.css";

function Banner() {

	return (
        <section className="rfb-banner-container rbf-bottom-line">
            <div className="rfb-banner">
                <div className="rfb-banner-text">
                    <h1>{"Order your favourite food from anywhere"}</h1>
                    <h3>{"with the largest food ordering platform all over Nepal"}</h3>
                    <Button buttonClass="btn-submit btn-primary" buttonHref="http://themegrill.me:41239/restaurants" text="Order Now" />
                </div>
            </div>
		</section>
	);
}

export default Banner;
