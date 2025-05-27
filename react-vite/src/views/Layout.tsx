import { NavLink, Outlet } from "react-router";

export default function Home() {
  return (
    <div>
      <nav style={{ display: "flex", gap: "10px" }}>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/about" end>
          About
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
