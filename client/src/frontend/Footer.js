import React from "react";

function Footer() {
  return (
    <div className="mx-auto py-6 container">
      <div className="lg:flex">
        <div className="w-full lg:w-2/5">
          <div className="px-4">
            <a href="/">
              <i className="mx-1 font-bold text-3xl text-purple-700 fa-newspaper fa-regular">
                <p>news</p>
              </i>
            </a>

            <p className="mt-2 max-w-sm text-gray-500 dark:text-gray-400">
              Website me i mire per informacion cilesor, te shpejte dhe te
              pavarur.
            </p>

            {/* <div className="flex mt-4">
              <a href="">
                <i className="mr-2 text-gray-600 hover:text-purple-600 dark:hover:text-blue-400 dark:text-gray-300 transition-colors duration-300 fa-brands fa-x-twitter"></i>
              </a>

              <a href="">
                <i className="mr-2 text-blue-700 hover:text-purple-500 dark:hover:text-blue-400 dark:text-gray-300 transition-colors duration-300 fa-brands fa-facebook"></i>
              </a>
              <a href="">
                <i className="text-red-600 hover:text-purple-500 dark:hover:text-blue-400 dark:text-gray-300 transition-colors duration-300 fa-brands fa-youtube"></i>
              </a>
            </div> */}
          </div>
        </div>

        <div className="lg:flex-1 mt-6 lg:mt-0 text-gray-600 text-sm dark:text-gray-400">
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-4">
            <div>
              <h3 className="font-bold text-purple-700 dark:text-white uppercase">
                MENU
              </h3>
              <a href="/" className="block mt-2 hover:text-purple-600">
                Live Stream
              </a>
              <a href="/" className="block mt-2 hover:text-purple-600">
                Subscribe
              </a>
              <a href="/login" className="block mt-2 hover:text-purple-600">
                Login
              </a>
              <a href="/" className="block mt-2 hover:text-purple-600">
                Report
              </a>
            </div>

            <div>
              <h3 className="font-bold text-purple-700 dark:text-white uppercase">
                REGION
              </h3>
              <a
                href="/category/US"
                className="block mt-2 hover:text-purple-600"
              >
                US
              </a>
              <a
                href="/category/EU"
                className="block mt-2 hover:text-purple-600"
              >
                EU
              </a>
              <a
                href="/category/Asia"
                className="block mt-2 hover:text-purple-600"
              >
                Asia
              </a>
              <a
                href="/category/Africa"
                className="block mt-2 hover:text-purple-600"
              >
                Africa
              </a>
              <a
                href="/category/Oceania"
                className="block mt-2 hover:text-purple-600"
              >
                Oceania
              </a>
            </div>

            <div>
              <h3 className="font-bold text-purple-700 dark:text-white uppercase">
                CATEGORIES
              </h3>
              <a
                href="/category/Science"
                className="block mt-2 hover:text-purple-600"
              >
                Science
              </a>
              <a
                href="/category/Entertainment"
                className="block mt-2 hover:text-purple-600"
              >
                Entertainment
              </a>
              <a
                href="/category/Finance"
                className="block mt-2 hover:text-purple-600"
              >
                Finance
              </a>
              <a
                href="/category/Sports"
                className="block mt-2 hover:text-purple-600"
              >
                Sports
              </a>
              <a
                href="/category/Politics"
                className="block mt-2 hover:text-purple-600"
              >
                Politics
              </a>
            </div>

            <div>
              <h3 className="font-bold text-purple-700 dark:text-white uppercase">
                Contact
              </h3>
              <span className="block mt-2">+355 6x xx xx xxx</span>
              <span className="block mt-2 hover:text-purple-600 cursor-pointer">
                info@news.site
              </span>
            </div>
          </div>
        </div>
      </div>

      <hr className="bg-gray-200 dark:bg-gray-700 my-6 border-none h-px" />

      <div className="text-center dark:text-gray-300">
        <i className="mx-1 font-bold text-md text-purple-600 fa-newspaper fa-regular">
          <p>news</p>
        </i>{" "}
        2024 - All rights reserved
      </div>
    </div>
  );
}

export default Footer;
