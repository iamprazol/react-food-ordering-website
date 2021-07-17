// Import Libraries.
import React, { useState } from "react";

// Import CSS.
import "./searchRestaurantPage.css";

// Import Components.
import RestaurantList from "../restaurantList/RestaurantList";
import Banner from "../../common/banner/Banner";
import IconContainer from "../../common/iconContainer/IconContainer";
import InputHandler from "../../common/inputHandler/InputHandler";
import Buttons from "../../common/buttons/Buttons.js";

// Import Icons.
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

function SearchRestaurantPage(props) {
  const { searchText } = props;
  const [selected, setSelected] = useState("");
  const [filterText, setFilterText] = useState("");
  const [filterParams, setFilterParams] = useState([]);

  const handleSelectedItem = (itemSelected) => {
    if (itemSelected) {
      setSelected(itemSelected);
    }
  };

  const handleFilterFinalization = () => {
    if (filterText) {
      setFilterParams([...filterParams, `${selected} : ${filterText}`]);
    }
  };

  const handleCloseFilterParam = (isClicked) => {
    if (isClicked) {
      console.log("hello");
    }
  };
  return (
    <div className="rfow-search-result-page">
      <Banner
        bannerHeight="small"
        bannerContent={
          <div className="rfow-banner-text">
            <h3 className="text-black-white">Restaurants and Stores </h3>
          </div>
        }
      />
      <div className="rfow-search-result-nav">
        <span className="text-black-white">
          {"Home "}
          <IconContainer
            icon={<ArrowForwardIosIcon />}
            fontSizeClass="icon-small"
          />
          {" Search"}
          <IconContainer
            icon={<ArrowForwardIosIcon />}
            fontSizeClass="icon-small"
          />
          {" Restaurants Found"}
        </span>
      </div>
      <div className="rfow-search-result-wrapper">
        <div className="rfow-search-result-filter-nav">
          <div className="rfow-search-result-filter-tab">
            <div className={`rfow-field`}>
              <InputHandler
                fieldSetting={{
                  type: "select",
                  value: "",
                  required: false,
                  placeholder: "Select a Filter",
                  id: `rfow_search_filter`,
                  options: {
                    name: "Restaurant",
                    food_name: "Food",
                    category: "Category",
                  },
                }}
                onChange={handleSelectedItem}
              />
            </div>
            {selected ? (
              <div className={`rfow-field`}>
                <InputHandler
                  fieldSetting={{
                    type: "text",
                    value: "",
                    required: false,
                    placeholder: "Filter Item",
                    id: `rfow_search_filter_text`,
                  }}
                  onChange={(filterValue) => {
                    setFilterText(filterValue);
                  }}
                />
                <Buttons
                  variant="primary"
                  size="small"
                  title="Done"
                  onClick={handleFilterFinalization}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          {filterParams ? (
            <div className="rfow-search-result-filter-params">
              {filterParams.map((value) => {
                return (
                  <Buttons
                    size="small"
                    variant="normal"
                    title={`${value}`}
                    close
                    onCloseClick={handleCloseFilterParam}
                  />
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="rfow-search-result">
          <RestaurantList searchText={searchText} />
        </div>
      </div>
    </div>
  );
}

export default SearchRestaurantPage;
