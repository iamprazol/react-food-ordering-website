import React from "react";
import { Button, Link } from "@chakra-ui/react";

const ButtonComponent = ({ buttonClass, buttonHref, text, onClick }) => {
  if (buttonHref) {
    return (
      <Link
        href={buttonHref}
        className={buttonClass}
        onClick={onClick}
        _hover={{ textDecoration: "none" }}
      >
        <Button as="span" variant="solid">
          {text}
        </Button>
      </Link>
    );
  }

  return (
    <Button className={buttonClass} onClick={onClick} variant="solid">
      {text}
    </Button>
  );
};

export default ButtonComponent;
