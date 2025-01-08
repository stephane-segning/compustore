'use client';

import React, { useState } from "react";
import Button from "@cps/components/button";

interface DropdownProps {
  title: string;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="dropdown">
      <Button
        className="dropdown-button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        {title} {isOpen ? "▲" : "▼"}
      </Button>
      {isOpen && <div className="dropdown-content">{children}</div>}
    </div>
  );
};

export default Dropdown;
