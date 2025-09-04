/* eslint-disable max-len */
import { chakra, IconProps } from "@chakra-ui/react";
import React from "react";

export const Search = React.forwardRef((props, ref) => (
  <chakra.svg
    viewBox="0 0 18 18"
    xmlns="https://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      fill="white"
      fillRule="evenodd"
      d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
      stroke="#909090"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M13.9995 14.0005L11.1328 11.1338"
      stroke="#909090"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipRule="evenodd"
    />
  </chakra.svg>
));

export const Stars = React.forwardRef((props, ref) => (
  <chakra.svg
    ref={ref}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
  </chakra.svg>
));

export const UserIcon = React.forwardRef(({ size, ...props }, ref) => (
  <chakra.svg
    ref={ref}
    viewBox="0 0 448 512"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    aria-hidden="true"
    focusable="false"
    boxSize={size}
    {...props}
  >
    <path d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z" />
  </chakra.svg>
));

export const PaymentIcon = React.forwardRef(({ size, ...props }, ref) => (
  <chakra.svg
    ref={ref}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    aria-hidden="true"
    focusable="false"
    boxSize={size}
    {...props}
  >
    <path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4H3V6h18v2zm0 10H3v-6h18v6z" />
  </chakra.svg>
));

export const CardGiftIcon = React.forwardRef(({ size, ...props }, ref) => (
  <chakra.svg
    ref={ref}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    aria-hidden="true"
    focusable="false"
    boxSize={size}
    {...props}
  >
    <path d="M8 20.01367a1 1 0 0 0-1 1 1 1 0 0 0 1 1h8a1 1 0 0 0 1-1 1 1 0 0 0-1-1z" />
    <path d="M10 17.01367a1 1 0 0 0-1 1 1 1 0 0 0 1 1h6a1 1 0 0 0 1-1 1 1 0 0 0-1-1z" />
    <path d="M13 14.01367a1 1 0 0 0-1 1 1 1 0 0 0 1 1h3a1 1 0 0 0 1-1 1 1 0 0 0-1-1z" />
    <path d="M8.888672 8.01953a1 1 0 0 0-.595703.28711L6.5 10.09961l-.792969-.79297a1 1 0 0 0-1.414062 0 1 1 0 0 0 0 1.41406l1.5 1.5a1.0001 1.0001 0 0 0 1.414062 0l2.5-2.5a1 1 0 0 0 0-1.41406 1 1 0 0 0-.818359-.28711z" />
    <path d="M7 4.01367c-3.301857 0-6 2.69815-6 6 0 1.76801.774349 3.36262 2 4.46289v11.53711a1.0001 1.0001 0 0 0 1 1h2.173828c.415693 1.16039 1.530816 2 2.826172 2s2.410479-.83961 2.826172-2H19h2.173828c.415693 1.16039 1.530816 2 2.826172 2s2.410479-.83961 2.826172-2H30a1.0001 1.0001 0 0 0 1-1v-7a1.0001 1.0001 0 0 0-.21875-.625l-4-5A1.0001 1.0001 0 0 0 26 13.01367h-6v-2a1.0001 1.0001 0 0 0-1-1h-6c0-3.30185-2.698143-6-6-6zm0 2c2.220979 0 4 1.77902 4 4s-1.779021 4-4 4c-.84757 0-1.630859-.25926-2.275391-.70312a1 1 0 0 0-.267578-.20117C3.565547 12.37778 3 11.26595 3 10.01367c0-2.22098 1.779021-4 4-4zm5.654297 6H18v13h-6.173828c-.415693-1.16039-1.530816-2-2.826172-2s-2.410479.83961-2.826172 2H5v-9.3457c.626269.22297 1.29935.3457 2 .3457 2.601207 0 4.826496-1.67494 5.654297-4zm7.345703 3h2v5a1.0001 1.0001 0 0 0 1 1h6v4h-2.173828c-.415693-1.16039-1.530816-2-2.826172-2s-2.410479.83961-2.826172 2H20zm4 0h1.519531l3.199219 4H24zm-15 10c.564128 0 1 .43587 1 1s-.435872 1-1 1-1-.43587-1-1 .435872-1 1-1zm15 0c.564128 0 1 .43587 1 1s-.435872 1-1 1-1-.43587-1-1 .435872-1 1-1z" />
  </chakra.svg>
));

export const AssignmentIcon = React.forwardRef(({ size, ...props }, ref) => (
  <chakra.svg
    ref={ref}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    aria-hidden="true"
    focusable="false"
    boxSize={size}
    {...props}
  >
    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 14H7v-2h10v2zm0-4H7v-2h10v2z" />
  </chakra.svg>
));

export const AppsIcon = React.forwardRef(({ size, ...props }, ref) => (
  <chakra.svg
    ref={ref}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    aria-hidden="true"
    focusable="false"
    boxSize={size}
    {...props}
  >
    <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
  </chakra.svg>
));

export const SupportAgentIcon = React.forwardRef(({ size, ...props }, ref) => (
  <chakra.svg
    ref={ref}
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    aria-hidden="true"
    focusable="false"
    boxSize={size}
    {...props}
  >
    <path d="M379.734355,174.506667 C373.121022,106.666667 333.014355,-2.13162821e-14 209.067688,-2.13162821e-14 C85.1210217,-2.13162821e-14 45.014355,106.666667 38.4010217,174.506667 C15.2012632,183.311569 -0.101643453,205.585799 0.000508304259,230.4 L0.000508304259,260.266667 C0.000508304259,293.256475 26.7445463,320 59.734355,320 C92.7241638,320 119.467688,293.256475 119.467688,260.266667 L119.467688,230.4 C119.360431,206.121456 104.619564,184.304973 82.134355,175.146667 C86.4010217,135.893333 107.307688,42.6666667 209.067688,42.6666667 C310.827688,42.6666667 331.521022,135.893333 335.787688,175.146667 C313.347976,184.324806 298.68156,206.155851 298.667688,230.4 L298.667688,260.266667 C298.760356,283.199651 311.928618,304.070103 332.587688,314.026667 C323.627688,330.88 300.801022,353.706667 244.694355,360.533333 C233.478863,343.50282 211.780225,336.789048 192.906491,344.509658 C174.032757,352.230268 163.260418,372.226826 167.196286,392.235189 C171.132153,412.243552 188.675885,426.666667 209.067688,426.666667 C225.181549,426.577424 239.870491,417.417465 247.041022,402.986667 C338.561022,392.533333 367.787688,345.386667 376.961022,317.653333 C401.778455,309.61433 418.468885,286.351502 418.134355,260.266667 L418.134355,230.4 C418.23702,205.585799 402.934114,183.311569 379.734355,174.506667 Z M76.8010217,260.266667 C76.8010217,269.692326 69.1600148,277.333333 59.734355,277.333333 C50.3086953,277.333333 42.6676884,269.692326 42.6676884,260.266667 L42.6676884,230.4 C42.6676884,224.302667 45.9205765,218.668499 51.2010216,215.619833 C56.4814667,212.571166 62.9872434,212.571166 68.2676885,215.619833 C73.5481336,218.668499 76.8010217,224.302667 76.8010217,230.4 L76.8010217,260.266667 Z M341.334355,230.4 C341.334355,220.97434 348.975362,213.333333 358.401022,213.333333 C367.826681,213.333333 375.467688,220.97434 375.467688,230.4 L375.467688,260.266667 C375.467688,269.692326 367.826681,277.333333 358.401022,277.333333 C348.975362,277.333333 341.334355,269.692326 341.334355,260.266667 L341.334355,230.4 Z" />
  </chakra.svg>
));

export const AccountCircleIcon = React.forwardRef(({ size, ...props }, ref) => (
  <chakra.svg
    ref={ref}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    aria-hidden="true"
    focusable="false"
    boxSize={size}
    {...props}
  >
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </chakra.svg>
));

Search.displayName = "Search";
Stars.displayName = "Stars";
UserIcon.displayName = "UserIcon";
PaymentIcon.displayName = "PaymentIcon";
CardGiftIcon.displayName = "CardGiftIcon";
AssignmentIcon.displayName = "AssignmentIcon";
AppsIcon.displayName = "AppsIcon";
SupportAgentIcon.displayName = "SupportAgentIcon";
AccountCircleIcon.displayName = "AccountCircleIcon";
