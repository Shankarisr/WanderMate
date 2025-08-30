import React, { useState } from 'react';
import styled from 'styled-components';

const DetailPage = () => {
    const [formData, setFormData] = useState({
        destination: '',
        checkInDate: '',
        checkOutDate: '',
        numberOfGuests: 1
    });
    const [details, setDetails] = useState(null);
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
            const response = await fetch('http://localhost:3000/api/travel-details', {
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
            setDetails(result);
            setError(null);
        } catch (error) {
            setError(error.message);
            setDetails(null);
        }
    };

    return (
        <Container>
            <Title>Travel Details</Title>
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
                    <Label htmlFor="checkInDate">Check-In Date:</Label>
                    <Input
                        type="date"
                        id="checkInDate"
                        name="checkInDate"
                        value={formData.checkInDate}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="checkOutDate">Check-Out Date:</Label>
                    <Input
                        type="date"
                        id="checkOutDate"
                        name="checkOutDate"
                        value={formData.checkOutDate}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="numberOfGuests">Number of Guests:</Label>
                    <Input
                        type="number"
                        id="numberOfGuests"
                        name="numberOfGuests"
                        value={formData.numberOfGuests}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <SubmitButton type="submit">Get Details</SubmitButton>
            </Form>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {details && (
                <ResultsContainer>
                    <h2>Travel Information:</h2>
                    <Section>
                        <h3>Hotels</h3>
                        {details.hotels.map((hotel, index) => (
                            <div key={index}>
                                <p>{hotel.name}</p>
                                <p>{hotel.address}</p>
                                <p>Rating: {hotel.rating}</p>
                            </div>
                        ))}
                    </Section>
                    <Section>
                        <h3>Flights</h3>
                        {details.flights.map((flight, index) => (
                            <div key={index}>
                                <p>{flight.airline} - {flight.flightNumber}</p>
                                <p>Departure: {flight.departure}</p>
                                <p>Arrival: {flight.arrival}</p>
                            </div>
                        ))}
                    </Section>
                    <Section>
                        <h3>Restaurants</h3>
                        {details.restaurants.map((restaurant, index) => (
                            <div key={index}>
                                <p>{restaurant.name}</p>
                                <p>{restaurant.address}</p>
                                <p>Rating: {restaurant.rating}</p>
                            </div>
                        ))}
                    </Section>
                    <Section>
                        <h3>Attractions</h3>
                        {details.attractions.map((attraction, index) => (
                            <div key={index}>
                                <p>{attraction.name}</p>
                                <p>{attraction.address}</p>
                            </div>
                        ))}
                    </Section>
                </ResultsContainer>
            )}
        </Container>
    );
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
`;

const Section = styled.div`
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 20px;
  font-weight: bold;
`;

export default DetailPage;
