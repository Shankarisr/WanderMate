import React, { useState } from 'react';
import styled from 'styled-components';

const ItineraryPage = () => {
    const [formData, setFormData] = useState({
        numberOfPeople: '',
        numberOfDays: '',
        place: '',
        budget: '',
        fromLocation: '',
        focus: '',
        otherFocus: ''
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

    const handleFocusChange = (e) => {
        setFormData({
            ...formData,
            focus: e.target.value,
            otherFocus: e.target.value === 'Other' ? formData.otherFocus : ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3006/api/itinerary', {
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
            <Title>Create Your Itinerary</Title>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="numberOfPeople">Number of People:</Label>
                    <Input
                        type="number"
                        id="numberOfPeople"
                        name="numberOfPeople"
                        value={formData.numberOfPeople}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="numberOfDays">Number of Days:</Label>
                    <Input
                        type="number"
                        id="numberOfDays"
                        name="numberOfDays"
                        value={formData.numberOfDays}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="place">Destination:</Label>
                    <Input
                        type="text"
                        id="place"
                        name="place"
                        value={formData.place}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="budget">Budget:</Label>
                    <Input
                        type="text"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="fromLocation">From Location:</Label>
                    <Input
                        type="text"
                        id="fromLocation"
                        name="fromLocation"
                        value={formData.fromLocation}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="focus">Focus On:</Label>
                    <Select id="focus" name="focus" value={formData.focus} onChange={handleFocusChange} required>
                        <option value="">Select a focus area</option>
                        <option value="History">History</option>
                        <option value="Art and Culture">Art and Culture</option>
                        <option value="Education">Education</option>
                        <option value="Food">Food</option>
                        <option value="Temples">Temples</option>
                        <option value="Other">Other</option>
                    </Select>
                    {formData.focus === 'Other' && (
                        <Input
                            type="text"
                            id="otherFocus"
                            name="otherFocus"
                            placeholder="Please specify"
                            value={formData.otherFocus}
                            onChange={handleChange}
                            required
                        />
                    )}
                </FormGroup>
                <SubmitButton type="submit">Create Itinerary</SubmitButton>
            </Form>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {results && (
                <ResultsContainer>
                    <h2>Your Itinerary:</h2>
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

export default ItineraryPage;




/*import React, { useState } from 'react';
import styled from 'styled-components';

const ItineraryPage = () => {
    const [formData, setFormData] = useState({
        numberOfPeople: '',
        numberOfDays: '',
        place: '',
        budget: '',
        fromLocation: '',
        focus: '',
        otherFocus: '',
        startDate: '',
        endDate: '',
        accommodation: '',
        transportation: '',
        specialRequests: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFocusChange = (e) => {
        setFormData({
            ...formData,
            focus: e.target.value,
            otherFocus: e.target.value === 'Other' ? formData.otherFocus : ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        // Handle form submission logic here
    };

    return (
        <Container>
            <Title>Create Your Itinerary</Title>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="numberOfPeople">Number of People:</Label>
                    <Input
                        type="number"
                        id="numberOfPeople"
                        name="numberOfPeople"
                        value={formData.numberOfPeople}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="numberOfDays">Number of Days:</Label>
                    <Input
                        type="number"
                        id="numberOfDays"
                        name="numberOfDays"
                        value={formData.numberOfDays}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="place">Destination:</Label>
                    <Input
                        type="text"
                        id="place"
                        name="place"
                        value={formData.place}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="budget">Budget:</Label>
                    <Input
                        type="text"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="fromLocation">From Location:</Label>
                    <Input
                        type="text"
                        id="fromLocation"
                        name="fromLocation"
                        value={formData.fromLocation}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="startDate">Start Date:</Label>
                    <Input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="endDate">End Date:</Label>
                    <Input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="accommodation">Accommodation Type:</Label>
                    <Select id="accommodation" name="accommodation" value={formData.accommodation} onChange={handleChange}>
                        <option value="">Select Accommodation</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Hostel">Hostel</option>
                        <option value="Airbnb">Airbnb</option>
                        <option value="Other">Other</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="transportation">Transportation Preferences:</Label>
                    <Select id="transportation" name="transportation" value={formData.transportation} onChange={handleChange}>
                        <option value="">Select Transportation</option>
                        <option value="Car Rental">Car Rental</option>
                        <option value="Public Transport">Public Transport</option>
                        <option value="Bicycles">Bicycles</option>
                        <option value="Other">Other</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="focus">Focus Area:</Label>
                    <Select id="focus" name="focus" value={formData.focus} onChange={handleFocusChange} required>
                        <option value="">Select a focus area</option>
                        <option value="History">History</option>
                        <option value="Art and Culture">Art and Culture</option>
                        <option value="Education">Education</option>
                        <option value="Food">Food</option>
                        <option value="Temples">Temples</option>
                        <option value="Other">Other</option>
                    </Select>
                    {formData.focus === 'Other' && (
                        <Input
                            type="text"
                            id="otherFocus"
                            name="otherFocus"
                            placeholder="Please specify"
                            value={formData.otherFocus}
                            onChange={handleChange}
                            required
                        />
                    )}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="specialRequests">Special Requests:</Label>
                    <Input
                        type="text"
                        id="specialRequests"
                        name="specialRequests"
                        placeholder="Any special requests or requirements?"
                        value={formData.specialRequests}
                        onChange={handleChange}
                    />
                </FormGroup>
                <SubmitButton type="submit">Create Itinerary</SubmitButton>
            </Form>
        </Container>
    );
};

// Styled Components
const Container = styled.div`
  font-family: "Arial", sans-serif;
  padding: 40px;
`;

const Title = styled.h1`
  color: #004d61;
  text-align: center;
`;

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #004d61;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #003347;
  }
`;

export default ItineraryPage;*/



