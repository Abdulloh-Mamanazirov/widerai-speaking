import axios from "axios";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { COUNTRIES } from "../Constants";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  async function handleSignup(e) {
    let { data, status } = await axios.post("/users/signup", e).catch((err) => {
      if (err) {
       return toast(err?.response?.data?.message, { type: "error" });
      }
    });

    if (status === 201 && data.token) {
      localStorage.setItem("widerai-token", data.token);
      toast("Registered successfully", { type: "success" });
      return navigate("/test");
    }
  }

  return (
    <section className="absolute px-3 inset-0 grid place-items-center">
      <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-300 bg-opacity-40">
        <div className="hidden md:block w-1/2">
          <img
            className="aspect-square object-cover rounded-xl"
            src="/signup-image.png"
            alt="sign-up"
          />
        </div>
        <div className="w-full md:w-1/2">
          <Form onFinish={handleSignup}>
            <h2 className="text-white text-center text-3xl font-serif mb-5">
              Sign Up to <span className="landing-title" style={{fontSize:40}}>WiderAI</span>
            </h2>
            <Form.Item
              name="user_firstname"
              rules={[
                {
                  required: true,
                  message: "Please enter your first name!",
                },
              ]}
            >
              <Input
                className="placeholder:text-gray-500"
                placeholder="First name"
              />
            </Form.Item>
            <Form.Item
              name="user_lastname"
              rules={[
                {
                  required: true,
                  message: "Please enter your last name!",
                },
              ]}
            >
              <Input
                className="placeholder:text-gray-500"
                placeholder="Last name"
              />
            </Form.Item>
            <Form.Item
              name="user_email"
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
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="user_password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
              ]}
            >
              <Input.Password placeholder="********" />
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
              <select className="w-full p-1 rounded-md">
                <option disabled selected>
                  Select your country
                </option>
                {COUNTRIES?.map?.((country, ind) => (
                  <option key={ind} value={country?.value}>
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
              <select className="w-full p-1 rounded-md">
                <option disabled selected>
                  How did you find us?
                </option>
                <option value="friend">Friend</option>
                <option value="online">Online</option>
                <option value="searching">Searching</option>
                <option value="other">Other</option>
              </select>
            </Form.Item>
            <Form.Item>
              <Button
                style={{ background: "#0077ff" }}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
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
