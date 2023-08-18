import axios from "axios";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate()

  async function handleLogin(e){
    let {data, status} = await axios.post('/users/signin',e)
    if(status === 201 && data.token) {
      localStorage.setItem('widerai-token' , data.token)
      toast("Logged in successfully", { type: "success" });
      return navigate("/");
    }
  }

  return (
    <section className="absolute inset-0 grid place-items-center">
      <Form
        name="signin"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        className="w-full md:w-1/2 bg-gray-400 bg-opacity-60 px-5 pt-2 rounded-lg"
        onFinish={handleLogin}
      >
        <h2 className="text-white text-center text-3xl font-serif mb-5">
          Sign In
        </h2>
        <Form.Item
          label="Email"
          name="user_email"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="user_password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            style={{ background: "#0077ff" }}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
          <Link className="ml-5" to="/signup">
            Don't have an account? Sign up
          </Link>
        </Form.Item>
      </Form>
    </section>
  );
}

export default Signin
