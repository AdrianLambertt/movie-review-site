import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex bg-gray-800 top-0 w-full h-[58px] p-2 items-center">
      <div className="flex  justify-between gap-[12px]">
        <Link to="/">
          <div className="w-auto">
            <img
              src="/images/react-logo.png"
              alt="Logo"
              className="h-full
          object-contain"
            />
          </div>
        </Link>
        {/* <input
          type="text"
          id="movieSearch"
          placeholder="Search..."
          className="block h-[32px] bg-gray-700 rounded-md border-2 w-[400px] border-solid text-white"
        /> */}
        {/* <Link className="navbar-item" to="/about">
          About
        </Link> */}
      </div>
      <Link className="navbar-item ml-auto" to="/">
        Sign In / Register
      </Link>
    </nav>
  );
}
