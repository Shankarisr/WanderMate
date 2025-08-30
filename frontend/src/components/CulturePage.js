import React, { useState } from "react";
import "./style.css";

const CulturePage = () => {
  const [formData, setFormData] = useState({
    destination: "",
    placeType: "",
    otherPlaceDescription: "",
    season: "",
    specificEvents: "",
    languagePreferences: false,
    companions: "",
    culturalInterests: [],
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "culturalInterests") {
        setFormData((prevState) => ({
          ...prevState,
          culturalInterests: checked
            ? [...prevState.culturalInterests, value]
            : prevState.culturalInterests.filter(
                (interest) => interest !== value
              ),
        }));
      } else {
        setFormData({
          ...formData,
          [name]: checked,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/culture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${text}`
        );
      }

      const data = await response.json();
      setResult(data.results);
      setError(null);
    } catch (error) {
      setError(error.message);
      setResult(null);
    }
  };

  // Helper function to format results
  const formatResults = (text) => {
    return text
      .replace(/## (.*?)(?=\n|$)/g, "<h3>$1</h3>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br/>")
      .replace(/(?:\r\n|\r|\n)/g, "<p></p>");
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Cultural Insights</h1>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="destination" className="form-label">
            Destination:
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="placeType" className="form-label">
            Place Type:
          </label>
          <select
            id="placeType"
            name="placeType"
            value={formData.placeType}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Place Type</option>
            <option value="temple">Temple</option>
            <option value="education">Education</option>
            <option value="work">Work</option>
            <option value="others">Others</option>
          </select>
          {formData.placeType === "others" && (
            <input
              type="text"
              id="otherPlaceDescription"
              name="otherPlaceDescription"
              placeholder="Describe the place"
              value={formData.otherPlaceDescription}
              onChange={handleChange}
              className="form-input"
              style={{ marginTop: "10px" }}
              required
            />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="season" className="form-label">
            Season of Visit:
          </label>
          <select
            id="season"
            name="season"
            value={formData.season}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select Season</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="autumn">Autumn</option>
            <option value="winter">Winter</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="specificEvents" className="form-label">
            Specific Events or Festivals:
          </label>
          <input
            type="text"
            id="specificEvents"
            name="specificEvents"
            value={formData.specificEvents}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              name="languagePreferences"
              checked={formData.languagePreferences}
              onChange={handleChange}
            />
            Need language tips
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="companions" className="form-label">
            Traveling With:
          </label>
          <select
            id="companions"
            name="companions"
            value={formData.companions}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select Companions</option>
            <option value="alone">Alone</option>
            <option value="family">Family</option>
            <option value="group">Group</option>
          </select>
        </div>

        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              name="culturalInterests"
              value="food"
              onChange={handleChange}
            />
            Food
          </label>
          <label>
            <input
              type="checkbox"
              name="culturalInterests"
              value="art"
              onChange={handleChange}
            />
            Art
          </label>
          <label>
            <input
              type="checkbox"
              name="culturalInterests"
              value="music"
              onChange={handleChange}
            />
            Music
          </label>
          <label>
            <input
              type="checkbox"
              name="culturalInterests"
              value="history"
              onChange={handleChange}
            />
            History
          </label>
        </div>

        <button type="submit" className="btn-primary">
          Get Cultural Insights
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {result && (
        <div className="results-container">
          <h2>Cultural Insights</h2>
          <div dangerouslySetInnerHTML={{ __html: formatResults(result) }} />
        </div>
      )}
    </div>
  );
};

export default CulturePage;
