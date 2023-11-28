import { Button } from "antd";
import { Route, Routes } from "react-router-dom";
import {
  Signup,
  Signin,
  Home,
  Landing,
  Success,
  NotFound,
  ForgotPassword,
} from "./Pages";

const App = () => {
  if (!window.navigator.onLine) {
    return (
      <div className="layout absolute inset-0 grid place-items-center text-white">
        <div className="bg-gray-300 rounded-lg bg-opacity-50 text-center p-3">
          <img width={300} src="/no-connection.png" alt="no-connection" />
          <p className="text-2xl font-semibold text-center">
            No Internet Connection!
          </p>
          <Button
            onClick={() => window.location.reload()}
            type="primary"
            className="bg-blue-500 mt-2"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="layout">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/test" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/success" element={<Success />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
