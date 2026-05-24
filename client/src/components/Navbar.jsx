import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/logs", label: "Log Analyzer" },
    { path: "/alerts", label: "Alerts" },
    { path: "/history", label: "History" }
  ];

  return (
    <nav className="border-b border-zinc-800 bg-zinc-900 px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-cyan-400">
          SysWatch
        </h1>

        <div className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`transition hover:text-cyan-400 ${
                location.pathname === item.path
                  ? "text-cyan-400"
                  : "text-zinc-300"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;