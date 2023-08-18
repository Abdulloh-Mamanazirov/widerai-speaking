import axios from "axios";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { COUNTRIES } from '../Constants'
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate()
  
  async function handleSignup(e){
    let {data, status} = await axios.post('/users/signup',e)

    if(status === 201 && data.token) {
      localStorage.setItem('widerai-token' , data.token)
      toast("Registered successfully",{type:"success"})
      return navigate("/");
    }
  }

  return (
    <section className="absolute px-3 inset-0 grid place-items-center">
      <Form
        name="signup"
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
        onFinish={handleSignup}
      >
        <h2 className="text-white text-center text-3xl font-serif mb-5">
          Sign Up
        </h2>
        <Form.Item
          label="First name"
          name="user_firstname"
          rules={[
            {
              required: true,
              message: "Please enter your first name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last name"
          name="user_lastname"
          rules={[
            {
              required: true,
              message: "Please enter your last name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
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
          label="Country"
          name="user_country"
          rules={[
            {
              required: true,
              message: "Please select your country!",
            },
          ]}
        >
          <select className="w-full p-1 rounded-md">
            <option disabled selected></option>
            {COUNTRIES?.map?.((country, ind) => (
              <option key={ind} value={country?.value}>{country?.title}</option>
            ))}
          </select>
        </Form.Item>
        <Form.Item
          label="How did you find us?"
          name="user_where_did"
          rules={[
            {
              required: true,
              message: "Please tell us how did you find us!",
            },
          ]}
        >
          <select className="w-full p-1 rounded-md">
            <option disabled selected></option>
            <option value="friend">Friend</option>
            <option value="online">Online</option>
            <option value="searching">Searching</option>
            <option value="other">Other</option>
          </select>
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
        <Link className="ml-5" to='/signin'>Already have an account? Sign in</Link>
        </Form.Item>
      </Form>
    </section>
  );
}

export default Signup
