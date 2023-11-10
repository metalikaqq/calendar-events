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
            <Menu theme="dark" mode="horizontal" selectable={false} items={[
              { key: 1, onClick: () => dispatch(logout()), label: "Logout" }
            ]} />
          </>
        ) : (
          <>
            <Menu theme="dark" mode="horizontal" selectable={false} items={[
              { key: 1, onClick: () => console.log("1"), label: "Login" }
            ]} />
          </>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Navbar;
