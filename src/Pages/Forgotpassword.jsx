import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Forgotpassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);

  async function handleSubmit(e) {
    setLoading(true);
    let { data, status } = await axios
      .post("/users/forgotPassword", e)
      .catch((err) => {
        if (err) {
          toast(err?.response?.data?.message, { type: "error" });
        }
      })
      .finally(() => setLoading(false));

    if (status === 201) {
      toast("We sent the code to your email address.", { type: "success" });
      return setIsCodeSent(true);
    }
  }

  async function handleCheckCode(e) {
    setLoading(true);
    let { data, status } = await axios
      .post("/users/checkCode", e)
      .catch((err) => {
        if (err) {
          return toast(err?.response?.data?.message, { type: "error" });
        }
      })
      .finally(() => setLoading(false));

    if (status === 201 && data.token) {
      sessionStorage.setItem("widerai-token", data.token);
      toast("Logged in successfully", { type: "success" });
      return navigate("/test", { replace: true });
    }
  }

  return (
    <section className="landing absolute inset-0 grid place-items-center">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-600 bg-opacity-60 backdrop-blur-md">
        <div className="hidden md:block w-1/2">
          <img
            className="aspect-square object-cover rounded-xl"
            src="/landing-image-3.png"
            alt="sign-up"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-white text-center text-3xl font-serif mb-5">
            Forgot Password?
          </h2>
          <p className="text-white text-center text-base mb-5 max-w-sm">
            Enter the email that you used to log in before. We'll send code to
            that email address.
          </p>
          <Form hidden={isCodeSent} onFinish={handleSubmit}>
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
                className="placeholder:text-gray-500"
                placeholder="Your Email"
              />
            </Form.Item>
            <Form.Item>
              <Button
                loading={loading}
                style={{ background: "#0077ff" }}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>

              <Link className="ml-5 text-white" to="/signup">
                Don't have an account? Sign up
              </Link>
            </Form.Item>
          </Form>
          <Form hidden={!isCodeSent} onFinish={handleCheckCode}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please re enter your email!",
                },
              ]}
            >
              <Input
                type="email"
                className="placeholder:text-gray-500"
                placeholder="Rewrite your Email"
              />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please enter the sent code!",
                },
              ]}
            >
              <Input
                type="number"
                className="placeholder:text-gray-500"
                placeholder="Code"
              />
            </Form.Item>
            <Form.Item>
              <Button
                loading={loading}
                style={{ background: "#0077ff" }}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>

              <Link className="ml-5 text-white" to="/signup">
                Don't have an account? Sign up
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Forgotpassword;
