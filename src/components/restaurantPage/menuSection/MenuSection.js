import React, { useState } from "react";
import IconContainer from "../../common/iconContainer/IconContainer";
import InputHandler from "../../common/inputHandler/InputHandler";
import Buttons from "../../common/buttons/Buttons";
import Popup from "../../common/popup/Popup";
import "./MenuSection.css";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

function MenuSection(props) {
  const { menuItems } = props;
  const [openOrderBar, setOpenOrderBar] = useState(false);
  const [orderedFood, setOrderedFood] = useState([]);

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
                  onClick={() => {
                    setOpenOrderBar(!openOrderBar);
                    setOrderedFood(food);
                  }}
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
              </div>
            </div>
          ))}
        </div>
      ))}
      {openOrderBar ? (
        <Popup
          content={
            <div className="rfow-restaurant-order-food">
              <div className="rfow-restaurant-order-food-body">
                <div className="rfow-restaurant-order-food-extras u-line">
                  <h1>{orderedFood.food_name}</h1>
                </div>
                <div className="rfow-restaurant-order-food-instruction u-line">
                  <div className={`rfow-field`}>
                    <label
                      className="rfow-field-label"
                      htmlFor="special_instructions"
                    >
                      Special Instructions
                    </label>
                    <InputHandler
                      fieldSetting={{
                        type: "textarea",
                        value: "",
                        required: false,
                        placeholder: "Extra toppings on pizza",
                      }}
                    />
                  </div>
                </div>
                <div className="rfow-restaurant-order-food-quantities">
                  <div className={`rfow-field`}>
                    <IconContainer
                      icon={<AddIcon />}
                      fontSizeClass="icon-small"
                      iconPlacement="left"
                    />
                    <InputHandler
                      fieldSetting={{
                        type: "number",
                        value: "",
                        placeholder: "quantity",
                      }}
                    />
                    <IconContainer
                      icon={<RemoveIcon />}
                      fontSizeClass="icon-small"
                      iconPlacement="right"
                    />
                  </div>
                  <Buttons
                    variant="primary"
                    size="medium"
                    title={`Add To Cart | Rs ${orderedFood.price}`}
                  />
                </div>
              </div>
            </div>
          }
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default MenuSection;
