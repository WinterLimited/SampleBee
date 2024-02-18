import React from "react";

// 로그인 되지 않았을때 이용 가능한 라우터
import Main from "../pages/Main";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import Logout from "../pages/Auth/Logout";
import AskUs from "../pages/AskUs";

import AdminUsers from "../pages/Admin/AdminUsers";
import AdminVisits from "../pages/Admin/AdminVisits";

const userRoutes = [
    { path: "/", component: <Main /> },
    { path: "/login", component: <Login /> },
    { path: "/signup", component: <SignUp /> },
    { path: "/logout", component: <Logout /> },
    { path: "/ask-us", component: <AskUs /> },
];

const authRoutes = [
    { path: "/", component: <Main />},

    // 관리자 페이지
    { path: "/admin/users", component: <AdminUsers /> },
    { path: "/admin/visits", component: <AdminVisits /> }
];

export { userRoutes, authRoutes };
