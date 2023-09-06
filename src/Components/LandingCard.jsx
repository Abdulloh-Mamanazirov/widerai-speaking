import React from "react";

const LandingCard = ({ image, title, desc }) => {
  return (
    <div className="w-[350px] transition-all rounded-xl bg-blue-400 bg-opacity-20 hover:scale-105 hover:shadow-lg hover:shadow-blue-300">
      <div>
        <img className="rounded-xl" src={image} alt="image" />
      </div>
      <div className="relative bg-blue-400 bg-opacity-20 backdrop-blur-md rounded-xl -mt-5">
        <div className="absolute -top-14 -right-3">
          <img src="/card-icon.svg" alt="icon" />
          <img className="absolute top-12 right-11" src="/stars.svg" alt="icon" />
        </div>
        <h3 className="text-2xl font-bold text-center pt-3">{title}</h3>
        <hr className="opacity-30 mx-12 mt-2"/>
        <p className="p-2 text-center">{desc}</p>
      </div>
    </div>
  );
};

export default LandingCard;
