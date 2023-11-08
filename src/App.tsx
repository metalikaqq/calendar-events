import React, { FC, useEffect } from "react";
import { Layout } from "antd";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchUsers, login, setIsAuth, setUser } from "./store/reducers/auth/auth";
import { IUser } from "./models/IUser";
import { redirect, useNavigate } from "react-router-dom";
import { fetchEventsForUser } from "./store/reducers/event/event";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const redirect = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { isAuth, isLoginError } = useAppSelector((state) => state.auth);
  const { events } = useAppSelector((state) => state.event);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as string) as IUser;

    if (user) {
      setLoading(true);

      console.log(user);

      dispatch(login(user))
       .then(() => {
          if (isLoginError) {
            redirect("/login");
          } else {
            dispatch(fetchUsers());
            dispatch(fetchEventsForUser(user._id));
            redirect("/");
          }
      })
      .finally(() => setLoading(false));
    }
  }, [isAuth]);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: window.innerHeight,
          }}
        >Loading...</div>
      ) : (
        <Layout>
          <Navbar />
          <Layout.Content>
            <AppRouter />
          </Layout.Content>
        </Layout>
      )}
    </>
  );
};

export default App;
