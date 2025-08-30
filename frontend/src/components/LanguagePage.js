import React, { useState } from "react";

const LanguageLearningPage = () => {
  const [formData, setFormData] = useState({
    destination: "",
    language: "",
    phraseCategories: [],
    specificPhrases: "",
  });
  const [phrases, setPhrases] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked
          ? [...prevFormData[name], value]
          : prevFormData[name].filter((item) => item !== value),
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const cleanPhraseText = (text) => {
    return text
      .replace(/## /g, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/language-learning",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${text}`
        );
      }

      const result = await response.json();
      const cleanedPhrases = result.phrases.map((phrase) => ({
        original: cleanPhraseText(phrase.original),
        translation: cleanPhraseText(phrase.translation),
        pronunciation: cleanPhraseText(phrase.pronunciation),
        culturalNote: cleanPhraseText(phrase.culturalNote),
      }));

      setPhrases(cleanedPhrases);
      setError(null);
    } catch (error) {
      setError(error.message);
      setPhrases([]);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Language Learning</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="destination" className="form-label">
              Destination:
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              className="form-input"
              value={formData.destination}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="language" className="form-label">
              Language:
            </label>
            <input
              type="text"
              id="language"
              name="language"
              className="form-input"
              value={formData.language}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phrase Categories:</label>
            <div className="checkboxes">
              <label>
                <input
                  type="checkbox"
                  name="phraseCategories"
                  value="greetings"
                  checked={formData.phraseCategories.includes("greetings")}
                  onChange={handleChange}
                />
                Greetings
              </label>
              <label>
                <input
                  type="checkbox"
                  name="phraseCategories"
                  value="directions"
                  checked={formData.phraseCategories.includes("directions")}
                  onChange={handleChange}
                />
                Directions
              </label>
              <label>
                <input
                  type="checkbox"
                  name="phraseCategories"
                  value="food"
                  checked={formData.phraseCategories.includes("food")}
                  onChange={handleChange}
                />
                Food & Dining
              </label>
              <label>
                <input
                  type="checkbox"
                  name="phraseCategories"
                  value="emergency"
                  checked={formData.phraseCategories.includes("emergency")}
                  onChange={handleChange}
                />
                Emergency Phrases
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="specificPhrases" className="form-label">
              Specific Phrases:
            </label>
            <input
              type="text"
              id="specificPhrases"
              name="specificPhrases"
              className="form-input"
              value={formData.specificPhrases}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-primary">
            Get Phrases
          </button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      {phrases.length > 0 && (
        <div className="results-container">
          <h2>Learn Basic Phrases:</h2>
          {phrases.map((phrase, index) => (
            <div key={index} className="phrase-card">
              {phrase.original && (
                <div className="phrase-original">{phrase.original}</div>
              )}
              {phrase.translation && (
                <div className="phrase-translation">{phrase.translation}</div>
              )}
              {phrase.pronunciation && (
                <div className="phrase-pronunciation">
                  {phrase.pronunciation}
                </div>
              )}
              {phrase.culturalNote && (
                <div className="phrase-cultural-note">
                  {phrase.culturalNote}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageLearningPage;
