import { Layout, Menu, Row } from "antd";
import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { logout, setIsAuth, setUser } from "../store/reducers/auth/auth";

const Navbar: FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Layout.Header>
      <Row justify="end">
        {isAuth ? (
          <>
            <div style={{ color: "white" }}> {user?.username} </div>
            <Menu theme="dark" mode="horizontal" selectable={false}>
              <Menu.Item onClick={() => dispatch(logout())} key={1}>
                Logout
              </Menu.Item>
            </Menu>
          </>
        ) : (
          <>
            <Menu theme="dark" mode="horizontal" selectable={false}>
              <div style={{ color: "#001529" }}> . </div>
              <Menu.Item key={1} onClick={() => console.log("1")}>
                Login
              </Menu.Item>
            </Menu>
          </>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Navbar;
