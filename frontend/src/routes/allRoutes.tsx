import React from "react";

// 로그인 되지 않았을때 이용 가능한 라우터
// import Main from "../pages/Main";
// import Login from "../pages/Authentication/Login";
// import Register from "../pages/Authentication/Register";
// import Logout from "../pages/Authentication/Logout";

const userRoutes = [
    { path: "/", component: <div>user</div>}
    // { path: "/", component: <Main /> },
    // { path: "/logout", component: <Logout /> },
];

const authRoutes = [
    { path: "/", component: <div>auth</div>}
    // { path: "/", component: <Main /> },
    // { path: "/login", component: <Login /> },
    // { path: "/register", component: <Register /> },
    // { path: "/logout", component: <Logout /> },
];

export { userRoutes, authRoutes };
