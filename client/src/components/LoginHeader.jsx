import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

const LoginHeader = () => {
  const { currentColor } = useStateContext();

  return (
    <div className="flex justify-center dark:bg-main-dark-bg">
      <div
        className="flex bg-white sm:rounded-xl rounded-md drop-shadow-xl p-4 min-w-[70%] max-w-[95%] mt-15 gap-6 text-xs md:text-sm dark:text-gray-200 dark:bg-secondary-dark-bg"
        style={{ marginTop: "20px" }}
      >
        <div
          className="dark:hover:text-black text-lg font-bold p-1  drop-shadow-xl font-serif"
          style={{ color: currentColor }}
        >
          <a>HHRMS</a>
        </div>

        <div className="ml-auto flex">
          <div className="dark:hover:text-black hover:bg-gray-200 p-3 rounded-md">
            <a href="hhrms-info/AboutUs.html">About Us</a>
          </div>
          <div className="dark:hover:text-black hover:bg-gray-200 p-3 rounded-md">
            <a href="hhrms-info/Terms.html">Terms and Conditions</a>
          </div>
          <div className="dark:hover:text-black hover:bg-gray-200 p-3 rounded-md">
            <a href="hhrms-info/Privacy.html">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;
