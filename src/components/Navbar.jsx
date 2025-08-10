import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 top-0 w-full h-min">
      <div className="flex py-[8px] items-center">
        <div className="h-8 w-auto">
          <img
            src="src/assets/react-logo.png"
            alt="Logo"
            className="h-full
          object-contain"
          />
        </div>
        <Link to="/">Home</Link> | <Link to="/discover">Discover</Link> |{" "}
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}
