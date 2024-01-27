import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes";

// Import Layout
import Layout from "./components/Layout";

function App() {
  return (
      <Router>
        <React.Fragment>
          <Routes>
            {authRoutes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <Layout>
                            {route.component}
                        </Layout>
                }
                />
            ))}
            {userRoutes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                    <Layout>
                        {route.component}
                    </Layout>}
                />
            ))}
          </Routes>
        </React.Fragment>
      </Router>
  );
}

export default App;
