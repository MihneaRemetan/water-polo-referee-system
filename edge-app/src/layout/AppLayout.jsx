import Topbar from "./Topbar";

function AppLayout({ children }) {
  return (
    <>
      <Topbar />
      <main className="app-shell">
        <div className="page-wrap">{children}</div>
      </main>
    </>
  );
}

export default AppLayout;