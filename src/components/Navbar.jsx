import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 fixed top-0 w-full">
      <div className="flex py-[50px] justify-left items-center">
        <div className="h-8 w-auto">
          <img
            src="src/assets/react-logo.png"
            alt="Logo"
            className="h-full
          object-contain"
          />
        </div>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> |
        <Link to="/review"> Reviews</Link>
      </div>
    </nav>
  );
}
