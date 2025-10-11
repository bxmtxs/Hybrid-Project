import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import MainLayout from "./components/layout/MainLayout";
export default function App() {
return (
<BrowserRouter>
<MainLayout />
<AppRoutes />
</BrowserRouter>
);
}