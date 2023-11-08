import { Button, Form, Input } from "antd";
import React, { FC, useEffect, useState } from "react";
import { rules } from "../utils/rules";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  login,
  registration,
  setRegistrationError,
} from "../store/reducers/auth/auth";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const { user, isRegistrationError, isRegistrationPending } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  function isPasswordValid(password: string, confirmPassword: string): boolean {
    const pattern: RegExp = /^(?=.*[a-zA-Z].*){3,}.{8,}$/;

    const isPasswordStrong: boolean = pattern.test(password);

    return isPasswordStrong;
  }

  const submit = (data: any) => {
    dispatch(setRegistrationError(false));

    if (isRegistrationError) {
      setError("This user is already exist");
      return;
    }

    if (password !== secondPassword) {
      setError("Passwords must be the same");
      return;
    }

    if (!isPasswordValid(password, secondPassword)) {
      setError(
        "Password must be at least 8 characters long and contain at least 3 letters"
      );
      return;
    }

    if (username.length < 4 && username.length <= 12) {
      setError('Username must be at least 4 characters long and contain at least 16 characters')
      console.log(username.length)
      return;
    }

    dispatch(registration({ username, password })).then((res) => {
      console.log(res);

      if (res.payload) {
        navigate("/login");
      }
    });
  };

  const handleSetUserName = (value: string) => {
    setUsername(value);
  };

  const handleSetPassword = (value: string) => {
    setPassword(value);
    console.log(password);
  };

  const handleSetSecondPassword = (value: string) => {
    setSecondPassword(value);
  };

  return (
    <Form style={{ width: "300px" }} onFinish={submit}>
      <div style={{ color: "red", marginBottom: "20px" }}>
        {`${error ? error : ""}`}
      </div>

      <Form.Item
        label="Username"
        name="username"
        rules={[rules.required("Please input your username!")]}
      >
        <Input
          value={username}
          onChange={(e) => {
            handleSetUserName(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[rules.required("Please input your password!")]}
      >
        <Input
          value={password}
          onChange={(e) => {
            handleSetPassword(e.target.value);
          }}
          type="password"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="second_password"
        rules={[rules.required("Please input your password!")]}
      >
        <Input
          value={secondPassword}
          onChange={(e) => {
            handleSetSecondPassword(e.target.value);
          }}
          type="password"
        />
      </Form.Item>

      <div className="buttons-form">
        <button
          type="submit"
          className="register-btn"
          onClick={() => {
            navigate("/login");
          }}
        >
          Sing in
        </button>

        <Button
          type="primary"
          htmlType="submit"
          loading={isRegistrationPending}
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default RegistrationForm;
