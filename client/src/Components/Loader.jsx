import React from "react";
import LoaderGif from "../Images/loading.gif";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__image">
        <img src={LoaderGif} alt="Loader" />
      </div>
    </div>
  );
};

export default Loader;
