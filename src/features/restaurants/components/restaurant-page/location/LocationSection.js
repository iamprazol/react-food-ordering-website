import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useParams } from "react-router-dom";

import {
  Box,
  Flex,
  chakra,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  IconButton,
  Skeleton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

// Fix for Leaflet’s missing marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LazyImage = chakra("img", { baseStyle: { loading: "lazy" } });

function LocationSection({ latitude, longitude }) {
  const [foodImages, setFoodImages] = useState(null);
  const [loading, setLoading] = useState(true);

  const { REACT_APP_API_URL } = process.env;
  const { restaurantId } = useParams();

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/foodofrestaurant/${restaurantId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setFoodImages(data.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [REACT_APP_API_URL, restaurantId]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (img) => {
    setSelectedImage(img);
    onOpen();
  };

  return (
    <Flex
      as="section"
      py={10}
      px={{ base: 4, md: 8 }}
      maxW="7xl"
      mx="auto"
      backgroundColor="#fafafa"
      w="100%"
      gap={2}
      id="map&gallery"
      direction={{ base: "column", md: "row" }}
    >
      <Box py={6} width="70%">
        {loading ? (
          <Box height="470px" borderRadius="md" overflow="hidden">
            <Skeleton height="100%" width="100%" />
          </Box>
        ) : (
          <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            height="470px"
            width="100%"
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[latitude, longitude]}>
              <Popup>Your location</Popup>
            </Marker>
          </MapContainer>
        )}
      </Box>
      <Box py={6} width={{ base: "100%", md: "70%" }}>
        <SimpleGrid columns={[2, null, 3]} spacing={2}>
          {loading
            ? [...Array(9)].map((_, idx) => (
                <Box
                  key={idx}
                  height="150px"
                  borderRadius="md"
                  overflow="hidden"
                >
                  <Skeleton height="100%" width="100%" />
                </Box>
              ))
            : foodImages?.slice(0, 9).map((food, idx) => (
                <Box
                  key={idx}
                  cursor="pointer"
                  overflow="hidden"
                  borderRadius="md"
                  boxShadow="md"
                  onClick={() => openImage(food.picture)}
                  _hover={{ transform: "scale(1.03)", transition: "0.3s" }}
                  height="150px"
                >
                  <LazyImage
                    src={food.picture}
                    alt={food.food_name}
                    fit={"cover"}
                    height="100%"
                    width="100%"
                    objectPosition="center"
                    transition="0.3s ease"
                  />
                </Box>
              ))}
        </SimpleGrid>
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
          <ModalOverlay />
          <ModalContent bg="transparent" boxShadow="none">
            <ModalBody position="relative" p={0}>
              <IconButton
                icon={<CloseIcon />}
                onClick={onClose}
                position="absolute"
                top={2}
                right={2}
                zIndex={2}
                size="sm"
                colorScheme="blackAlpha"
                aria-label="Close image viewer"
              />
              <LazyImage
                src={selectedImage}
                alt="Selected"
                width="100%"
                maxHeight="80vh"
                objectFit="contain"
                borderRadius="md"
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
}

export default LocationSection;
