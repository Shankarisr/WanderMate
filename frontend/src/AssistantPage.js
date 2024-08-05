import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const AssistantPage = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState(null);

    // Handle input change
    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3080/api/problem-solving?query=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error('Failed to fetch response');
            }

            const data = await res.json();
            setResponse(data.solution); // Use raw Markdown response
            setError(null);
        } catch (error) {
            console.error('Error fetching solution:', error);
            setError('Failed to retrieve solution');
            setResponse('');
        }
    };

    return (
        <Container>
            <Title>Travel Assistant</Title>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="query">Travel Chat Assistant:</Label>
                    <Input
                        type="text"
                        id="query"
                        value={query}
                        onChange={handleChange}
                        placeholder="Message Here"
                        required
                    />
                </FormGroup>
                <SubmitButton type="submit">Send Message</SubmitButton>
            </Form>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {response && (
                <ResponseContainer>
                    <ReactMarkdown>{response}</ReactMarkdown>
                </ResponseContainer>
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

const SubmitButton = styled.button`
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

const ResponseContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-size: 16px;
  line-height: 1.6;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
`;

export default AssistantPage;
