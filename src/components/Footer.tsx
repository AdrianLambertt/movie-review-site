import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer">
      <div className="flex justify-center mb-3">
        <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer">
          <img
            src="/images/tmdb-logo.svg"
            alt="TMDB logo"
            className="h-[32px]"
          />
        </a>
      </div>
      <p className="footer-content">
        This website uses TMDB and the TMDB APIs but is not endorsed, certified,
        or otherwise approved by TMDB. The TMDB logo does not imply endorsement.
      </p>
      <p className="footer-content"> Created by Adrian Lambert 2026</p>
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
