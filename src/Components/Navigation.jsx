import React from "react";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

function Navigation({ setOpenSetting }) {
  return (
    <>
      <div className="pt-5 flex justify-between w-11/12 mx-auto">
        <div className="items-center" />
        <Link to="/settings">
          <FiSettings className="text-black text-2xl cursor-pointer items-center" />
        </Link>
      </div>
    </>
  );
}

export default React.memo(Navigation);
