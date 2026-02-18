// src/layouts/DashboardLayout.jsx
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import "../styles/DashboardLayout.scss";

function DashboardLayout() {
  return (
    <div className="dashboard">
      <aside className="dashboard__sidebar">
        <Sidebar />
      </aside>
      <div className="dashboard__main">
        <header className="dashboard__header">
          <TopHeader />
        </header>
        <main className="dashboard__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;