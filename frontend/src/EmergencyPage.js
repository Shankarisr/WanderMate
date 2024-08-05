// import React, { useState } from 'react';
// import styled from 'styled-components';

// const EmergencyPage = () => {
//     const [formData, setFormData] = useState({
//         city: '',
//         state: '',
//         emergencyType: '',
//         healthcareNeeds: '',
//         languagePreferences: '',
//         contactPreference: '',
//         travelStatus: ''
//     });
//     const [results, setResults] = useState('');
//     const [error, setError] = useState(null);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:3008/api/emergency', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             if (!response.ok) {
//                 const text = await response.text();
//                 throw new Error(`HTTP error! Status: ${response.status}, Message: ${text}`);
//             }

//             const result = await response.json();
//             setResults(result.results);
//             setError(null);
//         } catch (error) {
//             setError(error.message);
//             setResults('');
//         }
//     };

//     return (
//         <Container>
//             <Title>Emergency Contacts</Title>
//             <Form onSubmit={handleSubmit}>
//                 <FormGroup>
//                     <Label htmlFor="city">City/Town:</Label>
//                     <Input
//                         type="text"
//                         id="city"
//                         name="city"
//                         value={formData.city}
//                         onChange={handleChange}
//                         required
//                     />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label htmlFor="state">State/Region:</Label>
//                     <Input
//                         type="text"
//                         id="state"
//                         name="state"
//                         value={formData.state}
//                         onChange={handleChange}
//                         required
//                     />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label htmlFor="emergencyType">Type of Emergency Service Needed:</Label>
//                     <Select
//                         id="emergencyType"
//                         name="emergencyType"
//                         value={formData.emergencyType}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="">Select a service</option>
//                         <option value="police">Police</option>
//                         <option value="ambulance">Ambulance</option>
//                         <option value="fire">Fire Department</option>
//                         <option value="hospital">Hospital</option>
//                         {/* Add more options as needed */}
//                     </Select>
//                 </FormGroup>
//                 <FormGroup>
//                     <Label htmlFor="healthcareNeeds">Healthcare Needs (if applicable):</Label>
//                     <Input
//                         type="text"
//                         id="healthcareNeeds"
//                         name="healthcareNeeds"
//                         value={formData.healthcareNeeds}
//                         onChange={handleChange}
//                     />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label htmlFor="languagePreferences">Language Preferences (if any):</Label>
//                     <Input
//                         type="text"
//                         id="languagePreferences"
//                         name="languagePreferences"
//                         value={formData.languagePreferences}
//                         onChange={handleChange}
//                     />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label htmlFor="contactPreference">Preferred Contact Information:</Label>
//                     <Select
//                         id="contactPreference"
//                         name="contactPreference"
//                         value={formData.contactPreference}
//                         onChange={handleChange}
//                     >
//                         <option value="numbers">Contact Numbers</option>
//                         <option value="addresses">Addresses</option>
//                         <option value="both">Both</option>
//                     </Select>
//                 </FormGroup>
//                 <FormGroup>
//                     <Label htmlFor="travelStatus">Travel Status:</Label>
//                     <Select
//                         id="travelStatus"
//                         name="travelStatus"
//                         value={formData.travelStatus}
//                         onChange={handleChange}
//                     >
//                         <option value="traveler">Traveler</option>
//                         <option value="resident">Local Resident</option>
//                     </Select>
//                 </FormGroup>
//                 <SubmitButton type="submit">Get Emergency Contacts</SubmitButton>
//             </Form>
//             {error && <ErrorMessage>{error}</ErrorMessage>}
//             {results && (
//                 <ResultsContainer>
//                     <h2>Emergency Contacts:</h2>
//                     <div dangerouslySetInnerHTML={{ __html: formatResults(results) }} />
//                 </ResultsContainer>
//             )}
//         </Container>
//     );
// };

// // Helper function to format results
// const formatResults = (text) => {
//     return text
//         .replace(/## (.*?)(?=\n|$)/g, '<h3>$1</h3>') // Convert ## subheaders to <h3>
//         .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Convert **text** to <strong>text</strong>
//         .replace(/\*([^*]+)\*/g, '<em>$1</em>') // Convert *text* to <em>text</em>
//         .replace(/\n/g, '<br/>') // Convert new lines to <br/>
//         .replace(/(?:\r\n|\r|\n)/g, '<p></p>'); // Add space between paragraphs
// };

// // Styled Components
// const Container = styled.div`
//   font-family: "Arial", sans-serif;
//   padding: 40px;
//   max-width: 900px;
//   margin: auto;
//   background-color: #f5f5f5;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0,0,0,0.1);
// `;

// const Title = styled.h1`
//   color: #004d61;
//   text-align: center;
//   margin-bottom: 20px;
// `;

// const Form = styled.form`
//   background: white;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// `;

// const FormGroup = styled.div`
//   margin-bottom: 15px;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 5px;
//   font-weight: bold;
//   color: #333;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   font-size: 16px;
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   font-size: 16px;
// `;

// const SubmitButton = styled.button`
//   padding: 12px 20px;
//   font-size: 1.1em;
//   color: #fff;
//   background-color: #004d61;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #003843;
//   }
// `;

// const ResultsContainer = styled.div`
//   margin-top: 20px;
//   padding: 20px;
//   background-color: #fff;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//   font-size: 16px;
//   line-height: 1.6;
//   white-space: pre-wrap;

//   h2 {
//     color: #004d61;
//     margin-bottom: 15px;
//   }

//   h3 {
//     color: #003843;
//     margin-top: 20px;
//     margin-bottom: 10px;
//   }

//   p {
//     margin-bottom: 10px;
//   }
  
//   strong {
//     font-weight: bold;
//   }

//   em {
//     font-style: italic;
//   }

//   br {
//     margin: 10px 0;
//   }
// `;

// const ErrorMessage = styled.div`
//   color: red;
//   margin-top: 20px;
//   text-align: center;
//   font-size: 16px;
// `;

// export default EmergencyPage;
import React, { useState } from 'react';
import styled from 'styled-components';

const EmergencyPage = () => {
    const [formData, setFormData] = useState({
        city: '',
        state: '',
        emergencyType: '',
        healthcareNeeds: '',
        languagePreferences: '',
        contactPreference: '',
        travelStatus: '' // Ensure this field is included
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
        console.log('Form Data:', formData); // Log form data for debugging
        if (!formData.city || !formData.state || !formData.emergencyType || !formData.contactPreference || !formData.travelStatus) {
            setError("All required fields must be filled.");
            return;
        }
        try {
            const response = await fetch('http://localhost:3008/api/emergency', {
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
            <Title>Emergency Contacts</Title>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="city">City/Town:</Label>
                    <Input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="state">State/Region:</Label>
                    <Input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="emergencyType">Type of Emergency Service Needed:</Label>
                    <Select
                        id="emergencyType"
                        name="emergencyType"
                        value={formData.emergencyType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a service</option>
                        <option value="police">Police</option>
                        <option value="ambulance">Ambulance</option>
                        <option value="fire">Fire Department</option>
                        <option value="hospital">Hospital</option>
                        {/* Add more options as needed */}
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="healthcareNeeds">Healthcare Needs (if applicable):</Label>
                    <Input
                        type="text"
                        id="healthcareNeeds"
                        name="healthcareNeeds"
                        value={formData.healthcareNeeds}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="languagePreferences">Language Preferences (if any):</Label>
                    <Input
                        type="text"
                        id="languagePreferences"
                        name="languagePreferences"
                        value={formData.languagePreferences}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="contactPreference">Preferred Contact Information:</Label>
                    <Select
                        id="contactPreference"
                        name="contactPreference"
                        value={formData.contactPreference}
                        onChange={handleChange}
                    >
                        <option value="numbers">Contact Numbers</option>
                        <option value="addresses">Addresses</option>
                        <option value="both">Both</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="travelStatus">Travel Status:</Label>
                    <Select
                        id="travelStatus"
                        name="travelStatus"
                        value={formData.travelStatus}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select travel status</option>
                        <option value="traveler">Traveler</option>
                        <option value="resident">Local Resident</option>
                    </Select>
                </FormGroup>
                <SubmitButton type="submit">Get Emergency Contacts</SubmitButton>
            </Form>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {results && (
                <ResultsContainer>
                    <h2>Emergency Contacts:</h2>
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

export default EmergencyPage;
