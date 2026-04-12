import { useEffect, useMemo, useState } from "react";
import AppLayout from "../layout/AppLayout";
import "../styles/PlayersPage.css";

const EMPTY_FORM = {
  id: "",
  name: "",
  number: "",
  position: "",
  gender: "",
  teamId: "",
};

function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const role = localStorage.getItem("userRole");
  const isAdmin = role === "ADMIN";
  const canEdit = role === "ADMIN" || role === "REFEREE" || role === "OBSERVER";

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [playersRes, teamsRes] = await Promise.all([
        fetch("http://localhost:8080/api/players", {
          credentials: "include",
        }),
        fetch("http://localhost:8080/api/teams", {
          credentials: "include",
        }),
      ]);

      if (!playersRes.ok) {
        throw new Error("Nu am putut încărca jucătorii.");
      }

      const playersData = await playersRes.json();
      setPlayers(Array.isArray(playersData) ? playersData : []);

      if (teamsRes.ok) {
        const teamsData = await teamsRes.json();
        setTeams(Array.isArray(teamsData) ? teamsData : []);
      } else {
        setTeams([]);
      }
    } catch (err) {
      setError(err.message || "A apărut o eroare.");
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setEditingPlayer(null);
    setForm(EMPTY_FORM);
    setError("");
    setShowModal(true);
  }

  function openEditModal(player) {
    setEditingPlayer(player);
    setForm({
      id: player.id ?? "",
      name: player.name ?? "",
      number: player.number ?? "",
      position: player.position ?? "",
      gender: player.gender ?? "",
      teamId: player.team?.id ?? "",
    });
    setError("");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingPlayer(null);
    setForm(EMPTY_FORM);
    setError("");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateForm() {
    if (!form.name.trim()) return "Introdu numele jucătorului.";
    if (form.number === "" || Number(form.number) < 1 || Number(form.number) > 99) {
      return "Numărul jucătorului trebuie să fie între 1 și 99.";
    }
    if (!form.position.trim()) return "Introdu poziția.";
    if (!form.gender.trim()) return "Selectează genul.";
    if (!form.teamId) return "Selectează echipa.";
    if (isAdmin && !editingPlayer && form.id !== "" && Number(form.id) < 1) {
      return "ID-ul trebuie să fie mai mare decât 0.";
    }
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const selectedTeam = teams.find((t) => String(t.id) === String(form.teamId));
      if (!selectedTeam) {
        throw new Error("Echipa selectată nu există.");
      }

      const payload = {
        ...(editingPlayer ? {} : { id: Number(form.id) || undefined }),
        name: form.name.trim(),
        number: Number(form.number),
        position: form.position.trim(),
        gender: form.gender,
        team: {
          id: selectedTeam.id,
          name: selectedTeam.name,
          shortName: selectedTeam.shortName,
        },
      };

      const url = editingPlayer
        ? `http://localhost:8080/api/players/${editingPlayer.id}`
        : "http://localhost:8080/api/players";

      const method = editingPlayer ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Nu am putut salva jucătorul.");
      }

      await loadData();
      closeModal();
    } catch (err) {
      setError(err.message || "A apărut o eroare la salvare.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!isAdmin) return;

    const confirmed = window.confirm("Sigur vrei să ștergi acest jucător?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:8080/api/players/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Nu am putut șterge jucătorul.");
      }

      await loadData();
    } catch (err) {
      setError(err.message || "A apărut o eroare la ștergere.");
    }
  }

  const filteredPlayers = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) return players;

    return players.filter((p) => {
      const name = p.name?.toLowerCase() || "";
      const position = p.position?.toLowerCase() || "";
      const gender = p.gender?.toLowerCase() || "";
      const teamName = p.team?.name?.toLowerCase() || "";
      const playerCode = p.playerCode?.toLowerCase() || "";
      const id = String(p.id ?? "");
      const number = String(p.number ?? "");

      return (
        name.includes(term) ||
        position.includes(term) ||
        gender.includes(term) ||
        teamName.includes(term) ||
        playerCode.includes(term) ||
        id.includes(term) ||
        number.includes(term)
      );
    });
  }, [players, query]);

  return (
    <AppLayout>
      <div className="players-page">
        <div className="players-hero">
          <div>
            <p className="players-eyebrow">Squad management</p>
            <h1>Players</h1>
            <p className="players-subtitle">
            Manage the player database. The admin can add and delete players, while the other officials can only edit.
            </p>
          </div>

          <div className="players-hero-actions">
            <div className="players-count-card">
              <span>Total players</span>
              <strong>{players.length}</strong>
            </div>

            {isAdmin && (
              <button className="players-add-btn" onClick={openAddModal}>
                + Add player
              </button>
            )}
          </div>
        </div>

        <div className="players-toolbar">
          <input
            type="text"
            placeholder="Search by name, code, team, position..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="players-search"
          />
        </div>

        {error && <div className="players-error">{error}</div>}

        <div className="players-table-card">
          {loading ? (
            <div className="players-empty">Loading players...</div>
          ) : filteredPlayers.length === 0 ? (
            <div className="players-empty">No players found.</div>
          ) : (
            <div className="players-table-wrapper">
              <table className="players-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Player Code</th>
                    <th>Name</th>
                    <th>No.</th>
                    <th>Position</th>
                    <th>Gender</th>
                    <th>Team</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPlayers.map((player) => (
                    <tr key={player.id}>
                      <td>{player.id}</td>
                      <td>
                        <span className="player-code-badge">
                          {player.playerCode || "-"}
                        </span>
                      </td>
                      <td>{player.name}</td>
                      <td>{player.number}</td>
                      <td>{player.position}</td>
                      <td>{player.gender}</td>
                      <td>{player.team?.name || "-"}</td>
                      <td>
                        <div className="players-actions">
                          {canEdit && (
                            <button
                              className="action-btn edit-btn"
                              onClick={() => openEditModal(player)}
                            >
                              Edit
                            </button>
                          )}

                          {isAdmin && (
                            <button
                              className="action-btn delete-btn"
                              onClick={() => handleDelete(player.id)}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showModal && (
          <div className="players-modal-overlay" onClick={closeModal}>
            <div className="players-modal" onClick={(e) => e.stopPropagation()}>
              <div className="players-modal-header">
                <h2>{editingPlayer ? "Edit player" : "Add player"}</h2>
                <button className="players-close-btn" onClick={closeModal}>
                  ×
                </button>
              </div>

              <form className="players-form" onSubmit={handleSubmit}>
                {!editingPlayer && isAdmin && (
                  <div className="form-group">
                    <label>ID</label>
                    <input
                      type="number"
                      name="id"
                      value={form.id}
                      onChange={handleChange}
                      placeholder="Leave empty if backend auto-generates it"
                    />
                  </div>
                )}

                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Number</label>
                    <input
                      type="number"
                      name="number"
                      min="1"
                      max="99"
                      value={form.number}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Position</label>
                    <input
                      type="text"
                      name="position"
                      value={form.position}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="form-group form-group-full">
                    <label>Team</label>
                    <select
                      name="teamId"
                      value={form.teamId}
                      onChange={handleChange}
                    >
                      <option value="">Select team</option>
                      {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name} {team.shortName ? `(${team.shortName})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {error && <div className="players-error modal-error">{error}</div>}

                <div className="players-form-actions">
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="primary-btn" disabled={submitting}>
                    {submitting
                      ? "Saving..."
                      : editingPlayer
                      ? "Save changes"
                      : "Create player"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default PlayersPage;