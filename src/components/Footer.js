import React from "react";
import { Link } from "gatsby";

// import logo from "../img/logo.jpg";
import facebook from "../img/social/facebook.svg";
import instagram from "../img/social/instagram.svg";
import twitter from "../img/social/twitter.svg";

const Footer = () => {
  return (
    <footer className="bg-trendy-brand py-5 mt-10">
      <div>
        <div className="container">
          <div className="flex flex-wrap">
            <div className="flex flex-col flex-grow">
              <ul>
                <li className="py-2">
                  <Link className="text-white" to="/">
                    Home
                  </Link>
                </li>
                <li className="py-2">
                  <Link className="text-white" to="/about">
                    About
                  </Link>
                </li>
                <li className="py-2">
                  <Link className="text-white" to="/shop">
                    Products
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col flex-grow">
              <ul>
                <li className="py-2">
                  <Link className="text-white" to="/blog">
                    Blog
                  </Link>
                </li>
                <li className="py-2">
                  <Link className="text-white" to="/contact">
                    Contact
                  </Link>
                </li>
                <li className="py-2">
                  <Link className="text-white" to="/terms">
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap m-auto items-center text-white text-center p-2">
              <a
                title="facebook"
                href="https://www.facebook.com/"
                className="flex-1 bg-white m-2 p-2 table rounded-full"
              >
                <img
                  src={facebook}
                  alt="Facebook"
                  style={{ width: "1em", height: "1em" }}
                />
              </a>
              <a
                title="twitter"
                href="https://twitter.com"
                className="flex-1 bg-white m-2 p-2 table rounded-full"
              >
                <img
                  src={twitter}
                  alt="Twitter"
                  style={{ width: "1em", height: "1em" }}
                />
              </a>
              <a
                title="instagram"
                href="https://instagram.com"
                className="flex-1 bg-white m-2 p-2 table rounded-full"
              >
                <img
                  src={instagram}
                  alt="Instagram"
                  style={{ width: "1em", height: "1em" }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col text-center text-white text-sm py-6">
        <span>@company</span>
        <span>Les Champs Elysées, Paris, France</span>
        <span>hello@example.com</span>
        <div>
          Proudly propulsed by{" "}
          <a
            target="_blank"
            href="https://www.fullstackrocket.com"
            className="text-white"
          >
            FullStack Rocket
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
