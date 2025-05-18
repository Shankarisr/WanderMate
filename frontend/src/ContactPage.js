import React from "react";
import styled from "styled-components";

const ContactPage = () => {
  return (
    <Section>
      <ContentWrapper>
        <ContactDetails>
          <h1>Contact Us</h1>
          <ContactInfo>
            <p>
              Email:{" "}
              <a href="mailto:support@wanderMate.com">
                shanksofficial07@gmail.com
              </a>
            </p>
            <p>
              Phone: <a href="tel:+15551234567">+91 9677825198</a>
            </p>
            <p>Address: Chennai , India</p>

            <SocialMedia>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </SocialMedia>
          </ContactInfo>
        </ContactDetails>
        <ContactForm>
          <h2>Send Us a Message</h2>
          <form>
            <label>
              Name:
              <input type="text" name="name" required />
            </label>
            <label>
              Email:
              <input type="email" name="email" required />
            </label>
            <label>
              Subject:
              <input type="text" name="subject" />
            </label>
            <label>
              Message:
              <textarea name="message" required></textarea>
            </label>
            <button type="submit">Send</button>
          </form>
        </ContactForm>
      </ContentWrapper>
    </Section>
  );
};

const Section = styled.section`
  margin-bottom: 30px;
  background-color: #f0f8ff; /* Use the background color from ItineraryPage */
  padding: 40px 20px; /* Adjust padding for a more spacious feel */
  font-family: 'Arial', sans-serif; /* Use the font style from ItineraryPage */
  color: #004d61;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  gap: 20px; /* Add some gap between the sections */
`;

const ContactDetails = styled.div`
  flex: 1;
  padding: 20px;
  background: #ffffff; /* Use the card color from ItineraryPage */
  border-radius: 10px; /* Rounded corners matching the ItineraryPage */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const ContactInfo = styled.div`
  margin-bottom: 25px;
  p {
    font-size: 18px; /* Adjust font size to match ItineraryPage */
    line-height: 1.9;
    color: #333; /* Text color matching ItineraryPage */
    margin: 10px 0;
  }
  a {
    color: #004d61; /* Link color matching ItineraryPage */
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SocialMedia = styled.div`
  margin-top: 20px;
  a {
    margin: 0 15px;
    color: #004d61; /* Social media link color matching ItineraryPage */
    text-decoration: none;
    font-size: 18px; /* Adjust font size for social media links */
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ContactForm = styled.div`
  flex: 1;
  padding: 20px;
  background: #ffffff; /* Use the card color from ItineraryPage */
  border-radius: 10px; /* Rounded corners matching the ItineraryPage */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-left: 20px;

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    label {
      margin: 15px 0;
      font-size: 16px; /* Match font size with ItineraryPage */
      color: #333; /* Label color matching ItineraryPage */
    }
    input, textarea {
      width: 100%;
      max-width: 500px;
      padding: 12px;
      margin: 5px 0;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    button {
      padding: 12px 24px;
      background-color: #004d61; /* Button color matching ItineraryPage */
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
      font-size: 16px; /* Button font size matching ItineraryPage */
      &:hover {
        background-color: #0056b3; /* Button hover color matching ItineraryPage */
      }
    }
  }
`;

export default ContactPage;
