import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown, Modal } from "antd";
import { LandingCard } from "../Components";
import { CARDS } from "../Constants";

const Landing = () => {
  let [me, setMe] = useState();
  let [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("widerai-token");
  const items = [
    {
      key: "1",
      label: <p onClick={() => setOpen(true)}>View profile</p>,
    },
    {
      key: "2",
      danger: true,
      label: (
        <p
          onClick={() => {
            sessionStorage.removeItem("widerai-token");
            navigate("/signin");
          }}
        >
          Log out
        </p>
      ),
    },
  ];

  useEffect(() => {
    async function getMe() {
      let { data } = await axios.get("/users/getSelfInfo");
      setMe(data);
    }
    getMe();
  }, []);

  return (
    <div className="landing text-white">
      <nav className="sticky top-0 z-20 px-10 bg-blue-300 bg-opacity-20 backdrop-blur-md p-1 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            width={70}
            className="rounded-3xl"
            src="/logo-min.png"
            alt="logo"
          />
          <h3 className="text-3xl md:text-4xl font-bold font-serif text-blue-100">
            Wider<span className="text-blue-300">AI</span>
          </h3>
        </div>
        {me && (
          <Dropdown menu={{ items }}>
            <Avatar
              size="large"
              className="bg-gradient-to-br from-indigo-400 to-indigo-800 text-white"
            >
              {me
                ? (
                    me?.user_firstname?.split("")[0] +
                    me?.user_lastname?.split("")[0]
                  ).toUpperCase()
                : ""}
            </Avatar>
          </Dropdown>
        )}
      </nav>

      <main className="mt-8 md:mt-24 ml-10 md:ml-20 grid lg:grid-cols-2">
        <div className="p-5">
          <p className="p-1 px-3 rounded-xl bg-slate-700 max-w-fit opacity-60">
            WiderAI Speaking Assistant
          </p>
          <h1 className="landing-title">
            WiderAI - <br /> We dominate!
          </h1>
          <p className="landing-desc">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere id
            laborum eveniet eum debitis neque dolorum, veritatis provident
            placeat culpa nihil omnis officiis quo. Neque cumque voluptatem
            voluptatum inventore voluptatibus.
          </p>
          <Link to={token ? "/test" : "/signup"} className="landing-button">
            Start speaking test
          </Link>
        </div>
      </main>
      <section className="p-16 md:p-28">
        <div className="grid md:grid-cols-2 gap-5 items-start lg:grid-cols-3">
          {CARDS.map((i, ind) => (
            <LandingCard
              key={ind}
              to={i?.to}
              image={i.image}
              title={i.title}
              desc={i.desc}
            />
          ))}
        </div>
      </section>

      <Modal
        open={open}
        title="Profile:"
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Close
          </Button>,
        ]}
      >
        <div className="font-medium">
          <div className="flex gap-3">
            <p className="font-semibold">Name:</p>
            <p>
              {me?.user_firstname} {me?.user_lastname}
            </p>
          </div>
          <div className="flex gap-3">
            <p className="font-semibold">Email:</p>
            <p>{me?.user_email}</p>
          </div>
          <div className="flex gap-3">
            <p className="font-semibold">Country:</p>
            <p>{me?.user_country}</p>
          </div>
          <div className="flex gap-3">
            <p className="font-semibold">Registered date:</p>
            <p>{me?.user_created_at}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Landing;
