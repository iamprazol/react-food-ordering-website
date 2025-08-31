import { useEffect, useState } from "react";
import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import Banner from "../../widgets/banner/Banner";
import RestaurantDetails from "../../features/restaurants/components/restaurant-page/RestaurantDetails";
import MenuLayout from "../../features/restaurants/components/restaurant-page/menu/MenuLayout";
import ReviewsSection from "../../features/restaurants/components/restaurant-page/reviews/ReviewsSection";
import LocationSection from "../../features/restaurants/components/restaurant-page/location/LocationSection";
import TopLayout from "../../shared/ui/TopLayout";
import ErrorFallback from "../../shared/ui/ErrorFallback";

function RestaurantLayoutBody() {
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { REACT_APP_API_URL } = process.env;
  const { restaurantId } = useParams();

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    fetch(`${REACT_APP_API_URL}/restaurant/${restaurantId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        if (data?.data?.length > 0) {
          setRestaurantDetails(data.data[0]);
        } else {
          setRestaurantDetails(null);
        }
      })
      .catch(() => {
        if (mounted) setRestaurantDetails(null);
      })
      .finally(() => mounted && setIsLoading(false));
    return () => {
      mounted = false;
    };
  }, [REACT_APP_API_URL, restaurantId]);

  return (
    <Box>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Banner
          bannerImage={restaurantDetails?.cover_pic || ""}
          bannerHeight="medium"
        />
      </ErrorBoundary>

      {isLoading ? (
        <Box px={{ base: 4, md: 8 }} py={6}>
          <Skeleton height="28px" mb={3} />
          <SkeletonText noOfLines={3} spacing="3" />
        </Box>
      ) : restaurantDetails ? (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
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
        </ErrorBoundary>
      ) : (
        <Box px={{ base: 4, md: 8 }} py={6}>
          <ErrorFallback error={{ message: "Restaurant not found." }} />
        </Box>
      )}

      <Box px={{ base: 4, md: 8 }} py={4}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <MenuLayout restaurantId={restaurantId} />
        </ErrorBoundary>
      </Box>

      <Box px={{ base: 4, md: 8 }} py={4}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <LocationSection
            latitude={restaurantDetails?.latitude || ""}
            longitude={restaurantDetails?.longitude || ""}
          />
        </ErrorBoundary>
      </Box>

      <Box px={{ base: 4, md: 8 }} py={4}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ReviewsSection restaurantId={restaurantId} />
        </ErrorBoundary>
      </Box>
    </Box>
  );
}

const RestaurantLayout = () => {
  return <TopLayout element={<RestaurantLayoutBody />} />;
};

export default RestaurantLayout;
