// Import Libraries.
import React, { useState } from "react";

// Import SCSS.
import "./MenuSection.scss";

// Import Components.
import IconContainer from "../../common/iconContainer/IconContainer";
import InputHandler from "../../common/inputHandler/InputHandler";
import Buttons from "../../common/buttons/Buttons";
import Popup from "../../common/popup/Popup";

// Import icons.
import SearchIcon from "@material-ui/icons/Search";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

function MenuSection(props) {
  const { menuItems } = props;
  const [openOrderBar, setOpenOrderBar] = useState(false);
  const [orderedFood, setOrderedFood] = useState([]);
  const [orderedQuantity, setOrderedQuantity] = useState(1);
  const [orderHandled, setOrderHandled] = useState(true);
  const [orderList, setOrderList] = useState([]);

  const handleOrderedFood = (food) => {
    if (!orderHandled) {
      setOrderHandled(!orderHandled);

      var order = {
        restaurant_id: food.restaurant_id,
        food_id: food.id,
        quantity: orderedQuantity,
        price: food.price * orderedQuantity,
        special_instructions: document.getElementById(
          `food_${food.id}_special_instructions`
        ).value,
      };

      setOrderList([...orderList, order]);
      setOrderedQuantity(1);
    }
  };

  const handleInputValue = (value) => {
    setOrderedQuantity(value);
  };

  const handlePopupDisplay = (closePopup) => {
    if (closePopup) {
      setOrderHandled(false);
    }
  };

  return (
    <div className="rfow-menu">
      <div className="rfow-menu__search">
        <IconContainer icon={<SearchIcon />} fontSizeClass="icon-medium" />
        <input className="rfow-search" type="text" placeholder="Chicken Momo" />
      </div>
      {menuItems.map((menuItem) => (
        <div className="rfow-menu__list">
          <div
            id={menuItem.category.toLowerCase()}
            className="rfow-menu__title"
          >
            <h3 className="fw-500 text-red">{menuItem.category}</h3>
          </div>
          {menuItem.foods.map((food) => (
            <div className="rfow-menu__items">
              <div className="rfow-menu__item u-line">
                <div
                  className="rfow-menu__item--top"
                  onClick={() => {
                    setOpenOrderBar(!openOrderBar);
                    setOrderedFood(food);
                  }}
                >
                  <span className="text-medium text-black-white">
                    {food.food_name}
                  </span>
                  <div className="rfow-menu__food-list">
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
          onClick={handlePopupDisplay}
          content={
            <div className="rfow-order">
              <div className="rfow-order__body">
                <div className="rfow-order__body-extras u-line">
                  <h1>{orderedFood.food_name}</h1>
                </div>
                <div className="rfow-order__body-instruction u-line">
                  <div className={`rfow-field`}>
                    <label
                      className="rfow-field-label"
                      htmlFor={`food_${orderedFood.id}_special_instructions`}
                    >
                      Special Instructions
                    </label>
                    <InputHandler
                      fieldSetting={{
                        type: "textarea",
                        value: "",
                        required: false,
                        placeholder: "Extra toppings on pizza",
                        id: `food_${orderedFood.id}_special_instructions`,
                      }}
                    />
                  </div>
                </div>
                <div className="rfow-order__body-quantities">
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
                      onChange={handleInputValue}
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
                    title={`Add To Cart | Rs ${
                      orderedFood.price * orderedQuantity
                    }`}
                    onClick={handleOrderedFood(orderedFood)}
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
