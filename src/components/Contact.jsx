import React, { useState } from "react";
// import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import { googleFormsToJson } from "react-google-forms-hooks";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
// express cors nodemailer -> form contact submit

export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
      setFormDetails({
        ...formDetails,
        [category]: value
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetails),
    });
    setButtonText("Send");
    
    let result = await response.json();
    setFormDetails(formInitialDetails);
    if (result.code == 200) {
      setStatus({ succes: true, message: 'Message sent successfully'});
    } else {
      setStatus({ succes: false, message: 'Something went wrong, please try again later.'});
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2>Get In Touch</h2>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" value={formDetails.lasttName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)}/>
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)}/>
                    </Col>
                    <Col size={12} className="px-1">
                      <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                      <button type="submit"><span>{buttonText}</span></button>
                    </Col>
                    {
                      status.message &&
                      <Col>
                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                      </Col>
                    }
                  </Row>
                </form>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}


export const ContactGoogleForm = () =>{
  const [submit, setSubmit] = useState(false);
  const formInitialState = {  
    phone: "", //9911"">
    fName: "", //first" name">
    lName: "", //last" name">
    mes: "", //message"">
    email: "" //hi"@gmail.com">
  };

  const formMap = {
    phone: "entry.456044103", //9911"">
    fName: "entry.1964983302", //first" name">
    lName: "entry.2075805757", //last" name">
    mes: "entry.2089141021", //message"">
    email: "emailAddress" //hi"@gmail.com">
    // <input type="hidden" name="dlut" value="1717755279087">
    // <input type="hidden" name="hud" value="true">
  };

  const [formData, setFormData] = useState(formInitialState);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (key, e) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: e.target.value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending");
    setSubmit(true);

    let url = `https://docs.google.com/forms/u/0/d/e/1FAIpQLSdnOPO2v_Vis5X91Gn2cEyHoFR7m7eaQ3UB3eyRcW5ImXhZnQ/formResponse?${formMap.phone}=${formData.phone}&${formMap.fName}=${formData.fName}&${formMap.lName}=${formData.lName}&${formMap.mes}=${formData.mes}&${formMap.email}=${formData.email}`; 
    
    setButtonText("Send");
    setFormDetails(formInitialDetails);
    
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    console.log(result.JSON());
    if (result.code == 200) {
      setStatus({ succes: true, message: 'Message sent successfully'});
    } else {
      setStatus({ succes: false, message: 'Something went wrong, please try again later.'});
    }
  }
  
  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2>Get In Touch</h2>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                      <input 
                      type="text"
                      value={formData.firstName}
                      placeholder="First Name"
                      onChange={(e) => onFormUpdate("fName", e)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input 
                      type="text"
                      value={formData.lasttName}
                      placeholder="Last Name"
                      onChange={(e) => onFormUpdate("lName", e)}/>
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input 
                      type="email"
                      value={formData.email}
                      placeholder="Email Address"
                      onChange={(e) => onFormUpdate("email", e)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input 
                      type="tel"
                      value={formData.phone}
                      placeholder="Phone No."
                      onChange={(e) => onFormUpdate("phone", e)}/>
                    </Col>
                    <Col size={12} className="px-1">
                      <textarea 
                        rows="6" 
                        value={formData.message} 
                        placeholder="Message" 
                        onChange={(e) => onFormUpdate("mes", e)}></textarea>
                      <button type="submit"><span>{buttonText}</span></button>
                    </Col>
                    {
                      status.message &&
                      <Col>
                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                      </Col>
                    }
                  </Row>
                </form>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
