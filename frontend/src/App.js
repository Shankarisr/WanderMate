import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ItineraryPage from './ItineraryPage'; // Import ItineraryPage
import TranslatorPage from './TraslatorPage';
import CulturePage from './CulturePage';
import styled from 'styled-components';
import EmergencyPage from './EmergencyPage';
import PackingPage from './PackingPage';
import LanguagePage from './LanguagePage'
import AssistantPage from './AssistantPage';
import FeaturesPage from './FeaturePage';
import ContactPage from './ContactPage';

// Header Component
const Header = () => {
  return (
    <HeaderContainer>
      <Logo>WanderMate</Logo>
     
      <Nav>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/about">About</NavItem>
        <NavItem to="/features">Get Started</NavItem>
        <NavItem to="/contact">Contact</NavItem>
      </Nav>
    </HeaderContainer>
  );
};

// Styled Components for Header
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #004d61;
`;

const Logo = styled.h1`
  color: #fff;
`;

const Nav = styled.nav`
  display: flex;
`;

const NavItem = styled(Link)`
  color: #fff;
  margin-left: 20px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/itinerary-planning" element={<ItineraryPage />} /> {/* Add Itinerary route */}
        <Route path="/instant-translator" element = {<TranslatorPage />}/>
        <Route path="/cultural-insights" element = {<CulturePage />}/>
        <Route path="/emergency-contacts" element={<EmergencyPage />} />
        <Route path="/packing-tips" element={<PackingPage />} />
        <Route path="/language-learning" element={<LanguagePage />} />
        <Route path="/problem-solving-assistant" element={<AssistantPage />} />
         <Route path="/features" element={<FeaturesPage />} />
         <Route path="/contact" element={<ContactPage />} />
        {/* Add routes for Destinations and Contact pages here */}
      </Routes>
    </Router>
  );
};



export default App;

