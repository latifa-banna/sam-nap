import React, { useState } from "react";
import axios from 'axios';
import samNap from '../image/logo1.png'
import './cssComponenets/contact.css'
function ContactForm() {
  localStorage.removeItem("user")
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await axios.post('http://127.0.0.1:8000/api/contact', { name, phone, email, message });
     
      setName("")
      setPhone("")
      setEmail("")
      setMessage("")
      alert("Email sent successfully")
    } catch (error) {
      // console.error('Failed to send email:', error);
      alert("Failed to send email")
    }
  };
  
  return (
    <div className="container-Contact">
      <h3 className="Contact">CONTACT</h3>
      <div className="container2">
        <div className="Contact-left">
          <img src={samNap} />
          <p className="">+212528613223</p>
          <p className="">sam.nap.sarl@gmail.com</p>
          <p>Douar zaouia commune tnine aglou, tiznit, Maroc</p> 
        </div>

        <div className="form-contact">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={(event) => setName(event.target.value)} required /><br /><br />

            <label htmlFor="phone">phone:</label>
            <input type="tel" id="phone" name="phone" pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}" value={phone} onChange={(event) => setPhone(event.target.value.replace(/[^0-9 ]/g, ''))} required /><br /><br />


            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} required />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="6" value={message} onChange={(event) => setMessage(event.target.value)} required></textarea><br /><br />

            <input type="submit" value="send" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
