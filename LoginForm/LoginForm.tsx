import * as styles from "./LoginFormStyles";
import LogoWithText from "../../../Assets/Icons/LogoWithText.png";
import { Form, Input, Button, Alert, Space, message } from "antd";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { auth } from "../../../CommonMethods/API/Auth";
import { useNavigate, useParams } from "react-router-dom";
import { mask, validateEmail } from "../../../CommonMethods/Helper/Methods";
import { OtpInput } from "../..";

function Login(props: { userType: string }) {
  const navigate = useNavigate();
  let { emailID } = useParams();

  const [email, setEmail] = useState("");
  const [sec, setSec] = useState<number>(60);
  const [min, setMin] = useState<number>(14);
  const [isCodeSent, setIsCodeSent] = useState<boolean>();
  const [accessCode, setAccessCode] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const setCodeSent = (flag: any) => {
    setIsCodeSent(flag);
  };

  const handleInputChanges = (key: string, value: any) => {
    if (key === "email") setEmail(value);
    if (key === "accessCode") setAccessCode(value);
  };

  const handleLogin = async () => {
    if (accessCode.length !== 6) {
      message.error("Please fill all the fields");
      return;
    }
    let res = await auth.login(email, accessCode);
    if(res && res.statusCode == 401) {
      message.error("OTP is Incorrect")
    }
    if (res && res.accessToken) {
      // debugger;
      let redirect = sessionStorage.getItem("redirect");
      sessionStorage.removeItem("redirect");
      if (redirect) navigate(redirect);
      else {
        if (auth.getCurrentRole() === 4 || auth.getCurrentRole() === 3 || auth.getCurrentRole() === 5)
          navigate("/notifications", { replace: true });
        else navigate("/dashboard", { replace: true });
      }
    } else {
      if (res.statusCode === 404) message.error("User not registered");
    }
  };

  const handleSendOTP = async (e: any) => {
    e.preventDefault();
    if (!validateEmail(email)) return;

    let res = await auth.getOTP(email);
    if (res.status === 404) {
      message.error(res.message);
    } else {
      setCodeSent(true);
    }
  };

  function countDown() {
    setTimeout(() => {
      if (sec <= 0) {
        if (min === 0 && sec === 0) {
          return;
        }
        setSec(60);
        setMin(min - 1);
      } else {
        setSec(sec - 1);
      }
    }, 1000);
  }

  useEffect(() => {
    countDown();
  });
  useEffect(() => {
    setEmail(emailID || "");

    // Redirect condition if user loggedin
    if (auth.getCurrentRole() === 1 || auth.getCurrentRole() === 2) {
      navigate("/dashboard");
    } else if (auth.getCurrentRole() === 3 || auth.getCurrentRole() === 4) {
      navigate("/notifications");
    }
  }, []);

  return (
    <styles.Container>
      <img src={LogoWithText} alt="logo with text" />
      <Form className="loginForm" scrollToFirstError>
        <h2>Login</h2>
        {!isCodeSent && (
          <h3>You will receive a Secure Access Code on your email address</h3>
        )}
        <Space direction={"vertical"} size={[0, 17]} className="Fields">
          {isCodeSent && (
            <Alert
              message={`A Secure Access Code has been sent to ${mask(email)}`}
              type="info"
            />
          )}

          {!isCodeSent ? (
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: `${email} is not a Valid Email`,
                },
                {
                  required: true,
                  message: "Email is required",
                },
              ]}
            >
              <Input
                placeholder="Enter your email address"
                size="large"
                prefix={<UserOutlined />}
                value={email}
                disabled={emailID ? true : false}
                onChange={(e) => {
                  handleInputChanges("email", e.target.value);
                }}
              />
              {errorMsg && <styles.ErrorMessage>{errorMsg}</styles.ErrorMessage>}
            </Form.Item>
          ) : (
              <>
                <OtpInput
                  onChange={(v) => {
                    handleInputChanges("accessCode", v);
                  }}
                />
              </>
            )}

          {!isCodeSent ? (
            <Button
              type="primary"
              size="large"
              block
              onClick={(e) => {
                handleSendOTP(e);
              }}
              htmlType="submit"
            >
              Request Secure Access Code
            </Button>
          ) : (
              <>
                <Button type="primary" size="large" block onClick={handleLogin}>
                  Login
              </Button>
                <p style={{ color: "gray", margin: "0" }}>
                  Your Secure Access Code is valid for the next{" "}
                  <span style={{ fontWeight: "800" }}>{`${min < 10 ? `0${min}` : min
                    }:${sec < 10 ? `0${sec}` : sec}`}</span>
                </p>
                <Button
                  type="text"
                  size="small"
                  onClick={handleLogin}
                  style={{ padding: "0" }}
                  disabled={min === 0 && sec === 0 ? undefined : true}
                >
                  Resend Secure Access Code
              </Button>
              </>
            )}
        </Space>
      </Form>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://soterius.com/privacy-policy/"
      >
        <span style={{ marginRight: "1rem" }}>Privacy Policy</span>
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://soterius.com/terms-conditions/"
      >
        <span>Terms & Conditions</span>
      </a>
      <p style={{ marginTop: "1rem" }}>© Soterius All Rights Reserved</p>
    </styles.Container>
  );
}

export default Login;
