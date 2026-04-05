import { useEffect, useMemo, useState } from "react";
import AppLayout from "../layout/AppLayout";
import heroImage from "../assets/hero.png";

const EMPTY_REFEREE_FORM = {
  id: "",
  name: "",
  city: "",
  gender: "",
  rank: "",
  password: "",
};

const EMPTY_OBSERVER_FORM = {
  id: "",
  name: "",
  city: "",
  gender: "",
  rank: "",
  password: "",
};

function AdminPage() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const [referees, setReferees] = useState([]);
  const [observers, setObservers] = useState([]);

  const [searchReferees, setSearchReferees] = useState("");
  const [searchObservers, setSearchObservers] = useState("");

  const [activeTab, setActiveTab] = useState("referees");

  const [formType, setFormType] = useState(null); // "referee" | "observer"
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const [refereeForm, setRefereeForm] = useState(EMPTY_REFEREE_FORM);
  const [observerForm, setObserverForm] = useState(EMPTY_OBSERVER_FORM);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  useEffect(() => {
    if (role) {
      loadAllData();
    }
  }, [role]);

  const loadCurrentUser = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/me", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to load current user.");
      }

      const data = await res.json();
      setRole(data?.role || null);
    } catch (error) {
      console.error(error);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  const loadAllData = async () => {
    await Promise.all([loadReferees(), loadObservers()]);
  };

  const loadReferees = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/admin/referees", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to load referees.");
      }

      const data = await res.json();
      setReferees(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setReferees([]);
    }
  };

  const loadObservers = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/admin/observers", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to load observers.");
      }

      const data = await res.json();
      setObservers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setObservers([]);
    }
  };

  const isAdmin = role === "ADMIN";

  const filteredReferees = useMemo(() => {
    const term = searchReferees.trim().toLowerCase();

    return referees.filter((referee) => {
      return (
        String(referee.id ?? "").toLowerCase().includes(term) ||
        String(referee.name ?? "").toLowerCase().includes(term) ||
        String(referee.city ?? "").toLowerCase().includes(term) ||
        String(referee.gender ?? "").toLowerCase().includes(term) ||
        String(referee.rank ?? "").toLowerCase().includes(term)
      );
    });
  }, [referees, searchReferees]);

  const filteredObservers = useMemo(() => {
    const term = searchObservers.trim().toLowerCase();

    return observers.filter((observer) => {
      return (
        String(observer.id ?? "").toLowerCase().includes(term) ||
        String(observer.name ?? "").toLowerCase().includes(term) ||
        String(observer.city ?? "").toLowerCase().includes(term) ||
        String(observer.gender ?? "").toLowerCase().includes(term) ||
        String(observer.rank ?? "").toLowerCase().includes(term)
      );
    });
  }, [observers, searchObservers]);

  const getAvatar = (name) => {
    const parts = String(name || "")
      .trim()
      .split(" ")
      .filter(Boolean);

    if (parts.length === 0) return "??";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

    return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
  };

  const resetForms = () => {
    setRefereeForm(EMPTY_REFEREE_FORM);
    setObserverForm(EMPTY_OBSERVER_FORM);
    setEditingId(null);
    setFormError("");
    setFormLoading(false);
  };

  const openAddReferee = () => {
    if (!isAdmin) return;
    resetForms();
    setFormType("referee");
    setIsFormOpen(true);
  };

  const openAddObserver = () => {
    if (!isAdmin) return;
    resetForms();
    setFormType("observer");
    setIsFormOpen(true);
  };

  const openEditReferee = (referee) => {
    if (!isAdmin) return;

    setEditingId(referee.id);
    setFormType("referee");
    setFormError("");
    setRefereeForm({
      id: referee.id ?? "",
      name: referee.name ?? "",
      city: referee.city ?? "",
      gender: referee.gender ?? "",
      rank: referee.rank ?? "",
      password: "",
    });
    setIsFormOpen(true);
  };

  const openEditObserver = (observer) => {
    if (!isAdmin) return;

    setEditingId(observer.id);
    setFormType("observer");
    setFormError("");
    setObserverForm({
      id: observer.id ?? "",
      name: observer.name ?? "",
      city: observer.city ?? "",
      gender: observer.gender ?? "",
      rank: observer.rank ?? "",
      password: "",
    });
    setIsFormOpen(true);
  };

  const closeFormModal = () => {
    setIsFormOpen(false);
    setFormType(null);
    resetForms();
  };

  const openViewModal = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
    setIsViewOpen(true);
  };

  const closeViewModal = () => {
    setIsViewOpen(false);
    setSelectedItem(null);
    setSelectedType(null);
  };

  const handleRefereeFormChange = (field, value) => {
    if (!isAdmin) return;

    setRefereeForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleObserverFormChange = (field, value) => {
    if (!isAdmin) return;

    setObserverForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveReferee = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    setFormError("");
    setFormLoading(true);

    const payload = {
      id: refereeForm.id === "" ? null : Number(refereeForm.id),
      name: refereeForm.name.trim(),
      city: refereeForm.city.trim() || null,
      gender: refereeForm.gender || null,
      rank: refereeForm.rank.trim() || null,
      password: refereeForm.password.trim(),
    };

    if (!payload.id || !payload.name) {
      setFormError("ID and name are required.");
      setFormLoading(false);
      return;
    }

    if (!editingId && !payload.password) {
      setFormError("Password is required when creating a referee.");
      setFormLoading(false);
      return;
    }

    try {
      const url = editingId
        ? `http://localhost:8080/api/admin/referees/${editingId}`
        : "http://localhost:8080/api/admin/referees";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      let data = null;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      if (!res.ok) {
        setFormError(
          typeof data === "string"
            ? data
            : data?.message || "Could not save referee."
        );
        setFormLoading(false);
        return;
      }

      await loadReferees();
      closeFormModal();
    } catch (error) {
      console.error(error);
      setFormError("Connection error while saving referee.");
      setFormLoading(false);
    }
  };

  const handleSaveObserver = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    setFormError("");
    setFormLoading(true);

    const payload = {
      id: observerForm.id === "" ? null : Number(observerForm.id),
      name: observerForm.name.trim(),
      city: observerForm.city.trim() || null,
      gender: observerForm.gender || null,
      rank: observerForm.rank.trim() || null,
      password: observerForm.password.trim(),
    };

    if (!payload.id || !payload.name) {
      setFormError("ID and name are required.");
      setFormLoading(false);
      return;
    }

    if (!editingId && !payload.password) {
      setFormError("Password is required when creating an observer.");
      setFormLoading(false);
      return;
    }

    try {
      const url = editingId
        ? `http://localhost:8080/api/admin/observers/${editingId}`
        : "http://localhost:8080/api/admin/observers";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      let data = null;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      if (!res.ok) {
        setFormError(
          typeof data === "string"
            ? data
            : data?.message || "Could not save observer."
        );
        setFormLoading(false);
        return;
      }

      await loadObservers();
      closeFormModal();
    } catch (error) {
      console.error(error);
      setFormError("Connection error while saving observer.");
      setFormLoading(false);
    }
  };

  const handleDeleteReferee = async (id) => {
    if (!isAdmin) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this referee?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:8080/api/admin/referees/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text();
        window.alert(text || "Could not delete referee.");
        return;
      }

      await loadReferees();
    } catch (error) {
      console.error(error);
      window.alert("Connection error while deleting referee.");
    }
  };

  const handleDeleteObserver = async (id) => {
    if (!isAdmin) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this observer?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:8080/api/admin/observers/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text();
        window.alert(text || "Could not delete observer.");
        return;
      }

      await loadObservers();
    } catch (error) {
      console.error(error);
      window.alert("Connection error while deleting observer.");
    }
  };

  const renderRoleBadge = (label) => (
    <span className="admin-role-chip">{label}</span>
  );

  if (loading) {
    return (
      <AppLayout>
        <div className="panel" style={{ padding: "24px" }}>
          Loading administration dashboard...
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="admin-page">
        {!isAdmin && (
          <div className="admin-view-badge">VIEW MODE ({role || "USER"})</div>
        )}

        <section className="admin-hero panel">
          <div className="admin-hero-content">
            <div className="admin-hero-text">
              <span className="admin-eyebrow">FRP Administration</span>
              <h1 className="admin-title">Officials administration dashboard</h1>
              <p className="admin-subtitle">
                Manage referees and observers, keep official accounts synchronized,
                and control federation access from one place.
              </p>

              <div className="admin-hero-actions">
                {isAdmin && (
                  <>
                    <button
                      type="button"
                      className="app-button primary"
                      onClick={openAddReferee}
                    >
                      + Add referee
                    </button>

                    <button
                      type="button"
                      className="app-button secondary"
                      onClick={openAddObserver}
                    >
                      + Add observer
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="admin-hero-visual">
              <img
                src={heroImage}
                alt="FRP administration"
                className="admin-hero-image"
              />
            </div>
          </div>
        </section>

        <section className="admin-stats-grid">
          <div className="panel admin-stat-card">
            <div className="admin-stat-label">Total referees</div>
            <div className="admin-stat-value">{referees.length}</div>
            <div className="admin-stat-note">Official referee accounts</div>
          </div>

          <div className="panel admin-stat-card">
            <div className="admin-stat-label">Total observers</div>
            <div className="admin-stat-value">{observers.length}</div>
            <div className="admin-stat-note">Official observer accounts</div>
          </div>

          <div className="panel admin-stat-card">
            <div className="admin-stat-label">Total officials</div>
            <div className="admin-stat-value">
              {referees.length + observers.length}
            </div>
            <div className="admin-stat-note">Federation system access</div>
          </div>

          <div className="panel admin-stat-card">
            <div className="admin-stat-label">Current mode</div>
            <div className="admin-stat-value">{isAdmin ? "ADMIN" : "VIEW"}</div>
            <div className="admin-stat-note">
              {isAdmin ? "Full control" : "Read only"}
            </div>
          </div>
        </section>

        <section className="panel admin-table-card" style={{ marginBottom: 20 }}>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              className={`app-button ${activeTab === "referees" ? "primary" : "secondary"}`}
              onClick={() => setActiveTab("referees")}
            >
              Referees
            </button>

            <button
              type="button"
              className={`app-button ${activeTab === "observers" ? "primary" : "secondary"}`}
              onClick={() => setActiveTab("observers")}
            >
              Observers
            </button>
          </div>
        </section>

        {activeTab === "referees" && (
          <section className="panel admin-table-card">
            <div className="admin-table-header">
              <div>
                <h2 className="section-title" style={{ marginBottom: 6 }}>
                  Referees
                </h2>
                <p className="section-subtitle" style={{ marginBottom: 0 }}>
                  Manage referee accounts and their official details.
                </p>
              </div>

              <div className="admin-table-header-actions">
                <span className="admin-total-pill">
                  Total: {filteredReferees.length}
                </span>

                {isAdmin && (
                  <button
                    type="button"
                    className="app-button primary"
                    onClick={openAddReferee}
                  >
                    + Add referee
                  </button>
                )}
              </div>
            </div>

            <div className="admin-toolbar">
              <div className="admin-toolbar-left">
                <label className="admin-toolbar-label">
                  Search:
                  <input
                    type="text"
                    className="app-input admin-search-input"
                    value={searchReferees}
                    onChange={(e) => setSearchReferees(e.target.value)}
                    placeholder="ID, name, city, gender, rank"
                  />
                </label>
              </div>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>City</th>
                    <th>Gender</th>
                    <th>Rank</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredReferees.length === 0 ? (
                    <tr>
                      <td colSpan="8">
                        <div className="admin-empty-state">No referees found.</div>
                      </td>
                    </tr>
                  ) : (
                    filteredReferees.map((referee) => (
                      <tr key={referee.id}>
                        <td>
                          <div className="admin-avatar">
                            {getAvatar(referee.name)}
                          </div>
                        </td>
                        <td>{referee.id}</td>
                        <td>{referee.name || "—"}</td>
                        <td>{referee.city || "—"}</td>
                        <td>{referee.gender || "—"}</td>
                        <td>{referee.rank || "—"}</td>
                        <td>{renderRoleBadge("REFEREE")}</td>
                        <td>
                          <div className="admin-actions">
                            <button
                              type="button"
                              className="admin-icon-btn view"
                              title="View"
                              onClick={() => openViewModal(referee, "referee")}
                            >
                              👁
                            </button>

                            {isAdmin && (
                              <>
                                <button
                                  type="button"
                                  className="admin-icon-btn edit"
                                  title="Edit"
                                  onClick={() => openEditReferee(referee)}
                                >
                                  ✎
                                </button>

                                <button
                                  type="button"
                                  className="admin-icon-btn folder"
                                  title="Delete"
                                  onClick={() => handleDeleteReferee(referee.id)}
                                >
                                  🗑
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === "observers" && (
          <section className="panel admin-table-card">
            <div className="admin-table-header">
              <div>
                <h2 className="section-title" style={{ marginBottom: 6 }}>
                  Observers
                </h2>
                <p className="section-subtitle" style={{ marginBottom: 0 }}>
                  Manage observer accounts and their official details.
                </p>
              </div>

              <div className="admin-table-header-actions">
                <span className="admin-total-pill">
                  Total: {filteredObservers.length}
                </span>

                {isAdmin && (
                  <button
                    type="button"
                    className="app-button primary"
                    onClick={openAddObserver}
                  >
                    + Add observer
                  </button>
                )}
              </div>
            </div>

            <div className="admin-toolbar">
              <div className="admin-toolbar-left">
                <label className="admin-toolbar-label">
                  Search:
                  <input
                    type="text"
                    className="app-input admin-search-input"
                    value={searchObservers}
                    onChange={(e) => setSearchObservers(e.target.value)}
                    placeholder="ID, name, city, gender, rank"
                  />
                </label>
              </div>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>City</th>
                    <th>Gender</th>
                    <th>Rank</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredObservers.length === 0 ? (
                    <tr>
                      <td colSpan="8">
                        <div className="admin-empty-state">No observers found.</div>
                      </td>
                    </tr>
                  ) : (
                    filteredObservers.map((observer) => (
                      <tr key={observer.id}>
                        <td>
                          <div className="admin-avatar">
                            {getAvatar(observer.name)}
                          </div>
                        </td>
                        <td>{observer.id}</td>
                        <td>{observer.name || "—"}</td>
                        <td>{observer.city || "—"}</td>
                        <td>{observer.gender || "—"}</td>
                        <td>{observer.rank || "—"}</td>
                        <td>{renderRoleBadge("OBSERVER")}</td>
                        <td>
                          <div className="admin-actions">
                            <button
                              type="button"
                              className="admin-icon-btn view"
                              title="View"
                              onClick={() => openViewModal(observer, "observer")}
                            >
                              👁
                            </button>

                            {isAdmin && (
                              <>
                                <button
                                  type="button"
                                  className="admin-icon-btn edit"
                                  title="Edit"
                                  onClick={() => openEditObserver(observer)}
                                >
                                  ✎
                                </button>

                                <button
                                  type="button"
                                  className="admin-icon-btn folder"
                                  title="Delete"
                                  onClick={() => handleDeleteObserver(observer.id)}
                                >
                                  🗑
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {isFormOpen && formType === "referee" && isAdmin && (
          <div style={modalOverlayStyle}>
            <div style={modalStyle} className="panel">
              <div style={modalHeaderStyle}>
                <div>
                  <h2 className="section-title" style={{ marginBottom: 6 }}>
                    {editingId ? "Edit referee" : "Add referee"}
                  </h2>
                  <p className="section-subtitle" style={{ marginBottom: 0 }}>
                    Manage referee identity and login access.
                  </p>
                </div>
              </div>

              {formError && (
                <div
                  style={{
                    marginBottom: 16,
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "rgba(255, 80, 80, 0.12)",
                    border: "1px solid rgba(255, 80, 80, 0.28)",
                  }}
                >
                  {formError}
                </div>
              )}

              <form onSubmit={handleSaveReferee}>
                <div style={formGridStyle}>
                  <input
                    className="app-input"
                    type="number"
                    placeholder="ID"
                    value={refereeForm.id}
                    disabled={!!editingId}
                    onChange={(e) => handleRefereeFormChange("id", e.target.value)}
                  />

                  <input
                    className="app-input"
                    placeholder="Full name"
                    value={refereeForm.name}
                    onChange={(e) =>
                      handleRefereeFormChange("name", e.target.value)
                    }
                  />

                  <input
                    className="app-input"
                    placeholder="City"
                    value={refereeForm.city}
                    onChange={(e) =>
                      handleRefereeFormChange("city", e.target.value)
                    }
                  />

                  <select
                    className="app-select"
                    value={refereeForm.gender}
                    onChange={(e) =>
                      handleRefereeFormChange("gender", e.target.value)
                    }
                  >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>

                  <input
                    className="app-input"
                    placeholder="Rank"
                    value={refereeForm.rank}
                    onChange={(e) =>
                      handleRefereeFormChange("rank", e.target.value)
                    }
                  />

                  <input
                    className="app-input"
                    type="password"
                    placeholder={
                      editingId
                        ? "New password (leave blank to keep current)"
                        : "Password"
                    }
                    value={refereeForm.password}
                    onChange={(e) =>
                      handleRefereeFormChange("password", e.target.value)
                    }
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    justifyContent: "flex-end",
                    marginTop: 20,
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="button"
                    className="app-button secondary"
                    onClick={closeFormModal}
                    disabled={formLoading}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="app-button primary"
                    disabled={formLoading}
                  >
                    {formLoading
                      ? "Saving..."
                      : editingId
                      ? "Save changes"
                      : "Add referee"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isFormOpen && formType === "observer" && isAdmin && (
          <div style={modalOverlayStyle}>
            <div style={modalStyle} className="panel">
              <div style={modalHeaderStyle}>
                <div>
                  <h2 className="section-title" style={{ marginBottom: 6 }}>
                    {editingId ? "Edit observer" : "Add observer"}
                  </h2>
                  <p className="section-subtitle" style={{ marginBottom: 0 }}>
                    Manage observer identity and login access.
                  </p>
                </div>
              </div>

              {formError && (
                <div
                  style={{
                    marginBottom: 16,
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "rgba(255, 80, 80, 0.12)",
                    border: "1px solid rgba(255, 80, 80, 0.28)",
                  }}
                >
                  {formError}
                </div>
              )}

              <form onSubmit={handleSaveObserver}>
                <div style={formGridStyle}>
                  <input
                    className="app-input"
                    type="number"
                    placeholder="ID"
                    value={observerForm.id}
                    disabled={!!editingId}
                    onChange={(e) => handleObserverFormChange("id", e.target.value)}
                  />

                  <input
                    className="app-input"
                    placeholder="Full name"
                    value={observerForm.name}
                    onChange={(e) =>
                      handleObserverFormChange("name", e.target.value)
                    }
                  />

                  <input
                    className="app-input"
                    placeholder="City"
                    value={observerForm.city}
                    onChange={(e) =>
                      handleObserverFormChange("city", e.target.value)
                    }
                  />

                  <select
                    className="app-select"
                    value={observerForm.gender}
                    onChange={(e) =>
                      handleObserverFormChange("gender", e.target.value)
                    }
                  >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>

                  <input
                    className="app-input"
                    placeholder="Rank"
                    value={observerForm.rank}
                    onChange={(e) =>
                      handleObserverFormChange("rank", e.target.value)
                    }
                  />

                  <input
                    className="app-input"
                    type="password"
                    placeholder={
                      editingId
                        ? "New password (leave blank to keep current)"
                        : "Password"
                    }
                    value={observerForm.password}
                    onChange={(e) =>
                      handleObserverFormChange("password", e.target.value)
                    }
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    justifyContent: "flex-end",
                    marginTop: 20,
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="button"
                    className="app-button secondary"
                    onClick={closeFormModal}
                    disabled={formLoading}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="app-button primary"
                    disabled={formLoading}
                  >
                    {formLoading
                      ? "Saving..."
                      : editingId
                      ? "Save changes"
                      : "Add observer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isViewOpen && selectedItem && (
          <div style={modalOverlayStyle}>
            <div style={modalStyle} className="panel">
              <div style={modalHeaderStyle}>
                <div>
                  <h2 className="section-title" style={{ marginBottom: 6 }}>
                    {selectedType === "referee" ? "Referee details" : "Observer details"}
                  </h2>
                  <p className="section-subtitle" style={{ marginBottom: 0 }}>
                    Full information for the selected official.
                  </p>
                </div>

                <button
                  type="button"
                  className="app-button secondary"
                  onClick={closeViewModal}
                >
                  Close
                </button>
              </div>

              <div style={detailsGridStyle}>
                <Detail label="ID" value={selectedItem.id} />
                <Detail label="Name" value={selectedItem.name} />
                <Detail label="City" value={selectedItem.city} />
                <Detail label="Gender" value={selectedItem.gender} />
                <Detail label="Rank" value={selectedItem.rank} />
                <Detail
                  label="Role"
                  value={selectedType === "referee" ? "REFEREE" : "OBSERVER"}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 12,
                  marginTop: 20,
                  flexWrap: "wrap",
                }}
              >
                {isAdmin && selectedType === "referee" && (
                  <button
                    type="button"
                    className="app-button secondary"
                    onClick={() => {
                      closeViewModal();
                      openEditReferee(selectedItem);
                    }}
                  >
                    Edit
                  </button>
                )}

                {isAdmin && selectedType === "observer" && (
                  <button
                    type="button"
                    className="app-button secondary"
                    onClick={() => {
                      closeViewModal();
                      openEditObserver(selectedItem);
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

function Detail({ label, value }) {
  return (
    <div
      style={{
        padding: "14px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          fontSize: 13,
          opacity: 0.7,
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 16, fontWeight: 600 }}>{value || "—"}</div>
    </div>
  );
}

const modalOverlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(8, 15, 35, 0.72)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
  zIndex: 9999,
};

const modalStyle = {
  width: "100%",
  maxWidth: "980px",
  maxHeight: "90vh",
  overflowY: "auto",
  borderRadius: "24px",
  padding: "24px",
};

const modalHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "16px",
  marginBottom: "20px",
  flexWrap: "wrap",
};

const formGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "14px",
};

const detailsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "14px",
};

export default AdminPage;