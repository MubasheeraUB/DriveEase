import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Dashboard Layout */}
        <Route element={<DashboardLayout />}>

          <Route
            path="/dashboard"
            element={<DashboardHome />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}