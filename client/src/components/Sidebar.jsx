import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../contexts/ContextProvider";
import { links } from "../data/dummy"; // Import your links data
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();
  const [openSection, setOpenSection] = useState("");
  const [activeNavLink, setActiveNavLink] = useState("");
  const [arrowMarginLeft, setArrowMarginLeft] = useState(50); // Default margin for arrows

  const toggleSection = (sectionName, arrowMargin = 50) => {
    if (openSection === sectionName) {
      setOpenSection("");
      setArrowMarginLeft(50); // Reset margin for arrows
    } else {
      setOpenSection(sectionName);
      setArrowMarginLeft(arrowMargin); // Set margin for arrows
    }
  };

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 1300) {
      setActiveMenu(false);
    }
  };

  const activeLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 drop-shadow-xl";
  const normalLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-gray-200  m-2";
  const subNavTitle = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-gray-200 m-2 drop-shadow-xl cursor-pointer";

  const handleCareerLinkClick = (url) => {
    // Function to open the "Career" URL in a new tab
    window.open(url, "_blank");
  };

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/dashboard"
              onClick={handleCloseSideBar}
              className="items-center gap-1 ml-16 mt-8 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <span>HHRMS</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover-bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <div key={link.name}>
                    {link.subMenu ? (
                      <div
                        className={subNavTitle}
                        style={{
                          backgroundColor: activeNavLink === link.name ? currentColor : '',
                          color: activeNavLink === link.name ? 'white' : '',
                        }}
                        onClick={() => {
                          toggleSection(link.name);
                          setOpenSection(openSection === link.name ? '' : link.name);
                          setActiveNavLink(link.name); // Set the activeNavLink to the clicked link
                        }}
                      >
                        <div className="dark:text-gray-200">{link.icon}</div>
                        <div className="dark:text-gray-200">
                          <span className="capitalize ">{link.name}</span>
                        </div>
                        <div className="dark:text-gray-200 ">
                          {openSection === link.name ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                        </div>
                      </div>
                    ) : (
                      <NavLink
                        to={`/${link.name}`}
                        key={link.name}
                        onClick={() => {
                          handleCloseSideBar();
                          setOpenSection("");
                          setActiveNavLink(link.name);
                          setActiveNavLink(""); // Reset the activeNavLink when a NavLink is clicked
                        }}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : "",
                        })}
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                      >
                        {link.icon}
                        <span className="capitalize ">{link.name}</span>
                      </NavLink>
                    )}
                    {openSection === link.name && link.subMenu && (
                      <div style={{ marginLeft: "30px" }}>
                        {link.subMenu.map((submenuItem) => (
                          submenuItem.url ? (
                            <NavLink
                              key={submenuItem.subname}
                              onClick={() => handleCareerLinkClick(submenuItem.url)}
                              style={({ isActive }) => ({
                                backgroundColor: isActive ? "#E5E8E8 " : 'initial',
                                color: isActive ? "black" : '',
                              })}
                              className={({ isActive }) =>
                                isActive ? activeLink : normalLink
                              }
                            >
                              <span
                                style={{
                                  background: currentColor,
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  marginRight: '5px',
                                }}
                                className="rounded-full left-2 top-2"
                              />
                              <span className="capitalize">{submenuItem.subname}</span>
                            </NavLink>
                          ) : (
                            <NavLink
                              to={`/${submenuItem.subname}`} // You can set this to an appropriate value
                              key={submenuItem.subname}
                              style={({ isActive }) => ({
                                backgroundColor: isActive ? "#E5E8E8 " : '',
                                color: isActive ? "black" : '',
                              })}
                              className={({ isActive }) =>
                                isActive ? activeLink : normalLink
                              }
                            >
                              <span
                                style={{
                                  background: currentColor,
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  marginRight: '5px',
                                }}
                                className="rounded-full left-2 top-2"
                              />
                              <span className="capitalize">{submenuItem.subname}</span>
                            </NavLink>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
