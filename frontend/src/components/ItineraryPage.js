import React, { useState } from "react";

const ItineraryPage = () => {
  const [formData, setFormData] = useState({
    numberOfPeople: "",
    numberOfDays: "",
    place: "",
    budget: "",
    fromLocation: "",
    focus: "",
    otherFocus: "",
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

  const handleFocusChange = (e) => {
    setFormData({
      ...formData,
      focus: e.target.value,
      otherFocus: e.target.value === "Other" ? formData.otherFocus : "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/itinerary", {
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
      <h1 className="page-title">Create Your Itinerary</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="numberOfPeople" className="form-label">
              Number of People:
            </label>
            <input
              type="number"
              id="numberOfPeople"
              name="numberOfPeople"
              className="form-input"
              value={formData.numberOfPeople}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="numberOfDays" className="form-label">
              Number of Days:
            </label>
            <input
              type="number"
              id="numberOfDays"
              name="numberOfDays"
              className="form-input"
              value={formData.numberOfDays}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="place" className="form-label">
              Destination:
            </label>
            <input
              type="text"
              id="place"
              name="place"
              className="form-input"
              value={formData.place}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="budget" className="form-label">
              Budget:
            </label>
            <input
              type="text"
              id="budget"
              name="budget"
              className="form-input"
              value={formData.budget}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fromLocation" className="form-label">
              From Location:
            </label>
            <input
              type="text"
              id="fromLocation"
              name="fromLocation"
              className="form-input"
              value={formData.fromLocation}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="focus" className="form-label">
              Focus On:
            </label>
            <select
              id="focus"
              name="focus"
              className="form-select"
              value={formData.focus}
              onChange={handleFocusChange}
              required
            >
              <option value="">Select a focus area</option>
              <option value="History">History</option>
              <option value="Art and Culture">Art and Culture</option>
              <option value="Education">Education</option>
              <option value="Food">Food</option>
              <option value="Temples">Temples</option>
              <option value="Other">Other</option>
            </select>
            {formData.focus === "Other" && (
              <input
                type="text"
                id="otherFocus"
                name="otherFocus"
                className="form-input"
                placeholder="Please specify"
                value={formData.otherFocus}
                onChange={handleChange}
                required
                style={{ marginTop: "10px" }}
              />
            )}
          </div>

          <button type="submit" className="btn-primary">
            Create Itinerary
          </button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      {results && (
        <div className="results-container">
          <h2>Your Itinerary:</h2>
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

export default ItineraryPage;
