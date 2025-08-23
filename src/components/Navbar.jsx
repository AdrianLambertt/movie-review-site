import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex bg-gray-800 top-0 w-full h-[58px] p-2 items-center">
      <div className="flex  justify-between gap-[12px]">
        <Link to="/">
          <div className="w-auto">
            <img
              src="src/assets/react-logo.png"
              alt="Logo"
              className="h-full
          object-contain"
            />
          </div>
        </Link>
        <select
          id="filmRating"
          className="h-[32px] block rounded-md border-2 border-solid text-white"
        >
          <option value="rating">Rating</option>
          <option value="oneStar">One Star</option>
          <option value="twoStar">Two Star</option>
          <option value="threeStar">Three Star</option>
          <option value="fourStar">Four Star</option>
          <option value="fiveStar">Five Star</option>
        </select>
        <select
          id="filmGenre"
          className="block h-[32px] rounded-md border-2 border-solid text-white"
        >
          <option value="genre">Genre</option>
          <option value="oneStar">Genre Option</option>
          <option value="twoStar">Genre Option</option>
          <option value="threeStar">Genre Option</option>
          <option value="fourStar">Genre Option</option>
          <option value="fiveStar">Genre Option</option>
        </select>
        <input
          type="text"
          id="filmSearch"
          placeholder="Search..."
          className="block h-[32px] bg-gray-700 rounded-md border-2 w-[400px] border-solid text-white"
        />
        <Link className="text-white" to="/about">
          About
        </Link>
      </div>
      <Link className="ml-auto text-white" to="/">
        Sign In / Register
      </Link>
    </nav>
  );
}
