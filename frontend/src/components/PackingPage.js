import React, { useState } from "react";

const SafetyPage = () => {
  const [formData, setFormData] = useState({
    destination: "",
    season: "",
    travelType: "",
    accommodation: "",
    activitiesPlanned: "",
    durationOfStay: "",
    specialConsiderations: "",
  });
  const [results, setResults] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/safety", {
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

      const result = await response.json();
      setResults(result.results);
      setError(null);
    } catch (error) {
      setError(error.message);
      setResults("");
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Packing and Preparation Tips</h1>
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
            <label htmlFor="season" className="form-label">
              Season:
            </label>
            <select
              id="season"
              name="season"
              className="form-select"
              value={formData.season}
              onChange={handleChange}
              required
            >
              <option value="">Select Season</option>
              <option value="winter">Winter</option>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="fall">Fall</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="travelType" className="form-label">
              Travel Type:
            </label>
            <select
              id="travelType"
              name="travelType"
              className="form-select"
              value={formData.travelType}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="business">Business</option>
              <option value="leisure">Leisure</option>
              <option value="adventure">Adventure</option>
              <option value="family">Family</option>
              <option value="other">Other (Specify)</option>
            </select>
            {formData.travelType === "other" && (
              <input
                type="text"
                id="otherTravelType"
                name="otherTravelType"
                className="form-input"
                placeholder="Specify other travel type"
                value={formData.otherTravelType || ""}
                onChange={handleChange}
                style={{ marginTop: "10px" }}
              />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="accommodation" className="form-label">
              Accommodation:
            </label>
            <select
              id="accommodation"
              name="accommodation"
              className="form-select"
              value={formData.accommodation}
              onChange={handleChange}
              required
            >
              <option value="">Select Accommodation</option>
              <option value="hotel">Hotel</option>
              <option value="hostel">Hostel</option>
              <option value="vacation-rental">Vacation Rental</option>
              <option value="camping">Camping</option>
              <option value="other">Other (Specify)</option>
            </select>
            {formData.accommodation === "other" && (
              <input
                type="text"
                id="otherAccommodation"
                name="otherAccommodation"
                className="form-input"
                placeholder="Specify other accommodation type"
                value={formData.otherAccommodation || ""}
                onChange={handleChange}
                style={{ marginTop: "10px" }}
              />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="activitiesPlanned" className="form-label">
              Activities Planned:
            </label>
            <select
              id="activitiesPlanned"
              name="activitiesPlanned"
              className="form-select"
              value={formData.activitiesPlanned}
              onChange={handleChange}
              required
            >
              <option value="">Select Activities</option>
              <option value="hiking">Hiking</option>
              <option value="swimming">Swimming</option>
              <option value="sightseeing">Sightseeing</option>
              <option value="other">Other (Specify)</option>
            </select>
            {formData.activitiesPlanned === "other" && (
              <input
                type="text"
                id="otherActivities"
                name="otherActivities"
                className="form-input"
                placeholder="Specify other activities"
                value={formData.otherActivities || ""}
                onChange={handleChange}
                style={{ marginTop: "10px" }}
              />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="durationOfStay" className="form-label">
              Duration of Stay (days):
            </label>
            <input
              type="text"
              id="durationOfStay"
              name="durationOfStay"
              className="form-input"
              value={formData.durationOfStay}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="specialConsiderations" className="form-label">
              Special Considerations:
            </label>
            <input
              type="text"
              id="specialConsiderations"
              name="specialConsiderations"
              className="form-input"
              value={formData.specialConsiderations}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-primary">
            Get Packing Tips
          </button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      {results && (
        <div className="results-container">
          <h2>Personalized Packing List:</h2>
          <div dangerouslySetInnerHTML={{ __html: formatResults(results) }} />
        </div>
      )}
    </div>
  );
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

export default SafetyPage;
