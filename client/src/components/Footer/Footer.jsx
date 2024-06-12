import "./Footer.scss"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer__socials">
          <h2 className="footer__heading">Get in touch</h2>
          <Link to="https://www.linkedin.com/in/shirasa-p-300486133/">
          <LinkedInIcon />
          </Link>
          <Link to="https://github.com/shirasap">
          <GitHubIcon/>
          </Link>

        </div>
        <p className="footer__text">© PotteryPal. All Rights Reserved.</p>
      </div>
    </>
  );
}
