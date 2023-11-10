import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { rules } from "../utils/rules";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { registration, setRegistrationError } from "../store/reducers/auth/auth";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function isPasswordValid(password: string): boolean {
    const pattern: RegExp = /^(?=.*[a-zA-Z].*).{8,}$/;
    return pattern.test(password);
  }

  const submit = () => {
    dispatch(setRegistrationError(false));

    if (password !== secondPassword) {
      setError("Passwords must be the same");
      return;
    }

    if (!isPasswordValid(password)) {
      setError("Password must be at least 8 characters long and contain at least 3 letters");
      return;
    }

    if (username.length < 4 || username.length > 12) {
      setError('Username must be between 4 and 12 characters long');
      return;
    }

    dispatch(registration({ username, password })).then((res) => {
      if (res.payload) {
        navigate("/login");
      }
    });
  };

  return (
    <Form style={{ width: "300px" }} onFinish={submit}>
      <div style={{ color: "red", marginBottom: "20px" }}>
        {error}
      </div>

      <Form.Item
        label="Username"
        name="username"
        rules={[rules.required("Please input your username")]}
      >
        <Input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          autoComplete="username" // Add autocomplete attribute
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[rules.required("Please input your password")]}
      >
        <Input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          autoComplete="new-password" // Add autocomplete attribute
        />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="second_password"
        rules={[rules.required("Please input your password")]}
      >
        <Input
          value={secondPassword}
          onChange={(e) => {
            setSecondPassword(e.target.value);
          }}
          type="password"
          autoComplete="new-password" // Add autocomplete attribute
        />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default RegistrationForm;
