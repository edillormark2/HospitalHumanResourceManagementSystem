import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import avatar from "../data/avatar.jpg";
import { Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 1550) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => {
    setActiveMenu(!activeMenu);
  };

  const handleChatClick = () => {
    setIsChatOpen(!isChatOpen);
    setIsNotificationOpen(false);
    setIsProfileOpen(false);
    handleClick("chat");
  };

  const handleNotificationClick = () => {
    setIsChatOpen(false);
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false);
    handleClick("notification");
  };

  const handleProfileClick = () => {
    setIsChatOpen(false);
    setIsNotificationOpen(false);
    setIsProfileOpen(!isProfileOpen);
    handleClick("userProfile");
  };

  return (
    <div
      className="flex justify-between p-2 md:ml-6 md:mr-6  relative  drop-shadow-md "
      style={{ zIndex: 999 }}
    >
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex  drop-shadow-md ">
        <NavButton
          title="Chat"
          dotColor="#03C9D7"
          customFunc={handleChatClick}
          color={currentColor}
          icon={<BsChatLeft />}
          style={{
            boxShadow: isChatOpen ? "0 4px 8px rgba(0, 0, 0, 0.25)" : "none",
          }}
        />
        <NavButton
          title="Notification"
          dotColor="rgb(254, 201, 15)"
          customFunc={handleNotificationClick}
          color={currentColor}
          icon={<RiNotification3Line />}
          style={{
            boxShadow: isNotificationOpen
              ? "0 4px 8px rgba(0, 0, 0, 0.25)"
              : "none",
          }}
        />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={handleProfileClick}
          >
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Mark
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        {isChatOpen && <Chat />}
        {isNotificationOpen && <Notification />}
        {isProfileOpen && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
