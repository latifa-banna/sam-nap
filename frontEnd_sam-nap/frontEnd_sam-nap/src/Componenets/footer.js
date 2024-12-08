import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import './cssComponenets/footer.css'
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__left">
        <h3 className="footer__text">Contacts</h3>
        <p className="footer__text">Douar zaouia commune tnine aglou, tiznit, Maroc</p>
        <p className="footer__text">+212528613223</p>
        <p className="footer__text">sam.nap.sarl@gmail.com</p>
      </div>
      <div className="footer__center">
        <p className="footer__text">Legal Information Privacy Policy</p>
        <p className="footer__text">®2023 Sam-Nap – All rights reserved.</p>
      </div>
      <div className="footer__right">
        <h3 className="footer__text">Follow us!</h3>
        <a href="https://www.facebook.com/samnap.sarl" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="footer__icon" />
        </a>
        <a href="https://www.instagram.com/samnap.sarl/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="footer__icon" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;