import { Routes, Route ,Navigate} from "react-router-dom";
import Login from "./pages/login";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/home/index";
import Settings from "./pages/setting";
import Profile from "./pages/profile";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />


    <Route path = "/dashboard" element = {<DashboardLayout />}>

   <Route path="home" element={<Home />} />
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
      </Route>

        {/* Catch-all 404 redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
          </Routes> 
  );
}

export default App;