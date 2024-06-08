import { Container, Row, Col } from "react-bootstrap";
// import { MailchimpForm } from "./MailchimpForm";
import {NewsletterGoogleForm} from "./Newsletter.jsx"
import logo from "../assets/img/logo.svg";
import linkedinSvg from '../assets/img/linkedin.svg';
import twitterSvg from '../assets/img/twitter.svg';
import telegramSvg from '../assets/img/telegram.svg';

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          {/* <MailchimpForm /> */}
          <NewsletterGoogleForm />
          <Col size={12} sm={6}>
            <img src={logo} alt="Logo" />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon" id="social-info">
                <a href="https://in.linkedin.com/in/rahul-anand-743046159"><img src={linkedinSvg} alt="" /></a>
                <a href="https://x.com/raccess21"><img src={twitterSvg} alt="" /></a>
                <a href="https://t.me/raccess21"><img src={telegramSvg} alt="" /></a>
            </div>
            <p>&#169; 2024. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
