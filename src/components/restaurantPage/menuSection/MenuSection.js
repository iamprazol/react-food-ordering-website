import React, { useState } from "react";
import IconContainer from "../../common/iconContainer/IconContainer";
import InputHandler from "../../common/inputHandler/InputHandler";
import Buttons from "../../common/buttons/Buttons";
import SearchIcon from "@material-ui/icons/Search";
import "./MenuSection.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

function MenuSection(props) {
  const { menuItems } = props;
  const [openOrderBar, setOpenOrderBar] = useState(false);

  console.log(menuItems);
  return (
    <div class="rfow-restaurant-menu section-padding">
      <div className="rfow-restaurant-menu-search">
        <IconContainer icon={<SearchIcon />} fontSizeClass="icon-medium" />
        <input class="rfow-search" type="text" placeholder="Chicken Momo" />
      </div>
      {menuItems.map((menuItem) => (
        <div className="rfow-restaurant-menu-list">
          <div
            id={menuItem.category.toLowerCase()}
            className="rfow-restaurant-menu-title"
          >
            <h3 className="fw-500 text-red">{menuItem.category}</h3>
          </div>
          {menuItem.foods.map((food) => (
            <div className="rfow-restaurant-menu-items">
              <div className="rfow-restaurant-menu-item u-line">
                <div
                  className="rfow-restaurant-menu-item-top-bar"
                  onClick={() => setOpenOrderBar(!openOrderBar)}
                >
                  <span className="text-medium text-black-white">
                    {food.food_name}
                  </span>
                  <div className="rfow-food-order">
                    <span className="text-medium text-black-white">
                      Rs {food.price}.
                    </span>
                    <IconContainer
                      icon={<AddCircleOutlineIcon />}
                      colorClass="text-green"
                      fontSizeClass="icon-small"
                    />
                  </div>
                </div>
                {openOrderBar ? (
                  <div className="rfow-restaurant-menu-item-bottom-bar">
                    <div className={`rfow-field`}>
                      <InputHandler
                        fieldSetting={{
                          type: "textarea",
                          value: "",
                          required: false,
                          placeholder: "Special Instructions",
                        }}
                      />
                    </div>
                    <div className={`rfow-field`}>
                      <InputHandler
                        fieldSetting={{
                          type: "number",
                          value: "",
                          placeholder: "quantity",
                        }}
                      />
                    </div>
                    <Buttons
                      variant="primary"
                      size="medium"
                      title="Add To Cart | Rs 200"
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MenuSection;
