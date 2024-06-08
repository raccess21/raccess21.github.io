import { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import linkedinSvg from '../assets/img/linkedin.svg';
import twitterSvg from '../assets/img/twitter.svg';
import telegramSvg from '../assets/img/telegram.svg';
import { HashLink } from 'react-router-hash-link';
import {
  BrowserRouter as Router
} from "react-router-dom";

export const NavBar = () => {
  const [isShown, setIsShown] = useState(true);
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    const checkDimensions = () => {
      if(divRef.current){
        // const {offsetWidth: width, offsetHeight: height} = divRef.current;
        // const ratio = width / height;
        setIsShown(window.innerWidth > 1000);
        console.log(isShown);
      }
    }
    
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", checkDimensions);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkDimensions);
    }
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              <Nav.Link href="articles/" className={activeLink === 'articles' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('articles')}>Articles</Nav.Link>
              <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon" style={{display: isShown? "block": "none"}}>
                <a href="https://in.linkedin.com/in/rahul-anand-743046159"><img src={linkedinSvg} alt="" /></a>
                <a href="https://x.com/raccess21"><img src={twitterSvg} alt="" /></a>
                <a href="https://t.me/raccess21"><img src={telegramSvg} alt="" /></a>
              </div>
              <div className="social-icon" style={{display: isShown? "none": "block"}}>
                <a href="#social-info">
                  🔔<img src={telegramSvg} alt="" />
                </a>
              </div>
              <HashLink to='#connect'>
                <button className="connect-button"><span>Let's Connect</span></button>
              </HashLink>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  )
}
