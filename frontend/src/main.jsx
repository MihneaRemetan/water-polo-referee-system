import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import "./styles/Global.css";
import "./styles/Common.css";
import "./styles/App.css";

import "./styles/Topbar.css";
import "./styles/AdminPage.css";
import "./styles/Coaches.css";
import "./styles/Home.css";
import "./styles/LiveMatch.css";
import "./styles/Login.css";
import "./styles/MatchDetails.css";
import "./styles/MatchHistory.css";
import "./styles/MatchSetup.css";
import "./styles/PlayerStatistics.css";
import "./styles/PlayersPage.css";

import "./styles/EventList.css";
import "./styles/PlayerFouls.css";
import "./styles/ScoreBoard.css";
import "./styles/Timer.css";
import "./styles/ShotClock.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
