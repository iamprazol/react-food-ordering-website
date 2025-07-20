import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import NavBar from "../../common/navBar/NavBar";
import Banner from "../../common/banner/Banner";
import FooterTop from "../../common/footer/footerTop/FooterTop";
import FooterBottom from "../../common/footer/footerBottom/FooterBottom";
import RestaurantDetails from "../restaurantDetails/RestaurantDetails";
import MenuLayout from "../menuLayout/MenuLayout";

function RestaurantLayout() {
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const { REACT_APP_API_URL } = process.env;
  const { restaurantId } = useParams();

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/restaurant/${restaurantId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setRestaurantDetails(data.data[0]);
        }
      });
  }, [REACT_APP_API_URL, restaurantId]);

  return (
    <Box>
      <NavBar />
      <Banner
        bannerImage="http://localhost:8000/images/food/1624721580.jpeg"
        bannerHeight="medium"
      />
      {restaurantDetails && (
        <RestaurantDetails
          restaurantId={restaurantDetails.id}
          name={restaurantDetails.restaurant_name}
          description={restaurantDetails.description}
          deliveryHours={restaurantDetails.delivery_hours}
          minimumOrder={restaurantDetails.minimum_order}
          picture={`http://localhost:8000/images/restaurant/${restaurantDetails.picture}`}
          address={restaurantDetails.address}
          vat={restaurantDetails.vat}
          discount={restaurantDetails.discount}
          additionalCharges={restaurantDetails.additional_charges}
        />
      )}
      <MenuLayout restaurantId={restaurantId} />
      <FooterTop />
      <FooterBottom />
    </Box>
  );
}

export default RestaurantLayout;
