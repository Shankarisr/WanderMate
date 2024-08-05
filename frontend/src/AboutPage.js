import React from "react";
import styled from "styled-components";

const AboutPage = () => {
  const content = {
    title: 'About Us',
    description: 'Welcome to WanderMate, your ultimate travel companion designed to enhance every aspect of your journey. Whether you’re a seasoned traveler or exploring a new destination for the first time, WanderMate is here to make your adventures seamless, enriching, and memorable.',
    mission: 'At WanderMate, we are passionate about simplifying travel planning and enriching travel experiences through innovative technology and thoughtful design. Our mission is to empower travelers with personalized tools and insights, making it easier to explore new cultures, discover hidden gems, and create unforgettable memories.',
    keyfeatures: [
      { header: 'Itinerary Planning', content: 'Craft personalized travel itineraries with ease. Our AI-powered tools provide recommendations tailored to your interests and schedule, ensuring you make the most of your trip.' },
      { header: 'Instant Translator', content: 'Break language barriers with our real-time translation feature, allowing you to communicate effortlessly with locals and explore with confidence.' },
      { header: 'Cultural Insights', content: 'Gain valuable insights into local customs and traditions, including dress recommendations and etiquette tips, to ensure respectful and enjoyable interactions.' },
      { header: 'Travel Assistant', content: 'Chat with our travel assistant for personalized guidance and support to enhance your travel experience..' },
      { header: 'Emergency Contacts', content: 'Stay prepared with a list of local emergency contacts, ensuring you have support in any situation.' },
      { header: 'Packing and Preparation Tips', content: 'Access personalized packing lists and preparation advice to ensure you’re ready for every adventure.' },
      { header: 'Language Learning', content: 'Learn basic phrases in the local language and enhance your communication skills while on the go.' },
    ],
    callToAction: 'Join the WanderMate community today and embark on a journey of discovery, adventure, and connection. Whether you’re exploring bustling cities, serene landscapes, or hidden treasures, WanderMate is here to guide you every step of the way.'
  };

  return (
    <Container>
      <Title>{content.title}</Title>
      <Description>{content.description}</Description>
      <Section>
        <SubTitle>Our Mission</SubTitle>
        <Mission>{content.mission}</Mission>
      </Section>
      <Section>
        <SubTitle>Key Features</SubTitle>
        <FeaturesList>
          {content.keyfeatures.map((feature, index) => (
            <Feature key={index}>
              <BulletPoint>&#8226;</BulletPoint>
              <FeatureDetails>
                <FeatureHeader>{feature.header}:</FeatureHeader>
                <FeatureContent>{feature.content}</FeatureContent>
              </FeatureDetails>
            </Feature>
          ))}
        </FeaturesList>
      </Section>
      <CallToAction>{content.callToAction}</CallToAction>
      <Divider />
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 40px;
  font-family: "Arial", sans-serif;
  max-width: 900px;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #005a70;
  font-size: 2.5em;
  
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.15em;
  color: #555;
  
  margin-bottom: 30px;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const SubTitle = styled.h2`
  color: #005a70;
  font-size: 2em;
  margin-bottom: 10px;
`;

const Mission = styled.p`
  font-size: 1.15em;
  color: #333;
  line-height: 1.6;
`;

const FeaturesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Feature = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  font-size: 1.1em;
  color: #333;
`;

const BulletPoint = styled.span`
  font-size: 1.5em;
  color: #005a70;
  margin-right: 10px;
`;

const FeatureDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeatureHeader = styled.span`
  font-weight: bold;
  color: #005a70;
`;

const FeatureContent = styled.p`
  margin: 0;
`;

const CallToAction = styled.p`
  font-size: 1.15em;
  color: #005a70;
  text-align: center;
  font-weight: bold;
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid #004d61;
  margin: 40px auto 0;
  width: 80%;
`;

export default AboutPage;
