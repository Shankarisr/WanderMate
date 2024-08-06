// import React, { useState } from 'react';
// import styled from 'styled-components';

// const CulturePageContainer = styled.div`
//   padding: 20px;
//   max-width: 600px;
//   margin: 0 auto;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const Input = styled.input`
//   margin-bottom: 15px;
//   padding: 10px;
//   font-size: 16px;
// `;

// const Select = styled.select`
//   margin-bottom: 15px;
//   padding: 10px;
//   font-size: 16px;
// `;

// const TextArea = styled.textarea`
//   margin-bottom: 15px;
//   padding: 10px;
//   font-size: 16px;
//   resize: vertical;
//   height: 80px;
// `;

// const CheckboxContainer = styled.div`
//   margin-bottom: 15px;
// `;

// const Button = styled.button`
//   padding: 10px;
//   font-size: 16px;
//   background-color: #007BFF;
//   color: white;
//   border: none;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const ResultContainer = styled.div`
//   margin-top: 20px;
//   padding: 15px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const formatResults = (text) => {
//   return text
//     .replace(/## (.*?)(?=\n|$)/g, '<h3>$1</h3>') // Convert ## subheaders to <h3>
//     .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Convert **text** to <strong>text</strong>
//     .replace(/\*([^*]+)\*/g, '<em>$1</em>') // Convert *text* to <em>text</em>
//     .replace(/\n/g, '<br/>') // Convert new lines to <br/>
//     .replace(/(?:\r\n|\r|\n)/g, '<p></p>'); // Add space between paragraphs
// };

// const CulturePage = () => {
//   const [formData, setFormData] = useState({
//     destination: '',
//     placeType: '',
//     otherPlaceDescription: '',
//     season: '',
//     specificEvents: '',
//     languagePreferences: false,
//     companions: '',
//     culturalInterests: [],
//   });

//   const [result, setResult] = useState(null);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === 'checkbox') {
//       if (name === 'culturalInterests') {
//         setFormData((prevState) => ({
//           ...prevState,
//           culturalInterests: checked
//             ? [...prevState.culturalInterests, value]
//             : prevState.culturalInterests.filter((interest) => interest !== value),
//         }));
//       } else {
//         setFormData({
//           ...formData,
//           [name]: checked,
//         });
//       }
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:3007/api/culture', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch cultural insights');
//       }

//       const data = await response.json();
//       setResult(formatResults(data.results)); // Format results before setting state
//     } catch (error) {
//       console.error('Error:', error);
//       setResult('Error fetching cultural insights');
//     }
//   };

//   return (
//     <CulturePageContainer>
//       <h1>Cultural Insights</h1>
//       <Form onSubmit={handleSubmit}>
//         <Input
//           type="text"
//           name="destination"
//           placeholder="Destination"
//           value={formData.destination}
//           onChange={handleChange}
//           required
//         />
//         <Select
//           name="placeType"
//           value={formData.placeType}
//           onChange={handleChange}
//           required
//         >
//           <option value="" disabled>Select Place Type</option>
//           <option value="temple">Temple</option>
//           <option value="education">Education</option>
//           <option value="work">Work</option>
//           <option value="others">Others</option>
//         </Select>
//         {formData.placeType === 'others' && (
//           <TextArea
//             name="otherPlaceDescription"
//             placeholder="Describe the place"
//             value={formData.otherPlaceDescription}
//             onChange={handleChange}
//             rows="3"
//           />
//         )}
//         <Select
//           name="season"
//           value={formData.season}
//           onChange={handleChange}
//         >
//           <option value="" disabled>Select Season of Visit</option>
//           <option value="spring">Spring</option>
//           <option value="summer">Summer</option>
//           <option value="autumn">Autumn</option>
//           <option value="winter">Winter</option>
//         </Select>
//         <Input
//           type="text"
//           name="specificEvents"
//           placeholder="Specific Events or Festivals"
//           value={formData.specificEvents}
//           onChange={handleChange}
//         />
//         <CheckboxContainer>
//           <label>
//             <input
//               type="checkbox"
//               name="languagePreferences"
//               checked={formData.languagePreferences}
//               onChange={handleChange}
//             />
//             Need language tips
//           </label>
//         </CheckboxContainer>
//         <Select
//           name="companions"
//           value={formData.companions}
//           onChange={handleChange}
//         >
//           <option value="" disabled>Traveling With</option>
//           <option value="alone">Alone</option>
//           <option value="family">Family</option>
//           <option value="group">Group</option>
//         </Select>
//         <CheckboxContainer>
//           <label>
//             <input
//               type="checkbox"
//               name="culturalInterests"
//               value="food"
//               onChange={handleChange}
//             />
//             Food
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="culturalInterests"
//               value="art"
//               onChange={handleChange}
//             />
//             Art
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="culturalInterests"
//               value="music"
//               onChange={handleChange}
//             />
//             Music
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="culturalInterests"
//               value="history"
//               onChange={handleChange}
//             />
//             History
//           </label>
//         </CheckboxContainer>
//         <Button type="submit">Get Cultural Insights</Button>
//       </Form>

//       {result && (
//         <ResultContainer>
//           <h2>Cultural Insights</h2>
//           <div dangerouslySetInnerHTML={{ __html: result }} /> {/* Render formatted HTML */}
//         </ResultContainer>
//       )}
//     </CulturePageContainer>
//   );
// };

// export default CulturePage;
import React, { useState } from 'react';
import styled from 'styled-components';

const CulturePage = () => {
  const [formData, setFormData] = useState({
    destination: '',
    placeType: '',
    otherPlaceDescription: '',
    season: '',
    specificEvents: '',
    languagePreferences: false,
    companions: '',
    culturalInterests: [],
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'culturalInterests') {
        setFormData((prevState) => ({
          ...prevState,
          culturalInterests: checked
            ? [...prevState.culturalInterests, value]
            : prevState.culturalInterests.filter((interest) => interest !== value),
        }));
      } else {
        setFormData({
          ...formData,
          [name]: checked,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/culture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${text}`);
      }

      const data = await response.json();
      setResult(data.results);
      setError(null);
    } catch (error) {
      setError(error.message);
      setResult(null);
    }
  };

  return (
    <Container>
      <Title>Cultural Insights</Title>
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
          <Label htmlFor="placeType">Place Type:</Label>
          <Select
            id="placeType"
            name="placeType"
            value={formData.placeType}
            onChange={handleChange}
            required
          >
            <option value="">Select Place Type</option>
            <option value="temple">Temple</option>
            <option value="education">Education</option>
            <option value="work">Work</option>
            <option value="others">Others</option>
          </Select>
          {formData.placeType === 'others' && (
            <Input
              type="text"
              id="otherPlaceDescription"
              name="otherPlaceDescription"
              placeholder="Describe the place"
              value={formData.otherPlaceDescription}
              onChange={handleChange}
              required
            />
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="season">Season of Visit:</Label>
          <Select
            id="season"
            name="season"
            value={formData.season}
            onChange={handleChange}
          >
            <option value="">Select Season</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="autumn">Autumn</option>
            <option value="winter">Winter</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="specificEvents">Specific Events or Festivals:</Label>
          <Input
            type="text"
            id="specificEvents"
            name="specificEvents"
            value={formData.specificEvents}
            onChange={handleChange}
          />
        </FormGroup>
        <CheckboxContainer>
          <label>
            <Input
              type="checkbox"
              name="languagePreferences"
              checked={formData.languagePreferences}
              onChange={handleChange}
            />
            Need language tips
          </label>
        </CheckboxContainer>
        <FormGroup>
          <Label htmlFor="companions">Traveling With:</Label>
          <Select
            id="companions"
            name="companions"
            value={formData.companions}
            onChange={handleChange}
          >
            <option value="">Select Companions</option>
            <option value="alone">Alone</option>
            <option value="family">Family</option>
            <option value="group">Group</option>
          </Select>
        </FormGroup>
        <CheckboxContainer>
          <label>
            <Input
              type="checkbox"
              name="culturalInterests"
              value="food"
              onChange={handleChange}
            />
            Food
          </label>
          <label>
            <Input
              type="checkbox"
              name="culturalInterests"
              value="art"
              onChange={handleChange}
            />
            Art
          </label>
          <label>
            <Input
              type="checkbox"
              name="culturalInterests"
              value="music"
              onChange={handleChange}
            />
            Music
          </label>
          <label>
            <Input
              type="checkbox"
              name="culturalInterests"
              value="history"
              onChange={handleChange}
            />
            History
          </label>
        </CheckboxContainer>
        <SubmitButton type="submit">Get Cultural Insights</SubmitButton>
      </Form>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {result && (
        <ResultsContainer>
          <h2>Cultural Insights</h2>
          <div dangerouslySetInnerHTML={{ __html: formatResults(result) }} />
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
  margin-bottom: 20px;
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

const CheckboxContainer = styled.div`
  margin-bottom: 20px;
  label {
    display: block;
    margin-bottom: 5px;
    color: #333;
    font-weight: normal;
  }
  input {
    margin-right: 10px;
  }
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

export default CulturePage;

