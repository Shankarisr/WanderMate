import React, { useState } from "react";

const EmergencyPage = () => {
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    emergencyType: "",
    healthcareNeeds: "",
    languagePreferences: "",
    contactPreference: "",
    travelStatus: "",
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
    console.log("Form Data:", formData);
    if (
      !formData.city ||
      !formData.state ||
      !formData.emergencyType ||
      !formData.contactPreference ||
      !formData.travelStatus
    ) {
      setError("All required fields must be filled.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/emergency", {
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
      <h1 className="page-title">Emergency Contacts</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="city" className="form-label">
              City/Town:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="form-input"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="state" className="form-label">
              State/Region:
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="form-input"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="emergencyType" className="form-label">
              Type of Emergency Service Needed:
            </label>
            <select
              id="emergencyType"
              name="emergencyType"
              className="form-select"
              value={formData.emergencyType}
              onChange={handleChange}
              required
            >
              <option value="">Select a service</option>
              <option value="police">Police</option>
              <option value="ambulance">Ambulance</option>
              <option value="fire">Fire Department</option>
              <option value="hospital">Hospital</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="healthcareNeeds" className="form-label">
              Healthcare Needs (if applicable):
            </label>
            <input
              type="text"
              id="healthcareNeeds"
              name="healthcareNeeds"
              className="form-input"
              value={formData.healthcareNeeds}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="languagePreferences" className="form-label">
              Language Preferences (if any):
            </label>
            <input
              type="text"
              id="languagePreferences"
              name="languagePreferences"
              className="form-input"
              value={formData.languagePreferences}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactPreference" className="form-label">
              Preferred Contact Information:
            </label>
            <select
              id="contactPreference"
              name="contactPreference"
              className="form-select"
              value={formData.contactPreference}
              onChange={handleChange}
            >
              <option value="numbers">Contact Numbers</option>
              <option value="addresses">Addresses</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="travelStatus" className="form-label">
              Travel Status:
            </label>
            <select
              id="travelStatus"
              name="travelStatus"
              className="form-select"
              value={formData.travelStatus}
              onChange={handleChange}
              required
            >
              <option value="">Select travel status</option>
              <option value="traveler">Traveler</option>
              <option value="resident">Local Resident</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">
            Get Emergency Contacts
          </button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      {results && (
        <div className="results-container">
          <h2>Emergency Contacts:</h2>
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

export default EmergencyPage;
