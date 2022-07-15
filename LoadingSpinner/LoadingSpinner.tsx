import * as styles from "./LoadingSpinnerStyles";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function LoadingSpinner() {
  return (
    <styles.Container>
      <Spin indicator={<LoadingOutlined className="icon" />} />;
    </styles.Container>
  );
}

export default LoadingSpinner;
