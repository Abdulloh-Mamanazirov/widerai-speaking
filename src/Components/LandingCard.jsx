import { Link } from "react-router-dom";

const LandingCard = ({ image, title, desc, to }) => {
  return (
    <Link
      to={to && "https://t.me/+oawopYSomoRiMTAy"}
      target={to && "_blank"}
      className="w-[350px] transition-all rounded-xl bg-blue-400 bg-opacity-20 hover:scale-105 hover:shadow-lg hover:shadow-blue-300"
    >
      <div className="h-52">
        <img
          className="rounded-xl w-full h-full object-cover aspect-video"
          src={image}
          alt="image"
        />
      </div>
      <div className="relative bg-blue-400 bg-opacity-20 backdrop-blur-md rounded-xl -mt-5">
        <div className="absolute -top-14 -right-3">
          <img src="/card-icon.svg" alt="icon" />
          <img
            className="absolute top-12 right-11"
            src="/stars.svg"
            alt="icon"
          />
        </div>
        <h3 className="text-2xl font-bold text-center pt-3">{title}</h3>
        <hr className="opacity-30 mx-12 mt-2" />
        <p className="p-2 text-center">{desc}</p>
      </div>
    </Link>
  );
};

export default LandingCard;
