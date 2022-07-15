import { Input, Space } from "antd";
import { useEffect, useState } from "react";
import * as styles from "./OtpInputStyles";

type Props = {
  onChange: (...args: any[]) => any;
};

function OtpInput({ onChange }: Props) {
  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });

  const inputFocus = (elmnt: any) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      const next = elmnt.target.tabIndex;
      if (next < 6) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };

  useEffect(() => {
    onChange(Object.values(otp).join(""));
  }, [otp]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setOtp({
      ...otp,
      [name]: value,
    });
  };

  return (
    <styles.Container>
      <Space direction="horizontal" size="large">
        <Input
          name="otp1"
          type="text"
          maxLength={1}
          onChange={(e) => {
            handleInputChange(e);
          }}
          size="large"
          onKeyUp={(e) => {
            inputFocus(e);
          }}
          tabIndex={1}
          autoFocus
        />
        <Input
          name="otp2"
          type="text"
          maxLength={1}
          onChange={(e) => {
            handleInputChange(e);
          }}
          size="large"
          onKeyUp={(e) => {
            inputFocus(e);
          }}
          tabIndex={2}
        />
        <Input
          name="otp3"
          type="text"
          maxLength={1}
          onChange={(e) => {
            handleInputChange(e);
          }}
          size="large"
          onKeyUp={(e) => {
            inputFocus(e);
          }}
          tabIndex={3}
        />
        <Input
          name="otp4"
          type="text"
          maxLength={1}
          onChange={(e) => {
            handleInputChange(e);
          }}
          size="large"
          onKeyUp={(e) => {
            inputFocus(e);
          }}
          tabIndex={4}
        />
        <Input
          name="otp5"
          type="text"
          maxLength={1}
          onChange={(e) => {
            handleInputChange(e);
          }}
          size="large"
          onKeyUp={(e) => {
            inputFocus(e);
          }}
          tabIndex={5}
        />
        <Input
          name="otp6"
          type="text"
          maxLength={1}
          onChange={(e) => {
            handleInputChange(e);
          }}
          size="large"
          onKeyUp={(e) => {
            inputFocus(e);
          }}
          tabIndex={6}
        />
      </Space>
    </styles.Container>
  );
}

export default OtpInput;
