// Import Libraries.
import React from "react";

// Import SCSS.
import "./FooterTop.scss";

// Import Components.
import IconContainer from "../../iconContainer/IconContainer";

// Import Icons.
import PaymentIcon from "@material-ui/icons/Payment";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import AppsIcon from "@material-ui/icons/Apps";
import ContactSupportTwoToneIcon from "@material-ui/icons/ContactSupportTwoTone";

const FooterTop = () => {
  return (
    <section className="rfow-footer--top section-padding bg-black">
      <div className="icon-box">
        <IconContainer
          icon={<PaymentIcon />}
          colorClass="text-red"
          fontSizeClass="icon--large"
        />
        <h4 className="text-white">{"100% Payment Secured"}</h4>
      </div>
      <div className="icon-box">
        <IconContainer
          icon={<AccountBalanceIcon />}
          colorClass="text-red"
          fontSizeClass="icon--large"
        />
        <h4 className="text-white">{"Support lots of Payments"}</h4>
      </div>
      <div className="icon-box">
        <IconContainer
          icon={<ContactSupportTwoToneIcon />}
          colorClass="text-red"
          fontSizeClass="icon--large"
        />
        <h4 className="text-white">{"24 hours / 7 days Support"}</h4>
      </div>
      <div className="icon-box">
        <IconContainer
          icon={<CardGiftcardIcon />}
          colorClass="text-red"
          fontSizeClass="icon--large"
        />
        <h4 className="text-white">{"Free Delivery with Rs.5000"}</h4>
      </div>
      <div className="icon-box">
        <IconContainer
          icon={<AssignmentTurnedInOutlinedIcon />}
          colorClass="text-red"
          fontSizeClass="icon--large"
        />
        <h4 className="text-white">{"Best Price Guaranteed"}</h4>
      </div>
      <div className="icon-box">
        <IconContainer
          icon={<AppsIcon />}
          colorClass="text-red"
          fontSizeClass="icon--large"
        />
        <h4 className="text-white">{"Mobile Apps Ready"}</h4>
      </div>
    </section>
  );
};

export default FooterTop;
