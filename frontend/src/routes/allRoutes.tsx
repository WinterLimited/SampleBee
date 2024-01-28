import React from "react";

// 로그인 되지 않았을때 이용 가능한 라우터
import Main from "../pages/Main";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import Logout from "../pages/Auth/Logout";
// import Logout from "../pages/Authentication/Logout";

const userRoutes = [
    { path: "/", component: <Main /> },
    { path: "/login", component: <Login /> },
    { path: "/signup", component: <SignUp /> },
    { path: "/logout", component: <Logout /> },
];

const authRoutes = [
    { path: "/", component: <Main />}
    // { path: "/", component: <Main /> },
    // { path: "/login", component: <Login /> },
    // { path: "/register", component: <Register /> },
    // { path: "/logout", component: <Logout /> },
];

export { userRoutes, authRoutes };
