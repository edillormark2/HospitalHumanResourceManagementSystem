import React from "react";

const SubPageHeader = ({ category, title }) => (
  <div className=" mb-2">
    <div>
      <p className="text-lg text-gray-400">{category}</p>
      <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-gray-200 ">
        {title}
      </p>
    </div>
  </div>
);

export default SubPageHeader;
