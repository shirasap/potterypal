import { Link } from "react-router-dom";
import "./Header.scss"

export default function Header() {
  return (
    <>
      <div className="header">
        <Link to="/">
          <h1 className="header__title">PotteryPal</h1>
        </Link>
        <p className="header__login">Login</p>
      </div>
    </>
  );
}
