import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    if (!token || !user || user.role !== "admin") {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}

export default AdminRoute;