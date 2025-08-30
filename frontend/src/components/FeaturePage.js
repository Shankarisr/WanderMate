import React from "react";
import { Link } from "react-router-dom";

const FeaturesPage = () => {
  return (
    <div>
      <section className="features-section">
        <div className="feature-card">
          <Link to="/itinerary-planning" className="feature-link">
            <h2 className="feature-title">Personalized Itineraries</h2>
            <p className="feature-description">
              Craft personalized travel itineraries with ease. Our AI-powered
              tools provide recommendations tailored to your interests and
              schedule, ensuring you make the most of your trip.
            </p>
          </Link>
        </div>

        <div className="feature-card">
          <Link to="/instant-translator" className="feature-link">
            <h2 className="feature-title">Instant Translator</h2>
            <p className="feature-description">
              Break language barriers with our real-time translation feature,
              allowing you to communicate effortlessly with locals and explore
              with confidence.
            </p>
          </Link>
        </div>

        <div className="feature-card">
          <Link to="/cultural-insights" className="feature-link">
            <h2 className="feature-title">Cultural Insights</h2>
            <p className="feature-description">
              Gain valuable insights into local customs and traditions,
              including dress recommendations and etiquette tips, to ensure
              respectful and enjoyable interactions.
            </p>
          </Link>
        </div>

        <div className="feature-card">
          <Link to="/problem-solving-assistant" className="feature-link">
            <h2 className="feature-title">Travel Assistant</h2>
            <p className="feature-description">
              Chat with our travel assistant for personalized guidance and
              support to enhance your travel experience.
            </p>
          </Link>
        </div>

        <div className="feature-card">
          <Link to="/emergency-contacts" className="feature-link">
            <h2 className="feature-title">Emergency Contacts</h2>
            <p className="feature-description">
              Stay prepared with a list of local emergency contacts, ensuring
              you have support in any situation.
            </p>
          </Link>
        </div>

        <div className="feature-card">
          <Link to="/packing-tips" className="feature-link">
            <h2 className="feature-title">Packing and Preparation Tips</h2>
            <p className="feature-description">
              Access personalized packing lists and preparation advice to ensure
              you're ready for every adventure.
            </p>
          </Link>
        </div>

        <div className="feature-card">
          <Link to="/language-learning" className="feature-link">
            <h2 className="feature-title">Language Learning</h2>
            <p className="feature-description">
              Learn basic phrases in the local language and enhance your
              communication skills while on the go.
            </p>
          </Link>
        </div>
      </section>

      <hr className="divider" />
    </div>
  );
};

export default FeaturesPage;
