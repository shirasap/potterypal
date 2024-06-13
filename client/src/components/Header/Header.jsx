import { Link } from "react-router-dom";
import "./Header.scss"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState(sessionStorage.getItem("login"))
  console.log(loginStatus)

  function handleLogout(){
    sessionStorage.setItem("login", "false")
    setLoginStatus("false")
    navigate("/login")
  }
  return (
    <>
      <div className="header">
        <Link to="/">
          <h1 className="header__title">PotteryPal</h1>
        </Link>
        { loginStatus==="true" ? <button className="header__login" onClick={handleLogout}>Logout</button> :    null}

      </div>
    </>
  );
}
