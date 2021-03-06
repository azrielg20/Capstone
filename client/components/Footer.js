import React from 'react'
import {GitHub} from 'react-feather'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="f jcb aic">
      <div className="footer-links">
        <Link to="/about" className="footer-link">
          About
        </Link>
        <a href="mailto: emailomakase@gmail.com" className="footer-link">
          Email Us
        </a>
      </div>

      <div>
        <a
          href="https://github.com/2011-Scorpio/Capstone"
          className="footer-github f jcc aic"
          target="_blank"
          rel="noreferrer"
          alt="project github"
        >
          <GitHub className="footer-github-icon" />
        </a>
      </div>
    </footer>
  )
}

export default Footer
