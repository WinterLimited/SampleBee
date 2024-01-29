import React from "react";

// 로그인 되지 않았을때 이용 가능한 라우터
import Main from "../pages/Main";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import Logout from "../pages/Auth/Logout";
import AdminUsers from "../pages/Admin/AdminUsers";

const userRoutes = [
    { path: "/", component: <Main /> },
    { path: "/login", component: <Login /> },
    { path: "/signup", component: <SignUp /> },
    { path: "/logout", component: <Logout /> },

    // 관리자 페이지
    { path: "/admin/users", component: <AdminUsers /> }
];

const authRoutes = [
    { path: "/", component: <Main />}
];

export { userRoutes, authRoutes };
