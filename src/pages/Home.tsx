import { NavLink } from "react-router";

export function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <NavLink to="/events/1">
        {({ isPending }) => (
          <span>{isPending ? "loading..." : "Web Design"}</span>
        )}
      </NavLink >
      <br />
      <NavLink to="/events/2">
        {({ isPending }) => (
          <span>{isPending ? "loading..." : "Debugging"}</span>
        )}
      </NavLink >
    </>
  )
}
