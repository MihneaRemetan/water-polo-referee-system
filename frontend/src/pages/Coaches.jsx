import { useEffect, useMemo, useState } from "react";
import AppLayout from "../layout/AppLayout";
import "../styles/Coaches.css";

const EMPTY_COACH_FORM = {
  coachCode: "",
  name: "",
  city: "",
  teamId: "",
};

function Coaches() {
  const [coaches, setCoaches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [form, setForm] = useState(EMPTY_COACH_FORM);
  const [saving, setSaving] = useState(false);

  const userRole = (localStorage.getItem("userRole") || "").toUpperCase();
  const isAdmin = userRole === "ADMIN";

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [coachesRes, teamsRes] = await Promise.all([
        fetch("http://localhost:8080/api/coaches", {
          credentials: "include",
        }),
        fetch("http://localhost:8080/api/teams", {
          credentials: "include",
        }),
      ]);

      if (!coachesRes.ok) {
        throw new Error(`Failed loading coaches: ${coachesRes.status}`);
      }

      if (!teamsRes.ok) {
        throw new Error(`Failed loading teams: ${teamsRes.status}`);
      }

      const coachesData = await coachesRes.json();
      const teamsData = await teamsRes.json();

      setCoaches(Array.isArray(coachesData) ? coachesData : []);
      setTeams(Array.isArray(teamsData) ? teamsData : []);
    } catch (err) {
      console.error("Error loading coaches page:", err);
      setError("Could not load coaches.");
    } finally {
      setLoading(false);
    }
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleAddCoach(e) {
    e.preventDefault();

    if (!isAdmin) return;

    if (!form.coachCode.trim() || !form.name.trim() || !form.teamId) {
      setError("Please fill in coach code, name, and team.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        coachCode: form.coachCode.trim(),
        name: form.name.trim(),
        city: form.city.trim(),
        team: {
          id: Number(form.teamId),
        },
      };

      const response = await fetch("http://localhost:8080/api/coaches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setForm(EMPTY_COACH_FORM);
      await loadData();
    } catch (err) {
      console.error("Error adding coach:", err);
      setError("Could not add coach.");
    } finally {
      setSaving(false);
    }
  }

  const filteredCoaches = useMemo(() => {
    return coaches.filter((coach) => {
      const matchesSearch =
        !search.trim() ||
        coach.name?.toLowerCase().includes(search.toLowerCase()) ||
        coach.coachCode?.toLowerCase().includes(search.toLowerCase()) ||
        coach.city?.toLowerCase().includes(search.toLowerCase()) ||
        coach.team?.name?.toLowerCase().includes(search.toLowerCase());

      const matchesTeam =
        !selectedTeam || String(coach.team?.id || "") === selectedTeam;

      return matchesSearch && matchesTeam;
    });
  }, [coaches, search, selectedTeam]);

  return (
    <AppLayout>
      <div className="coaches-page">
        <div className="coaches-hero">
          <div>
            <p className="coaches-eyebrow">Water Polo Referee System</p>
            <h1>Coaches</h1>
            <p className="coaches-subtitle">
              View and manage the coaches assigned to each team.
            </p>
          </div>

          <div className="coaches-summary-card">
            <span className="coaches-summary-label">Total coaches</span>
            <strong>{coaches.length}</strong>
          </div>
        </div>

        <div className="coaches-toolbar">
          <input
            type="text"
            placeholder="Search by coach, code, city, or team..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="coaches-search"
          />

          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="coaches-filter"
          >
            <option value="">All teams</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="coaches-message error">{error}</div>}
        {loading && <div className="coaches-message">Loading coaches...</div>}

        {!loading && (
          <div className="coaches-grid">
            <div className="coaches-list-card">
              <div className="section-header">
                <div>
                  <h2>Coach List</h2>
                  <p>{filteredCoaches.length} result(s)</p>
                </div>
              </div>

              {filteredCoaches.length === 0 ? (
                <div className="coaches-empty">No coaches found.</div>
              ) : (
                <div className="coaches-table-wrapper">
                  <table className="coaches-table">
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Team</th>
                        <th>City</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCoaches.map((coach) => (
                        <tr key={coach.id}>
                          <td>{coach.coachCode}</td>
                          <td>{coach.name}</td>
                          <td>{coach.team?.name || "-"}</td>
                          <td>{coach.city || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {isAdmin && (
              <div className="coaches-form-card">
                <div className="section-header">
                  <div>
                    <h2>Add Coach</h2>
                    <p>Only admin can add coaches.</p>
                  </div>
                </div>

                <form onSubmit={handleAddCoach} className="coaches-form">
                  <div className="form-group">
                    <label>Coach Code</label>
                    <input
                      type="text"
                      name="coachCode"
                      value={form.coachCode}
                      onChange={handleFormChange}
                      placeholder="Ex: DIN_COACH_04"
                    />
                  </div>

                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleFormChange}
                      placeholder="Coach full name"
                    />
                  </div>

                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleFormChange}
                      placeholder="Ex: Bucuresti"
                    />
                  </div>

                  <div className="form-group">
                    <label>Team</label>
                    <select
                      name="teamId"
                      value={form.teamId}
                      onChange={handleFormChange}
                    >
                      <option value="">Select a team</option>
                      {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="coaches-add-btn" disabled={saving}>
                    {saving ? "Adding..." : "Add Coach"}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default Coaches;