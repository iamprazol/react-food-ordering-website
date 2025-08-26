import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import NavBar from "../../widgets/navBar/NavBar";
import Banner from "../../widgets/banner/Banner";
import FooterTop from "../../widgets/footer/footer-top/FooterTop";
import FooterBottom from "../../widgets/footer/footer-bottom/FooterBottom";
import RestaurantDetails from "../../features/restaurants/components/restaurant-page/RestaurantDetails";
import MenuLayout from "../../features/restaurants/components/restaurant-page/menu/MenuLayout";
import ReviewsSection from "../../features/restaurants/components/restaurant-page/reviews/ReviewsSection";
import LocationSection from "../../features/restaurants/components/restaurant-page/location/LocationSection";

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
        bannerImage={restaurantDetails?.cover_pic || ""}
        bannerHeight="medium"
      />
      {restaurantDetails && (
        <RestaurantDetails
          restaurantId={restaurantDetails.id}
          name={restaurantDetails.restaurant_name}
          description={restaurantDetails.description}
          deliveryHours={restaurantDetails.delivery_hours}
          minimumOrder={restaurantDetails.minimum_order}
          picture={`${restaurantDetails.picture}`}
          address={restaurantDetails.address}
          vat={restaurantDetails.vat}
          discount={restaurantDetails.discount}
          additionalCharges={restaurantDetails.additional_charges}
        />
      )}
      <MenuLayout restaurantId={restaurantId} />

      <LocationSection
        latitude={restaurantDetails?.latitude || ""}
        longitude={restaurantDetails?.longitude || ""}
      />
      <ReviewsSection restaurantId={restaurantId} />
      <FooterTop />
      <FooterBottom />
    </Box>
  );
}

export default RestaurantLayout;
