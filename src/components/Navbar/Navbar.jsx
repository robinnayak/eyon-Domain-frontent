import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faInfoCircle,
  faTags,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  // State to track menu visibility
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when a link is clicked
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-gray-800">
          GoDaddyTestDomainApi
        </NavLink>

        {/* Hamburger Menu for Mobile */}
        <button
          className="block md:hidden text-gray-800 focus:outline-none"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
        </button>

        {/* Links (desktop view) */}
        <div className="hidden md:flex flex-row md:items-center space-y-0 md:space-x-6">
          <NavLink
            to="/"
            className="flex items-center text-gray-700 hover:text-yellow-500 font-medium"
           
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
          </NavLink>
          <NavLink
            to="/about"
            className="flex items-center text-gray-700 hover:text-yellow-500 font-medium"
          >
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> About
          </NavLink>
          <NavLink
            to="/pricing"
            className="flex items-center text-gray-700 hover:text-yellow-500 font-medium"
          >
            <FontAwesomeIcon icon={faTags} className="mr-2" /> Pricing
          </NavLink>
          <NavLink
            to="/contact"
            className="flex items-center text-gray-700 hover:text-yellow-500 font-medium"
          >
            <FontAwesomeIcon icon={faPhone} className="mr-2" /> Contact
          </NavLink>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      <div className={`md:hidden px-4 ${menuOpen ? "block" : "hidden"}`}>
        <div className="space-y-4">
          <NavLink
            to="/"
            className="flex items-center text-gray-700 hover:text-yellow-500 font-medium"
            onClick={closeMenu}
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
          </NavLink>
          <NavLink
            to="/about"
            className="flex items-center text-gray-700 hover:text-yellow-500 font-medium"
            onClick={closeMenu}
          >
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> About
          </NavLink>
          <NavLink
            to="/pricing"
            className="flex items-center text-gray-700 hover:text-yellow-500 font-medium"
            onClick={closeMenu}
          >
            <FontAwesomeIcon icon={faTags} className="mr-2" /> Pricing
          </NavLink>
          <NavLink
            to="/contact"
            className="flex items-center text-gray-700 hover:text-yellow-500 font-medium"
            onClick={closeMenu}
          >
            <FontAwesomeIcon icon={faPhone} className="mr-2" /> Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
