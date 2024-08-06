import React, { useState } from 'react';
import styled from 'styled-components';

const SafetyPage = () => {
    const [formData, setFormData] = useState({
        destination: '',
        season: '',
        travelType: '',
        accommodation: '',
        activitiesPlanned: '',
        durationOfStay: '',
        specialConsiderations: ''
    });
    const [results, setResults] = useState('');
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/safety', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${text}`);
            }

            const result = await response.json();
            setResults(result.results);
            setError(null);
        } catch (error) {
            setError(error.message);
            setResults('');
        }
    };

    return (
        <Container>
            <Title>Packing and Preparation Tips</Title>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="destination">Destination:</Label>
                    <Input
                        type="text"
                        id="destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="season">Season:</Label>
                    <Select
                        id="season"
                        name="season"
                        value={formData.season}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Season</option>
                        <option value="winter">Winter</option>
                        <option value="spring">Spring</option>
                        <option value="summer">Summer</option>
                        <option value="fall">Fall</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="travelType">Travel Type:</Label>
                    <Select
                        id="travelType"
                        name="travelType"
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
                    </Select>
                    {formData.travelType === 'other' && (
                        <Input
                            type="text"
                            id="otherTravelType"
                            name="otherTravelType"
                            placeholder="Specify other travel type"
                            value={formData.otherTravelType || ''}
                            onChange={handleChange}
                        />
                    )}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="accommodation">Accommodation:</Label>
                    <Select
                        id="accommodation"
                        name="accommodation"
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
                    </Select>
                    {formData.accommodation === 'other' && (
                        <Input
                            type="text"
                            id="otherAccommodation"
                            name="otherAccommodation"
                            placeholder="Specify other accommodation type"
                            value={formData.otherAccommodation || ''}
                            onChange={handleChange}
                        />
                    )}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="activitiesPlanned">Activities Planned:</Label>
                    <Select
                        id="activitiesPlanned"
                        name="activitiesPlanned"
                        value={formData.activitiesPlanned}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Activities</option>
                        <option value="hiking">Hiking</option>
                        <option value="swimming">Swimming</option>
                        <option value="sightseeing">Sightseeing</option>
                        <option value="other">Other (Specify)</option>
                    </Select>
                    {formData.activitiesPlanned === 'other' && (
                        <Input
                            type="text"
                            id="otherActivities"
                            name="otherActivities"
                            placeholder="Specify other activities"
                            value={formData.otherActivities || ''}
                            onChange={handleChange}
                        />
                    )}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="durationOfStay">Duration of Stay (days):</Label>
                    <Input
                        type="text"
                        id="durationOfStay"
                        name="durationOfStay"
                        value={formData.durationOfStay}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="specialConsiderations">Special Considerations:</Label>
                    <Input
                        type="text"
                        id="specialConsiderations"
                        name="specialConsiderations"
                        value={formData.specialConsiderations}
                        onChange={handleChange}
                    />
                </FormGroup>
                <SubmitButton type="submit">Get Packing Tips</SubmitButton>
            </Form>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {results && (
                <ResultsContainer>
                    <h2>Personalized Packing List:</h2>
                    <div dangerouslySetInnerHTML={{ __html: formatResults(results) }} />
                </ResultsContainer>
            )}
        </Container>
    );
};

// Helper function to format results
const formatResults = (text) => {
    return text
        .replace(/## (.*?)(?=\n|$)/g, '<h3>$1</h3>') // Convert ## subheaders to <h3>
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Convert **text** to <strong>text</strong>
        .replace(/\*([^*]+)\*/g, '<em>$1</em>') // Convert *text* to <em>text</em>
        .replace(/\n/g, '<br/>') // Convert new lines to <br/>
        .replace(/(?:\r\n|\r|\n)/g, '<p></p>'); // Add space between paragraphs
};

// Styled Components
const Container = styled.div`
  font-family: "Arial", sans-serif;
  padding: 40px;
  max-width: 900px;
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

const ResultsContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-wrap;

  h2 {
    color: #004d61;
    margin-bottom: 15px;
  }

  h3 {
    color: #003843;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 10px;
  }

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  br {
    margin: 10px 0;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
`;

export default SafetyPage;
