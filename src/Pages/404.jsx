import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="bg-white rounded-xl">
        <Result
          status="404"
          title="Page Not Found!"
          extra={[
            <Button
              onClick={() => window.navigation.back()}
              type="primary"
              key="home"
              className="bg-[#07f]"
            >
              Go Back
            </Button>,
          ]}
        />
      </div>
    </div>
  );
};

export default NotFound
