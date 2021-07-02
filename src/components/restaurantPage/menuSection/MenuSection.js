import React, { useState } from "react";
import IconContainer from "../../common/iconContainer/IconContainer";
import SearchIcon from "@material-ui/icons/Search";
import "./MenuSection.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

function MenuSection() {
  const [openOrderBar, setOpenOrderBar] = useState(false);

  return (
    <div class="rfow-restaurant-menu section-padding">
      <div className="rfow-restaurant-menu-search">
        <IconContainer icon={<SearchIcon />} fontSizeClass="icon-medium" />
        <input class="rfow-search" type="text" placeholder="Chicken Momo" />
      </div>
      <div className="rfow-restaurant-menu-list">
        <div id="momo" className="rfow-restaurant-menu-title">
          <h3 className="fw-500 text-red">Momo</h3>
        </div>
        <div className="rfow-restaurant-menu-items">
          <div className="rfow-restaurant-menu-item u-line">
            <div className="rfow-restaurant-menu-item-top-bar">
              <span className="text-medium text-black-white">Chicken Momo</span>
              <div className="rfow-food-order">
                <span className="text-medium text-black-white">Rs 300.</span>
                <IconContainer
                  icon={<AddCircleOutlineIcon />}
                  colorClass="text-green"
                  fontSizeClass="icon-small"
                />
              </div>
            </div>
            <div className="rfow-restaurant-menu-item-bottom-bar">
              {openOrderBar ? <input type="text" /> : ""}
            </div>
          </div>
          <div className="rfow-restaurant-menu-item u-line">
            <div className="rfow-restaurant-menu-item-top-bar">
              <span className="text-medium text-black-white">Buff Momo</span>
              <div className="rfow-food-order">
                <span className="text-medium text-black-white">Rs 300.</span>
                <IconContainer
                  icon={<AddCircleOutlineIcon />}
                  colorClass="text-green"
                  fontSizeClass="icon-small"
                />
              </div>
            </div>
            <div className="rfow-restaurant-menu-item-bottom-bar">
              {openOrderBar ? <input type="text" /> : ""}
            </div>
          </div>
          <div className="rfow-restaurant-menu-item u-line">
            <div className="rfow-restaurant-menu-item-top-bar">
              <span className="text-medium text-black-white">Mutton Momo</span>
              <div className="rfow-food-order">
                <span className="text-medium text-black-white">Rs 300.</span>
                <IconContainer
                  icon={<AddCircleOutlineIcon />}
                  colorClass="text-green"
                  fontSizeClass="icon-small"
                />
              </div>
            </div>
            <div className="rfow-restaurant-menu-item-bottom-bar">
              {openOrderBar ? <input type="text" /> : ""}
            </div>
          </div>
          <div className="rfow-restaurant-menu-item u-line">
            <div className="rfow-restaurant-menu-item-top-bar">
              <span className="text-medium text-black-white">Veg Momo</span>
              <div className="rfow-food-order">
                <span className="text-medium text-black-white">Rs 300.</span>
                <IconContainer
                  icon={<AddCircleOutlineIcon />}
                  colorClass="text-green"
                  fontSizeClass="icon-small"
                />
              </div>
            </div>
            <div className="rfow-restaurant-menu-item-bottom-bar">
              {openOrderBar ? <input type="text" /> : ""}
            </div>
          </div>
        </div>
      </div>
      <div className="rfow-restaurant-menu-list">
        <div id="chicken" className="rfow-restaurant-menu-title">
          <h3 className="fw-500 text-red">Chicken</h3>
        </div>
        <div className="rfow-restaurant-menu-items">
          <div className="rfow-restaurant-menu-item u-line">
            <div className="rfow-restaurant-menu-item-top-bar">
              <span className="text-medium text-black-white">Chicken Momo</span>
              <div className="rfow-food-order">
                <span className="text-medium text-black-white">Rs 300.</span>
                <IconContainer
                  icon={<AddCircleOutlineIcon />}
                  colorClass="text-green"
                  fontSizeClass="icon-small"
                />
              </div>
            </div>
            <div className="rfow-restaurant-menu-item-bottom-bar">
              {openOrderBar ? <input type="text" /> : ""}
            </div>
          </div>
          <div className="rfow-restaurant-menu-item u-line">
            <div className="rfow-restaurant-menu-item-top-bar">
              <span className="text-medium text-black-white">Buff Momo</span>
              <div className="rfow-food-order">
                <span className="text-medium text-black-white">Rs 300.</span>
                <IconContainer
                  icon={<AddCircleOutlineIcon />}
                  colorClass="text-green"
                  fontSizeClass="icon-small"
                />
              </div>
            </div>
            <div className="rfow-restaurant-menu-item-bottom-bar">
              {openOrderBar ? <input type="text" /> : ""}
            </div>
          </div>
          <div className="rfow-restaurant-menu-item u-line">
            <div className="rfow-restaurant-menu-item-top-bar">
              <span className="text-medium text-black-white">Mutton Momo</span>
              <div className="rfow-food-order">
                <span className="text-medium text-black-white">Rs 300.</span>
                <IconContainer
                  icon={<AddCircleOutlineIcon />}
                  colorClass="text-green"
                  fontSizeClass="icon-small"
                />
              </div>
            </div>
            <div className="rfow-restaurant-menu-item-bottom-bar">
              {openOrderBar ? <input type="text" /> : ""}
            </div>
          </div>
          <div className="rfow-restaurant-menu-item u-line">
            <div
              className="rfow-restaurant-menu-item-top-bar"
              onClick={() => setOpenOrderBar(!openOrderBar)}
            >
              <span className="text-medium text-black-white">Veg Momo</span>
              <div className="rfow-food-order">
                <span className="text-medium text-black-white">Rs 300.</span>
                <IconContainer
                  icon={<AddCircleOutlineIcon />}
                  colorClass="text-green"
                  fontSizeClass="icon-small"
                />
              </div>
            </div>
            <div className="rfow-restaurant-menu-item-bottom-bar">
              {openOrderBar ? <input type="text" /> : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuSection;
