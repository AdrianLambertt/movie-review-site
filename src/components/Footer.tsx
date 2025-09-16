import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <p className="footer-content">
        This project was possible due to the TMDB API, giving me up-to date
        ratings and film data.
      </p>
      <p className="footer-content"> Created by Adrian Lambert 2025</p>
      <div className="flex justify-center gap-2">
        <Link to="https://github.com/AdrianLambertt">
          <div>
            <img
              src="/images/github-logo.png"
              alt="gitlab icon"
              className="h-[32px]"
            />
          </div>
        </Link>

        <Link to="https://www.linkedin.com/in/adrian-lambertt/">
          <div>
            <img
              src="/images/linkedin.png"
              alt="linkedin icon"
              className="h-[32px]"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
