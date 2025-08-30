import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./style.css";

const AssistantPage = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/api/problem-solving?query=${encodeURIComponent(
          query
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      setResponse(data.solution); // Use raw Markdown response
      setError(null);
    } catch (error) {
      console.error("Error fetching solution:", error);
      setError("Failed to retrieve solution");
      setResponse("");
    }
  };

  return (
    <div className="page-container assistant-container">
      <h1 className="page-title">Travel Assistant</h1>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="query" className="form-label">
            Travel Chat Assistant:
          </label>
          <input
            type="text"
            id="query"
            value={query}
            onChange={handleChange}
            placeholder="Message Here"
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Send Message
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {response && (
        <div className="results-container">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default AssistantPage;
