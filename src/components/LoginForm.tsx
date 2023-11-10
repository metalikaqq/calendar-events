import { Button, Form, Input } from "antd";
import React, { FC, useEffect, useState } from "react";
import { rules } from "../utils/rules";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { login, setIsAuth } from "../store/reducers/auth/auth";
import { useNavigate } from "react-router-dom";

const LoginForm: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { user, isLoginError, isLoginPending } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const submit = async (data: any) => {
    await dispatch(login({ username, password })).then((res) => {

      if (typeof res.payload !== 'string') {
        navigate("/");
      }
    });
  };

  const handleSetUserName = (value: string) => {
    setUsername(value);
  };

  const handleSetPassword = (value: string) => {
    setPassword(value);
  };

  return (
    <Form onFinish={submit}>
      <div style={{ color: "red", marginBottom: "20px" }}>
        {`${isLoginError ? "Неверный логин или пароль" : ""}`}
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
          autoComplete="username" // Add this attribute
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
          autoComplete="current-password" 
        />
      </Form.Item>

      <div className="buttons-form">
        <button
          type="submit"
          className="register-btn"
          onClick={() => {
            navigate("/registration");
          }}
        >
          Sing Up
        </button>

        <Button type="primary" htmlType="submit" loading={isLoginPending}>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
