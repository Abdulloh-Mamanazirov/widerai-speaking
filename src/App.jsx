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
import AdminPage from "./Pages/AdminPage";
import GetUserById from "./Pages/AdminPages/GetUserById";
import GetAllUsers from "./Pages/AdminPages/GetAllUsers";
import GetUserByEmail from "./Pages/AdminPages/GetUserByEmail";
import GetAllMockQuestions from "./Pages/AdminPages/GetAllMockQuestions";

const App = () => {
  // return (
  //   <div>
  //     <Routes>
  //       <Route path="/admin" element={<AdminPage />}>
  //         <Route path="getallusers" element={<GetAllUsers />} />
  //         <Route path="getuserbyid" element={<GetUserById />} />
  //         <Route path="getuserbyemail" element={<GetUserByEmail />} />
  //         <Route path="getallmockquestions" element={<GetAllMockQuestions />} />
  //       </Route>

  //       <Route path="/success" element={<Success />} />
  //       <Route path="/*" element={<NotFound />} />
  //     </Routes>
  //   </div>
  // );
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
        <Route path="/admin" element={<AdminPage />}>
          <Route path="getallusers" element={<GetAllUsers />} />
          <Route path="getuserbyid" element={<GetUserById />} />
          <Route path="getuserbyemail" element={<GetUserByEmail />} />
          <Route path="getallmockquestions" element={<GetAllMockQuestions />} />
        </Route>
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
