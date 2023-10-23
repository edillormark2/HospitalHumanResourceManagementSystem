import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
import { chatData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

const Chat = () => {
  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext();

  return (
    <div className="nav-item absolute right-5 md:right-52 top-12 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 drop-shadow-2xl">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Messages</p>
          <button
            type="button"
            className="text-gray text-xs rounded p-1 px-2 bg-orange-500 bg-opacity-50"
          >
            5 New
          </button>
        </div>
        <MdOutlineCancel
          style={{ cursor: "pointer" }} // Ensure the cursor changes to a pointer on hover
          onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
          className="text-xl rounded-full p-3
              hover:bg-light-gray mt-4 block md:hidden"
        />
      </div>
      <div className="mt-5 ">
        {chatData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-5 border-b-1 border-color p-3 leading-8 cursor-pointer"
          >
            <div className="relative">
              <img
                className="rounded-full h-10 w-10"
                src={item.image}
                alt={item.message}
              />
              <span
                style={{ background: item.dotColor }}
                className="absolute inline-flex rounded-full h-2 w-2 right-0 -top-1"
              />
            </div>
            <div>
              <p className="font-semibold dark:text-gray-200 ">
                {item.message}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {item.desc}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                {item.time}
              </p>
            </div>
          </div>
        ))}
        <div className="mt-5">
          <Button
            color="white"
            bgColor={currentColor}
            text="See all messages"
            borderRadius="10px"
            width="full"
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
