import React from "react";

const Header = ({ category, title }) => (
  <div className=" mb-5">
    <div>
      <p className="text-lg text-gray-400">{category}</p>
      <p className="text-3xl font-extrabold tracking-tight text-slate-900 ">
        {title}
      </p>
    </div>
  </div>
);

export default Header;
