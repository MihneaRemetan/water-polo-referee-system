import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/frp-logo.png";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [officialId, setOfficialId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    const rememberedId = localStorage.getItem("rememberedOfficialId") || "";
    if (rememberedId) {
      setOfficialId(rememberedId);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setInfoMessage("");

    const cleanId = officialId.trim();
    const cleanPassword = password.trim();

    if (!cleanId || !cleanPassword) {
      setError("Please enter both official ID and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId: cleanId,
          password: cleanPassword,
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      let data;

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text };
      }

      if (!response.ok) {
        setError(data.message || "Invalid official ID or password.");
        return;
      }

      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userName", data.name || "User");
      localStorage.setItem("userRole", data.role);

      if (rememberMe) {
        localStorage.setItem("rememberedOfficialId", cleanId);
      } else {
        localStorage.removeItem("rememberedOfficialId");
      }

      await fetch("http://localhost:8080/api/auth/me", {
        method: "GET",
        credentials: "include",
      });
      
      navigate("/match-setup");
    } catch (err) {
      setError("Connection error: Make sure the backend is running!");
      console.error(err);
    }
  };

  const handleForgotPassword = () => {
    setError("");
    setInfoMessage("Please contact the administrator to reset your password.");
  };

  const handleContactAdmin = () => {
    setError("");
    setInfoMessage(
      "For account support, please contact the federation administrator."
    );
  };

  return (
    <div className="login-page">
      <div className="login-bg-shape login-bg-shape-1"></div>
      <div className="login-bg-shape login-bg-shape-2"></div>

      <form className="login-card" onSubmit={handleLogin}>
        <div className="login-brand">
          <img src={logo} alt="FRP" className="login-logo" />
          <div>
            <p className="login-eyebrow">Romanian Water Polo Federation</p>
            <h1 className="login-title">Referee Control Platform</h1>
            <p className="login-subtitle">
              Sign in using the official ID and password provided by the
              administrator.
            </p>
          </div>
        </div>

        {error && <div className="login-error">{error}</div>}
        {infoMessage && <div className="login-info">{infoMessage}</div>}

        <div className="form-group">
          <label className="form-label">Official ID</label>
          <input
            className="form-input"
            type="text"
            value={officialId}
            onChange={(e) => setOfficialId(e.target.value)}
            placeholder="Enter official ID"
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoComplete="current-password"
          />
        </div>

        <div className="login-row">
          <label className="remember-box">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Remember ID</span>
          </label>

          <button
            type="button"
            className="login-text-button"
            onClick={handleForgotPassword}
          >
            Forgot password?
          </button>
        </div>

        <button type="submit" className="login-button">
          Sign In
        </button>

        <div className="login-links">
          <button
            type="button"
            className="login-text-button"
            onClick={handleContactAdmin}
          >
            Contact administrator
          </button>
        </div>

        <div className="login-demo-box">
          <div className="login-demo-title">Demo account</div>
          <div className="login-demo-item">
            ID: 100 / Password: Frp_2026_Secure_9X!
          </div>
        </div>

        <p className="login-copy">
          © 2026 Romanian Water Polo Federation. All rights reserved.
        </p>
      </form>
    </div>
  );
}

export default Login;