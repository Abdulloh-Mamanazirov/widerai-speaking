import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="bg-white rounded-xl">
        <Result
          status="success"
          title="Successfully Finished!"
          extra={[
            <Button
              onClick={() => navigate("/")}
              type="primary"
              key="home"
              className="bg-[#07f]"
            >
              Home Page
            </Button>,
            <Button
              onClick={() => navigate("/test", { replace: true })}
              key="again"
            >
              Start Again
            </Button>,
          ]}
        />
      </div>
    </div>
  );
};

export default Success;
