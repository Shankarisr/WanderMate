// FeaturesPage.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FeaturesPage = () => {
  return (
    <Container>
      {/* <HeroSection>
        <HeroText>
          <h1>Explore Our Features</h1>
          <p>Discover all the amazing features we offer.</p>
        </HeroText>
      </HeroSection> */}
      <Features>
        <Feature>
          <FeatureLink to="/itinerary-planning">
            <FeatureTitle>Personalized Itineraries</FeatureTitle>
            <FeatureDescription>
              Craft personalized travel itineraries with ease. Our AI-powered tools provide recommendations tailored to your interests and schedule, ensuring you make the most of your trip.
            </FeatureDescription>
          </FeatureLink>
        </Feature>
        <Feature>
          <FeatureLink to="/instant-translator">
            <FeatureTitle>Instant Translator</FeatureTitle>
            <FeatureDescription>
              Break language barriers with our real-time translation feature, allowing you to communicate effortlessly with locals and explore with confidence.
            </FeatureDescription>
          </FeatureLink>
        </Feature>
         <Feature>
           <FeatureLink to="/cultural-insights">
             <FeatureTitle>Cultural Insights</FeatureTitle>
             <FeatureDescription>Gain valuable insights into local customs and traditions, including dress recommendations and etiquette tips, to ensure respectful and enjoyable interactions.</FeatureDescription>
           </FeatureLink>
         </Feature>
         <Feature>
           <FeatureLink to="/problem-solving-assistant">
             <FeatureTitle>Travel Assistant</FeatureTitle>
             <FeatureDescription>Chat with our travel assistant for personalized guidance and support to enhance your travel experience.</FeatureDescription>
           </FeatureLink>
         </Feature>
         <Feature>
           <FeatureLink to="/emergency-contacts">
             <FeatureTitle>Emergency Contacts</FeatureTitle>
             <FeatureDescription>Stay prepared with a list of local emergency contacts, ensuring you have support in any situation.</FeatureDescription>
           </FeatureLink>
         </Feature>
         <Feature>
           <FeatureLink to="/packing-tips">
             <FeatureTitle>Packing and Preparation Tips</FeatureTitle>
             <FeatureDescription>Access personalized packing lists and preparation advice to ensure you’re ready for every adventure.</FeatureDescription>
           </FeatureLink>
         </Feature>
         <Feature>
           <FeatureLink to="/language-learning">
             <FeatureTitle>Language Learning</FeatureTitle>
             <FeatureDescription>Learn basic phrases in the local language and enhance your communication skills while on the go.</FeatureDescription>
           </FeatureLink>
         </Feature>
       </Features>
        {/* Add more features as needed */}
    <Divider />
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  font-family: "Arial", sans-serif;
`;

// const HeroSection = styled.section`
//   background-image: url("https://source.unsplash.com/1600x900/?travel");
//   background-size: cover;
//   background-position: center;
//   height: 60vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const HeroText = styled.div`
//   background: rgba(0, 0, 0, 0.5);
//   padding: 20px;
//   text-align: center;
//   color: #fff;
//   h1 {
//     margin: 0;
//     font-size: 3em;
//   }
//   p {
//     font-size: 1.2em;
//   }
// `;

const Features = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 40px;
  background-color: #f7f7f7;
`;

const Feature = styled.div`
  flex: 1 1 30%;
  max-width: 300px;
  margin: 10px;
  text-align: center;
`;

const FeatureLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    background-color: #e3f2f5;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureTitle = styled.h2`
  color: #004d61;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  color: #333;
`;


const Divider = styled.hr`
  border: none;
  border-top: 2px solid #004d61;
  margin: 40px auto 0;
  width: 80%;
`;
export default FeaturesPage;
