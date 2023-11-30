import axios from "axios";
import { useState } from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { COUNTRIES } from "../Constants";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [howHeardValue, setHowHeardValue] = useState("");

  async function handleSignup(e) {
    setLoading(true);
    let { data, status } = await axios
      .post("/auth/signup", e)
      .catch((err) => {
        if (err) {
          return toast(err?.response?.data?.message, { type: "error" });
        }
      })
      .finally(() => setLoading(false));

    if (status === 201 && data.token) {
      sessionStorage.setItem("widerai-token", data.token);
      toast("Registered successfully", { type: "success" });
      return navigate("/test", { replace: true });
    }
  }

  return (
    <section className="landing absolute px-3 inset-0 grid place-items-center">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="flex gap-3 p-3 rounded-xl bg-violet-950 bg-opacity-60 backdrop-blur-lg w-3/5">
        <div className="relative hidden md:block min-h-full w-1/2">
          <div className="absolute bottom-10 left-2 z-20 text-right">
            <h2 className="font-bold drop-shadow-xl text-2xl text-white font-serif">
              Join a community of <br /> English speakers
            </h2>
            <p className="font-bold opacity-75">with artificial intelligence</p>
          </div>
          <div className="z-10 absolute top-3 left-3 h-7 w-7 bg-gradient-to-br from-purple-800 to-violet-600 shadow-lg shadow-purple-950 rounded-full" />
          <img
            className="object-cover h-full rounded-xl brightness-[.8]"
            src="/signup-image.png"
            alt="sign-up"
          />
        </div>
        <div className="w-full md:w-1/2">
          <Form onFinish={handleSignup}>
            <h2 className="text-white text-center text-3xl font-serif mb-5">
              Sign Up to{" "}
              <span className="landing-title" style={{ fontSize: 40 }}>
                WiderAI
              </span>
            </h2>
            <Form.Item
              name="first_name"
              rules={[
                {
                  required: true,
                  message: "Please enter your first name!",
                },
              ]}
            >
              <Input
                className="placeholder:text-white/40 border border-purple-500 text-white bg-gradient-to-b from-violet-900 via-violet-950 to-violet-900"
                placeholder="First name"
              />
            </Form.Item>
            <Form.Item
              name="last_name"
              rules={[
                {
                  required: true,
                  message: "Please enter your last name!",
                },
              ]}
            >
              <Input
                className="placeholder:text-white/40 border border-purple-500 text-white bg-gradient-to-b from-violet-900 via-violet-950 to-violet-900"
                placeholder="Last name"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                },
              ]}
            >
              <Input
                type="email"
                className="placeholder:text-white/40 border border-purple-500 text-white bg-gradient-to-b from-violet-900 via-violet-950 to-violet-900"
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
              ]}
            >
              <Input
                type="password"
                className="placeholder:text-white/40 border border-purple-500 text-white bg-gradient-to-b from-violet-900 via-violet-950 to-violet-900"
                minLength={8}
                placeholder="********"
              />
            </Form.Item>
            <Form.Item
              name="user_country"
              rules={[
                {
                  required: true,
                  message: "Please select your country!",
                },
              ]}
            >
              <select className="w-full p-1 rounded-md placeholder:text-white/40 border border-purple-500 text-white bg-gradient-to-b from-violet-900 via-violet-950 to-violet-900">
                <option disabled selected>
                  Select your country
                </option>
                {COUNTRIES?.map?.((country, ind) => (
                  <option
                    className="bg-violet-950"
                    key={ind}
                    value={country?.value}
                  >
                    {country?.title}
                  </option>
                ))}
              </select>
            </Form.Item>
            <Form.Item
              name="user_where_did"
              rules={[
                {
                  required: true,
                  message: "Please tell us how did you find us!",
                },
              ]}
            >
              <select
                onChange={(e) => setHowHeardValue(e.target.value)}
                className="w-full p-1 rounded-md placeholder:text-white/40 border border-purple-500 text-white bg-gradient-to-b from-violet-900 via-violet-950 to-violet-900"
              >
                <option disabled selected>
                  How did you find us?
                </option>
                <option className="bg-violet-950" value="friend">
                  Friend
                </option>
                <option className="bg-violet-950" value="online">
                  Online
                </option>
                <option className="bg-violet-950" value="searching">
                  Searching
                </option>
                <option className="bg-violet-950" value="other">
                  Other
                </option>
              </select>
            </Form.Item>
            <Form.Item
              hidden={howHeardValue !== "other"}
              name="how_heard_other"
              rules={[
                {
                  required: true,
                  message: "Please fill this input!",
                },
              ]}
            >
              <Input
                className="placeholder:text-white/40 border border-purple-500 text-white bg-gradient-to-b from-violet-900 via-violet-950 to-violet-900"
                placeholder="Tell us how you found us"
              />
            </Form.Item>
            <Form.Item>
              <Button
                loading={loading}
                style={{ background: "#0077ff" }}
                type="primary"
                className="w-full"
                htmlType="submit"
              >
                Sign Up
              </Button>
            </Form.Item>
            <Form.Item>
              <Link className="ml-5 text-white" to="/signin">
                Already have an account? Sign in
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
