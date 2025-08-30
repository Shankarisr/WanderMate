import React from "react";
import "./style.css";

const AboutPage = () => {
  const content = {
    title: "About Us",
    description:
      "Welcome to WanderMate, your ultimate travel companion designed to enhance every aspect of your journey. Whether youâ€™re a seasoned traveler or exploring a new destination for the first time, WanderMate is here to make your adventures seamless, enriching, and memorable.",
    mission:
      "At WanderMate, we are passionate about simplifying travel planning and enriching travel experiences through innovative technology and thoughtful design. Our mission is to empower travelers with personalized tools and insights, making it easier to explore new cultures, discover hidden gems, and create unforgettable memories.",
    keyfeatures: [
      {
        header: "Itinerary Planning",
        content:
          "Craft personalized travel itineraries with ease. Our AI-powered tools provide recommendations tailored to your interests and schedule, ensuring you make the most of your trip.",
      },
      {
        header: "Instant Translator",
        content:
          "Break language barriers with our real-time translation feature, allowing you to communicate effortlessly with locals and explore with confidence.",
      },
      {
        header: "Cultural Insights",
        content:
          "Gain valuable insights into local customs and traditions, including dress recommendations and etiquette tips, to ensure respectful and enjoyable interactions.",
      },
      {
        header: "Travel Assistant",
        content:
          "Chat with our travel assistant for personalized guidance and support to enhance your travel experience..",
      },
      {
        header: "Emergency Contacts",
        content:
          "Stay prepared with a list of local emergency contacts, ensuring you have support in any situation.",
      },
      {
        header: "Packing and Preparation Tips",
        content:
          "Access personalized packing lists and preparation advice to ensure youâ€™re ready for every adventure.",
      },
      {
        header: "Language Learning",
        content:
          "Learn basic phrases in the local language and enhance your communication skills while on the go.",
      },
    ],
    callToAction:
      "Join the WanderMate community today and embark on a journey of discovery, adventure, and connection. Whether you are exploring bustling cities, serene landscapes, or hidden treasures, WanderMate is here to guide you every step of the way.",
  };

  return (
    <div className="about-container">
      <h1 className="about-title">{content.title}</h1>
      <p className="about-description">{content.description}</p>

      <section className="about-section">
        <h2 className="about-subtitle">Our Mission</h2>
        <p className="about-mission">{content.mission}</p>
      </section>

      <section className="about-section">
        <h2 className="about-subtitle">Key Features</h2>
        <ul className="features-list">
          {content.keyfeatures.map((feature, index) => (
            <li key={index} className="feature-item">
              <span className="bullet-point">&#8226;</span>
              <div className="feature-details">
                <span className="feature-header">{feature.header}:</span>
                <p className="feature-content">{feature.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="call-to-action">{content.callToAction}</p>
      <hr className="divider" />
    </div>
  );
};

export default AboutPage;
