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
  const [showAdminContact, setShowAdminContact] = useState(false);

  useEffect(() => {
    const rememberedId = localStorage.getItem("rememberedOfficialId") || "";

    if (rememberedId) {
      setOfficialId(rememberedId);
    }
  }, []);

  const saveLoggedUser = (loginData, meData, cleanId) => {
    const loggedUserName =
      meData?.userName ||
      meData?.name ||
      meData?.fullName ||
      meData?.officialName ||
      loginData?.userName ||
      loginData?.name ||
      loginData?.fullName ||
      loginData?.officialName ||
      "Unknown user";

    const loggedUserRole =
      meData?.userRole ||
      meData?.role ||
      meData?.officialRole ||
      loginData?.userRole ||
      loginData?.role ||
      loginData?.officialRole ||
      "REFEREE";

    const loggedUserId =
      meData?.userId ||
      meData?.id ||
      meData?.officialId ||
      loginData?.userId ||
      loginData?.id ||
      loginData?.officialId ||
      cleanId;

    localStorage.setItem("userName", String(loggedUserName));
    localStorage.setItem("userRole", String(loggedUserRole));
    localStorage.setItem("userId", String(loggedUserId));
    localStorage.setItem("offlineLoginAllowed", "true");

    console.log("SAVED USER:", {
      userName: localStorage.getItem("userName"),
      userRole: localStorage.getItem("userRole"),
      userId: localStorage.getItem("userId"),
    });
  };

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

    // OFFLINE LOGIN
    if (!navigator.onLine) {
      const userId = localStorage.getItem("userId");
      const userName = localStorage.getItem("userName");
      const userRole = localStorage.getItem("userRole");
      const offlineAllowed = localStorage.getItem("offlineLoginAllowed");

      if (offlineAllowed === "true" && userId && userName && userRole) {
        setInfoMessage("Offline mode: using cached session.");
        navigate("/match-setup");
        return;
      }

      setError("Login failed. No internet and no cached session.");
      return;
    }

    // ONLINE LOGIN
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
      let loginData = {};

      if (contentType.includes("application/json")) {
        loginData = await response.json();
      } else {
        const text = await response.text();
        loginData = { message: text };
      }

      console.log("LOGIN RESPONSE:", loginData);

      if (!response.ok) {
        setError(loginData.message || "Invalid official ID or password.");
        return;
      }

      let meData = {};

      try {
        const meResponse = await fetch("http://localhost:8080/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        const meContentType = meResponse.headers.get("content-type") || "";

        if (meResponse.ok && meContentType.includes("application/json")) {
          meData = await meResponse.json();
        }
      } catch (meError) {
        console.warn("Could not fetch current user data:", meError);
      }

      console.log("ME RESPONSE:", meData);

      saveLoggedUser(loginData, meData, cleanId);

      if (rememberMe) {
        localStorage.setItem("rememberedOfficialId", cleanId);
      } else {
        localStorage.removeItem("rememberedOfficialId");
      }

      navigate("/match-setup");
    } catch (error) {
      console.error("Login failed:", error);

      const userId = localStorage.getItem("userId");
      const userName = localStorage.getItem("userName");
      const userRole = localStorage.getItem("userRole");
      const offlineAllowed = localStorage.getItem("offlineLoginAllowed");

      if (offlineAllowed === "true" && userId && userName && userRole) {
        setInfoMessage("Offline mode: using cached session.");
        navigate("/match-setup");
        return;
      }

      setError("Login failed. No internet and no cached session.");
    }
  };

  const openAdminContact = () => {
    setError("");
    setInfoMessage("");
    setShowAdminContact(true);
  };

  const closeAdminContact = () => {
    setShowAdminContact(false);
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
          <label className="form-label" htmlFor="officialId">
            Official ID
          </label>

          <input
            id="officialId"
            className="form-input"
            type="text"
            value={officialId}
            onChange={(e) => setOfficialId(e.target.value)}
            placeholder="Enter official ID"
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>

          <input
            id="password"
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
            onClick={openAdminContact}
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
            onClick={openAdminContact}
          >
            Contact administrator
          </button>
        </div>

        <p className="login-copy">
          © 2026 Romanian Water Polo Federation. All rights reserved.
        </p>
      </form>

      {showAdminContact && (
        <div className="admin-modal-overlay" onClick={closeAdminContact}>
          <div
            className="admin-contact-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="admin-modal-close"
              onClick={closeAdminContact}
              aria-label="Close contact administrator dialog"
            >
              ×
            </button>

            <p className="admin-modal-eyebrow">Account support</p>

            <h2>Contact administrator</h2>

            <p className="admin-modal-description">
              If you forgot your password, your account is locked, or your role
              is incorrect, please contact the competition administrator.
            </p>

            <div className="admin-contact-box">
              <p>
                <strong>Email:</strong> admin@frp.ro
              </p>

              <p>
                <strong>Working hours:</strong> Monday–Friday, 09:00–17:00
              </p>

              <p>
                <strong>Support type:</strong> account access, password reset,
                role correction
              </p>
            </div>

            <a
              className="admin-email-button"
              href="mailto:admin@frp.ro?subject=Water%20Polo%20Referee%20System%20-%20Login%20Support"
            >
              Send email
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;