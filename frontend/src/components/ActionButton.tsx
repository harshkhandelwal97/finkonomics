import React from "react";
import "../styles/emptyCart.css";
import { ActionButtonProps } from "../types/types";

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  disabled,
  variant,
  onClick,
}) => (
  <button
    className={`actionButton ${variant}`} // Use class names directly
    disabled={disabled}
    onClick={onClick}
  >
    {label}
  </button>
);
