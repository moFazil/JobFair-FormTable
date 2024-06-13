import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../asset/logo.png";
import Chart from "../asset/Chart_fill.png";
import Chat from "../asset/Chat.png";
import control from "../asset/control.png";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: Chart, path: "/" },
    { title: "Inbox", src: Chat, path: "/table" },
  ];

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <NavLink
          to="#"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full clickable ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="Toggle Sidebar"
        >
          <img src={control} alt="Toggle Sidebar" />
        </NavLink>
        <div className="flex gap-x-4 items-center">
          <img
            src={logo}
            className={`cursor-pointer duration-500 ${
              open ? "w-10 rotate-0" : "w-10 rotate-[360deg]" // Adjust logo size and rotation based on the 'open' state
            }`}
            alt="Logo"
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            WhyTap
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center justify-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"}`}
            >
              <NavLink
                to={Menu.path}
                activeClassName="bg-light-white"
                className={`flex items-center`}
              >
                <img src={Menu.src} alt={Menu.title} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
