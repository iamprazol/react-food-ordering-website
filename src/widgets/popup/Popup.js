import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

const Popup = ({ content, onClick, popupClass }) => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const handleClose = () => {
    onClose();
    if (onClick) onClick(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered size="3xl">
      <ModalOverlay />
      <ModalContent className={popupClass}>
        <ModalCloseButton />
        <ModalBody>{content}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Popup;
