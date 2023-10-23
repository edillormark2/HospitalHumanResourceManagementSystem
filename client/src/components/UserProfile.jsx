import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
import { userProfileData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../data/avatar.jpg";

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const [popupVisible, setPopupVisible] = useState(false); // Assuming initially visible

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };
  return (
    <div className="nav-item absolute right-1 top-12 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 drop-shadow-2xl ">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {" "}
            Michael Roberts{" "}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {" "}
            Administrator{" "}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {" "}
            info@shop.com{" "}
          </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <a key={index} href={item.link} className="block">
            <div
              key={index}
              className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
            >
              <div
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-xl rounded-lg p-3 hover:bg-light-gray"
              >
                {item.icon}
              </div>

              <div>
                <p className="font-semibold dark:text-gray-200">{item.title}</p>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
        />
      </div>
    </div>
  );
};

export default UserProfile;
