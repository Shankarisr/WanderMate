import React, { useState } from 'react';
import styled from 'styled-components';

const TranslatorPage = () => {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [language, setLanguage] = useState('en-US'); // Default language
    const [recognition, setRecognition] = useState(null);

    // Initialize Speech Recognition
    const initSpeechRecognition = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Speech Recognition not supported');
            return;
        }
        const recognitionInstance = new window.webkitSpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = language; // Set initial language
        recognitionInstance.onresult = (event) => {
            setText(event.results[0][0].transcript);
        };
        recognitionInstance.onerror = (event) => {
            console.error('Speech Recognition Error:', event.error);
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
            recognition.lang = e.target.value; // Update language for existing recognition instance
        }
    };

    // Handle translation
    const handleTranslate = async () => {
        try {
            // Replace with actual API call
            const response = await fetch('http://localhost:3000/api/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text,
                    targetLang: language,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch translation');
            }

            const data = await response.json();
            setTranslatedText(data.translatedText); // Adjust based on API response
        } catch (error) {
            console.error('Translation Error:', error);
            setTranslatedText('Translation failed');
        }
    };

    // Start speech recognition
    const startRecognition = () => {
        if (recognition) {
            recognition.lang = language; // Set language based on user selection
            recognition.start();
        } else {
            initSpeechRecognition();
        }
    };

    return (
        <Container>
            <Title>Translator</Title>
            <Form>
                <FormGroup>
                    <Label htmlFor="text">Enter Text:</Label>
                    <Input
                        type="text"
                        id="text"
                        value={text}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="language">Translate To:</Label>
                    <Select id="language" value={language} onChange={handleLanguageChange}>
                        <option value="en-US">English</option>
                        <option value="es-ES">Spanish</option>
                        <option value="fr-FR">French</option>
                        <option value="de-DE">German</option>
                        <option value="zh-CN">Chinese</option>
                        {/* <option value="ta">Tamil</option>
                        <option value="te">Telugu</option>
                        <option value="ml">Malayalam</option>
                        <option value="kn">Kannada</option> */}
                        <option value="hi">Hindi</option>
                        {/* Add more languages as needed */}
                    </Select>
                </FormGroup>
                <ButtonGroup>
                    <TranslateButton type="button" onClick={handleTranslate}>Translate</TranslateButton>
                    <MicButton type="button" onClick={startRecognition}>🎙️</MicButton>
                </ButtonGroup>
            </Form>
            {translatedText && (
                <ResultsContainer>
                    <h2>Translated Text:</h2>
                    <p>{translatedText}</p>
                </ResultsContainer>
            )}
        </Container>
    );
};

// Styled Components
const Container = styled.div`
  font-family: "Arial", sans-serif;
  padding: 40px;
  max-width: 600px;
  margin: auto;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const Title = styled.h1`
  color: #004d61;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const TranslateButton = styled.button`
  padding: 12px 20px;
  font-size: 1.1em;
  color: #fff;
  background-color: #004d61;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #003843;
  }
`;

const MicButton = styled.button`
  padding: 12px 20px;
  font-size: 1.1em;
  color: #fff;
  background-color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e64a19;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export default TranslatorPage;

