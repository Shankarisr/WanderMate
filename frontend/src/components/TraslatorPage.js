import React, { useState } from "react";

const TranslatorPage = () => {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [recognition, setRecognition] = useState(null);

  // Initialize Speech Recognition
  const initSpeechRecognition = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported");
      return;
    }
    const recognitionInstance = new window.webkitSpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = language;
    recognitionInstance.onresult = (event) => {
      setText(event.results[0][0].transcript);
    };
    recognitionInstance.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
    };
    setRecognition(recognitionInstance);
  };

  // Handle text input change
  const handleChange = (e) => {
    setText(e.target.value);
  };

  // Handle language change
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    if (recognition) {
      recognition.lang = e.target.value;
    }
  };

  // Handle translation
  const handleTranslate = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          targetLang: language,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch translation");
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error("Translation Error:", error);
      setTranslatedText("Translation failed");
    }
  };

  // Start speech recognition
  const startRecognition = () => {
    if (recognition) {
      recognition.lang = language;
      recognition.start();
    } else {
      initSpeechRecognition();
    }
  };

  return (
    <div className="page-container assistant-container">
      <h1 className="page-title">Translator</h1>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="text" className="form-label">
            Enter Text:
          </label>
          <input
            type="text"
            id="text"
            className="form-input"
            value={text}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="language" className="form-label">
            Translate To:
          </label>
          <select
            id="language"
            className="form-select"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en-US">English</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
            <option value="de-DE">German</option>
            <option value="zh-CN">Chinese</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            className="btn-primary"
            onClick={handleTranslate}
          >
            Translate
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={startRecognition}
            style={{
              backgroundColor: "white",
              color: "#004d61",
              border: "1px solid #004d61",
            }}
          >
            🎙️
          </button>
        </div>
      </div>

      {translatedText && (
        <div className="results-container">
          <h2>Translated Text:</h2>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default TranslatorPage;
