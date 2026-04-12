import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/frp-logo.png";

function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const userName = localStorage.getItem("userName") || "User";
  const userId = localStorage.getItem("userId") || "OFFICIAL-000";
  const userRole = localStorage.getItem("userRole") || "Referee";

  const navItems = [
    { label: "Home", path: "/home" },
    { label: "Match Setup", path: "/match-setup" },
    { label: "Live Match", path: "/live-match" },
    { label: "Officials", path: "/admin" },
    { label: "Statistics", path: "/statistics" },
    { label: "Players", path: "/players" },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="topbar-left">
          <img src={logo} alt="FRP" className="topbar-logo" />

          <nav className="topbar-nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`topbar-link ${isActive(item.path) ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="topbar-profile" ref={menuRef}>
          <button
            type="button"
            className="topbar-avatar"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {userName.charAt(0).toUpperCase()}
          </button>

          {menuOpen && (
            <div className="profile-menu">
              <div className="profile-menu-header">
                <div className="profile-menu-avatar">
                  {userName.charAt(0).toUpperCase()}
                </div>

                <div className="profile-menu-user">
                  <div className="profile-menu-name">{userName}</div>
                  <div className="profile-menu-role">ID: {userId}</div>
                  <div className="profile-menu-role">{userRole}</div>
                </div>
              </div>

              <button
                type="button"
                className="profile-menu-item logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;