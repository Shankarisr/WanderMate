// // // export default HomePage;
// // import React from "react";
// // import { Link } from "react-router-dom";
// // import styled from "styled-components";

// // const HomePage = () => {
// //   return (
// //     <Container>
// //       <HeroSection>
// //         <HeroText>
// //           <h1>Your Adventure Awaits</h1>
// //           <p>Discover new places and explore the world with WanderMate.</p>
// //           <Button as={Link} to="/get-started">Get Started</Button>
// //         </HeroText>
// //       </HeroSection>
// //       <Features>
// //         <Feature>
// //           <FeatureLink to="/itinerary-planning">
// //             <FeatureTitle>Personalized Itineraries</FeatureTitle>
// //             <FeatureDescription>Craft personalized travel itineraries with ease. Our AI-powered tools provide recommendations tailored to your interests and schedule, ensuring you make the most of your trip.</FeatureDescription>
// //           </FeatureLink>
// //         </Feature>
// //         <Feature>
// //           <FeatureLink to="/instant-translator">
// //             <FeatureTitle>Instant Translator</FeatureTitle>
// //             <FeatureDescription>Break language barriers with our real-time translation feature, allowing you to communicate effortlessly with locals and explore with confidence.</FeatureDescription>
// //           </FeatureLink>
// //         </Feature>
// //         <Feature>
// //           <FeatureLink to="/cultural-insights">
// //             <FeatureTitle>Cultural Insights</FeatureTitle>
// //             <FeatureDescription>Gain valuable insights into local customs and traditions, including dress recommendations and etiquette tips, to ensure respectful and enjoyable interactions.</FeatureDescription>
// //           </FeatureLink>
// //         </Feature>
// //         <Feature>
// //           <FeatureLink to="/problem-solving-assistant">
// //             <FeatureTitle>Problem-Solving Assistant</FeatureTitle>
// //             <FeatureDescription>Access quick solutions to common travel challenges, from navigating unfamiliar areas to finding nearby amenities, all at your fingertips.</FeatureDescription>
// //           </FeatureLink>
// //         </Feature>
// //         <Feature>
// //           <FeatureLink to="/emergency-contacts">
// //             <FeatureTitle>Emergency Contacts</FeatureTitle>
// //             <FeatureDescription>Stay prepared with a list of local emergency contacts, ensuring you have support in any situation.</FeatureDescription>
// //           </FeatureLink>
// //         </Feature>
// //         <Feature>
// //           <FeatureLink to="/packing-tips">
// //             <FeatureTitle>Packing and Preparation Tips</FeatureTitle>
// //             <FeatureDescription>Access personalized packing lists and preparation advice to ensure you’re ready for every adventure.</FeatureDescription>
// //           </FeatureLink>
// //         </Feature>
// //         <Feature>
// //           <FeatureLink to="/language-learning">
// //             <FeatureTitle>Language Learning</FeatureTitle>
// //             <FeatureDescription>Learn basic phrases in the local language and enhance your communication skills while on the go.</FeatureDescription>
// //           </FeatureLink>
// //         </Feature>
// //       </Features>
// //     </Container>
// //   );
// // };

// // // Styled Components
// // const Container = styled.div`
// //   font-family: "Arial", sans-serif;
// // `;

// // const HeroSection = styled.section`
// //   background-image: url("https://source.unsplash.com/1600x900/?travel");
// //   background-size: cover;
// //   background-position: center;
// //   height: 60vh;
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// // `;

// // const HeroText = styled.div`
// //   background: rgba(0, 0, 0, 0.5);
// //   padding: 20px;
// //   text-align: center;
// //   color: #fff;
// //   h1 {
// //     margin: 0;
// //     font-size: 3em;
// //   }
// //   p {
// //     font-size: 1.2em;
// //   }
// // `;

// // const Button = styled.button`
// //   padding: 10px 20px;
// //   margin-top: 20px;
// //   font-size: 1em;
// //   color: #004d61;
// //   background-color: #fff;
// //   border: none;
// //   border-radius: 5px;
// //   cursor: pointer;
// //   &:hover {
// //     background-color: #e3f2f5;
// //   }
// // `;

// // const Features = styled.section`
// //   display: flex;
// //   flex-wrap: wrap;
// //   justify-content: space-around;
// //   padding: 40px;
// //   background-color: #f7f7f7;
// // `;

// // const Feature = styled.div`
// //   flex: 1 1 30%;
// //   max-width: 300px;
// //   margin: 10px;
// //   text-align: center;
// // `;

// // const FeatureLink = styled(Link)`
// //   text-decoration: none;
// //   color: inherit;
// //   display: block;
// //   padding: 20px;
// //   background: #fff;
// //   border-radius: 8px;
// //   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// //   transition: background-color 0.3s ease, box-shadow 0.3s ease;
// //   &:hover {
// //     background-color: #e3f2f5;
// //     box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
// //   }
// // `;

// // const FeatureTitle = styled.h2`
// //   color: #004d61;
// //   margin-bottom: 10px;
// // `;

// // const FeatureDescription = styled.p`
// //   color: #333;
// // `;

// // export default HomePage;


// import React from "react";
// import { Link } from "react-router-dom";
// import styled from "styled-components";

// const HomePage = () => {
//   return (
//     <Container>
//       <HeroSection>
//         <HeroText>
//           <h1>Your Adventure Awaits</h1>
//           <p>Discover new places and explore the world with WanderMate.</p>
//           <Button as={Link} to="/features">Get Started</Button>
//         </HeroText>
//       </HeroSection>
//     </Container>
//   );
// };

// // Styled Components
// const Container = styled.div`
//   font-family: "Arial", sans-serif;
// `;

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

// const Button = styled.button`
//   padding: 10px 20px;
//   margin-top: 20px;
//   font-size: 1em;
//   color: #004d61;
//   background-color: #fff;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   &:hover {
//     background-color: #e3f2f5;
//   }
// `;

// export default HomePage;

// HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FeaturesPage from "./FeaturePage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
const HomePage = () => {
  return (
    <Container>
      <HeroSection>
        <Overlay>
          <HeroText>
            
            <h1>Your Adventure Awaits</h1>
            <p>Discover new places and explore the world with WanderMate.</p>
            <Button as={Link} to="/features">Get Started</Button>
          </HeroText>
        </Overlay>
      </HeroSection>
      <AboutPage />
      <FeaturesPage />
      <ContactPage />
      <Footer>
        <FooterContent>
          <p>&copy; 2024 WanderMate. All rights reserved.</p>
          <FooterLinks>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </FooterLinks>
        </FooterContent>
      </Footer>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes at least the full viewport height */
`;

const HeroSection = styled.section`
  position: relative;
  background-image: url("https://wallpaperaccess.com/full/136008.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* Slight overlay for better text visibility */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const HeroText = styled.div`
  text-align: center;
  color: #fff;
  z-index: 1; /* Ensures text is above the background image */
  h1 {
    margin: 20px 0;
    font-size: 3.5em;
  }
  p {
    font-size: 1.5em;
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  margin-bottom: 20px;
  font-size: 1.2em;
  color: #fff;
  background-color: #004d61;
  border: 2px solid #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    background-color: #003a49;
    transform: scale(1.05);
  }
  &:focus {
    outline: none;
  }
`;

const Footer = styled.footer`
  background-color: #004d61;
  color: #fff;
  padding: 20px;
  text-align: center;
  margin-top: auto; /* Pushes the footer to the bottom */
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterLinks = styled.div`
  margin-top: 10px;
  a {
    color: #fff;
    text-decoration: none;
    margin: 0 15px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default HomePage;
