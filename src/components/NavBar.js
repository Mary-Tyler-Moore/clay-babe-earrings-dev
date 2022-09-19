import React from "react";
import { Link } from "gatsby";

import logo from "../img/logo.jpg";
import Cart from "./Cart";
import useSiteMetadata from "./SiteMetadata";

const items = [
  { path: "/about", label: "About" },
  { path: "/shop", label: "Products" },
  { path: "/blog", label: "Blog" },
  { path: "/faq", label: "Faq" },
  { path: "/contact", label: "Contact" },
];

const NavBar = () => {
  const [open, setOpen] = React.useState(false);
  const { title } = useSiteMetadata();

  const toogleMenu = () => setOpen(!open);

  return (
    <nav
      className={`flex items-center justify-between flex-wrap  bg-white  px-5 py-3 container ${
        open ? "shadow-md lg:border-b-0 lg:shadow-none" : ""
      }`}
    >
      <Link to={`/`} className="flex flex-row items-center mr-8">
        <img
          className="mr-4 h-12 lg:h-12 focus:outline-none "
          src={logo}
          alt={title}
        />
      </Link>

      <div className="block lg:hidden">
        <button
          onClick={toogleMenu}
          className="flex items-center px-3 py-2 text-gray-800 hover:text-gray-900 focus:outline-none"
        >
          <svg
            className={`${open ? "hidden" : "block"} block h-6 w-6`}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            className={`${open ? "block" : "hidden"} h-6 w-6`}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div
        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto  ${
          open ? "" : "hidden"
        }`}
      >
        <div className="lg:flex-grow text-center lg:text-left">
          {items.map((item) => (
            <Link
              className="block lg:inline-block mr-4 py-2 lg:mt-0 lg:py-0 text-gray-800 text-3xl lg:text-left lg:text-lg"
              to={item.path}
              key={item.path}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="text-center lg:text-left">
          <Cart />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
