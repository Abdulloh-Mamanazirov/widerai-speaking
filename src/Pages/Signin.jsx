import axios from "axios";
import { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    setLoading(true);
    let { data, status } = await axios
      .post("/auth/signin", e)
      .catch((err) => {
        if (err) {
          toast(err?.response?.data?.message, { type: "error" });
        }
      })
      .finally(() => setLoading(false));
    let abs = data.user.roles.filter((role) => role.toLowerCase() === "admin");
    if (status === 201 && data.token && abs[0] === "admin") {
      sessionStorage.setItem("widerai-token", data.token);
      toast("Logged in successfully", { type: "success" });
      return navigate("/admin", { replace: true });
    } else if (status === 201 && data.token) {
      sessionStorage.setItem("widerai-token", data.token);
      toast("Logged in successfully", { type: "success" });
      return navigate("/test", { replace: true });
    }
  }

  return (
    <section className="landing absolute inset-0 grid place-items-center">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="md:h-3/4 flex items-start gap-3 p-3 rounded-xl bg-violet-950 bg-opacity-60 backdrop-blur-lg w-3/5">
        <div
          style={{ backgroundImage: 'url("/login-image.png")' }}
          className="relative hidden md:block min-h-full w-1/2 bg-no-repeat object-contain bg-cover bg-center rounded-xl"
        >
          <div className="z-10 absolute top-3 left-3 h-7 w-7 bg-gradient-to-br from-purple-800 to-violet-600 shadow-lg shadow-purple-950 rounded-full" />
          <img className="opacity-0" src="/login-image.png" alt="sign-up" />
        </div>
        <div className="w-full md:w-1/2">
          <Form onFinish={handleLogin}>
            <h2 className="text-white text-center text-3xl font-serif mb-5">
              Sign In to{" "}
              <span className="landing-title" style={{ fontSize: 40 }}>
                WiderAI
              </span>
            </h2>
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
                placeholder="Your Email"
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
                className="placeholder:text-white/40 border border-purple-500 text-white bg-gradient-to-b from-violet-900 via-violet-950 to-violet-900"
                type="password"
                minLength={8}
                placeholder="*******"
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox className="text-white">Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button
                loading={loading}
                style={{ background: "#0077ff" }}
                className="w-full"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
            <Form.Item>
              <Link className="text-white" to="/signup">
                Don't have an account? Sign up
              </Link>
              <br />
              <Link className="text-white" to="/forgot-password">
                Forgot password? Restore it.
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Signin;
