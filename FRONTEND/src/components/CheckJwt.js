import { jwtDecode } from "jwt-decode";

export default function checkjwt() {
    const token = localStorage.getItem("token");
    let decoded = jwtDecode(token);
    let currentTime = Date.now() / 1000;
    
    if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("isManager");
        window.location.reload();
    }
    }